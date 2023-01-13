import { WorkerId } from '@joystream/types/primitives';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TextChannel } from 'discord.js';
import { EventWithBlock } from 'src/types';
import { BaseEventHandler } from './base-event.handler';
import { getLeaderSetEmbed, getLeaderUnsetEmbed } from './embeds';

@Injectable()
export class LeadHandler extends BaseEventHandler {

  @OnEvent('*.LeaderSet')
  async handleLeadSetEvent(payload: EventWithBlock) {
    const { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const leaderId = data[0] as WorkerId;
    const leaderWorker = await this.queryNodeClient.workerById(`${section}-${leaderId.toString()}`);
    this.channels[section].forEach((ch: TextChannel) =>
      ch.send({
        embeds: [getLeaderSetEmbed(leaderWorker, payload.block, payload.event)],
      }));
  }

  @OnEvent('*.LeaderUnset')
  async handleLeadUnsetEvent(payload: EventWithBlock) {
    const { section } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    this.channels[section].forEach((ch: TextChannel) =>
      ch.send({
        embeds: [getLeaderUnsetEmbed(payload.block, payload.event)]
      }));
  }
}