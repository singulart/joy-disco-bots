import { Injectable } from "@nestjs/common";
import { RetryablePioneerClient } from "src/gql/pioneer.client";
import { ActiveCouncilMembersQuery } from "src/qntypes";

/**
 * Public service that other modules may want to use to get Council information
 */
 @Injectable()
 export class CouncilService {
 
   constructor(
      private readonly queryNodeClient: RetryablePioneerClient,
   ) { }

   async getDaoCouncilMembers(): Promise<ActiveCouncilMembersQuery> {
      return await this.queryNodeClient.activeCouncilMembers();
   }
}