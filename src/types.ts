import Discord from "discord.js";
import { EventRecord } from '@polkadot/types/interfaces'

export interface ChannelNames {
  [key: string]: string;
}
export interface DiscordChannels {
  [key: string]: Discord.TextChannel[];
}

export interface EventWithBlock {
  block: number,
  event: EventRecord
}