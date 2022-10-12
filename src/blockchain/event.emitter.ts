import { Once } from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { wsLocation } from 'config';
import { connectApi, getBlockHash, getEvents } from 'src/util';
import { ApiPromise } from '@polkadot/api';
import { Header, EventRecord } from '@polkadot/types/interfaces'
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventWithBlock } from 'src/types';


@Injectable()
export class EventEmitterService {
  private readonly logger = new Logger(EventEmitterService.name);

  constructor(
    private eventEmitter: EventEmitter2
  ) { }

  @Once('ready')
  async onReady(): Promise<void> {
    const api: ApiPromise = await connectApi(wsLocation);
    await api.isReady;
    this.logger.log(`Event Emitter connected to RPC endpoint [${wsLocation}]`);
    api.rpc.chain.subscribeFinalizedHeads(async (header: Header) => {
      const hash = await getBlockHash(api, +header.number);
      const events = await getEvents(api, hash);
      events.forEach((e: EventRecord) => {
        let { section, method } = e.event;
        this.eventEmitter.emit(`${section}.${method}`, {event: e, block: +header.number} as EventWithBlock); 
      });
    });
  }
}