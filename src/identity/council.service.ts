import { Injectable, Logger } from "@nestjs/common";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "src/qntypes";
import { hydraLocation as queryNodeUrl } from "../../config";

/**
 * Cron-based syncing of Joystream on-chain roles with Discord server roles.
 * On-chain roles are fetched from Query node for all Discord users who claimed their Joystream memberships.
 */
 @Injectable()
 export class CouncilService {
   private readonly logger = new Logger(CouncilService.name);
 
   constructor(
   ) { }

   async fetchCurrentCouncilMembers() {
      this.logger.debug('Fetching CMs from Query node...');
      const queryNodeClient = getSdk(new GraphQLClient(queryNodeUrl));
      return await queryNodeClient.activeCouncilMembers();
   }
}