import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { channelNames } from 'config';
import { EventWithBlock } from 'src/types';
import { findDiscordChannel } from 'src/util';
import { BaseEventHandler } from './base-event.handler';
import { getProposalCreatedEmbed } from './proposals-embeds';

@Injectable()
export class ProposalCreatedHandler extends BaseEventHandler {

  @OnEvent('*.ProposalCreated')
  async handleProposalCreatedEvent(payload: EventWithBlock) {

    const [proposalId, generalInformation, proposalDetails] = [
      this.getDataFromEvent([payload.event], 'proposalsCodex', 'ProposalCreated', 0),
      this.getDataFromEvent([payload.event], 'proposalsCodex', 'ProposalCreated', 1),
      this.getDataFromEvent([payload.event], 'proposalsCodex', 'ProposalCreated', 2)
    ];

    const authorId = generalInformation?.memberId.toString() || '';

    const channelToUse = findDiscordChannel(this.client, channelNames[this.getProposalsChannelKey()])[0];
    channelToUse.send({
      embeds: [
        getProposalCreatedEmbed(proposalId, generalInformation, proposalDetails, await this.getMemberHandleById(authorId))
      ],
    });
  }
}