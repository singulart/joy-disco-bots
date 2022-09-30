import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TextChannel } from "discord.js";
import { EventWithBlock } from "src/types";
import { BaseEventHandler } from "./base-event.handler";
import { getBudgetSetEmbed } from "./embeds";
import { StorageWorkingGroup } from "mappings/generated/types";

@Injectable()
export class BudgetSetHandler extends BaseEventHandler {

  @OnEvent('*.BudgetSet')
  async handleBudgetSetEvent(payload: EventWithBlock) {
    let { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const balanceEvent = new StorageWorkingGroup.BudgetSetEvent(data);

    this.channels[section].forEach((ch: TextChannel) =>
      ch.send({
        embeds: [
          getBudgetSetEmbed(balanceEvent.params[0].toNumber(), payload.block, payload.event),
        ],
      }));
  }
}