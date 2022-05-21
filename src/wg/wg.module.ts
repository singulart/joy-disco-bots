import { Module } from '@nestjs/common';
import { WorkingGroupService } from './wg.service';
import { DiscordModule } from '@discord-nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DiscordModule.forFeature(), ConfigModule.forRoot()],
  providers: [WorkingGroupService],
})
export class WgModule {}