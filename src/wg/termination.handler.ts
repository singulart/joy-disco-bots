import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TextChannel } from "discord.js";
import { StorageWorkingGroup } from "mappings/generated/types";
import { EventWithBlock } from "src/types";
import { BaseEventHandler } from "./base-event.handler";
import { getWorkerTerminatedEmbed } from "./embeds";

@Injectable()
export class TerminationHandler extends BaseEventHandler {

  @OnEvent('*.TerminatedWorker')
  async handleWorkerTerminationEvent(payload: EventWithBlock) {
    this.handle(payload);
  }

  @OnEvent('*.TerminatedLeader')
  async handleLeaderTerminationEvent(payload: EventWithBlock) {
    this.handle(payload);
  }

  async handle(payload: EventWithBlock) {
    let { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const typedEvent = new StorageWorkingGroup.TerminatedWorkerEvent(data);
    const terminatedId = typedEvent.params[0];
    const terminatedWorkerKey = `${section}-${terminatedId.toString()}`;
    const terminatedIdWorker = await this.queryNodeClient.workerById(terminatedWorkerKey);
    this.channels[section].forEach((ch: TextChannel) =>
      ch.send({
        embeds: [
          getWorkerTerminatedEmbed(
            terminatedIdWorker,
            payload.block,
            payload.event
          ),
        ],
      }));
  }
}