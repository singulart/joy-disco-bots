import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventEmitterService } from './event.emitter';


@Module({
  imports: [
    EventEmitterModule.forRoot()  
  ],
  providers: [
    EventEmitterService
  ]
})
export class BlockchainModule { }
