import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { channelNames } from 'config';
import { EventWithBlock } from 'src/types';
import { findDiscordChannel } from 'src/util';
import { BaseEventHandler } from './base-event.handler';
import { getProposalDecidedEmbed } from './proposals-embeds';

@Injectable()
export class ProposalDecisionMadeHandler extends BaseEventHandler {

  @OnEvent('proposalsEngine.ProposalDecisionMade')
  async handleProposalDecisionMadeEvent(payload: EventWithBlock) {

    const [proposalId, decision] = [
      this.getDataFromEvent([payload.event], 'proposalsEngine', 'ProposalDecisionMade', 0),
      this.getDataFromEvent([payload.event], 'proposalsEngine', 'ProposalDecisionMade', 1)
    ];

    const channelToUse = findDiscordChannel(this.client, channelNames[this.getProposalsChannelKey()])[0];
    channelToUse.send({
      embeds: [
        getProposalDecidedEmbed(proposalId, decision?.toString() || 'Status Unknown')
      ],
    });
  }
}