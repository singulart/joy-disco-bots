import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TextChannel } from "discord.js";
import { ThreadId } from "@joystream/types/common";
import { getNewThreadEmbed } from "./forum.embeds";
import { ForumThreadByIdQuery } from "src/qntypes";
import { DiscordChannels, EventWithBlock } from "src/types";
import { BaseEventHandler } from "./base.event.handler";

@Injectable()
export class ThreadCreatedHandler extends BaseEventHandler {
  private readonly logger = new Logger(ThreadCreatedHandler.name);

  @OnEvent('forum.ThreadCreated')
  async handleOrderCreatedEvent(payload: EventWithBlock) {
    let { data } = payload.event.event;
    const threadId = data[1] as ThreadId;
    const thread = await this.queryNodeClient.forumThreadById(threadId.toString());
    const serverChannels = this.findChannelsByThread(thread, this.channels);
    serverChannels?.forEach((ch: TextChannel) => {
      this.logger.debug(`Sending to channel [${ch.id.toString()}] [${ch.name}]`);
      ch.send({
        embeds: [
          getNewThreadEmbed(
            thread,
            payload.block,
            payload.event
          ),
        ],
      })
    });
  }

  findChannelsByThread(thread: ForumThreadByIdQuery, channels: DiscordChannels): TextChannel[] | null {
    return this.findChannelsByCategoryId(
      thread.forumThreadByUniqueInput?.category.id || '', 
      thread.forumThreadByUniqueInput?.category.parentId || '', 
      channels);
  }

  getLogger(): Logger {
    return this.logger
  }
}