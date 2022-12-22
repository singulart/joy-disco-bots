import { WorkerId } from '@joystream/types/primitives';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TextChannel } from 'discord.js';
import { EventWithBlock } from 'src/types';
import { BaseEventHandler } from './base-event.handler';
import { getWorkerExitedEmbed } from './embeds';

@Injectable()
export class WorkerExitedHandler extends BaseEventHandler {
  private readonly logger = new Logger(WorkerExitedHandler.name);

  @OnEvent('*.WorkerExited')
  async handleWorkerExitedEvent(payload: EventWithBlock) {
    const { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const exitedId = data[0] as WorkerId;
    const exitedWorkerKey = `${section}-${exitedId.toString()}`;
    this.logger.debug(exitedWorkerKey);

    const exitedMember = await this.queryNodeClient.workerById(exitedWorkerKey);
    this.channels[section].forEach((ch: TextChannel) =>
      ch.send({
        embeds: [
          getWorkerExitedEmbed(
            exitedMember,
            payload
          ),
        ],
      }));
  }
}