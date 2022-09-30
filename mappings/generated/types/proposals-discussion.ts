import { createTypeUnsafe } from "@polkadot/types/create";
import { SubstrateEvent, SubstrateExtrinsic } from "@joystream/hydra-common";
import { Codec } from "@polkadot/types/types";
import { typeRegistry } from ".";

import { Bytes, bool, u64 } from "@polkadot/types";
import { PalletProposalsDiscussionThreadModeBTreeSet } from "@polkadot/types/lookup";

export namespace ProposalsDiscussion {
  /**
   * Emits on thread creation.
   *
   *  Event parameters: []
   */
  export class ThreadCreatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
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
   * Emits on post creation.
   *
   *  Event parameters: []
   */
  export class PostCreatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64, u64, Bytes, bool] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[2].value]),
        createTypeUnsafe(typeRegistry, "Bytes", [this.ctx.params[3].value]),
        createTypeUnsafe(typeRegistry, "bool", [this.ctx.params[4].value]),
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
   * Emits on post update.
   *
   *  Event parameters: []
   */
  export class PostUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64, u64, Bytes] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[2].value]),
        createTypeUnsafe(typeRegistry, "Bytes", [this.ctx.params[3].value]),
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
   * Emits on thread mode change.
   *
   *  Event parameters: []
   */
  export class ThreadModeChangedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, PalletProposalsDiscussionThreadModeBTreeSet, u64] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletProposalsDiscussionThreadModeBTreeSet",
          [this.ctx.params[1].value]
        ),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[2].value]),
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
   * Emits on post deleted
   *
   *  Event parameters: []
   */
  export class PostDeletedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64, u64, bool] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[2].value]),
        createTypeUnsafe(typeRegistry, "bool", [this.ctx.params[3].value]),
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
