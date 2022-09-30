import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TextChannel } from "discord.js";
import { StorageWorkingGroup } from "mappings/generated/types";
import { EventWithBlock } from "src/types";
import { BaseEventHandler } from "./base-event.handler";
import { getStakeUpdatedEmbed } from "./embeds";

@Injectable()
export class StakeHandler extends BaseEventHandler {
  
  @OnEvent('*.StakeIncreased')
  async handleIncrease(payload: EventWithBlock) {
    await this.handle(payload);
  }

  @OnEvent('*.StakeDecreased')
  async handleDecrease(payload: EventWithBlock) {
    await this.handle(payload);
  }

  @OnEvent('*.StakeSlashed')
  async handleSlash(payload: EventWithBlock) {
    await this.handle(payload);
  }

  async handle(payload: EventWithBlock) {
    let { section, method, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const typedEvent = new StorageWorkingGroup.StakeDecreasedEvent(data);
    const stakeWorkerId = typedEvent.params[0];
    const stakeWorker = await this.queryNodeClient.workerById(`${section}-${stakeWorkerId.toString()}`);
    const stake = typedEvent.params[1];

    this.channels[section].forEach((ch: TextChannel) =>
      ch.send({
        embeds: [
          getStakeUpdatedEmbed(
            stake,
            stakeWorker,
            method.replace("Stake", ""),
            payload.block,
            payload.event
          ),
        ],
      }));
  }
}