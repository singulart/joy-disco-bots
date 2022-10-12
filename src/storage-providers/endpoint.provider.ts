import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { RetryablePioneerClient } from 'src/gql/pioneer.client';
import { Cache } from 'cache-manager';

const CACHE_KEY = 'sp-nodes-key';

@Injectable()
export class StorageNodeEndpointProvider {
  private readonly logger = new Logger(StorageNodeEndpointProvider.name);

  constructor(
    protected readonly pioneerClient: RetryablePioneerClient,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async getStorageNodeEndpoints(): Promise<string[]> {
    const cached: string[] | undefined = await this.cacheManager.get(CACHE_KEY);
    if (cached) { // hit 
      return cached; 
    } else { // miss
      this.logger.debug('Loading storage node data from QN...');
      const qnResult = await this.pioneerClient.getStorageNodes();
      const endpoints = qnResult.storageBuckets.map((n) => n.operatorMetadata?.nodeEndpoint as string);
      this.cacheManager.set(CACHE_KEY, endpoints);
      return endpoints;
    }
  }
}