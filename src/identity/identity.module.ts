
import { CacheModule, Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { DiscordModule } from '@discord-nestjs/core';
import { IdentityClaimCommand } from './claim.command';
import { SolveChallengeCommand } from './solve.command';
import { ConfigModule } from '@nestjs/config';
import { PendingVerificationCleaner } from './pending-verification-cleaner.service';
import { RoleSyncService } from './rolesync.service';
import { CouncilService } from './council.service';
import { PioneerGraphQLModule } from 'src/gql/pioneer.module';
import { CacheableMembershipsProvider } from './cacheable-members.provider';

@Module({
  imports: [
    DatabaseModule,
    DiscordModule.forFeature(),
    ConfigModule.forRoot(),
    PioneerGraphQLModule,
    CacheModule.register({ttl: 60*60}), // cached for 1h
  ], 
  providers: [
    IdentityClaimCommand, 
    SolveChallengeCommand, 
    PendingVerificationCleaner,
    CacheableMembershipsProvider,
    RoleSyncService,
    CouncilService
  ],
  exports: [
    CouncilService
  ]
})
export class IdentityModule {}
