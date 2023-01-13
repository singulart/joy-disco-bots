import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventEmitterService } from './event.emitter';
import { globalEventingConfig } from '../../config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(globalEventingConfig),
  ],
  providers: [EventEmitterService],
})
export class BlockchainModule {}
