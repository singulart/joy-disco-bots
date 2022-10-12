
import { createType } from '@joystream/types';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { channelNames } from 'config';
import { EventWithBlock } from 'src/types';
import { findDiscordChannel } from 'src/util';
import { BaseEventHandler } from './base-event.handler';
import { getPostUpdatedEmbed } from './proposals-embeds';

@Injectable()
export class ProposalPostUpdatedHandler extends BaseEventHandler {

  @OnEvent('proposalsDiscussion.PostUpdated')
  async handleProposalPostUpdatedEvent(payload: EventWithBlock) {

    const [postId, memberId, proposalId] = [
      this.getDataFromEvent([payload.event], 'proposalsDiscussion', 'PostUpdated', 0),
      this.getDataFromEvent([payload.event], 'proposalsDiscussion', 'PostUpdated', 1),
      this.getDataFromEvent([payload.event], 'proposalsDiscussion', 'PostUpdated', 2)
    ];

    const memberHandle = await this.getMemberHandleById(memberId?.toString() || '');

    const channelToUse = findDiscordChannel(this.client, channelNames[this.getProposalsChannelKey()])[0];
    channelToUse.send({
      embeds: [
        getPostUpdatedEmbed(proposalId, memberHandle, postId || createType('u64', 0))
      ],
    });
  }
}
