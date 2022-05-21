import { AnyChannel, Client, Collection, Role, TextChannel } from "discord.js";
import { channelNames } from "../config";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Hash, EventRecord } from "@polkadot/types/interfaces";
import { BlockNumber } from "@joystream/types/common";
import { Vec } from "@polkadot/types";
import { types } from "@joystream/types";
import { DiscordChannels } from "./types";

export const connectApi = async (url: string): Promise<ApiPromise> => {
  const provider = new WsProvider(url);
  return await ApiPromise.create({ provider, types });
}

export const getBlockHash = (
  api: ApiPromise,
  block: BlockNumber | number
): Promise<Hash> => {
  try {
    return api.rpc.chain.getBlockHash(block);
  } catch (e) {
    return getBestHash(api);
  }
};

export const getBestHash = (api: ApiPromise) =>
  api.rpc.chain.getFinalizedHead();

export const getEvents = (
    api: ApiPromise,
    hash: Hash
  ): Promise<Vec<EventRecord>> => api.query.system.events.at(hash);

export const getDiscordChannels = async (
  client: Client
): Promise<DiscordChannels> => {
  let discordChannels: DiscordChannels = {};
  Object.keys(channelNames).map(async (c) => {
    const channel = findDiscordChannel(client, channelNames[c]);
    if (channel) discordChannels[c] = channel;
    else {
      console.warn(`Channel '${channelNames[c]}' not found on this server`);
    }
  });
  return discordChannels;
};

export const findDiscordChannel = (
  client: Client,
  name: string
): TextChannel[] =>
  client.channels.cache.filter(
    (channel: any) => channel.name === name
  ).map((value: AnyChannel, key: string, collection: Collection<string, AnyChannel>) => value as TextChannel);

export const findServerRole = async (
  client: Client,
  serverName: string,
  roleName: string
): Promise<Role | undefined> => {
  
  const server = await client.guilds.fetch(serverName);
  // if(!server) console.error(`Server`);
  const role = server.roles.cache.find(role => role.name === roleName);
  return role;
}
  
export const delay = (milliseconds: number) => {
  return new Promise( resolve => setTimeout(resolve, milliseconds) );
}