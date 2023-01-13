import { ApplicationId } from '@joystream/types/primitives';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TextChannel } from 'discord.js';
import { EventWithBlock } from 'src/types';
import { BaseEventHandler } from './base-event.handler';
import { getApplicationWithdrawnEmbed } from './embeds';

@Injectable()
export class ApplicationWithdrawnHandler extends BaseEventHandler{
  private readonly logger = new Logger(ApplicationWithdrawnHandler.name);

  @OnEvent('*.ApplicationWithdrawn')
  async handleApplicationWithdrawnEvent(payload: EventWithBlock) {
    const { section, data } = payload.event.event;
    if(!this.checkChannel(section)) {
      return;
    }
    const withdrawnId = data[0] as ApplicationId;
    const withdrawnApplicationKey = `${section}-${withdrawnId.toString()}`;
    this.logger.debug(withdrawnApplicationKey);
    const withdrawnApplication = await this.queryNodeClient.applicationById(withdrawnApplicationKey);

    this.channels[section].forEach((ch: TextChannel) =>
      ch.send({
        embeds: [
          getApplicationWithdrawnEmbed(
            withdrawnId,
            withdrawnApplication,
            payload.block,
            payload.event
          ),
        ],
      }));
  }
}