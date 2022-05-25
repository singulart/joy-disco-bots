import { Header } from '@polkadot/types/interfaces'
import { 
  wsLocation, 
  identityValidatedRole, 
  wgLeadToRoleMap, 
  wgToRoleMap, 
  councilMemberRole 
} from "../../config";
import { DiscordChannels } from "../types";
import { ApiPromise } from "@polkadot/api";
import { findServerRole, getDiscordChannels } from "../util";
import { connectApi, getBlockHash, getEvents } from "../util";
import { processGroupEvents } from "./wg.handlers";
import { banner } from "../banner";
import { Injectable, Logger } from "@nestjs/common";
import { InjectDiscordClient, Once } from "@discord-nestjs/core";
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
    const channels: DiscordChannels = await getDiscordChannels(this.client);

    // check the config settings agaist the server specified as environment variable
    this.selfCheck();

    const api: ApiPromise = await connectApi(wsLocation);
    await api.isReady;
    this.logger.log(`Connected to RPC endpoint [${wsLocation}]`);
    api.rpc.chain.subscribeFinalizedHeads(async (header: Header) => {
      const hash = await getBlockHash(api, +header.number);
      const events = await getEvents(api, hash);
      processGroupEvents(+header.number, events, channels);
    });
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