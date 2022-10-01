import { 
  identityValidatedRole, 
  wgLeadToRoleMap, 
  wgToRoleMap, 
  councilMemberRole 
} from '../../config';
import { findServerRole } from '../util';
import { banner } from '../banner';
import { Injectable, Logger } from '@nestjs/common';
import { InjectDiscordClient, Once } from '@discord-nestjs/core';
import { Client } from 'discord.js';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class WorkingGroupService {
  private readonly logger = new Logger(WorkingGroupService.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly configService: ConfigService)
    { }

  @Once('ready')
  async onReady(): Promise<void> {
    this.logger.log(banner);
    this.logger.log(`Bot online. Current server[s]: ${(await this.client.guilds.fetch({ limit: 10 })).map((g) => g.name).join(',')}`);

    // check the config settings agaist the server specified as environment variable
    this.selfCheck();
  }

  private selfCheck() {
    const serverToCheck = this.configService.get('DISCORD_SERVER');
    const rolesToCheck: string[] = [
      identityValidatedRole,
      councilMemberRole,
      ...Object.values(wgLeadToRoleMap),
      ...Object.values(wgToRoleMap)
    ];
    rolesToCheck.forEach(async (role: string, ix: number, vals: string[]) => {
      if (!(await findServerRole(this.client, serverToCheck, role))) {
        this.logger.error(`Configured role [${role}] not found`);
      }
    });
  }
}