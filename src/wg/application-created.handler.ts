import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TextChannel } from "discord.js";
import { StorageWorkingGroup } from "mappings/generated/types";
import { EventWithBlock } from "src/types";
import { BaseEventHandler } from "./base-event.handler";
import { getAppliedOnOpeningEmbed } from "./embeds";

@Injectable()
export class ApplicationCreatedHandler extends BaseEventHandler {

  @OnEvent('*.AppliedOnOpening')
  async handleApplicationCreatedEvent(payload: EventWithBlock) {
    let { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const applied = new StorageWorkingGroup.AppliedOnOpeningEvent(data);
    const applicationOpeningId = applied.params[0].openingId;
    const applicantId = applied.params[0].memberId;
    const applicationId = applied.params[1];
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