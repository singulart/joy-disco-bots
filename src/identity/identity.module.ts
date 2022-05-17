
import { Module } from '@nestjs/common';
// import { databaseProviders } from './database.providers';
import { DatabaseModule } from '../db/database.module';
import { DiscordModule } from '@discord-nestjs/core';
import { IdentityClaimCommand } from './claim.command';
import { SolveChallengeCommand } from './solve.command';

@Module({
  imports: [
    DatabaseModule,
    DiscordModule.forFeature()
  ], 
  providers: [IdentityClaimCommand, SolveChallengeCommand]
})
export class IdentityModule {}
