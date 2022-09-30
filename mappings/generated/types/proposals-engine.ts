import { createTypeUnsafe } from "@polkadot/types/create";
import { SubstrateEvent, SubstrateExtrinsic } from "@joystream/hydra-common";
import { Codec } from "@polkadot/types/types";
import { typeRegistry } from ".";

import { Bytes, u32, u64 } from "@polkadot/types";
import {
  PalletProposalsEngineProposalStatusesExecutionStatus,
  PalletProposalsEngineProposalStatusesProposalDecision,
  PalletProposalsEngineProposalStatusesProposalStatus,
  PalletProposalsEngineVoteKind,
} from "@polkadot/types/lookup";

export namespace ProposalsEngine {
  /**
   * Emits on proposal creation.
   * Params:
   * - Id of a proposal.
   * - New proposal status.
   *
   *  Event parameters: []
   */
  export class ProposalStatusUpdatedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u32, PalletProposalsEngineProposalStatusesProposalStatus] {
      return [
        createTypeUnsafe(typeRegistry, "u32", [this.ctx.params[0].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletProposalsEngineProposalStatusesProposalStatus",
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
   * Emits on getting a proposal status decision.
   * Params:
   * - Id of a proposal.
   * - Proposal decision
   *
   *  Event parameters: []
   */
  export class ProposalDecisionMadeEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u32, PalletProposalsEngineProposalStatusesProposalDecision] {
      return [
        createTypeUnsafe(typeRegistry, "u32", [this.ctx.params[0].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletProposalsEngineProposalStatusesProposalDecision",
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
   * Emits on proposal execution.
   * Params:
   * - Id of a updated proposal.
   * - Proposal execution status.
   *
   *  Event parameters: []
   */
  export class ProposalExecutedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u32, PalletProposalsEngineProposalStatusesExecutionStatus] {
      return [
        createTypeUnsafe(typeRegistry, "u32", [this.ctx.params[0].value]),
        createTypeUnsafe(
          typeRegistry,
          "PalletProposalsEngineProposalStatusesExecutionStatus",
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
   * Emits on voting for the proposal
   * Params:
   * - Voter - member id of a voter.
   * - Id of a proposal.
   * - Kind of vote.
   * - Rationale.
   *
   *  Event parameters: []
   */
  export class VotedEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u32, PalletProposalsEngineVoteKind, Bytes] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
        createTypeUnsafe(typeRegistry, "u32", [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, "PalletProposalsEngineVoteKind", [
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

  /**
   * Emits on a proposal being cancelled
   * Params:
   * - Member Id of the proposer
   * - Id of the proposal
   *
   *  Event parameters: []
   */
  export class ProposalCancelledEvent {
    public readonly expectedParamTypes = [];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [u64, u32] {
      return [
        createTypeUnsafe(typeRegistry, "u64", [this.ctx.params[0].value]),
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
}
