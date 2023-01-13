import { EventEmitterModuleOptions } from '@nestjs/event-emitter/dist/interfaces';
import { AxiosRequestConfig } from 'axios';
import { BackOffPolicy, RetryOptions } from 'typescript-retry-decorator';
import { ChannelNames, Licenses } from './src/types';

export const database = 'joy_dao';

// wg bot
export const channelNames: ChannelNames = {
  // Discussion
  general: '💬｜general',
  techSupport: '💻｜tech-support',
  atlasFeedback: '🛫｜atlas-testing',
  // DAO
  // groups https://github.com/Joystream/joystream/blob/c57054eebe5da4f683134dbdaaecf50263ec7336/cli/src/Types.ts#L53-L63
  operationsWorkingGroupAlpha: '👷｜builders',
  validators: '✅｜validator',
  storageWorkingGroup: '💿｜storage-provider',
  distributionWorkingGroup: '🔌｜distributors',
  contentWorkingGroup: '▶｜content-curator',
  contentCreator: '💻｜content-creator',
  operationsWorkingGroupGamma: '📈｜marketing',
  operationsWorkingGroupBeta: '👨｜human-resources',
  forumWorkingGroup: '📋｜forum',
  council: '🏛｜council',
  proposals: '📋｜proposals',
  bounties: '💻｜active-bounties',
  // BOTS
  videos: '🤖｜video-bot',
  forumspam: '🤖｜forum-bot',
};

export const identityValidatedRole = 'on-chain identity verified';
export const councilMemberRole = 'Council Member';

//mapping of group Id coming from Query node to server role name
export const wgToRoleMap: ChannelNames = {
  contentWorkingGroup: 'Content Worker',
  storageWorkingGroup: 'Storage Worker',
  forumWorkingGroup: 'Forum Worker',
  distributionWorkingGroup: 'Distribution Worker',
  operationsWorkingGroupAlpha: 'Builder Worker',
  operationsWorkingGroupGamma: 'Marketing Worker',
  operationsWorkingGroupBeta: 'HR Worker',
  councilMemberRole: councilMemberRole,
};

//same as above, just for lead [this is not yet implemented!]
export const wgLeadToRoleMap: ChannelNames = {
  contentWorkingGroup: 'Content Lead',
  storageWorkingGroup: 'Storage Lead',
  forumWorkingGroup: 'Forum Lead',
  distributionWorkingGroup: 'Distribution Lead',
  operationsWorkingGroupAlpha: 'Builder Lead',
  operationsWorkingGroupGamma: 'Marketing Lead',
  operationsWorkingGroupBeta: 'HR Lead',
};

export const wgEvents = [
  'ApplicationTerminated',
  'ApplicationWithdrawn',
  'AppliedOnOpening',
  'LeaderSet',
  'LeaderUnset',
  'BudgetSet',
  'UpdatedWorkingGroupBudget', //unlike all others, this event comes in a dedicated section 'joystreamUtility'
  'OpeningAdded',
  'OpeningCanceled',
  'RewardPaid',
  'OpeningFilled',
  'StakeDecreased',
  'StakeIncreased',
  'StakeSlashed',
  'TerminatedLeader',
  'TerminatedWorker',
  'WorkerExited',
  'WorkerRewardAmountUpdated',
];

export const licenses: Licenses = {
  '1000': 'Custom',
  '1001': 'PDM',
  '1002': 'CC0',
  '1003': 'CC_BY',
  '1004': 'CC_BY_SA',
  '1005': 'CC_BY_ND',
  '1006': 'CC_BY_NC',
  '1007': 'CC_BY_NC_SA',
  '1008': 'CC_BY_NC_ND',
};

export const forumCategoriesToChannels = [
  {
    category: {
      id: 1,
      name: 'Bounties',
    },
    channels: [channelNames.bounties],
  },
  {
    category: {
      id: 3,
      name: 'Governance',
    },
    channels: [channelNames.council],
  },
  {
    category: {
      id: 9,
      name: 'Forum WG',
    },
    channels: [channelNames.forum],
  },
  {
    category: {
      id: 11,
      name: 'Content WG',
    },
    channels: [channelNames.contentWorkingGroup, channelNames.council],
  },
  {
    category: {
      id: 12,
      name: 'Builders WG',
    },
    channels: [channelNames.operationsWorkingGroupAlpha, channelNames.council],
  },
  {
    category: {
      id: 13,
      name: 'SP WG',
    },
    channels: [channelNames.storageWorkingGroup, channelNames.council],
  },
  {
    category: {
      id: 14,
      name: 'Marketing WG',
    },
    channels: [channelNames.operationsWorkingGroupGamma, channelNames.council],
  },
  {
    category: {
      id: 15,
      name: 'Distribution WG',
    },
    channels: [channelNames.distributionWorkingGroup, channelNames.council],
  },
  {
    category: {
      id: 16,
      name: 'HR WG',
    },
    channels: [channelNames.operationsWorkingGroupBeta, channelNames.council],
  },
  {
    category: {
      id: 18,
      name: 'Content Creators',
    },
    channels: [channelNames.contentCreator],
  },
  {
    category: {
      id: 19,
      name: 'Validators',
    },
    channels: [channelNames.validators],
  },
  {
    category: {
      id: 23,
      name: 'Discussion',
    },
    channels: [channelNames.forumspam],
  },
  {
    category: {
      id: 25,
      name: 'Help & Support',
    },
    channels: [channelNames.techSupport],
  },
  {
    category: {
      id: 28,
      name: 'Creatives',
    },
    channels: [channelNames.contentCreator],
  },
  {
    category: {
      id: 29,
      name: 'Marketing',
    },
    channels: [channelNames.operationsWorkingGroupGamma],
  },
  {
    category: {
      id: 30,
      name: 'Development',
    },
    channels: [channelNames.operationsWorkingGroupAlpha],
  },
  {
    category: {
      id: 31,
      name: 'Atlas Feedback',
    },
    channels: [channelNames.atlasFeedback],
  },
  {
    category: {
      id: 32,
      name: 'Education',
    },
    channels: [channelNames.forumspam],
  },
  {
    category: {
      id: 35,
      name: 'Lounge',
    },
    channels: [channelNames.forumspam],
  },
];

export const globalRetryConfig: RetryOptions = {
  maxAttempts: 3,
  backOffPolicy: BackOffPolicy.ExponentialBackOffPolicy,
  backOff: 1000,
  exponentialOption: { maxInterval: 4000, multiplier: 3 },
};

export const globalEventingConfig: EventEmitterModuleOptions = {
  global: true,
  wildcard: true,
  maxListeners: 32,
};

export const axiosConfig: AxiosRequestConfig = {
  timeout: 10000, // 10 sec in milliseconds
};

export const joystreamBlue = '#4038FF'; // official joystream blue, see https://www.joystream.org/brand/guides/
