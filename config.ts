import { ChannelNames } from "./src/types";
export const dbFile = "./db.json";

export const wsLocation = "wss://rpc.joystream.org:9944"; 

// bot tokens
export const discordToken = "";

// time between heartbeat announcement in milliseconds
export const heartbeat = 60000 * 60 * 6;
export const councilStatusHeartbeat = 86400000;

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
  proposals: "proposals-bot",
  forum: "forum-bot",
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
  operationsWorkingGroupBeta: "human-resources"
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
