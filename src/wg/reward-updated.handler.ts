import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TextChannel } from "discord.js";
import { EventWithBlock } from "src/types";
import { BaseEventHandler } from "./base-event.handler";
import { getWorkerRewardAmountUpdatedEmbed } from "./embeds";
import { StorageWorkingGroup } from "mappings/generated/types";
import { u128 } from "@polkadot/types";

// import BN from "bn.js";

@Injectable()
export class RewardUpdatedHandler extends BaseEventHandler {

  @OnEvent('*.WorkerRewardAmountUpdated')
  async handleRewardUpdatedEvent(payload: EventWithBlock) {
    let { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const typedEvent = new StorageWorkingGroup.WorkerRewardAmountUpdatedEvent(data);
    const workerId = typedEvent.params[0];
    const workerAffected = await this.queryNodeClient.workerById(`${section}-${workerId.toString()}`);
    const reward = typedEvent.params[1].unwrapOr(0 as u128);
    this.channels[section].forEach((ch: TextChannel) =>
      ch.send({
        embeds: [
          getWorkerRewardAmountUpdatedEmbed(
            reward,
            workerAffected,
            payload.block,
            payload.event
          ),
        ],
      }));
  }
}