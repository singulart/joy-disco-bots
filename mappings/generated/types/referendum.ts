import { createTypeUnsafe } from "@polkadot/types/create";
import { SubstrateEvent, SubstrateExtrinsic } from "@joystream/hydra-common";
import { Codec } from "@polkadot/types/types";
import { typeRegistry } from ".";

import { Bytes, Vec, u128, u32, u64 } from "@polkadot/types";
import { PalletReferendumOptionResult } from "@polkadot/types/lookup";
import { AccountId32, H256 } from "@polkadot/types/interfaces";

export namespace Referendum {
  /**
   * Referendum started
   *
   *  Event parameters: []
   */
  export class ReferendumStartedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u32, u32] {
      return [
        createTypeUnsafe(typeRegistry, "u32", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u32", [this.ctx.params[1].value]),
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
   * Referendum started
   *
   *  Event parameters: []
   */
  export class ReferendumStartedForcefullyEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u32, u32] {
      return [
        createTypeUnsafe(typeRegistry, "u32", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u32", [this.ctx.params[1].value]),
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
   * Revealing phase has begun
   *
   *  Event parameters: []
   */
  export class RevealingStageStartedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u32] {
      return [
        createTypeUnsafe(typeRegistry, "u32", [this.ctx.params[0].value]),
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
   * Referendum ended and winning option was selected
   *
   *  Event parameters: []
   */
  export class ReferendumFinishedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [Vec<PalletReferendumOptionResult>] {
      return [
        createTypeUnsafe(typeRegistry, "Vec<PalletReferendumOptionResult>", [
          this.ctx.params[0].value,
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
   * User cast a vote in referendum
   *
   *  Event parameters: []
   */
  export class VoteCastEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [AccountId32, H256, u128] {
      return [
        createTypeUnsafe(typeRegistry, "AccountId32", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "H256", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "u128", [this.ctx.params[2].value]),
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
   * User revealed his vote
   *
   *  Event parameters: []
   */
  export class VoteRevealedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [AccountId32, u64, Bytes] {
      return [
        createTypeUnsafe(typeRegistry, "AccountId32", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "Bytes", [this.ctx.params[2].value]),
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
   * User released his stake
   *
   *  Event parameters: []
   */
  export class StakeReleasedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [AccountId32] {
      return [
        createTypeUnsafe(typeRegistry, "AccountId32", [
          this.ctx.params[0].value,
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
}
