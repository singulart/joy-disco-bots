import { AnyChannel, Client, Collection, TextChannel } from "discord.js";
import { channelNames } from "../config";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Hash, EventRecord } from "@polkadot/types/interfaces";
import { BlockNumber } from "@joystream/types/common";
import { Vec } from "@polkadot/types";
import { types } from "@joystream/types";


//types
import {
  DiscordChannels,
  Options,
} from "./types";

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

  export const parseArgs = (args: string[]): Options => {
  const inArgs = (term: string): boolean => {
    return args.find((a) => a.search(term) > -1) ? true : false;
  };

  const options: Options = {
    verbose: inArgs("--verbose") ? 2 : inArgs("--quiet") ? 0 : 1,
    channel: inArgs("--channel"),
    council: inArgs("--council"),
    forum: inArgs("--forum"),
    proposals: inArgs("--proposals"),
  };

  if (options.verbose > 1) console.debug("args", args, "\noptions", options);
  return options;
};

export const getDiscordChannels = async (
  client: Client
): Promise<DiscordChannels> => {
  let discordChannels: DiscordChannels = {};
  Object.keys(channelNames).map(async (c) => {
    const channel = findDiscordChannel(client, channelNames[c]);
    if (channel) discordChannels[c] = channel;
    else {
      console.log(`Channel '${channelNames[c]}' not found on this server`);
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

export const delay = (milliseconds: number) => {
  return new Promise( resolve => setTimeout(resolve, milliseconds) );
}