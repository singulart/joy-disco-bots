import { Inject, Injectable, Logger } from "@nestjs/common";
import { globalRetryConfig } from "config";
import { GetStorageNodesQuery, Sdk } from "src/qntypes";
import { Retryable } from 'typescript-retry-decorator';


/**
 * Decorator around the autogenerated `Sdk` that enables retry mechanism for Query Node calls
 */
@Injectable()
export class RetryablePioneerClient {
  private readonly logger = new Logger(RetryablePioneerClient.name);

  constructor(
    @Inject("PioneerGqlSdk") private readonly pioneerApi: Sdk,
  ) { }

  @Retryable(globalRetryConfig)
  async activeCouncilMembers() {
    this.logger.debug('Fetching CMs...');
    const cms = await this.pioneerApi.activeCouncilMembers();
    if(!cms.electedCouncils || cms.electedCouncils.length === 0) {
      throw new Error();
    }
    return cms;
  }

  @Retryable(globalRetryConfig)
  async postById(id: string) {
    this.logger.debug(`Fetching post [${id}]...`);
    const post = await this.pioneerApi.postById({postId: id});
    if(!post.forumPostByUniqueInput) {
      throw new Error();
    }
    return post;
  }

  @Retryable(globalRetryConfig)
  async forumThreadById(id: string) {
    this.logger.debug(`Fetching thread[${id}]...`);
    const thread = await this.pioneerApi.forumThreadById({threadId: id});
    if(!thread.forumThreadByUniqueInput) {
      throw new Error();
    }
    return thread;
  }

  @Retryable(globalRetryConfig)
  async memberByHandle(handle: string) {
    this.logger.debug(`Fetching member[${handle}]...`);
    const member = await this.pioneerApi.memberByHandle({handle: handle});
    if(!member.memberships || member.memberships.length === 0) {
      throw new Error();
    }
    return member;
  }

  @Retryable(globalRetryConfig)
  async workersByAccount(account: string) {
    this.logger.debug(`Fetching worker[${account}]...`);
    const members = await this.pioneerApi.workersByAccount({account: account});
    if(!members.workers || members.workers.length === 0) {
      throw new Error();
    }
    return members;
  }

  @Retryable(globalRetryConfig)
  async applicationById(applicationId: string) {
    this.logger.debug(`Fetching application[${applicationId}]...`);
    const application = await this.pioneerApi.applicationById({applicationId: applicationId});
    if(!application.workingGroupApplicationByUniqueInput) {
      throw new Error();
    }
    return application;
  }

  @Retryable(globalRetryConfig)
  async workerById(workerId: string) {
    this.logger.debug(`Fetching worker[${workerId}]...`);
    const worker = await this.pioneerApi.workerById({workerId: workerId});
    if(!worker.workerByUniqueInput) {
      throw new Error();
    }
    return worker;
  }

  @Retryable(globalRetryConfig)
  async memberById(memberId: string) {
    this.logger.debug(`Fetching member[${memberId}]...`);
    const member = await this.pioneerApi.memberById({memberId: memberId});
    if(!member.memberships || member.memberships.length === 0) {
      throw new Error();
    }
    return member;
  }

  @Retryable(globalRetryConfig)
  async openingById(openingId: string) {
    this.logger.debug(`Fetching opening[${openingId}]...`);
    const opening = await this.pioneerApi.openingById({openingId: openingId});
    if(!opening.workingGroupOpeningByUniqueInput) {
      throw new Error();
    }
    return opening;
  }

  @Retryable(globalRetryConfig)
  async getStorageNodes(): Promise<string[]> {
    this.logger.debug(`Fetching storage nodes`);
    const nodes: GetStorageNodesQuery = await this.pioneerApi.getStorageNodes();
    if(!nodes.storageBuckets) {
      throw new Error();
    }
    return nodes.storageBuckets.map((n) => n.operatorMetadata?.nodeEndpoint as string);
  }
}