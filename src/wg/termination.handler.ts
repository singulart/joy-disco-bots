import { WorkerId } from '@joystream/types/primitives';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TextChannel } from 'discord.js';
import { EventWithBlock } from 'src/types';
import { BaseEventHandler } from './base-event.handler';
import { getWorkerTerminatedEmbed } from './embeds';

@Injectable()
export class TerminationHandler extends BaseEventHandler {

  @OnEvent('*.TerminatedWorker')
  async handleWorkerTerminationEvent(payload: EventWithBlock) {
    this.handle(payload);
  }

  @OnEvent('*.TerminatedLeader')
  async handleLeaderTerminationEvent(payload: EventWithBlock) {
    this.handle(payload);
  }

  async handle(payload: EventWithBlock) {
    const { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const terminatedId = data[0] as WorkerId;
    const terminatedWorkerKey = `${section}-${terminatedId.toString()}`;
    const terminatedIdWorker = await this.queryNodeClient.workerById(terminatedWorkerKey);
    this.channels[section].forEach((ch: TextChannel) =>
      ch.send({
        embeds: [
          getWorkerTerminatedEmbed(
            terminatedIdWorker,
            payload
          ),
        ],
      }));
  }
}