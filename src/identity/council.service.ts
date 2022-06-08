import { Inject, Injectable, Logger } from "@nestjs/common";
import { Sdk } from "src/qntypes";

/**
 * Public service that other modules may want to use to get Council information
 */
 @Injectable()
 export class CouncilService {
   private readonly logger = new Logger(CouncilService.name);
 
   constructor(
      @Inject("JoystreamGqlSdk") private readonly queryNodeClient: Sdk,
   ) { }

   async fetchCurrentCouncilMembers() {
      this.logger.debug('Fetching CMs from Query node...');
      return await this.queryNodeClient.activeCouncilMembers();
   }
}