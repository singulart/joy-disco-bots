import { createTypeUnsafe } from "@polkadot/types/create";
import { SubstrateEvent, SubstrateExtrinsic } from "@joystream/hydra-common";
import { Codec } from "@polkadot/types/types";
import { typeRegistry } from ".";

import { BTreeMap, BTreeSet, Bytes, Option, bool, u64 } from "@polkadot/types";
import {
  PalletForumExtendedPostIdObject,
  PalletForumPrivilegedActor,
} from "@polkadot/types/lookup";

export namespace Forum {
  /**
   * A category was introduced
   *
   *  Event parameters: []
   */
  export class CategoryCreatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, Option<u64>, Bytes, Bytes] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "Option<u64>", [
          this.ctx.params[1].value,
        ]),
        createTypeUnsafe(typeRegistry, "Bytes", [this.ctx.params[2].value]),
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
   * An arhical status of category with given id was updated.
   * The second argument reflects the new archival status of the category.
   *
   *  Event parameters: []
   */
  export class CategoryArchivalStatusUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, bool, PalletForumPrivilegedActor] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "bool", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "PalletForumPrivilegedActor", [
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
   * A category was deleted
   *
   *  Event parameters: []
   */
  export class CategoryDeletedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, PalletForumPrivilegedActor] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "PalletForumPrivilegedActor", [
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
   * A thread with given id was created.
   * A third argument reflects the initial post id of the thread.
   *
   *  Event parameters: []
   */
  export class ThreadCreatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64, u64, u64, Bytes, Bytes] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[2].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[3].value]),
        createTypeUnsafe(typeRegistry, "Bytes", [this.ctx.params[4].value]),
        createTypeUnsafe(typeRegistry, "Bytes", [this.ctx.params[5].value]),
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
   * A thread with given id was moderated.
   *
   *  Event parameters: []
   */
  export class ThreadModeratedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, Bytes, PalletForumPrivilegedActor, u64] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "Bytes", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "PalletForumPrivilegedActor", [
          this.ctx.params[2].value,
        ]),
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

  /**
   * A thread metadata given id was updated.
   *
   *  Event parameters: []
   */
  export class ThreadMetadataUpdatedEvent {
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
   * A thread was deleted.
   *
   *  Event parameters: []
   */
  export class ThreadDeletedEvent {
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

  /**
   * A thread was moved to new category
   *
   *  Event parameters: []
   */
  export class ThreadMovedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64, PalletForumPrivilegedActor, u64] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "PalletForumPrivilegedActor", [
          this.ctx.params[2].value,
        ]),
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

  /**
   * Post with given id was created.
   *
   *  Event parameters: []
   */
  export class PostAddedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64, u64, u64, Bytes, bool] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[2].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[3].value]),
        createTypeUnsafe(typeRegistry, "Bytes", [this.ctx.params[4].value]),
        createTypeUnsafe(typeRegistry, "bool", [this.ctx.params[5].value]),
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
   * Post with givne id was moderated.
   *
   *  Event parameters: []
   */
  export class PostModeratedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, Bytes, PalletForumPrivilegedActor, u64, u64] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "Bytes", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "PalletForumPrivilegedActor", [
          this.ctx.params[2].value,
        ]),
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
   * Post with givne id was deleted.
   *
   *  Event parameters: []
   */
  export class PostDeletedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      Bytes,
      u64,
      BTreeMap<PalletForumExtendedPostIdObject, bool>
    ] {
      return [
        createTypeUnsafe(typeRegistry, "Bytes", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(
          typeRegistry,
          "BTreeMap<PalletForumExtendedPostIdObject, bool>",
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
   * Post with given id had its text updated.
   * The second argument reflects the number of total edits when the text update occurs.
   *
   *  Event parameters: []
   */
  export class PostTextUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64, u64, u64, Bytes] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[2].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[3].value]),
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

  /**
   * Sticky thread updated for category
   *
   *  Event parameters: []
   */
  export class CategoryStickyThreadUpdateEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, BTreeSet<u64>, PalletForumPrivilegedActor] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "BTreeSet<u64>", [
          this.ctx.params[1].value,
        ]),
        createTypeUnsafe(typeRegistry, "PalletForumPrivilegedActor", [
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
   * An moderator ability to moderate a category and its subcategories updated
   *
   *  Event parameters: []
   */
  export class CategoryMembershipOfModeratorUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u64, bool] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "bool", [this.ctx.params[2].value]),
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
