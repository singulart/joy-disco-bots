import { InjectDiscordClient } from '@discord-nestjs/core'
import { Injectable } from '@nestjs/common'
import { Client } from 'discord.js'
import { RetryablePioneerClient } from 'src/gql/pioneer.client'
import { CouncilService } from 'src/identity/council.service'
import { AugmentedEvents, AugmentedEvent } from '@polkadot/api/types'
import { EventRecord } from '@polkadot/types/interfaces/system'

const PROPOSALS_CHANNEL_KEY = 'proposals';
type ExtractTuple<P> = P extends AugmentedEvent<'rxjs', infer T> ? T : never

@Injectable()
export abstract class BaseEventHandler {
  constructor(
    protected readonly queryNodeClient: RetryablePioneerClient,
    protected readonly councilService: CouncilService,
    @InjectDiscordClient()
    protected readonly client: Client) {
  }

  protected getProposalsChannelKey() {
    return PROPOSALS_CHANNEL_KEY;
  }

  protected async getMemberHandleById(id: string) {
    let member;
    try{
      member = await this.queryNodeClient.memberById(id);
      return member.memberships[0].handle;
    } catch(e) {
      return id;
    }
  }

  // originally from Pioneer: https://github.com/Joystream/pioneer/blob/dev/packages/ui/src/common/model/JoystreamNode/getDataFromEvent.ts
  protected getDataFromEvent<
    Module extends keyof AugmentedEvents<'rxjs'>,
    Event extends keyof AugmentedEvents<'rxjs'>[Module],
    Tuple extends ExtractTuple<AugmentedEvents<'rxjs'>[Module][Event]>,
    Index extends keyof Tuple
  >(
    events: EventRecord[],
    module: Module,
    eventName: Event,
    index: Index = 0 as Index
  ): Tuple[Index] | undefined {
    const eventRecord = events.find((event) => event.event.method === eventName)

    if (!eventRecord) {
      return
    }

    const data = eventRecord.event.data as unknown as Tuple

    return data[index]
  }
}