import Discord from "discord.js";
import { ProposalId } from "@joystream/types/proposals";

export interface Storage {
  channels: number;
  curators: number;
  files: number;
  providers: number;
  size: number;
  timeStamp: string;
}

export interface Db {
  args: string[];
  council: { timestamp: Date };
  tokenomics: { timestamp: Date };
  validators: { timestamp: Date };
  storage?: Storage;
}

export interface Status {
  roles: { storage_providers: number };
  media: {
    media_files: number;
    size: number;
    activeCurators: number;
    channels: number;
  };
}

export interface ChannelNames {
  [key: string]: string;
}
export interface DiscordChannels {
  [key: string]: Discord.TextChannel[];
}

export interface Council {
  round: number;
  last: string;
  seats: MemberHandles[];
}

export interface Options {
  verbose: number;
  channel: boolean;
  council: boolean;
  forum: boolean;
  proposals: boolean;
}

export interface Proposals {
  current: number;
  last: number;
  active: ProposalId[];
  executing: number[];
}

export interface Block {
  id: number;
  timestamp: number;
  duration: number;
  stake: number;
  noms: number;
  vals: number;
  issued: number;
  reward: number;
}

// github
export interface MemberHandles {
  memberId: number;
  handle: string;
  discord?: { handle: string; id: number };
  telegram?: string;
}

