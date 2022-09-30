import { createTypeUnsafe } from "@polkadot/types/create";
import { SubstrateEvent, SubstrateExtrinsic } from "@joystream/hydra-common";
import { Codec } from "@polkadot/types/types";
import { typeRegistry } from ".";

import { BTreeSet, Bytes, Option, bool, u128, u64 } from "@polkadot/types";
import { AccountId32 } from "@polkadot/types/interfaces";
import {
  PalletStorageBagIdType,
  PalletStorageDistributionBucketIdRecord,
  PalletStorageDynBagCreationParametersRecord,
  PalletStorageDynamicBagIdType,
  PalletStorageUploadParametersRecord,
  PalletStorageVoucher,
} from "@polkadot/types/lookup";

export namespace Storage {
  /**
   * Emits on creating the storage bucket.
   * Params
   * - storage bucket ID
   * - invited worker
   * - flag "accepting_new_bags"
   * - size limit for voucher,
   * - objects limit for voucher,
   *
   *  Event parameters: []
   */
  export class StorageBucketCreatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, Option<u64>, bool, u64, u64] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "Option<u64>", [
          this.ctx.params[1].value,
        ]),
        createTypeUnsafe(typeRegistry, "bool", [this.ctx.params[2].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[3].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[4].value]),
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
   * Emits on accepting the storage bucket invitation.
   * Params
   * - storage bucket ID
   * - invited worker ID
   * - transactor account ID
   *
   *  Event parameters: []
   */
  export class StorageBucketInvitationAcceptedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64, AccountId32] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "AccountId32", [
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
   * Emits on updating storage buckets for bag.
   * Params
   * - bag ID
   * - storage buckets to add ID collection
   * - storage buckets to remove ID collection
   *
   *  Event parameters: []
   */
  export class StorageBucketsUpdatedForBagEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletStorageBagIdType, BTreeSet<u64>, BTreeSet<u64>] {
      return [
        createTypeUnsafe(typeRegistry, "PalletStorageBagIdType", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "BTreeSet<u64>", [
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
   * Emits on uploading data objects.
   * Params
   * - data objects IDs
   * - initial uploading parameters
   * - state bloat bond for objects
   *
   *  Event parameters: []
   */
  export class DataObjectsUploadedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [BTreeSet<u64>, PalletStorageUploadParametersRecord, u128] {
      return [
        createTypeUnsafe(typeRegistry, "BTreeSet<u64>", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "PalletStorageUploadParametersRecord", [
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

  /**
   * Emits on storage assets being uploaded and deleted at the same time
   * Params
   * - UploadParameters
   * - Ids of the uploaded objects
   * - Ids of the removed objects
   *
   *  Event parameters: []
   */
  export class DataObjectsUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      PalletStorageUploadParametersRecord,
      BTreeSet<u64>,
      BTreeSet<u64>
    ] {
      return [
        createTypeUnsafe(typeRegistry, "PalletStorageUploadParametersRecord", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "BTreeSet<u64>", [
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
   * Emits on setting the storage operator metadata.
   * Params
   * - storage bucket ID
   * - invited worker ID
   * - metadata
   *
   *  Event parameters: []
   */
  export class StorageOperatorMetadataSetEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64, Bytes] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
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
   * Emits on setting the storage bucket voucher limits.
   * Params
   * - storage bucket ID
   * - new total objects size limit
   * - new total objects number limit
   *
   *  Event parameters: []
   */
  export class StorageBucketVoucherLimitsSetEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64, u64] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
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
   * Emits on accepting pending data objects.
   * Params
   * - storage bucket ID
   * - worker ID (storage provider ID)
   * - bag ID
   * - pending data objects
   *
   *  Event parameters: []
   */
  export class PendingDataObjectsAcceptedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64, PalletStorageBagIdType, BTreeSet<u64>] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "PalletStorageBagIdType", [
          this.ctx.params[2].value,
        ]),
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

  /**
   * Emits on cancelling the storage bucket invitation.
   * Params
   * - storage bucket ID
   *
   *  Event parameters: []
   */
  export class StorageBucketInvitationCancelledEvent {
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
   * Emits on the storage bucket operator invitation.
   * Params
   * - storage bucket ID
   * - operator worker ID (storage provider ID)
   *
   *  Event parameters: []
   */
  export class StorageBucketOperatorInvitedEvent {
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
   * Emits on the storage bucket operator removal.
   * Params
   * - storage bucket ID
   *
   *  Event parameters: []
   */
  export class StorageBucketOperatorRemovedEvent {
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
   * Emits on moving data objects between bags.
   * Params
   * - source bag ID
   * - destination bag ID
   * - data object IDs
   *
   *  Event parameters: []
   */
  export class DataObjectsMovedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      PalletStorageBagIdType,
      PalletStorageBagIdType,
      BTreeSet<u64>
    ] {
      return [
        createTypeUnsafe(typeRegistry, "PalletStorageBagIdType", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "PalletStorageBagIdType", [
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
   * Emits on data objects deletion from bags.
   * Params
   * - account ID for the state bloat bond
   * - bag ID
   * - data object IDs
   *
   *  Event parameters: []
   */
  export class DataObjectsDeletedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [AccountId32, PalletStorageBagIdType, BTreeSet<u64>] {
      return [
        createTypeUnsafe(typeRegistry, "AccountId32", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "PalletStorageBagIdType", [
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
   * Emits on storage bucket status update.
   * Params
   * - storage bucket ID
   * - new status
   *
   *  Event parameters: []
   */
  export class StorageBucketStatusUpdatedEvent {
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

  /**
   * Emits on deleting a dynamic bag.
   * Params
   * - dynamic bag ID
   *
   *  Event parameters: []
   */
  export class DynamicBagDeletedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletStorageDynamicBagIdType] {
      return [
        createTypeUnsafe(typeRegistry, "PalletStorageDynamicBagIdType", [
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
   * Emits on creating a dynamic bag.
   * Params
   * - dynamic bag creation parameters
   * - uploaded data objects ids
   *
   *  Event parameters: []
   */
  export class DynamicBagCreatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletStorageDynBagCreationParametersRecord, BTreeSet<u64>] {
      return [
        createTypeUnsafe(
          typeRegistry,
          "PalletStorageDynBagCreationParametersRecord",
          [this.ctx.params[0].value]
        ),
        createTypeUnsafe(typeRegistry, "BTreeSet<u64>", [
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
   * Emits on changing the voucher for a storage bucket.
   * Params
   * - storage bucket ID
   * - new voucher
   *
   *  Event parameters: []
   */
  export class VoucherChangedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, PalletStorageVoucher] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "PalletStorageVoucher", [
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
   * Emits on storage bucket deleting.
   * Params
   * - storage bucket ID
   *
   *  Event parameters: []
   */
  export class StorageBucketDeletedEvent {
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
   * Emits on creating distribution bucket family.
   * Params
   * - distribution family bucket ID
   *
   *  Event parameters: []
   */
  export class DistributionBucketFamilyCreatedEvent {
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
   * Emits on deleting distribution bucket family.
   * Params
   * - distribution family bucket ID
   *
   *  Event parameters: []
   */
  export class DistributionBucketFamilyDeletedEvent {
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
   * Emits on creating distribution bucket.
   * Params
   * - distribution bucket family ID
   * - accepting new bags
   * - distribution bucket ID
   *
   *  Event parameters: []
   */
  export class DistributionBucketCreatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, bool, PalletStorageDistributionBucketIdRecord] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "bool", [this.ctx.params[1].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletStorageDistributionBucketIdRecord",
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

  /**
   * Emits on storage bucket status update (accepting new bags).
   * Params
   * - distribution bucket ID
   * - new status (accepting new bags)
   *
   *  Event parameters: []
   */
  export class DistributionBucketStatusUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletStorageDistributionBucketIdRecord, bool] {
      return [
        createTypeUnsafe(
          typeRegistry,
          "PalletStorageDistributionBucketIdRecord",
          [this.ctx.params[0].value]
        ),
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

  /**
   * Emits on deleting distribution bucket.
   * Params
   * - distribution bucket ID
   *
   *  Event parameters: []
   */
  export class DistributionBucketDeletedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletStorageDistributionBucketIdRecord] {
      return [
        createTypeUnsafe(
          typeRegistry,
          "PalletStorageDistributionBucketIdRecord",
          [this.ctx.params[0].value]
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

  /**
   * Emits on updating distribution buckets for bag.
   * Params
   * - bag ID
   * - storage buckets to add ID collection
   * - storage buckets to remove ID collection
   *
   *  Event parameters: []
   */
  export class DistributionBucketsUpdatedForBagEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletStorageBagIdType, u64, BTreeSet<u64>, BTreeSet<u64>] {
      return [
        createTypeUnsafe(typeRegistry, "PalletStorageBagIdType", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "BTreeSet<u64>", [
          this.ctx.params[2].value,
        ]),
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

  /**
   * Emits on storage bucket mode update (distributing flag).
   * Params
   * - distribution bucket ID
   * - distributing
   *
   *  Event parameters: []
   */
  export class DistributionBucketModeUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletStorageDistributionBucketIdRecord, bool] {
      return [
        createTypeUnsafe(
          typeRegistry,
          "PalletStorageDistributionBucketIdRecord",
          [this.ctx.params[0].value]
        ),
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

  /**
   * Emits on creating a distribution bucket invitation for the operator.
   * Params
   * - distribution bucket ID
   * - worker ID
   *
   *  Event parameters: []
   */
  export class DistributionBucketOperatorInvitedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletStorageDistributionBucketIdRecord, u64] {
      return [
        createTypeUnsafe(
          typeRegistry,
          "PalletStorageDistributionBucketIdRecord",
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
   * Emits on canceling a distribution bucket invitation for the operator.
   * Params
   * - distribution bucket ID
   * - operator worker ID
   *
   *  Event parameters: []
   */
  export class DistributionBucketInvitationCancelledEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletStorageDistributionBucketIdRecord, u64] {
      return [
        createTypeUnsafe(
          typeRegistry,
          "PalletStorageDistributionBucketIdRecord",
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
   * Emits on accepting a distribution bucket invitation for the operator.
   * Params
   * - worker ID
   * - distribution bucket ID
   *
   *  Event parameters: []
   */
  export class DistributionBucketInvitationAcceptedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, PalletStorageDistributionBucketIdRecord] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletStorageDistributionBucketIdRecord",
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

  /**
   * Emits on setting the metadata by a distribution bucket operator.
   * Params
   * - worker ID
   * - distribution bucket ID
   * - metadata
   *
   *  Event parameters: []
   */
  export class DistributionBucketMetadataSetEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, PalletStorageDistributionBucketIdRecord, Bytes] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletStorageDistributionBucketIdRecord",
          [this.ctx.params[1].value]
        ),
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
   * Emits on the distribution bucket operator removal.
   * Params
   * - distribution bucket ID
   * - distribution bucket operator ID
   *
   *  Event parameters: []
   */
  export class DistributionBucketOperatorRemovedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [PalletStorageDistributionBucketIdRecord, u64] {
      return [
        createTypeUnsafe(
          typeRegistry,
          "PalletStorageDistributionBucketIdRecord",
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
   * Emits on setting the metadata by a distribution bucket family.
   * Params
   * - distribution bucket family ID
   * - metadata
   *
   *  Event parameters: []
   */
  export class DistributionBucketFamilyMetadataSetEvent {
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
