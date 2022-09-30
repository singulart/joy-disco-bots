import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TextChannel } from "discord.js";
import { EventWithBlock } from "src/types";
import { BaseEventHandler } from "./base-event.handler";
import { getBudgetSetEmbed } from "./embeds";
import { JoystreamUtility } from "mappings/generated/types";

@Injectable()
export class BudgetUpdatedHandler extends BaseEventHandler {
    private readonly logger = new Logger(BudgetUpdatedHandler.name);

  @OnEvent('*.UpdatedWorkingGroupBudget')
  async handleBudgetUpdatedEvent(payload: EventWithBlock) {
    let { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const typedEvent = new JoystreamUtility.UpdatedWorkingGroupBudgetEvent(data);
    const budgetChange = typedEvent.params[1].toNumber();
    const wg = typedEvent.params[0];
    console.log(wg.toHuman());
    let dynamicChannels: TextChannel[] = [];

    if (wg.isForum) {
      dynamicChannels = this.channels["forumWorkingGroup"];
    } else if (wg.isContent) {
      dynamicChannels = this.channels["contentWorkingGroup"];
    } else if (wg.isOperationsAlpha) {
      dynamicChannels = this.channels["operationsWorkingGroupAlpha"];
    } else if (wg.isMembership) {
      dynamicChannels = this.channels["membershipWorkingGroup"];
    } else if (wg.isOperationsBeta) {
      dynamicChannels = this.channels["operationsWorkingGroupBeta"];
    } else if (wg.isOperationsGamma) {
      dynamicChannels = this.channels["operationsWorkingGroupGamma"];
    } else if (wg.isStorage) {
      dynamicChannels = this.channels["storageWorkingGroup"];
    } else if (wg.isDistribution) {
      dynamicChannels = this.channels["distributionWorkingGroup"];
    } else if (wg.isGateway) {
      dynamicChannels = this.channels["gatewayWorkingGroup"];
    }
    if (!dynamicChannels || dynamicChannels.length == 0) {
      this.logger.warn(`Channel not configured for [${section}]`);
    } else {
      dynamicChannels.forEach((ch: TextChannel) =>
        ch.send({
          embeds: [
            getBudgetSetEmbed(budgetChange, payload.block, payload.event),
          ],
        }));
    }
  }
}