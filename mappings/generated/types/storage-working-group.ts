import { createTypeUnsafe } from "@polkadot/types/create";
import { SubstrateEvent, SubstrateExtrinsic } from "@joystream/hydra-common";
import { Codec } from "@polkadot/types/types";
import { typeRegistry } from ".";

import { BTreeMap, BTreeSet, Bytes, Option, u128, u64 } from "@polkadot/types";
import {
  PalletWorkingGroupApplyOnOpeningParams,
  PalletWorkingGroupOpeningType,
  PalletWorkingGroupRewardPaymentType,
  PalletWorkingGroupStakePolicy,
} from "@polkadot/types/lookup";
import { AccountId32, H256 } from "@polkadot/types/interfaces";

export namespace StorageWorkingGroup {
  /**
   * Emits on adding new job opening.
   * Params:
   * - Opening id
   * - Description
   * - Opening Type(Lead or Worker)
   * - Stake Policy for the opening
   * - Reward per block
   *
   *  Event parameters: []
   */
  export class OpeningAddedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      u64,
      Bytes,
      PalletWorkingGroupOpeningType,
      PalletWorkingGroupStakePolicy,
      Option<u128>
    ] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "Bytes", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "PalletWorkingGroupOpeningType", [
          this.ctx.params[2].value,
        ]),
        createTypeUnsafe(typeRegistry, "PalletWorkingGroupStakePolicy", [
          this.ctx.params[3].value,
        ]),
        createTypeUnsafe(typeRegistry, "Option<u128>", [
          this.ctx.params[4].value,
        ]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on adding the application for the worker opening.
   * Params:
   * - Opening parameteres
   * - Application id
   *
   *  Event parameters: []
   */
  export class AppliedOnOpeningEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletWorkingGroupApplyOnOpeningParams, u64] {
      return [
        createTypeUnsafe(
          typeRegistry,
          "PalletWorkingGroupApplyOnOpeningParams",
          [this.ctx.params[0].value]
        ),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on filling the job opening.
   * Params:
   * - Worker opening id
   * - Worker application id to the worker id dictionary
   * - Applicationd ids used to fill the opening
   *
   *  Event parameters: []
   */
  export class OpeningFilledEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, BTreeMap<u64, u64>, BTreeSet<u64>] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "BTreeMap<u64, u64>", [
          this.ctx.params[1].value,
        ]),
        createTypeUnsafe(typeRegistry, "BTreeSet<u64>", [
          this.ctx.params[2].value,
        ]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on setting the group leader.
   * Params:
   * - Group worker id.
   *
   *  Event parameters: []
   */
  export class LeaderSetEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on updating the role account of the worker.
   * Params:
   * - Id of the worker.
   * - Role account id of the worker.
   *
   *  Event parameters: []
   */
  export class WorkerRoleAccountUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, AccountId32] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "AccountId32", [
          this.ctx.params[1].value,
        ]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on un-setting the leader.
   *
   *  Event parameters: []
   */
  export class LeaderUnsetEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [] {
      return [];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits when worker started leaving their role.
   * Params:
   * - Worker id.
   * - Rationale.
   *
   *  Event parameters: []
   */
  export class WorkerStartedLeavingEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, Option<Bytes>] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "Option<Bytes>", [
          this.ctx.params[1].value,
        ]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on exiting the worker.
   * Params:
   * - worker id.
   * - Rationale.
   *
   *  Event parameters: []
   */
  export class WorkerExitedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on terminating the worker.
   * Params:
   * - worker id.
   * - Penalty.
   * - Rationale.
   *
   *  Event parameters: []
   */
  export class TerminatedWorkerEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, Option<u128>, Option<Bytes>] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "Option<u128>", [
          this.ctx.params[1].value,
        ]),
        createTypeUnsafe(typeRegistry, "Option<Bytes>", [
          this.ctx.params[2].value,
        ]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on terminating the leader.
   * Params:
   * - leader worker id.
   * - Penalty.
   * - Rationale.
   *
   *  Event parameters: []
   */
  export class TerminatedLeaderEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, Option<u128>, Option<Bytes>] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "Option<u128>", [
          this.ctx.params[1].value,
        ]),
        createTypeUnsafe(typeRegistry, "Option<Bytes>", [
          this.ctx.params[2].value,
        ]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on slashing the regular worker/lead stake.
   * Params:
   * - regular worker/lead id.
   * - actual slashed balance.
   * - Requested slashed balance.
   * - Rationale.
   *
   *  Event parameters: []
   */
  export class StakeSlashedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u128, u128, Option<Bytes>] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u128", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "u128", [this.ctx.params[2].value]),
        createTypeUnsafe(typeRegistry, "Option<Bytes>", [
          this.ctx.params[3].value,
        ]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on decreasing the regular worker/lead stake.
   * Params:
   * - regular worker/lead id.
   * - stake delta amount
   *
   *  Event parameters: []
   */
  export class StakeDecreasedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u128] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u128", [this.ctx.params[1].value]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on increasing the regular worker/lead stake.
   * Params:
   * - regular worker/lead id.
   * - stake delta amount
   *
   *  Event parameters: []
   */
  export class StakeIncreasedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u128] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u128", [this.ctx.params[1].value]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on withdrawing the application for the regular worker/lead opening.
   * Params:
   * - Job application id
   *
   *  Event parameters: []
   */
  export class ApplicationWithdrawnEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on canceling the job opening.
   * Params:
   * - Opening id
   *
   *  Event parameters: []
   */
  export class OpeningCanceledEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on setting the budget for the working group.
   * Params:
   * - new budget
   *
   *  Event parameters: []
   */
  export class BudgetSetEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u128] {
      return [
        createTypeUnsafe(typeRegistry, "u128", [this.ctx.params[0].value]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on updating the reward account of the worker.
   * Params:
   * - Id of the worker.
   * - Reward account id of the worker.
   *
   *  Event parameters: []
   */
  export class WorkerRewardAccountUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, AccountId32] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "AccountId32", [
          this.ctx.params[1].value,
        ]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on updating the reward amount of the worker.
   * Params:
   * - Id of the worker.
   * - Reward per block
   *
   *  Event parameters: []
   */
  export class WorkerRewardAmountUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, Option<u128>] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "Option<u128>", [
          this.ctx.params[1].value,
        ]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on updating the status text of the working group.
   * Params:
   * - status text hash
   * - status text
   *
   *  Event parameters: []
   */
  export class StatusTextChangedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [H256, Option<Bytes>] {
      return [
        createTypeUnsafe(typeRegistry, "H256", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "Option<Bytes>", [
          this.ctx.params[1].value,
        ]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on budget from the working group being spent
   * Params:
   * - Receiver Account Id.
   * - Balance spent.
   * - Rationale.
   *
   *  Event parameters: []
   */
  export class BudgetSpendingEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [AccountId32, u128, Option<Bytes>] {
      return [
        createTypeUnsafe(typeRegistry, "AccountId32", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "u128", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "Option<Bytes>", [
          this.ctx.params[2].value,
        ]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on paying the reward.
   * Params:
   * - Id of the worker.
   * - Receiver Account Id.
   * - Reward
   * - Payment type (missed reward or regular one)
   *
   *  Event parameters: []
   */
  export class RewardPaidEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      u64,
      AccountId32,
      u128,
      PalletWorkingGroupRewardPaymentType
    ] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "AccountId32", [
          this.ctx.params[1].value,
        ]),
        createTypeUnsafe(typeRegistry, "u128", [this.ctx.params[2].value]),
        createTypeUnsafe(typeRegistry, "PalletWorkingGroupRewardPaymentType", [
          this.ctx.params[3].value,
        ]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on reaching new missed reward.
   * Params:
   * - Worker ID.
   * - Missed reward (optional). None means 'no missed reward'.
   *
   *  Event parameters: []
   */
  export class NewMissedRewardLevelReachedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, Option<u128>] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "Option<u128>", [
          this.ctx.params[1].value,
        ]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  /**
   * Emits on Lead making a remark message
   * Params:
   * - message
   *
   *  Event parameters: []
   */
  export class LeadRemarkedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [Bytes] {
      return [
        createTypeUnsafe(typeRegistry, "Bytes", [this.ctx.params[0].value]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }
}
