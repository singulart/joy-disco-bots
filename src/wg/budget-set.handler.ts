import { Balance } from '@polkadot/types/interfaces';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TextChannel } from 'discord.js';
import { EventWithBlock } from 'src/types';
import { BaseEventHandler } from './base-event.handler';
import { getBudgetSetEmbed } from './embeds';

@Injectable()
export class BudgetSetHandler extends BaseEventHandler {

  @OnEvent('*.BudgetSet')
  async handleBudgetSetEvent(payload: EventWithBlock) {
    const { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const balance = (data[0] as Balance).toNumber();
    this.channels[section].forEach((ch: TextChannel) =>
      ch.send({
        embeds: [
          getBudgetSetEmbed(balance, payload.block, payload.event),
        ],
      }));
  }
}