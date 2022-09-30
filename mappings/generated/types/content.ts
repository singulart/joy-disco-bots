import { createTypeUnsafe } from "@polkadot/types/create";
import { SubstrateEvent, SubstrateExtrinsic } from "@joystream/hydra-common";
import { Codec } from "@polkadot/types/types";
import { typeRegistry } from ".";

import { BTreeSet, Bytes, Option, bool, u128, u64 } from "@polkadot/types";
import {
  PalletContentChannelActionPermission,
  PalletContentChannelCreationParametersRecord,
  PalletContentChannelRecord,
  PalletContentChannelUpdateParametersRecord,
  PalletContentNftTypesEnglishAuctionParamsRecord,
  PalletContentNftTypesNftIssuanceParametersRecord,
  PalletContentNftTypesOpenAuctionParamsRecord,
  PalletContentPermissionsContentActor,
  PalletContentVideoCreationParametersRecord,
  PalletContentVideoUpdateParametersRecord,
} from "@polkadot/types/lookup";
import { AccountId32 } from "@polkadot/types/interfaces";

export namespace Content {
  export class CuratorGroupCreatedEvent {
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

  export class CuratorGroupStatusSetEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, bool] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "bool", [this.ctx.params[1].value]),
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

  export class CuratorAddedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64, BTreeSet<PalletContentChannelActionPermission>] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(
          typeRegistry,
          "BTreeSet<PalletContentChannelActionPermission>",
          [this.ctx.params[2].value]
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

  export class CuratorRemovedEvent {
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

  export class ChannelCreatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      u64,
      PalletContentChannelRecord,
      PalletContentChannelCreationParametersRecord,
      AccountId32
    ] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "PalletContentChannelRecord", [
          this.ctx.params[1].value,
        ]),
        createTypeUnsafe(
          typeRegistry,
          "PalletContentChannelCreationParametersRecord",
          [this.ctx.params[2].value]
        ),
        createTypeUnsafe(typeRegistry, "AccountId32", [
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

  export class ChannelUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      PalletContentPermissionsContentActor,
      u64,
      PalletContentChannelUpdateParametersRecord,
      BTreeSet<u64>
    ] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletContentChannelUpdateParametersRecord",
          [this.ctx.params[2].value]
        ),
        createTypeUnsafe(typeRegistry, "BTreeSet<u64>", [
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

  export class ChannelAssetsRemovedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      PalletContentPermissionsContentActor,
      u64,
      BTreeSet<u64>,
      PalletContentChannelRecord
    ] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "BTreeSet<u64>", [
          this.ctx.params[2].value,
        ]),
        createTypeUnsafe(typeRegistry, "PalletContentChannelRecord", [
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

  export class VideoCreatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      PalletContentPermissionsContentActor,
      u64,
      u64,
      PalletContentVideoCreationParametersRecord,
      BTreeSet<u64>
    ] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[2].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletContentVideoCreationParametersRecord",
          [this.ctx.params[3].value]
        ),
        createTypeUnsafe(typeRegistry, "BTreeSet<u64>", [
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

  export class VideoUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      PalletContentPermissionsContentActor,
      u64,
      PalletContentVideoUpdateParametersRecord,
      BTreeSet<u64>
    ] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletContentVideoUpdateParametersRecord",
          [this.ctx.params[2].value]
        ),
        createTypeUnsafe(typeRegistry, "BTreeSet<u64>", [
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

  export class VideoDeletedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletContentPermissionsContentActor, u64] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
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

  export class ChannelDeletedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletContentPermissionsContentActor, u64] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
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

  export class ChannelDeletedByModeratorEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletContentPermissionsContentActor, u64, Bytes] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
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

  export class VideoDeletedByModeratorEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletContentPermissionsContentActor, u64, Bytes] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
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

  export class ChannelAssetsDeletedByModeratorEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      PalletContentPermissionsContentActor,
      u64,
      BTreeSet<u64>,
      Bytes
    ] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "BTreeSet<u64>", [
          this.ctx.params[2].value,
        ]),
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

  export class VideoAssetsDeletedByModeratorEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      PalletContentPermissionsContentActor,
      u64,
      BTreeSet<u64>,
      bool,
      Bytes
    ] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "BTreeSet<u64>", [
          this.ctx.params[2].value,
        ]),
        createTypeUnsafe(typeRegistry, "bool", [this.ctx.params[3].value]),
        createTypeUnsafe(typeRegistry, "Bytes", [this.ctx.params[4].value]),
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

  export class VideoVisibilitySetByModeratorEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletContentPermissionsContentActor, u64, bool, Bytes] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "bool", [this.ctx.params[2].value]),
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

  export class ChannelVisibilitySetByModeratorEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletContentPermissionsContentActor, u64, bool, Bytes] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "bool", [this.ctx.params[2].value]),
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
   * Metaprotocols related event
   *
   *  Event parameters: []
   */
  export class ChannelOwnerRemarkedEvent {
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

  export class ChannelAgentRemarkedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletContentPermissionsContentActor, u64, Bytes] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
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

  export class OpenAuctionStartedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      PalletContentPermissionsContentActor,
      u64,
      PalletContentNftTypesOpenAuctionParamsRecord,
      u64
    ] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletContentNftTypesOpenAuctionParamsRecord",
          [this.ctx.params[2].value]
        ),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[3].value]),
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

  export class EnglishAuctionStartedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      PalletContentPermissionsContentActor,
      u64,
      PalletContentNftTypesEnglishAuctionParamsRecord
    ] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletContentNftTypesEnglishAuctionParamsRecord",
          [this.ctx.params[2].value]
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

  export class NftIssuedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      PalletContentPermissionsContentActor,
      u64,
      PalletContentNftTypesNftIssuanceParametersRecord
    ] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletContentNftTypesNftIssuanceParametersRecord",
          [this.ctx.params[2].value]
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

  export class AuctionBidMadeEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64, u128, Option<u64>] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "u128", [this.ctx.params[2].value]),
        createTypeUnsafe(typeRegistry, "Option<u64>", [
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

  export class AuctionBidCanceledEvent {
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

  export class AuctionCanceledEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletContentPermissionsContentActor, u64] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
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

  export class EnglishAuctionSettledEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, AccountId32, u64] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "AccountId32", [
          this.ctx.params[1].value,
        ]),
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

  export class BidMadeCompletingAuctionEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64, Option<u64>] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "Option<u64>", [
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

  export class OpenAuctionBidAcceptedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletContentPermissionsContentActor, u64, u64, u128] {
      return [
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[2].value]),
        createTypeUnsafe(typeRegistry, "u128", [this.ctx.params[3].value]),
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

  export class OfferStartedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      u64,
      PalletContentPermissionsContentActor,
      u64,
      Option<u128>
    ] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
          this.ctx.params[1].value,
        ]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[2].value]),
        createTypeUnsafe(typeRegistry, "Option<u128>", [
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

  export class OfferAcceptedEvent {
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

  export class OfferCanceledEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, PalletContentPermissionsContentActor] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
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

  export class NftSellOrderMadeEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, PalletContentPermissionsContentActor, u128] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
          this.ctx.params[1].value,
        ]),
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

  export class NftBoughtEvent {
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

  export class BuyNowCanceledEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, PalletContentPermissionsContentActor] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
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

  export class BuyNowPriceUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, PalletContentPermissionsContentActor, u128] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
          this.ctx.params[1].value,
        ]),
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

  export class NftSlingedBackToTheOriginalArtistEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, PalletContentPermissionsContentActor] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "PalletContentPermissionsContentActor", [
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
}
