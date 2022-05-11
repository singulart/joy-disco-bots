import { EventRecord, Hash } from "@polkadot/types/interfaces";
import { Header } from '@polkadot/types/interfaces'
import { wsLocation} from "../../config";
import { DiscordChannels } from "../types";
import { ApiPromise } from "@polkadot/api";
import Discord, { Intents } from "discord.js";
import { getDiscordChannels } from "../util";
import { connectApi, getBlockHash, getEvents } from "./api_extension";
import { processGroupEvents } from "./wg_event_handlers";
import { banner } from "../banner";
import { exit } from "process";

; (async () => {
  console.log(banner);
  const discordBotToken = process.env.TOKEN || undefined; // environment variable TOKEN must be set
  if(!discordBotToken) {
    console.error('No token provided. Set TOKEN environment variable');
    exit(1);
  }
  const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS] });

  client.once("ready", async () => {
    console.log('Bot ready');
    const channels: DiscordChannels = await getDiscordChannels(client);
    const api: ApiPromise = await connectApi(wsLocation);
    await api.isReady;
    console.log(`Connected to RPC endpoint [${wsLocation}]`);
    api.rpc.chain.subscribeFinalizedHeads(async (header: Header) => {
      const hash = await getBlockHash(api, +header.number);
      const events = await getEvents(api, hash);
      processGroupEvents(+header.number, events, channels);
    });
  });

  client.on("debug", console.log);
  client.on("error", console.error);
  client.on("apiResponse", console.log);
  client.on("apiRequest", console.log);

  client.login(discordBotToken).then(async () => {
    console.log(`Bot online. Current server[s]: ${(await client.guilds.fetch({limit: 10})).map((g) => g.name).join(',')}`);
  });
})()