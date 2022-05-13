import { Header } from '@polkadot/types/interfaces'
import { wsLocation } from "../../config";
import { DiscordChannels } from "../types";
import { ApiPromise } from "@polkadot/api";
import { getDiscordChannels } from "../util";
import { connectApi, getBlockHash, getEvents } from "../util";
import { processGroupEvents } from "./wg_event_handlers";
import { banner } from "../banner";
import { Injectable, Logger } from "@nestjs/common";
import { InjectDiscordClient, Once } from "@discord-nestjs/core";
import { Client } from 'discord.js';


@Injectable()
export class WorkingGroupService {
  private readonly logger = new Logger(WorkingGroupService.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client) { }

  @Once('ready')
  async onReady(): Promise<void> {
    this.logger.log(banner);
    this.logger.log(`Bot online. Current server[s]: ${(await this.client.guilds.fetch({ limit: 10 })).map((g) => g.name).join(',')}`);
    const channels: DiscordChannels = await getDiscordChannels(this.client);
    const api: ApiPromise = await connectApi(wsLocation);
    await api.isReady;
    this.logger.log(`Connected to RPC endpoint [${wsLocation}]`);
    api.rpc.chain.subscribeFinalizedHeads(async (header: Header) => {
      const hash = await getBlockHash(api, +header.number);
      const events = await getEvents(api, hash);
      processGroupEvents(+header.number, events, channels);
    });
  }
}