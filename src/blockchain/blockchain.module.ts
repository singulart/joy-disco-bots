import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventEmitterService } from './event.emitter';
import { globalEventingConfig } from '../../config';


@Module({
  imports: [
    EventEmitterModule.forRoot(globalEventingConfig),
  ],
  providers: [
    EventEmitterService
  ]
})
export class BlockchainModule { }
