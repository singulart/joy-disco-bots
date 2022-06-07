import { Header } from '@polkadot/types/interfaces'
import {
  wsLocation, 
  forumCategoriesToChannels
} from "../../config";
import { DiscordChannels } from "../types";
import { ApiPromise } from "@polkadot/api";
import { getDiscordChannels } from "../util";
import { connectApi, getBlockHash, getEvents } from "../util";
import { banner } from "../banner";
import { Injectable, Logger } from "@nestjs/common";
import { InjectDiscordClient, Once } from "@discord-nestjs/core";
import { Client, TextChannel } from 'discord.js';
import { getSdk } from 'src/qntypes';
import { GraphQLClient } from 'graphql-request';
import { hydraLocation as queryNodeUrl } from "../../config";
import { EventRecord } from "@polkadot/types/interfaces";
// import { CategoryId } from '@joystream/types/forum';
import { PostId, ThreadId } from '@joystream/types/common';
import { getNewPostEmbed, getNewThreadEmbed } from './forum.embeds';


const queryNodeClient = getSdk(new GraphQLClient(queryNodeUrl));

@Injectable()
export class ForumService {
  private readonly logger = new Logger(ForumService.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client) { }

  @Once('ready')
  async onReady(): Promise<void> {
    this.logger.log(banner);
    this.logger.log(`Forum Bot online.`);
    const channels: DiscordChannels = await getDiscordChannels(this.client);


    const api: ApiPromise = await connectApi(wsLocation);
    await api.isReady;
    this.logger.log(`Forum Bot: connected to RPC endpoint [${wsLocation}]`);
    api.rpc.chain.subscribeFinalizedHeads(async (header: Header) => {
      const hash = await getBlockHash(api, +header.number);
      const events = await getEvents(api, hash);
      events.forEach(
        async (value: EventRecord) => {
          let { section, method, data } = value.event;
          if ( section !== 'forum') {
            return;
          }
          switch (method) {

            case "ThreadCreated":
              const threadId = data[0] as ThreadId;
              const thread = await queryNodeClient.forumThreadById({ threadId: threadId.toString() });
              const mappedChannels = forumCategoriesToChannels.find(
                (mapping: any) => mapping.category.id == thread.forumThreadByUniqueInput?.category.id || 0
              )?.channels;
              if(!mappedChannels) {
                this.logger.log('Mapped channels not found');
                break;
              }
              const serverChannels = channels.values.filter((ch: TextChannel) => mappedChannels.includes(ch.name));
              serverChannels.forEach((ch: TextChannel) =>
                ch.send({
                  embeds: [
                    getNewThreadEmbed(
                      thread,
                      +header.number,
                      value
                    ),
                  ],
                }));
              break;

            case "PostAdded":
              const postId = data[0] as PostId;
              const post = await queryNodeClient.postById({ postId: postId.toString() });
              const mappedChannels2 = forumCategoriesToChannels.find(
                (mapping: any) => mapping.category.id == post.forumPostByUniqueInput?.thread.category.id || 0
              )?.channels;
              if(!mappedChannels2) {
                this.logger.log('Mapped channels not found');
                break;
              }
              const serverChannels2 = channels.values.filter((ch: TextChannel) => mappedChannels2.includes(ch.name));
              serverChannels2.forEach((ch: TextChannel) =>
                ch.send({
                  embeds: [
                    getNewPostEmbed(
                      post,
                      +header.number,
                      value
                    ),
                  ],
                }));
              break;
          }
        })
    });
  }
}