import { CacheInterceptor, Injectable, Logger, UseInterceptors } from "@nestjs/common";
import { RetryablePioneerClient } from "src/gql/pioneer.client";


@Injectable()
@UseInterceptors(CacheInterceptor)
export class StorageNodeEndpointProvider {
  private readonly logger = new Logger(StorageNodeEndpointProvider.name);

  constructor(
    protected readonly pioneerClient: RetryablePioneerClient
  ) { }

  async getStorageNodeEndpoints(): Promise<string[]> {
    this.logger.debug("Loading storage node data from QN...");
    return await this.pioneerClient.getStorageNodes();
  }
}