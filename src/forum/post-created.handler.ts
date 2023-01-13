import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TextChannel } from "discord.js";
import { getNewPostEmbed } from "./forum.embeds";
import { PostByIdQuery } from "src/qntypes";
import { DiscordChannels, EventWithBlock } from "src/types";
import { BaseEventHandler } from "./base.event.handler";
import { ForumPostId } from "@joystream/types/primitives";

@Injectable()
export class PostCreatedHandler extends BaseEventHandler {
  private readonly logger = new Logger(PostCreatedHandler.name);

  @OnEvent('forum.PostAdded')
  async handlePostCreatedEvent(payload: EventWithBlock) {
    const { data } = payload.event.event;
    const postId = data[0] as ForumPostId;
    const post = await this.queryNodeClient.postById(postId.toString());
    const serverChannels = this.findChannelsByPost(post, this.channels);
    serverChannels?.forEach((ch: TextChannel) => {
      this.logger.debug(`Sending to channel [${ch.id.toString()}] [${ch.name}]`);
      ch.send({
        embeds: [
          getNewPostEmbed(
            post,
            payload.block,
            payload.event
          ),
        ],
      });
    });
  }

  findChannelsByPost(post: PostByIdQuery, channels: DiscordChannels): TextChannel[] | null {
    return this.findChannelsByCategoryId(
      post.forumPostByUniqueInput?.thread.category.id || '',
      post.forumPostByUniqueInput?.thread.category.parentId || '',
      channels);
  }

  getLogger(): Logger {
    return this.logger
  }
}