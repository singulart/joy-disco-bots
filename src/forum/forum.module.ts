import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from 'src/gql/gql.module';
import { ThreadCreatedHandler } from './thread.created.handler';
import { PostCreatedHandler } from './post.created.handler';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    DiscordModule.forFeature(), 
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(),
    GraphQLModule
  ],
  providers: [ThreadCreatedHandler, PostCreatedHandler],
})
export class ForumModule {}