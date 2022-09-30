import { createTypeUnsafe } from "@polkadot/types/create";
import { SubstrateEvent, SubstrateExtrinsic } from "@joystream/hydra-common";
import { Codec } from "@polkadot/types/types";
import { typeRegistry } from ".";

import { Bytes, Option, bool, u128, u32, u64, u8 } from "@polkadot/types";
import {
  PalletMembershipBuyMembershipParameters,
  PalletMembershipCreateFoundingMemberParameters,
  PalletMembershipGiftMembershipParameters,
  PalletMembershipInviteMembershipParameters,
} from "@polkadot/types/lookup";
import { AccountId32 } from "@polkadot/types/interfaces";

export namespace Members {
  export class MembershipBoughtEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, PalletMembershipBuyMembershipParameters, u32] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletMembershipBuyMembershipParameters",
          [this.ctx.params[1].value]
        ),
        createTypeUnsafe(typeRegistry, "u32", [this.ctx.params[2].value]),
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

  export class MembershipGiftedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, PalletMembershipGiftMembershipParameters] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletMembershipGiftMembershipParameters",
          [this.ctx.params[1].value]
        ),
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

  export class FoundingMemberCreatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, PalletMembershipCreateFoundingMemberParameters, u32] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletMembershipCreateFoundingMemberParameters",
          [this.ctx.params[1].value]
        ),
        createTypeUnsafe(typeRegistry, "u32", [this.ctx.params[2].value]),
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

  export class MemberProfileUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, Option<Bytes>, Option<Bytes>] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "Option<Bytes>", [
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

  export class MemberAccountsUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, Option<AccountId32>, Option<AccountId32>] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "Option<AccountId32>", [
          this.ctx.params[1].value,
        ]),
        createTypeUnsafe(typeRegistry, "Option<AccountId32>", [
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

  export class MemberVerificationStatusUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, bool, u64] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "bool", [this.ctx.params[1].value]),
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

  export class InvitesTransferredEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64, u32] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "u32", [this.ctx.params[2].value]),
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

  export class MemberInvitedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, PalletMembershipInviteMembershipParameters] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletMembershipInviteMembershipParameters",
          [this.ctx.params[1].value]
        ),
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

  export class StakingAccountAddedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [AccountId32, u64] {
      return [
        createTypeUnsafe(typeRegistry, "AccountId32", [
          this.ctx.params[0].value,
        ]),
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

  export class StakingAccountConfirmedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [AccountId32, u64] {
      return [
        createTypeUnsafe(typeRegistry, "AccountId32", [
          this.ctx.params[0].value,
        ]),
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

  export class StakingAccountRemovedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [AccountId32, u64] {
      return [
        createTypeUnsafe(typeRegistry, "AccountId32", [
          this.ctx.params[0].value,
        ]),
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

  export class InitialInvitationCountUpdatedEvent {
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

  export class MembershipPriceUpdatedEvent {
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

  export class ReferralCutUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u8] {
      return [createTypeUnsafe(typeRegistry, "u8", [this.ctx.params[0].value])];
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

  export class InitialInvitationBalanceUpdatedEvent {
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

  export class LeaderInvitationQuotaUpdatedEvent {
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

  export class MemberRemarkedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, Bytes] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "Bytes", [this.ctx.params[1].value]),
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
