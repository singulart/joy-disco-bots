import { InjectDiscordClient } from "@discord-nestjs/core";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Client } from "discord.js";
import { Cron, CronExpression } from "@nestjs/schedule";
import { StorageNodeEndpointProvider } from "./endpoint.provider";
import { axiosConfig, channelNames, wgToRoleMap } from '../../config';
import { UnhealthyStorageProvider } from "src/db/unhealthy-storage.entity";
import { findDiscordChannel, findServerRole } from "src/util";
import { getFaultyNodesEmbed } from "./sp.embeds";
import axios from "axios";
import { ConfigService } from "@nestjs/config";

const SP_CHANNEL_KEY = "storageWorkingGroup";

@Injectable()
export class StorageProviderHealthChecker {
  private readonly logger = new Logger(StorageProviderHealthChecker.name);

  constructor(
    protected readonly endpointProvider: StorageNodeEndpointProvider,
    @InjectDiscordClient()
    protected readonly client: Client,
    @Inject('UNHEALTHY_STORAGE_PROVIDER_REPOSITORY')
    private readonly unhealthyStorageProviderRepository: typeof UnhealthyStorageProvider,
    private readonly configService: ConfigService
  ) { }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async reportFaultyNodes() {
    const badNodes = await this.unhealthyStorageProviderRepository.findAll();
    let badNodesSummaryList = '';
    badNodes.forEach(async (badNode: UnhealthyStorageProvider, index: number) => {
      badNodesSummaryList = badNodesSummaryList.concat(`${index + 1}. ${badNode.endpoint}\n`);
    });

    if(badNodes.length > 0) {
      const serverToCheck = this.configService.get('DISCORD_SERVER');
      const storageProvidersWorkingGroupRole = await findServerRole(this.client, serverToCheck, wgToRoleMap[SP_CHANNEL_KEY]);
      const channelToUse = findDiscordChannel(this.client, channelNames[SP_CHANNEL_KEY])[0];
      channelToUse.send({
        embeds: [
          getFaultyNodesEmbed(badNodesSummaryList, storageProvidersWorkingGroupRole)
        ],
      });
      this.logger.warn(`Reported ${badNodes.length} bad nodes`);
    }
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async registerFaultyNodes() {
    const endpoints = await this.endpointProvider.getStorageNodeEndpoints();
    endpoints.forEach(async (endpoint: string) => {
      try {
        const pingResponse = await axios.get(`${endpoint}api/v1/state/data`, axiosConfig);
        if(pingResponse.status !== 200) {
          this.logger.warn(`Node ${endpoint} health check failed. HTTP status: ${pingResponse.status}`);
          await this.storeFaultyNode(endpoint);
        } else {
          this.logger.debug(`Node ${endpoint} is healthy`);
          await this.unhealthyStorageProviderRepository.destroy({where: {endpoint: endpoint}});
        }
      } catch (e) {
        this.logger.warn(`Node ${endpoint} health check failed`, e);
        await this.storeFaultyNode(endpoint);
      }
    });
  }

  async storeFaultyNode(endpoint: string) {
    const exists = await this.unhealthyStorageProviderRepository.count({where: {endpoint: endpoint}});
    if(exists === 0) {
      this.unhealthyStorageProviderRepository.create({endpoint: endpoint});
    } else {
      this.logger.debug(`Node ${endpoint} already registered as faulty`);
    }
  }
}