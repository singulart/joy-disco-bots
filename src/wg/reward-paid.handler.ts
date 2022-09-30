import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TextChannel } from "discord.js";
import { EventWithBlock } from "src/types";
import { BaseEventHandler } from "./base-event.handler";
import { getWorkerRewardedEmbed } from "./embeds";
import { StorageWorkingGroup } from "mappings/generated/types";

@Injectable()
export class RewardPaidHandler extends BaseEventHandler {

  @OnEvent('*.RewardPaid')
  async handleRewardPaidEvent(payload: EventWithBlock) {
    let { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const typedEvent = new StorageWorkingGroup.RewardPaidEvent(data);
    const paidWorkerId = typedEvent.params[0];
    const paidWorkerAffected = await this.queryNodeClient.workerById(`${section}-${paidWorkerId.toString()}`);
    const paidReward = typedEvent.params[2];
    const isRewardMissed = typedEvent.params[3].isMissedReward;
    this.channels[section].forEach((ch: TextChannel) =>
      ch.send({
        embeds: [
          getWorkerRewardedEmbed(
            paidReward,
            paidWorkerAffected,
            isRewardMissed,
            payload.block,
            payload.event
          ),
        ],
      }));
  }
}