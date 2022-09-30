import { InjectDiscordClient} from "@discord-nestjs/core";
import { Injectable} from "@nestjs/common";
import { Client } from "discord.js";
import { RetryablePioneerClient } from "src/gql/pioneer.client";
import { CouncilService } from "src/identity/council.service";

const PROPOSALS_CHANNEL_KEY = "proposals";

@Injectable()
export abstract class BaseEventHandler {
  constructor(
    protected readonly queryNodeClient: RetryablePioneerClient,
    protected readonly councilService: CouncilService,
    @InjectDiscordClient()
    protected readonly client: Client) {
  }

  protected getProposalsChannelKey() {
    return PROPOSALS_CHANNEL_KEY;
  }
}