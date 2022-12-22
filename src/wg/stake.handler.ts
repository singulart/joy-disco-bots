import { Balance } from '@polkadot/types/interfaces';
import { WorkerId } from '@joystream/types/primitives';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TextChannel } from 'discord.js';
import { EventWithBlock } from 'src/types';
import { BaseEventHandler } from './base-event.handler';
import { getStakeUpdatedEmbed } from './embeds';

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
    const { section, method, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const stakeWorkerId = data[0] as WorkerId;
    const stakeWorker = await this.queryNodeClient.workerById(`${section}-${stakeWorkerId.toString()}`);
    const stake = data[1] as Balance;

    this.channels[section].forEach((ch: TextChannel) =>
      ch.send({
        embeds: [
          getStakeUpdatedEmbed(
            stake,
            stakeWorker,
            method.replace('Stake', ''),
            payload.block,
            payload.event
          ),
        ],
      }));
  }
}