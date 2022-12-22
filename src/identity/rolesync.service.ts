import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DaoMembership } from 'src/db/dao-membership.entity';
import { DaoRole } from 'src/db/dao-role.entity';
import { Op } from 'sequelize';
import { wgToRoleMap } from '../../config';
import { ConfigService } from '@nestjs/config';
import { InjectDiscordClient } from '@discord-nestjs/core';
import { Client, GuildMember, Role } from 'discord.js';
import { findServerRole } from 'src/util';
import { RetryablePioneerClient } from 'src/gql/pioneer.client';
import { MemberByHandleQuery } from 'src/qntypes';
import { CacheableMembershipsProvider } from './cacheable-members.provider';


const CM_ROLE = 'councilMemberRole';

/**
 * Cron-based syncing of Joystream on-chain roles with Discord server roles.
 * On-chain roles are fetched from Query node for all Discord users who claimed their Joystream memberships.
 */
@Injectable()
export class RoleSyncService {
  private readonly logger = new Logger(RoleSyncService.name);

  constructor(
    @Inject('DAO_MEMBERSHIP_REPOSITORY')
    private readonly daoMembershipRepository: typeof DaoMembership,
    @Inject('DAO_ROLE_REPOSITORY')
    private readonly daoRoleRepository: typeof DaoRole,
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly configService: ConfigService,
    private readonly queryNodeClient: RetryablePioneerClient,
    private readonly membershipsProvider: CacheableMembershipsProvider
  ) { }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async syncOnChainRoles() {
    this.logger.debug('Syncing on-chain roles');
    const activeCouncilMembers = await this.queryNodeClient.activeCouncilMembers();
    const totalVerifiedMembersCount = await this.daoMembershipRepository.count();
    let page = 0;
    const pageSize = 50;
    while(page * pageSize < totalVerifiedMembersCount) {
      const memberships = await this.getPageOfMemberships(pageSize, page);
      const memberHandles: string[] = memberships.map(m => m.membership);
      for(let i = 0; i < memberships.length; i++) {
        const ithMember = memberships[i];
        const mainServer = this.configService.get('DISCORD_SERVER');
        const serverUser = await this.findUser(mainServer, ithMember);
        // next 'if' block checks whether a user exists in the server and cleans the role data if they left (or changed the nickname)
        if(!serverUser) {
          this.logger.warn(`User ${ithMember.discordHandle} not found on this server. Cleaning the data`);
          this.daoRoleRepository.destroy({
            where: {
              membershipId: ithMember.id
            }
          });  
          this.daoMembershipRepository.destroy({
            where: {
              id: ithMember.id
            }
          });  
          continue;
        }

        // Bulk Query Node call to get the on-chain roles
        const queryNodeMember = await this.findMembership(memberHandles, ithMember);
        if(!queryNodeMember) {
          continue;
        }
  
        // Keep only active roles, filter the others out
        const onChainRoles = queryNodeMember.roles.filter((role: any) => role.status.__typename === 'WorkerStatusActive');

        // first pass: assigning server roles based on joystream ones
        for(let r = 0; r < onChainRoles.length; r++) {
          const roleInJoystream = onChainRoles[r].groupId;
          await this.maybeAssignRole(roleInJoystream, ithMember, serverUser);
        }

        // second pass: revokation of server roles that user doesn't have anymore in joystream
        for(let m = 0; m < ithMember.daoRoles.length; m++) {
          const dbRole = ithMember.daoRoles[m];
          if(dbRole.role === CM_ROLE) continue; // CM role is handled separately
          await this.maybeRevokeRole(dbRole, ithMember, onChainRoles);
        }

        // assign council member role if needed
        const isUserInCouncilCurrently = activeCouncilMembers.electedCouncils[0].councilMembers.find(
          (cm: any) => cm.member.handle === ithMember.membership
        ) !== undefined;
        if(isUserInCouncilCurrently) {
          await this.maybeAssignRole(CM_ROLE, ithMember, serverUser);
        }

        // revoke council member role if needed
        const cmRole = ithMember.daoRoles.find((role) => role.role === CM_ROLE);
        if(cmRole && !queryNodeMember.isCouncilMember) {
          await this.revokeRole(cmRole, ithMember, onChainRoles);
        }
      }
      page = page + 1;
    }
  }

  private async findMembership(memberHandles: string[], member: DaoMembership) {
    let queryNodeMember: MemberByHandleQuery | null  =  null;
    try {
      queryNodeMember = await this.membershipsProvider.getMembers(memberHandles);
      return queryNodeMember.memberships.find(mm => mm.handle === member.membership);
    } catch (error) {
      this.logger.warn(`Member ${member.membership} doesn't exist`);
      return null;
    }
  }

  private async maybeAssignRole(roleInJoystream: string, ithMember: DaoMembership, serverUser: GuildMember) {
    // Check that user's on-chain role is already stored in our database. 
    // If it's not, user needs to be granted this role, and new DaoRole record created for this user.
    if(!this.hasDbRole(ithMember, roleInJoystream)) {
      const mainServer = this.configService.get('DISCORD_SERVER');
      const roleToAssign = await findServerRole(
        this.client, 
        mainServer, 
        wgToRoleMap[roleInJoystream]) as Role;

      if(roleToAssign) {
        await serverUser.roles.add(roleToAssign.id, 'Assigned as per on-chain role');
        this.daoRoleRepository.create({
          role: roleInJoystream,
          membershipId: ithMember.id
        });
        this.logger.debug(
          `Assigned ${ithMember.discordHandle} server role [${wgToRoleMap[roleInJoystream]}]`
        );  
      } else {
        this.logger.warn(`I was about to assign role ${wgToRoleMap[roleInJoystream]}, but it's gone!`);
      }
    }
  }

  private async maybeRevokeRole(dbRole: DaoRole, ithMember: DaoMembership, onChainRoles: any) {
    // Check that user's db role is still relevant. 
    // If it's not, user needs to be revoked this role, and corresponding DaoRole record deleted for this user.
    if(!this.hasOnchainRole(onChainRoles, dbRole.role)) {
      this.revokeRole(dbRole, ithMember, onChainRoles);
    }
  }

  private async revokeRole(dbRole: DaoRole, ithMember: DaoMembership, onChainRoles: any) {
    const mainServer = this.configService.get('DISCORD_SERVER');
    const roleToRevoke = await findServerRole(
      this.client, 
      mainServer, 
      wgToRoleMap[dbRole.role]) as Role;

    if(roleToRevoke) {
      const serverUser = await this.findUser(mainServer, ithMember);
      if(serverUser) {
        await serverUser.roles.remove(roleToRevoke.id, 'Revoked as per on-chain changes');
        this.daoRoleRepository.destroy({
          where: {
            id: dbRole.id
          }
        });
        this.logger.debug(
          `Revoked ${ithMember.discordHandle} server role [${wgToRoleMap[dbRole.role]}]`
        );  
      } else {
        this.logger.warn(`User ${ithMember.discordHandle} not found on this server`);
      }
    } else {
      this.logger.warn(`I was about to revoke role [${wgToRoleMap[dbRole.role]}], but it's gone!`);
    }
  }

  private async findUser(mainServerId: string, membership: DaoMembership) {
    const server = await this.client.guilds.fetch(mainServerId);
    const usernameParts = membership.discordHandle.split('#');
    const serverUsers = await server.members.fetch({ query: usernameParts[0] });
    const serverUser = serverUsers.find((mem) => mem.user.discriminator === usernameParts[1]);
    return serverUser;
  }

  private hasDbRole(member: DaoMembership, onChainRole: string): boolean {
    return member.daoRoles.find((r) => r.role === onChainRole) !== undefined;
  }

  private hasOnchainRole(onChainRoles: any[], dbRole: string): boolean { // TODO replace any with strong type
    return onChainRoles.find((r) => r.groupId === dbRole) !== undefined;
  }

  private async getPageOfMemberships(pageSize: number, page: number): Promise<DaoMembership[]> {
    
    // first query only selects ids from the master table (memberships)
    const fetchIds = await this.daoMembershipRepository.findAll(
      { 
        limit: pageSize, 
        offset: page * pageSize, 
        attributes: ['id'] 
    });
    
    // second query selects memberships + relevant roles in one go (using outer join)
    // note the absence of limit/offset in this query! 
    const pageOfMemberships = await this.daoMembershipRepository.findAll({
      where: {
        id: {
          [Op.in]: fetchIds.map<number>((record: DaoMembership) => record.id)
        }
      },
      include: DaoRole
    });

    this.logger.debug(`Fetched ${pageOfMemberships.length} records ${pageOfMemberships.map((dao) => dao.id)}`);
    return pageOfMemberships;
  }
}