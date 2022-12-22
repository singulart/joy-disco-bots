import { OpeningId } from '@joystream/types/primitives';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TextChannel } from 'discord.js';
import { EventWithBlock } from 'src/types';
import { BaseEventHandler } from './base-event.handler';
import { getOpeningAddedEmbed, getOpeningCancelledEmbed } from './embeds';

@Injectable()
export class OpeningAddedOrCancelledHandler extends BaseEventHandler {
  private readonly logger = new Logger(OpeningAddedOrCancelledHandler.name);

  @OnEvent('*.OpeningAdded')
  async handleOpeningAddedEvent(payload: EventWithBlock) {
    await this.handle(payload);
  }

  @OnEvent('*.OpeningCanceled')
  async handleOpeningCanceledEvent(payload: EventWithBlock) {
    await this.handle(payload);
  }

  async handle(payload: EventWithBlock) {
    const { section, method, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const openingId = data[0] as OpeningId;
    const openingIdKey = `${section}-${openingId.toString()}`;
    this.logger.debug(openingIdKey);

    const qnOpeningObject = await this.queryNodeClient.openingById(openingIdKey)
    if (!qnOpeningObject || !qnOpeningObject.workingGroupOpeningByUniqueInput) {
      this.logger.log('Opening not found in QN');
    } else {
      if (method === 'OpeningAdded') {
        this.channels[section].forEach((ch: TextChannel) =>
          ch.send({
            embeds: [
              getOpeningAddedEmbed(
                openingId,
                qnOpeningObject,
                payload.block,
                payload.event
              ),
            ],
          }));
      } else {
        this.channels[section].forEach((ch: TextChannel) =>
          ch.send({
            embeds: [
              getOpeningCancelledEmbed(
                openingId,
                qnOpeningObject,
                payload.block,
                payload.event
              ),
            ],
          }));
      }
    }
  }
}