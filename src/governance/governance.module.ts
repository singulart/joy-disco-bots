import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/db/database.module';
import { PioneerGraphQLModule } from 'src/gql/pioneer.module';
import { IdentityModule } from 'src/identity/identity.module';
import { ProposalCreatedHandler } from './proposal-created.handler';
import { ProposalDecisionMadeHandler } from './proposal-decision-made.handler';
import { ProposalPostCreatedHandler } from './proposal-post-created.handler';
import { ProposalPostDeletedHandler } from './proposal-post-deleted.handler';
import { ProposalPostUpdatedHandler } from './proposal-post-updated.handler';
import { ProposalVotedHandler } from './vote-cast.handler';

@Module({
  imports: [
    DatabaseModule,
    DiscordModule.forFeature(),
    ConfigModule.forRoot(),
    PioneerGraphQLModule,
    IdentityModule
  ],
  providers: [
    ProposalCreatedHandler,
    ProposalDecisionMadeHandler,
    ProposalVotedHandler,
    ProposalPostCreatedHandler,
    ProposalPostDeletedHandler,
    ProposalPostUpdatedHandler,
  ]
})
export class JoyGovernanceModule {}