import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { DiscordModule } from '@discord-nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DiscordModule.forFeature(), ConfigModule.forRoot()],
  providers: [ForumService],
})
export class ForumModule {}