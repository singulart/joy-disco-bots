import { ApplicationId } from '@joystream/types/primitives';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TextChannel } from 'discord.js';
import { EventWithBlock } from 'src/types';
import { BaseEventHandler } from './base-event.handler';
import { getAppliedOnOpeningEmbed } from './embeds';
import { PalletWorkingGroupApplyOnOpeningParams } from '@polkadot/types/lookup'

@Injectable()
export class ApplicationCreatedHandler extends BaseEventHandler {

  @OnEvent('*.AppliedOnOpening')
  async handleApplicationCreatedEvent(payload: EventWithBlock) {
    const { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const applicationOpeningId = (data[0] as PalletWorkingGroupApplyOnOpeningParams).openingId;
    const applicantId = (data[0] as PalletWorkingGroupApplyOnOpeningParams).memberId;
    const applicationId = data[1] as ApplicationId;
    const openingObject = await this.queryNodeClient.openingById(`${section}-${applicationOpeningId.toString()}`);
    const applicant = await this.queryNodeClient.memberById(applicantId.toString());
    this.channels[section].forEach((ch: TextChannel) =>
      ch.send({
        embeds: [
          getAppliedOnOpeningEmbed(
            applicationId,
            openingObject,
            applicant,
            payload.block,
            payload.event
          ),
        ],
      }));
  }
}