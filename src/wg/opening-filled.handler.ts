import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TextChannel } from 'discord.js';
import { EventWithBlock } from 'src/types';
import { BaseEventHandler } from './base-event.handler';
import { getOpeningFilledEmbed } from './embeds';
import { OpeningId, WorkerId } from '@joystream/types/primitives';

@Injectable()
export class OpeningFilledHandler extends BaseEventHandler {

  @OnEvent('*.OpeningFilled')
  async handleOpeningFilledEvent(payload: EventWithBlock) {
    const { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const filledOpeningId = data[0] as OpeningId;
    const filledOpeningObject = await this.queryNodeClient.openingById(`${section}-${filledOpeningId.toString()}`);
    const hiredWorkers = Object.values<WorkerId>(JSON.parse(data[1].toString()));

    hiredWorkers.map(async (id, index, values) => {
      const hiredWorker = await this.queryNodeClient.workerById(`${section}-${id.toString()}`);
      this.channels[section].forEach((ch: TextChannel) =>
        ch.send({
          embeds: [
            getOpeningFilledEmbed(
              filledOpeningObject,
              hiredWorker,
              payload.block,
              payload.event
            ),
          ],
        }));
    });
  }
}