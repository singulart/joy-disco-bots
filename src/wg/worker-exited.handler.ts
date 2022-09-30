import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TextChannel } from "discord.js";
import { StorageWorkingGroup } from "mappings/generated/types";
import { EventWithBlock } from "src/types";
import { BaseEventHandler } from "./base-event.handler";
import { getWorkerExitedEmbed } from "./embeds";

@Injectable()
export class WorkerExitedHandler extends BaseEventHandler {
  private readonly logger = new Logger(WorkerExitedHandler.name);

  @OnEvent('*.WorkerExited')
  async handleWorkerExitedEvent(payload: EventWithBlock) {
    let { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const typedEvent = new StorageWorkingGroup.WorkerExitedEvent(data);
    const exitedId = typedEvent.params[0];
    const exitedWorkerKey = `${section}-${exitedId.toString()}`;
    this.logger.debug(exitedWorkerKey);

    const exitedMember = await this.queryNodeClient.workerById(exitedWorkerKey);
    this.channels[section].forEach((ch: TextChannel) =>
      ch.send({
        embeds: [
          getWorkerExitedEmbed(
            exitedMember,
            payload.block,
            payload.event
          ),
        ],
      }));
  }
}