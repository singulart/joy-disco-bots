import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TextChannel } from "discord.js";
import { EventWithBlock } from "src/types";
import { BaseEventHandler } from "./base-event.handler";
import { RewardPaymentType, WorkerId } from "@joystream/types/augment/all/types";
import { getWorkerRewardedEmbed } from "./embeds";
import { Balance } from "@joystream/types/common";

@Injectable()
export class RewardPaidHandler extends BaseEventHandler {

  @OnEvent('*.RewardPaid')
  async handleRewardPaidEvent(payload: EventWithBlock) {
    let { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const paidWorkerId = data[0] as WorkerId;
    const paidWorkerAffected = await this.queryNodeClient.workerById(`${section}-${paidWorkerId.toString()}`);
    const paidReward = data[2] as Balance;
    const isRewardMissed = (data[3] as RewardPaymentType).isMissedReward;
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