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

  // groups https://github.com/Joystream/joystream/blob/c57054eebe5da4f683134dbdaaecf50263ec7336/cli/src/Types.ts#L53-L63
  contentWorkingGroup: "▶｜content-curator",
  storageWorkingGroup: "💿｜storage-provider",
  forumWorkingGroup: "📋｜forum",
  membershipWorkingGroup: "membership",
  distributionWorkingGroup: "🔌｜distributors",
  gatewayWorkingGroup: "gateway",
  operationsWorkingGroupAlpha: "👷｜builders",
  operationsWorkingGroupGamma: "📈｜marketing",
  operationsWorkingGroupBeta: "👨｜human-resources",

  general: "💬｜general",
  council: "🏛｜council",
  contentCreator: "💻｜content-creator",
  techSupport: "💻｜tech-support",
  atlasFeedback: "🛫｜atlas-testing",
  validators: "✅｜validator",
  bounties: "💻｜active-bounties"
};

export const identityValidatedRole = 'on-chain identity verified';
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

export const forumCategoriesToChannels = [
  {
    category: {
      id: 1,
      name: 'Bounties'
    }, 
    channels: [
      channelNames.bounties
    ]
  }, 
  {
    category: {
      id: 3,
      name: 'Governance'
    }, 
    channels: [
      channelNames.council
    ]
  }, 
  {
    category: {
      id: 9,
      name: 'Forum WG'
    }, 
    channels: [
      channelNames.forum
    ]
  }, 
  {
    category: {
      id: 11,
      name: 'Content WG'
    }, 
    channels: [
      channelNames.contentWorkingGroup, channelNames.council
    ]
  }, 
  {
    category: {
      id: 12,
      name: 'Builders WG'
    }, 
    channels: [
      channelNames.operationsWorkingGroupAlpha, channelNames.council
    ]
  }, 
  {
    category: {
      id: 13,
      name: 'SP WG'
    }, 
    channels: [
      channelNames.storageWorkingGroup, channelNames.council
    ]
  }, 
  {
    category: {
      id: 14,
      name: 'Marketing WG'
    }, 
    channels: [
      channelNames.operationsWorkingGroupGamma, channelNames.council
    ]
  }, 
  {
    category: {
      id: 15,
      name: 'Distribution WG'
    }, 
    channels: [
      channelNames.distributionWorkingGroup, channelNames.council
    ]
  }, 
  {
    category: {
      id: 16,
      name: 'HR WG'
    }, 
    channels: [
      channelNames.operationsWorkingGroupBeta, channelNames.council
    ]
  }, 
  {
    category: {
      id: 18,
      name: 'Content Creators'
    }, 
    channels: [
      channelNames.contentCreator
    ]
  }, 
  {
    category: {
      id: 19,
      name: 'Validators'
    }, 
    channels: [
      channelNames.validators
    ]
  }, 
  {
    category: {
      id: 23,
      name: 'Discussion'
    }, 
    channels: [
      channelNames.general
    ]
  }, 
  {
    category: {
      id: 25,
      name: 'Help & Support'
    }, 
    channels: [
      channelNames.general,
      channelNames.techSupport
    ]
  }, 
  {
    category: {
      id: 28,
      name: 'Creatives'
    }, 
    channels: [
      channelNames.general
    ]
  }, 
  {
    category: {
      id: 29,
      name: 'Marketing'
    }, 
    channels: [
      channelNames.operationsWorkingGroupGamma
    ]
  }, 
  {
    category: {
      id: 30,
      name: 'Development'
    }, 
    channels: [
      channelNames.operationsWorkingGroupAlpha
    ]
  }, 
  {
    category: {
      id: 31,
      name: 'Atlas Feedback'
    }, 
    channels: [
      channelNames.atlasFeedback
    ]
  }, 
  {
    category: {
      id: 32,
      name: 'Education'
    }, 
    channels: [
      channelNames.general
    ]
  }, 
  {
    category: {
      id: 33,
      name: 'Grants'
    }, 
    channels: [
      channelNames.general
    ]
  }, 
  {
    category: {
      id: 35,
      name: 'Lounge'
    }, 
    channels: [
      channelNames.general
    ]
  }, 
]


export const joystreamBlue = "#4038FF"; // official joystream blue, see https://www.joystream.org/brand/guides/
