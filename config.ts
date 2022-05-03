import { ChannelNames } from "./src/types";
export const dbFile = "./db.json";

// href
export const domain = "https://pioneer.joystreamstats.live";
export const apiUrl = "https://api.joystreamstats.live/api";
export const statusUrl = "https://joystreamstats.live/static/status.json";
export const dapplookerUrl =
  "https://analytics.dapplooker.com/api/public/dashboard/c70b56bd-09a0-4472-a557-796afdc64d3b/card/155";
export const wsLocation = "wss://rpc.joystream.org:9944"; //"wss://joystreamstats.live:9945";

// bot tokens
export const discordToken = "ODQ4MzEzMzkzOTQ5MDQ4ODcy.YLKzag.VCCPTkF_hcCbEOCXhsmFfISw138";
export const tgToken = "";

// telegram chat ID
export const chatid = "-1001438587296";

// time between heartbeat announcement in milliseconds
export const heartbeat = 60000 * 60 * 6;
export const councilStatusHeartbeat = 86400000;

// minutes between checking for proposal updates
export const proposalDelay = 15;

export const suppressedThreads = [180, 265, 275, 390]; // 180 tokens, 265 faucet, 275 pets, 390 bounty-24

// storage bot
export const reRunCronTimingInHour = 5;

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
  operationsWorkingGroupGamma: "human-resources",
  operationsWorkingGroupBeta: "marketing"
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
