import { ChannelNames } from "./src/types";

export const wsLocation = "wss://rpc.joystream.org:9944"; 
export const database = "joy_dao";

// video bot
export const channelId = "938526399801729024";
export const hydraLocation = "https://query.joystream.org/graphql";
export const waitFor = 60;
export const waitTimeUnit = "seconds";
export const createdAgo = 30;
export const createdAgoUnit = "minutes";

// wg bot
export const channelNames: ChannelNames = {
  council: "council",
  proposals: "proposals",
  forum: "forum",
  tokenomics: "tokenomics",
  videos: "video-bot",
  general: "general",

  // groups https://github.com/Joystream/joystream/blob/c57054eebe5da4f683134dbdaaecf50263ec7336/cli/src/Types.ts#L53-L63
  contentWorkingGroup: "content-curator",
  storageWorkingGroup: "storage-provider",
  forumWorkingGroup: "forum",
  membershipWorkingGroup: "membership",
  distributionWorkingGroup: "distributors",
  gatewayWorkingGroup: "gateway",
  operationsWorkingGroupAlpha: "builders",
  operationsWorkingGroupGamma: "marketing",
  operationsWorkingGroupBeta: "human-resources",
};

export const identityValidatedRole = '🔷identity-verified';
export const councilMemberRole = "Council Member";

//mapping of group Id coming from Query node to server role name
export const wgToRoleMap: ChannelNames = {
  contentWorkingGroup: "Content Worker",
  storageWorkingGroup: "Storage Worker",
  forumWorkingGroup: "Forum Worker",
  distributionWorkingGroup: "Distribution Worker",
  operationsWorkingGroupAlpha: "Builder Worker",
  operationsWorkingGroupGamma: "Marketing Worker",
  operationsWorkingGroupBeta: "HR Worker",
  councilMemberRole: councilMemberRole
};

//same as above, just for lead
export const wgLeadToRoleMap: ChannelNames = {
  contentWorkingGroup: "Content Lead",
  storageWorkingGroup: "Storage Lead",
  forumWorkingGroup: "Forum Lead",
  distributionWorkingGroup: "Distribution Lead",
  operationsWorkingGroupAlpha: "Builder Lead",
  operationsWorkingGroupGamma: "Marketing Lead",
  operationsWorkingGroupBeta: "HR Lead"
};

export const wgEvents = [
  "ApplicationTerminated",
  "ApplicationWithdrawn",
  "AppliedOnOpening",
  "LeaderSet",
  "LeaderUnset",
  "BudgetSet",
  "UpdatedWorkingGroupBudget", //unlike all others, this event comes in a dedicated section 'joystreamUtility'
  "OpeningAdded",
  "OpeningCanceled",
  "RewardPaid",
  "OpeningFilled",
  "StakeDecreased",
  "StakeIncreased",
  "StakeSlashed",
  "TerminatedLeader",
  "TerminatedWorker",
  "WorkerExited",
  "WorkerRewardAmountUpdated",
];

export const joystreamBlue = "#4038FF"; // official joystream blue, see https://www.joystream.org/brand/guides/
