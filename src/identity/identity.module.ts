
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { DiscordModule } from '@discord-nestjs/core';
import { IdentityClaimCommand } from './claim.command';
import { SolveChallengeCommand } from './solve.command';
import { ConfigModule } from '@nestjs/config';
import { PendingVerificationCleaner } from './pendingverificationcleaner';
import { RoleSyncService } from './rolesync.service';
import { CouncilService } from './council.service';
import { PioneerGraphQLModule } from 'src/gql/pioneer.module';

@Module({
  imports: [
    DatabaseModule,
    DiscordModule.forFeature(),
    ConfigModule.forRoot(),
    PioneerGraphQLModule
  ], 
  providers: [
    IdentityClaimCommand, 
    SolveChallengeCommand, 
    PendingVerificationCleaner,
    RoleSyncService,
    CouncilService
  ],
  exports: [
    CouncilService
  ]
})
export class IdentityModule {}
