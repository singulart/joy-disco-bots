import { InjectDiscordClient, Once } from "@discord-nestjs/core";
import { Injectable, Logger, Optional } from "@nestjs/common";
import { Client, TextChannel } from "discord.js";
import { DiscordChannels } from "src/types";
import { forumCategoriesToChannels } from "config";
import { getDiscordChannels } from "src/util";
import { RetryableGraphQLClient } from "src/gql/graphql.client";

@Injectable()
export abstract class BaseEventHandler {

  constructor(
    protected readonly queryNodeClient: RetryableGraphQLClient,
    @InjectDiscordClient()
    protected readonly client: Client,
    @Optional()
    protected channels: DiscordChannels) {
  }

  @Once('ready')
  async onReady(): Promise<void> {
    this.channels = await getDiscordChannels(this.client);
  }

  findChannelsByCategoryId(categoryId: string, parentCategoryId: string, channels: DiscordChannels): TextChannel[] | null {
    const mappedChannels = forumCategoriesToChannels.find(
      (mapping: any) => mapping.category.id == categoryId || mapping.category.id == parentCategoryId
    )?.channels;
    if (!mappedChannels) {
      this.getLogger().log(`Mapped channels not found for categoryId=${categoryId}, parentCategory=${parentCategoryId}`);
      return null;
    }
    let oneD = [] as TextChannel[];
    for (let row of Object.values(channels)) for (let e of row) oneD.push(e);
    return oneD.filter((ch: TextChannel) => mappedChannels.includes(ch.name));
  }

  abstract getLogger(): Logger;
}