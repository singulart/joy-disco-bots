import { Balance } from '@polkadot/types/interfaces';
import { Injectable} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TextChannel } from 'discord.js';
import { EventWithBlock } from 'src/types';
import { BaseEventHandler } from './base-event.handler';
import { getDiscretionarySpendingEmbed, getDiscretionarySpendingToNonWorkerAddressEmbed } from './embeds';

@Injectable()
export class BudgetSpendingHandler extends BaseEventHandler {

  @OnEvent('*.BudgetSpending')
  async handleBudgetSpendingEvent(payload: EventWithBlock) {
    const { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const payee = data[0].toString();
    const spendingAmount = data[1] as Balance
    try {
      const payeeWorker = await this.queryNodeClient.workersByAccount(payee);
      this.channels[section].forEach((ch: TextChannel) =>
        ch.send({
          embeds: [
            getDiscretionarySpendingEmbed(spendingAmount, payeeWorker, payload.block, payload.event),
          ],
        }));
    } catch(e) {
      this.channels[section].forEach((ch: TextChannel) =>
        ch.send({
          embeds: [
            getDiscretionarySpendingToNonWorkerAddressEmbed(spendingAmount, payee, payload.block, payload.event),
          ],
        }));      
    }
  }
}