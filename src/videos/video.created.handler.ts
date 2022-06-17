import { InjectDiscordClient } from "@discord-nestjs/core";
import { Injectable, Optional } from "@nestjs/common";
import { Client } from "discord.js";
import { DiscordChannels, EventWithBlock } from "src/types";
// import { getDiscordChannels } from "src/util";
import { OnEvent } from "@nestjs/event-emitter";
import { VideoId } from "@joystream/types/content";
import { RetryableAtlasClient } from "src/gql/atlas.client";

@Injectable()
export class VideoCreatedHandler {

  constructor(
    protected readonly queryNodeClient: RetryableAtlasClient,
    @InjectDiscordClient()
    protected readonly client: Client,
    @Optional()
    protected channels: DiscordChannels) {
  }

  // @Once('ready')
  // async onReady(): Promise<void> {
  //   this.channels = await getDiscordChannels(this.client);
  // }

  // protected checkChannel(section: string): boolean {
  //   if (!this.channels[section] && section !== "joystreamUtility") {
  //     console.log(`Channel not configured for [${section}]`);
  //     return false;
  //   }
  //   return true;
  // }

  @OnEvent('*.VideoCreated')
  async handleVideoCreatedEvent(payload: EventWithBlock) {
    let { data } = payload.event.event;
    const videoId = (data[2] as VideoId).toString();
    console.log(videoId);
    const video = await this.queryNodeClient.getVideoById(videoId);
    console.log(video.videoByUniqueInput?.title);
    // if (!this.checkChannel(section)) {
    //   return;
    // }
    // const balance = (data[0] as Balance).toNumber();
    // this.channels[section].forEach((ch: TextChannel) =>
    //   ch.send({
    //     embeds: [
    //       getBudgetSetEmbed(balance, payload.block, payload.event),
    //     ],
    //   }));
  }
}