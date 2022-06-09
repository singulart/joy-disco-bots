import { Header } from '@polkadot/types/interfaces'
import {
  wsLocation, 
  forumCategoriesToChannels
} from "../../config";
import { DiscordChannels } from "../types";
import { ApiPromise } from "@polkadot/api";
import { getDiscordChannels } from "../util";
import { connectApi, getBlockHash, getEvents } from "../util";
import { Injectable, Logger } from "@nestjs/common";
import { InjectDiscordClient, Once } from "@discord-nestjs/core";
import { Client, TextChannel } from 'discord.js';
import { ForumThreadByIdQuery, PostByIdQuery } from 'src/qntypes';
import { EventRecord } from "@polkadot/types/interfaces";
// import { CategoryId } from '@joystream/types/forum';
import { PostId, ThreadId } from '@joystream/types/common';
import { getNewPostEmbed, getNewThreadEmbed } from './forum.embeds';
import { RetryableGraphQLClient } from 'src/gql/graphql.client';


@Injectable()
export class ForumService {
  private readonly logger = new Logger(ForumService.name);

  constructor(
    private readonly queryNodeClient: RetryableGraphQLClient,
    @InjectDiscordClient()
    private readonly client: Client) { }

  @Once('ready')
  async onReady(): Promise<void> {
    this.logger.log(`Forum Bot online.`);
    const channels: DiscordChannels = await getDiscordChannels(this.client);

    const api: ApiPromise = await connectApi(wsLocation);
    await api.isReady;
    this.logger.log(`Forum Bot: connected to RPC endpoint [${wsLocation}]`);
    api.rpc.chain.subscribeFinalizedHeads(async (header: Header) => {
      const hash = await getBlockHash(api, +header.number);
      const events = await getEvents(api, hash);
      events.forEach(
        async (eventRecord: EventRecord) => {
          let { section, method, data } = eventRecord.event;
          if ( section !== 'forum') {
            return;
          }
          switch (method) {

            case "ThreadCreated":
              const threadId = data[1] as ThreadId;
              const thread = await this.queryNodeClient.forumThreadById(threadId.toString());
              const serverChannels = this.findChannelsByThread(thread, channels);
              serverChannels?.forEach((ch: TextChannel) =>
                ch.send({
                  embeds: [
                    getNewThreadEmbed(
                      thread,
                      +header.number,
                      eventRecord
                    ),
                  ],
                }));
              break;

            case "PostAdded":
              const postId = data[0] as PostId;
              const post = await this.queryNodeClient.postById(postId.toString());
              const serverChannels2 = this.findChannelsByPost(post, channels);
              serverChannels2?.forEach((ch: TextChannel) =>
                ch.send({
                  embeds: [
                    getNewPostEmbed(
                      post,
                      +header.number,
                      eventRecord
                    ),
                  ],
                }));
              break;
          }
        })
    });
  }

  findChannelsByThread(thread: ForumThreadByIdQuery, channels: DiscordChannels): TextChannel[] | null {
    return this.findChannelsByCategoryId(
      thread.forumThreadByUniqueInput?.category.id || '', 
      thread.forumThreadByUniqueInput?.category.parentId || '', 
      channels);
  }

  findChannelsByPost(post: PostByIdQuery, channels: DiscordChannels): TextChannel[] | null {
    return this.findChannelsByCategoryId(
      post.forumPostByUniqueInput?.thread.category.id || '', 
      post.forumPostByUniqueInput?.thread.category.parentId || '', 
      channels);
  }

  findChannelsByCategoryId(categoryId: string, parentCategoryId: string, channels: DiscordChannels): TextChannel[] | null {
    const mappedChannels = forumCategoriesToChannels.find(
      (mapping: any) => mapping.category.id == categoryId || mapping.category.id == parentCategoryId
    )?.channels;
    if(!mappedChannels) {
      this.logger.log(`Mapped channels not found for categoryId=${categoryId}, parentCategory=${parentCategoryId}`);
      return null;
    }
    let oneD = [] as TextChannel[];
    for (let row of Object.values(channels)) for (let e of row) oneD.push(e);
    return oneD.filter((ch: TextChannel) => mappedChannels.includes(ch.name));
  }
}