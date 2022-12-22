import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TextChannel } from 'discord.js';
import { EventWithBlock } from 'src/types';
import { BaseEventHandler } from './base-event.handler';
import { WorkerId } from '@joystream/types/primitives';
import { getWorkerRewardedEmbed } from './embeds';
import { Balance } from '@polkadot/types/interfaces';
import { PalletWorkingGroupRewardPaymentType } from '@polkadot/types/lookup';

@Injectable()
export class RewardPaidHandler extends BaseEventHandler {

  @OnEvent('*.RewardPaid')
  async handleRewardPaidEvent(payload: EventWithBlock) {
    const { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const paidWorkerId = data[0] as WorkerId;
    const paidWorkerAffected = await this.queryNodeClient.workerById(`${section}-${paidWorkerId.toString()}`);
    const paidReward = data[2] as Balance;
    const isRewardMissed = (data[3] as PalletWorkingGroupRewardPaymentType).isMissedReward;
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