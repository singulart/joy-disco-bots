import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { channelNames } from 'config';
import { EventWithBlock } from 'src/types';
import { findDiscordChannel } from 'src/util';
import { BaseEventHandler } from './base-event.handler';
import { getVotedEmbed } from './proposals-embeds';

@Injectable()
export class ProposalVotedHandler extends BaseEventHandler {

  @OnEvent('proposalsEngine.Voted')
  async handleProposalVotedEvent(payload: EventWithBlock) {

    const [voter, proposal, vote, rationale] = [
      this.getDataFromEvent([payload.event], 'proposalsEngine', 'Voted', 0),
      this.getDataFromEvent([payload.event], 'proposalsEngine', 'Voted', 1),
      this.getDataFromEvent([payload.event], 'proposalsEngine', 'Voted', 2),
      this.getDataFromEvent([payload.event], 'proposalsEngine', 'Voted', 3)
    ];

    const voterHandle = await this.getMemberHandleById(voter?.toString() || '');
    const voteEmoji = vote?.isApprove ? '👍🏻' : vote?.isReject ? '👎' : 'abstain';

    const channelToUse = findDiscordChannel(this.client, channelNames[this.getProposalsChannelKey()])[0];
    channelToUse.send({
      embeds: [
        getVotedEmbed(proposal, voterHandle, voteEmoji, rationale?.toString() || 'No Rationale')
      ],
    });
  }
}