import { AnyChannel, Client, Collection, TextChannel } from "discord.js";
import { channelNames } from "../config";
import moment from "moment";
import axios from "axios";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Hash, EventRecord } from "@polkadot/types/interfaces";
import { BlockNumber } from "@joystream/types/common";
import { Vec } from "@polkadot/types";
import { types } from "@joystream/types";


//types
import {
  DiscordChannels,
  Options,
  Proposals,
  MemberHandles,
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

export const printStatus = (
  opts: Options,
  data: {
    block: number;
    chain: string;
    posts: number[];
    proposals: Proposals;
  }
): void => {
  if (opts.verbose < 1) return;

  const { block, chain, proposals, posts } = data;
  const date = formatTime();
  let message = `[${date}] ${chain} #${block} `;

  if (opts.forum) message += `Posts:${posts[1]} `;
  if (opts.proposals)
    message += `Proposals:${proposals.current} (Voting:${proposals.active.length} GracePeriod:${proposals.executing.length}) `;

  console.debug(message);
};

// time
export const formatTime = (time?: any, format = "H:mm:ss"): string =>
  moment(time).format(format);

export const passedTime = (start: number, now: number): string => {
  const passed = moment.utc(moment(now).diff(start)).valueOf();
  const format =
    passed > 86400000
      ? "d:HH:mm:ss[d]"
      : passed > 3600000
      ? "H:mm:ss[h]"
      : "mm:ss[m]";
  return formatTime(passed, format);
};

// status endpoint
const formatPrice = (price: number) =>
  `${Math.floor(price * 100000000) / 100} $`;

// member handles (tg, discord, github)
export const getMemberHandles = async (): Promise<MemberHandles[]> => {
  console.debug(`Fetching user handles`);
  const rawUrl = `https://raw.githubusercontent.com/Joystream/community-repo/master/council/guides/council_member_discord_usernames.md`;
  return await axios
    .get(rawUrl)
    .then(({ data }) => {
      const rows = data
        .split(`\n`)
        .filter((line: string) => line.includes(`|`))
        .slice(2);
      return rows.map((row: string) => {
        const [, handle, discord, id, telegram, github] = row
          .split(`|`)
          .map((s) => s.trim());
        return { handle, discord: { handle: discord, id }, telegram, github };
      });
    })
    .catch((error) => {
      console.error(`Fetch user handles.`, error.message);
      return [];
    });
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