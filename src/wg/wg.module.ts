import { Module } from '@nestjs/common';
import { WorkingGroupService } from './wg.service';
import { DiscordModule } from '@discord-nestjs/core';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [WorkingGroupService],
})
export class WgModule {}