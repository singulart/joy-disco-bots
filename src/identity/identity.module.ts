
import { Module } from '@nestjs/common';
// import { databaseProviders } from './database.providers';
import { DatabaseModule } from '../db/database.module';
import { DiscordModule } from '@discord-nestjs/core';

@Module({
  imports: [
    DatabaseModule,
    DiscordModule.forFeature()
  ]
})
export class IdentityModule {}
