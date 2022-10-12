
import { createType } from '@joystream/types';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { channelNames } from 'config';
import { EventWithBlock } from 'src/types';
import { findDiscordChannel } from 'src/util';
import { BaseEventHandler } from './base-event.handler';
import { getPostDeletedEmbed } from './proposals-embeds';

@Injectable()
export class ProposalPostDeletedHandler extends BaseEventHandler {

  @OnEvent('proposalsDiscussion.PostDeleted')
  async handleProposalPostDeletedEvent(payload: EventWithBlock) {

    const [memberId, proposalId, postId] = [
      this.getDataFromEvent([payload.event], 'proposalsDiscussion', 'PostDeleted', 0),
      this.getDataFromEvent([payload.event], 'proposalsDiscussion', 'PostDeleted', 1),
      this.getDataFromEvent([payload.event], 'proposalsDiscussion', 'PostDeleted', 2)
    ];

    const memberHandle = await this.getMemberHandleById(memberId?.toString() || '');

    const channelToUse = findDiscordChannel(this.client, channelNames[this.getProposalsChannelKey()])[0];
    channelToUse.send({
      embeds: [
        getPostDeletedEmbed(proposalId, memberHandle, postId || createType('u64', 0))
      ],
    });
  }
}
