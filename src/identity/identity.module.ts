
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { DiscordModule } from '@discord-nestjs/core';
import { IdentityClaimCommand } from './claim.command';
import { SolveChallengeCommand } from './solve.command';
import { ConfigModule } from '@nestjs/config';
import { PendingVerificationCleaner } from './pendingverificationcleaner';
import { RoleSyncService } from './rolesync.service';
import { CouncilService } from './council.service';

@Module({
  imports: [
    DatabaseModule,
    DiscordModule.forFeature(),
    ConfigModule.forRoot()
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
