import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { RetryablePioneerClient } from 'src/gql/pioneer.client';
import { Cache } from 'cache-manager';
import { MembersByHandlesQuery } from 'src/qntypes';
import {createHash as hash} from 'crypto';

@Injectable()
export class CacheableMembershipsProvider {
  private readonly logger = new Logger(CacheableMembershipsProvider.name);

  constructor(
    protected readonly pioneerClient: RetryablePioneerClient,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async getMembers(handles: string[]): Promise<MembersByHandlesQuery> {
    const cacheKey = this.buildCacheKey(handles);
    const cached: MembersByHandlesQuery | undefined = await this.cacheManager.get(cacheKey);
    if (cached) { // hit 
      return cached;
    } else { // miss
      this.logger.debug('Cache miss');
      const qnResult = await this.pioneerClient.membersByHandles(handles);
      this.cacheManager.set(cacheKey, qnResult);
      return qnResult;
    }
  }
  
  buildCacheKey(handles: string[]): string {
    return hash('sha1').update(handles.join(',')).digest('hex');
  }
}