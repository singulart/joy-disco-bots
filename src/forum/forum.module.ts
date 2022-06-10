import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { DiscordModule } from '@discord-nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from 'src/gql/gql.module';

@Module({
  imports: [
    DiscordModule.forFeature(), 
    ConfigModule.forRoot(),
    GraphQLModule
  ],
  providers: [ForumService],
})
export class ForumModule {}