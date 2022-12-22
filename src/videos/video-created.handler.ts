import { InjectDiscordClient, Once } from '@discord-nestjs/core';
import { Injectable, Logger, Optional } from '@nestjs/common';
import { Client } from 'discord.js';
import { EventWithBlock } from 'src/types';
import { OnEvent } from '@nestjs/event-emitter';
import { VideoId } from '@joystream/types/primitives';
import { RetryableAtlasClient } from 'src/gql/atlas.client';
import { GetDistributionBucketsWithOperatorsQuery, GetVideoByIdQuery } from 'src/qntypes-atlas';
import { getVideoEmbed } from './video.embeds';
import { findDiscordChannel } from 'src/util';
import { channelNames } from '../../config';

const VIDEOS_CHANNEL_KEY = 'videos';

@Injectable()
export class VideoCreatedHandler {
  private readonly logger = new Logger(VideoCreatedHandler.name);

  constructor(
    protected readonly atlasClient: RetryableAtlasClient,
    @InjectDiscordClient()
    protected readonly client: Client,
    @Optional()
    protected distributionBuckets: GetDistributionBucketsWithOperatorsQuery
  ) 
  { }

  @Once('ready')
  async onReady(): Promise<void> {
    // this.distributionBuckets = await this.atlasClient.getDistributionBucketsWithOperators();
  }

  @OnEvent('*.VideoCreated')
  async handleVideoCreatedEvent(payload: EventWithBlock) {
    const { data } = payload.event.event;
    const videoId = (data[2] as VideoId).toString();
    this.logger.debug(videoId);

    let videoQueryNodeResponse: GetVideoByIdQuery | null  =  null;
    try {
      videoQueryNodeResponse = await this.atlasClient.getVideoById(videoId);
      if(!videoQueryNodeResponse) {
        throw new Error();
      }
    } catch (error) {
      this.logger.warn(`Unable to read video ${videoId} from QN`);
      return;
    }
    this.logger.debug(videoQueryNodeResponse.videoByUniqueInput?.title);
    const bag = videoQueryNodeResponse.videoByUniqueInput?.media?.storageBag.id;
    const cdnUrl = this.getDistributorUrl(bag || ' ');
    if(cdnUrl) {
      const channelToUse = findDiscordChannel(this.client, channelNames[VIDEOS_CHANNEL_KEY])[0];
      channelToUse.send({
        embeds: [
          getVideoEmbed(videoQueryNodeResponse, cdnUrl),
        ],
      });
    }
  }

  getDistributorUrl(bagId: string) {
    this.logger.debug(`Looking for an CDN operator for bag ${bagId}`);
    const bucket = this.distributionBuckets.distributionBuckets.find((bucket) => bucket.bags.find((bag) => bag.id === bagId));
    if(bucket) {
      this.logger.debug(`Bucket found ${bucket.id} operated by ${bucket.operators.length} nodes`);
      return `${bucket.operators[0].metadata?.nodeEndpoint}api/v1/assets`; 
    } else {
      this.logger.warn(`No data found`);
      return null;
    }
  }
}