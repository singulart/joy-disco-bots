import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
// import { channelNames } from "config";
import { EventWithBlock } from "src/types";
// import { findDiscordChannel } from "src/util";
import { BaseEventHandler } from "./base-event.handler";

@Injectable()
export class ProposalCreatedHandler extends BaseEventHandler {

  @OnEvent('proposalsCodex.ProposalCreated')
  async handleProposalCreatedEvent(payload: EventWithBlock) {
    //new ProposalCreatedEvent(payload.event.event);
    // let { data } = payload.event.event;
    // const id = (data[0] as ProposalId).toString();
    // const generalInformation = (data[1] as unknown as IGeneralProposalParameters);
    // const details = (data[2] as ProposalDetailsOf);

    // const channelToUse = findDiscordChannel(this.client, channelNames[this.getProposalsChannelKey()])[0];
    // channelToUse.send({
    //   embeds: [
    //     getVideoEmbed(videoQueryNodeResponse, cdnUrl),
    //   ],
    // });

  }
}