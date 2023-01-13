import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PioneerGraphQLModule } from 'src/gql/pioneer.module';
import { ApplicationWithdrawnHandler } from './application-withdrawn.handler';
import { OpeningAddedOrCancelledHandler } from './opening-added-or-cancelled.handler';
import { ApplicationCreatedHandler } from './application-created.handler';
import { BudgetUpdatedHandler } from './budget-updated.handler';
import { OpeningFilledHandler } from './opening-filled.handler';
import { RewardPaidHandler } from './reward-paid.handler';
import { RewardUpdatedHandler } from './reward-updated.handler';
import { BudgetSetHandler } from './budget-set.handler';
import { LeadHandler } from './lead.handler';
import { StakeHandler } from './stake.handler';
import { TerminationHandler } from './termination.handler';
import { WorkerExitedHandler } from './worker-exited.handler';
import { WorkingGroupService } from './wg.service';
import { BudgetSpendingHandler } from './budget-spending.handler';

@Module({
  imports: [
    DiscordModule.forFeature(),
    ConfigModule.forRoot(),
    PioneerGraphQLModule,
  ],
  providers: [
    BudgetSetHandler,
    BudgetUpdatedHandler,
    BudgetSpendingHandler,
    ApplicationCreatedHandler,
    ApplicationWithdrawnHandler,
    OpeningAddedOrCancelledHandler,
    OpeningFilledHandler,
    // RewardPaidHandler,
    RewardUpdatedHandler,
    LeadHandler,
    StakeHandler,
    TerminationHandler,
    WorkerExitedHandler,
    WorkingGroupService,
  ],
})
export class WgModule {}
