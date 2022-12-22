import { AnyChannel, Client, Role, TextChannel } from 'discord.js';
import { channelNames } from '../config';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Hash, EventRecord } from '@polkadot/types/interfaces';
import { BlockNumber } from '@polkadot/types/interfaces';
import { Vec } from '@polkadot/types';
import { DiscordChannels } from './types';

export async function connectApi(url: string): Promise<ApiPromise> {
  const provider = new WsProvider(url);
  return await ApiPromise.create({ provider });
}

export function getBlockHash(api: ApiPromise,  block: BlockNumber | number): Promise<Hash> {
  try {
    return api.rpc.chain.getBlockHash(block);
  } catch (e) {
    return getBestHash(api);
  }
};

export function getBestHash(api: ApiPromise) {
  return api.rpc.chain.getFinalizedHead();
}

export function getEvents(api: ApiPromise, hash: Hash): Promise<Vec<EventRecord>> {
  return api.query.system.events.at(hash);
} 

export async function getDiscordChannels (client: Client): Promise<DiscordChannels> {
  const discordChannels: DiscordChannels = {};
  Object.keys(channelNames).map(async (c) => {
    const channel = findDiscordChannel(client, channelNames[c]);
    if (channel && channel.length > 0) discordChannels[c] = channel;
    else {
      console.warn(`Channel '${channelNames[c]}' not found on this server`);
    }
  });
  return discordChannels;
};

export function findDiscordChannel(client: Client,  name: string): TextChannel[] {
  return client.channels.cache.filter(
    (channel: any) => channel.name === name
  ).map((value: AnyChannel) => value as TextChannel);
}

export async function findServerRole(
  client: Client,
  serverName: string,
  roleName: string
): Promise<Role | undefined> {
  
  const server = await client.guilds.fetch(serverName);
  const role = server.roles.cache.find(role => role.name === roleName);
  return role;
}
  
export function delay(milliseconds: number) {
  return new Promise( resolve => setTimeout(resolve, milliseconds) );
}