import { Injectable} from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TextChannel } from "discord.js";
import { StorageWorkingGroup } from "mappings/generated/types";
import { EventWithBlock } from "src/types";
import { BaseEventHandler } from "./base-event.handler";
import { getDiscretionarySpendingEmbed, getDiscretionarySpendingToNonWorkerAddressEmbed } from "./embeds";

@Injectable()
export class BudgetSpendingHandler extends BaseEventHandler {

  @OnEvent('*.BudgetSpending')
  async handleBudgetSpendingEvent(payload: EventWithBlock) {
    let { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const typedEvent = new StorageWorkingGroup.BudgetSpendingEvent(data);
    const payee = typedEvent.params[0].toString();
    const spendingAmount = typedEvent.params[1];
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