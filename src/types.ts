import Discord from "discord.js";

export interface ChannelNames {
  [key: string]: string;
}
export interface DiscordChannels {
  [key: string]: Discord.TextChannel[];
}