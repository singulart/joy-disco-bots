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

  @Cron(CronExpression.EVERY_10_SECONDS)
  async syncOnChainRoles(): Promise<void> {
    this.logger.debug('Syncing on-chain roles');
    const queryNodeClient = getSdk(new GraphQLClient(queryNodeUrl));
    const totalCount = await this.daoMembershipRepository.count();
    let page = 0;
    const pageSize = 10;
    while(page * pageSize < totalCount) {
      const memberships = await this.getPageOfMemberships(pageSize, page);
      for(let i = 0; i < memberships.length; i++) {
        // this.logger.log(memberships[i].membership);
        const queryNodeMember = await queryNodeClient.memberByHandle({handle: memberships[i].membership});
        const onChainRoles = queryNodeMember.memberships[0].roles.filter((role: any) => role.status.__typename === 'WorkerStatusActive');
        // this.logger.debug(onChainRoles.length);
        for(let r = 0; r < onChainRoles.length; r++) {
          if(!this.hasRole(memberships[i], onChainRoles[r].groupId)) {
            this.daoRoleRepository.create({
              role: onChainRoles[r].groupId,
              membershipId: memberships[i].id
            });

            const mainServer = this.configService.get('DISCORD_SERVER');
            const roleToAssign = await findServerRole(
              this.client, 
              mainServer, 
              wgToRoleMap[onChainRoles[r].groupId]) as Role;
            this.logger.debug(roleToAssign);
            const server = await this.client.guilds.fetch(mainServer);
            const usernameParts = memberships[i].discordHandle.split('#');
            const serverUser = server.members.cache.find(
              (mem) => mem.user.username === usernameParts[0] && mem.user.discriminator === usernameParts[1]
            );
            serverUser?.roles.add(roleToAssign.id, 'Assigned as per on-chain role');
          }
          this.logger.debug(
            `${memberships[i].discordHandle} on-chain role ${onChainRoles[r].groupId}`
          );  
        }
      }
      page = page + 1;
    }
  }
  private hasRole(member: DaoMembership, role: string): boolean {
    // this.logger.debug(`Roles ${JSON.stringify(member.daoRoles)}`);
    return member.daoRoles.find((r) => r.role === role) !== undefined;
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