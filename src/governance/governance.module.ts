import { DiscordModule } from "@discord-nestjs/core";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "src/db/database.module";
import { PioneerGraphQLModule } from "src/gql/pioneer.module";
import { IdentityModule } from "src/identity/identity.module";
import { ProposalCreatedHandler } from "./proposal-created.handler";

@Module({
  imports: [
    DatabaseModule,
    DiscordModule.forFeature(),
    ConfigModule.forRoot(),
    PioneerGraphQLModule,
    IdentityModule
  ],
  providers: [
    ProposalCreatedHandler
  ]
})
export class JoyGovernanceModule {}