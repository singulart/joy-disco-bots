import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { VideoCreatedHandler } from './video-created.handler';
import { AtlasGraphQLModule } from 'src/gql/atlas.module';

@Module({
  imports: [
    DiscordModule.forFeature(),
    ConfigModule.forRoot(),
    AtlasGraphQLModule
  ],
  providers: [VideoCreatedHandler],
})
export class VideoModule {}