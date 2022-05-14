import Discord from "discord.js";

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

export interface Options {
  verbose: number;
  channel: boolean;
  council: boolean;
  forum: boolean;
  proposals: boolean;
}

