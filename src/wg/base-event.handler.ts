import { InjectDiscordClient, Once } from '@discord-nestjs/core';
import { Injectable, Optional } from '@nestjs/common';
import { Client } from 'discord.js';
import { DiscordChannels } from 'src/types';
import { getDiscordChannels } from 'src/util';
import { RetryablePioneerClient } from 'src/gql/pioneer.client';

@Injectable()
export abstract class BaseEventHandler {

  constructor(
    protected readonly queryNodeClient: RetryablePioneerClient,
    @InjectDiscordClient()
    protected readonly client: Client,
    @Optional()
    protected channels: DiscordChannels) {
  }

  @Once('ready')
  async onReady(): Promise<void> {
    this.channels = await getDiscordChannels(this.client);
  }

  protected checkChannel(section: string): boolean {
    if (!this.channels[section] && section !== 'joystreamUtility') {
      console.log(`Channel not configured for [${section}]`);
      return false;
    }
    return true;
  }
}