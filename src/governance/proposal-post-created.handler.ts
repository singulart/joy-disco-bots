
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { channelNames } from 'config';
import { EventWithBlock } from 'src/types';
import { findDiscordChannel } from 'src/util';
import { BaseEventHandler } from './base-event.handler';
import { getPostCreatedEmbed } from './proposals-embeds';

@Injectable()
export class ProposalPostCreatedHandler extends BaseEventHandler {

  @OnEvent('proposalsDiscussion.PostCreated')
  async handleProposalPostCreatedEvent(payload: EventWithBlock) {

    const [memberId, proposalId, content] = [
      this.getDataFromEvent([payload.event], 'proposalsDiscussion', 'PostCreated', 1),
      this.getDataFromEvent([payload.event], 'proposalsDiscussion', 'PostCreated', 2),
      this.getDataFromEvent([payload.event], 'proposalsDiscussion', 'PostCreated', 3)
    ];

    const memberHandle = await this.getMemberHandleById(memberId?.toString() || '');

    const channelToUse = findDiscordChannel(this.client, channelNames[this.getProposalsChannelKey()])[0];
    channelToUse.send({
      embeds: [
        getPostCreatedEmbed(proposalId, memberHandle, content?.toString() || 'Empty Body')
      ],
    });
  }
}
