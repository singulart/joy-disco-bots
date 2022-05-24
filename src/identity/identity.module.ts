
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { DiscordModule } from '@discord-nestjs/core';
import { IdentityClaimCommand } from './claim.command';
import { SolveChallengeCommand } from './solve.command';
import { ConfigModule } from '@nestjs/config';
import { PendingVerificationCleaner } from './pendingverificationcleaner';

@Module({
  imports: [
    DatabaseModule,
    DiscordModule.forFeature(),
    ConfigModule.forRoot()
  ], 
  providers: [
    IdentityClaimCommand, 
    SolveChallengeCommand, 
    PendingVerificationCleaner
  ]
})
export class IdentityModule {}
