import { Injectable } from "@nestjs/common";
import { RetryableGraphQLClient } from "src/gql/graphql.client";

/**
 * Public service that other modules may want to use to get Council information
 */
 @Injectable()
 export class CouncilService {
 
   constructor(
      private readonly queryNodeClient: RetryableGraphQLClient,
   ) { }

   async fetchCurrentCouncilMembers() {
      return await this.queryNodeClient.activeCouncilMembers();
   }
}