import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { DaoMembership } from "src/db/daomembership.entity";
import { DaoRole } from "src/db/daorole.entity";
import { Op } from "sequelize";
import { getSdk } from "src/qntypes";
import { GraphQLClient } from "graphql-request";
import { hydraLocation as queryNodeUrl, wgToRoleMap } from "../../config";
import { ConfigService } from "@nestjs/config";
import { InjectDiscordClient } from "@discord-nestjs/core";
import { Client, Role } from 'discord.js';
import { findServerRole } from "src/util";

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
    private readonly configService: ConfigService 
  ) { }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async syncOnChainRoles() {
    this.logger.debug('Syncing on-chain roles');
    const queryNodeClient = getSdk(new GraphQLClient(queryNodeUrl));
    const totalVerifiedMembersCount = await this.daoMembershipRepository.count();
    let page = 0;
    const pageSize = 10;
    while(page * pageSize < totalVerifiedMembersCount) {
      const memberships = await this.getPageOfMemberships(pageSize, page);
      for(let i = 0; i < memberships.length; i++) {
        const queryNodeMember = await queryNodeClient.memberByHandle({handle: memberships[i].membership});
        const onChainRoles = queryNodeMember.memberships[0].roles.filter((role: any) => role.status.__typename === 'WorkerStatusActive');

        for(let r = 0; r < onChainRoles.length; r++) {
          // Check that user's on-chain role is already stored in our database. 
          // If it's not, user needs to be granted this role, and new DaoRole record created for this user.
          if(!this.hasOnchainRole(memberships[i], onChainRoles[r].groupId)) {
            const mainServer = this.configService.get('DISCORD_SERVER');
            const roleToAssign = await findServerRole(
              this.client, 
              mainServer, 
              wgToRoleMap[onChainRoles[r].groupId]) as Role;

            if(!roleToAssign) {
              this.logger.warn(`I was about to assign role ${wgToRoleMap[onChainRoles[r].groupId]}, but it's gone!`);
              continue;
            }
            const serverUser = await this.findUser(mainServer, memberships[i]);
            if(serverUser) {
              await serverUser.roles.add(roleToAssign.id, 'Assigned as per on-chain role');
              this.daoRoleRepository.create({
                role: onChainRoles[r].groupId,
                membershipId: memberships[i].id
              });
              this.logger.debug(
                `Assigned ${memberships[i].discordHandle} server role ${wgToRoleMap[onChainRoles[r].groupId]}`
              );  
            } else {
              this.logger.warn(`User ${memberships[i].discordHandle} not found on this server`);
            }
          }
        }
        for(let m = 0; m < memberships[i].daoRoles.length; m++) {
          // Check that user's db role is still relevant. 
          // If it's not, user needs to be revoked this role, and corresponding DaoRole record deleted for this user.
          if(!this.hasDbRole(onChainRoles, memberships[i].daoRoles[m].role)) {
            const mainServer = this.configService.get('DISCORD_SERVER');
            const roleToRevoke = await findServerRole(
              this.client, 
              mainServer, 
              wgToRoleMap[memberships[i].daoRoles[m].role]) as Role;

            if(!roleToRevoke) {
              this.logger.warn(`I was about to revoke role [${wgToRoleMap[memberships[i].daoRoles[m].role]}], but it's gone!`);
              continue;
            }
            const serverUser = await this.findUser(mainServer, memberships[i]);
            if(serverUser) {
              await serverUser.roles.remove(roleToRevoke.id, 'Revoked as per on-chain changes');
              this.daoRoleRepository.destroy({
                where: {
                  id: memberships[i].daoRoles[m].id
                }
              });
              this.logger.debug(
                `Revoked ${memberships[i].discordHandle} server role [${wgToRoleMap[memberships[i].daoRoles[m].role]}]`
              );  
            } else {
              this.logger.warn(`User ${memberships[i].discordHandle} not found on this server`);
            }
          }
        }
      }
      page = page + 1;
    }
  }
  private async findUser(mainServerId: string, membership: DaoMembership) {
    const server = await this.client.guilds.fetch(mainServerId);
    const usernameParts = membership.discordHandle.split('#');
    const serverUsers = await server.members.fetch({ query: usernameParts[0] });
    const serverUser = serverUsers.find((mem) => mem.user.discriminator === usernameParts[1]);
    return serverUser;
  }

  private hasOnchainRole(member: DaoMembership, onChainRole: string): boolean {
    return member.daoRoles.find((r) => r.role === onChainRole) !== undefined;
  }

  private hasDbRole(onChainRoles: any[], dbRole: string): boolean { // TODO replace any with strong type
    return onChainRoles.find((r) => r.groupId === dbRole) !== undefined;
  }

  private async getPageOfMemberships(pageSize: number, page: number): Promise<DaoMembership[]> {
    // first query only selects ids from the master table (memberships)
    const fetchIds = await this.daoMembershipRepository.findAll({ limit: pageSize, offset: page * pageSize, attributes: ["id"] });
    // second query selects memberships + relevant roles in one go (using outer join)
    // note the absence of limit/offset in this query! 
    const pageOfMemberships = await this.daoMembershipRepository.findAll({
      where: {
        id: {
          [Op.in]: fetchIds.map<number>((record: DaoMembership, ix: number, values: DaoMembership[]) => record.id)
        }
      },
      include: DaoRole
    });
    this.logger.debug(`Fetched ${pageOfMemberships.length} records ${pageOfMemberships.map((dao) => dao.id)}`);
    return pageOfMemberships;
  }
}