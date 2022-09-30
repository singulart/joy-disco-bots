import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TextChannel } from "discord.js";
import { EventWithBlock } from "src/types";
import { BaseEventHandler } from "./base-event.handler";
import { getOpeningFilledEmbed } from "./embeds";
import { StorageWorkingGroup } from "mappings/generated/types";
import { u64 } from "@polkadot/types";

@Injectable()
export class OpeningFilledHandler extends BaseEventHandler {

  @OnEvent('*.OpeningFilled')
  async handleOpeningFilledEvent(payload: EventWithBlock) {
    let { section, data } = payload.event.event;
    if (!this.checkChannel(section)) {
      return;
    }
    const typedEvent = new StorageWorkingGroup.OpeningFilledEvent(data);
    const filledOpeningId = typedEvent.params[0];
    const filledOpeningObject = await this.queryNodeClient.openingById(`${section}-${filledOpeningId.toString()}`);
    const hiredWorkers = Object.values<u64>(JSON.parse(typedEvent.params[2].toString()));

    hiredWorkers.map(async (id, index, values) => {
      const hiredWorker = await this.queryNodeClient.workerById(`${section}-${id.toString()}`);
      this.channels[section].forEach((ch: TextChannel) =>
        ch.send({
          embeds: [
            getOpeningFilledEmbed(
              filledOpeningObject,
              hiredWorker,
              payload.block,
              payload.event
            ),
          ],
        }));
    });
  }
}