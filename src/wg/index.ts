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

; (async () => {
  console.log(banner);
  const discordBotToken = process.env.TOKEN || undefined; // environment variable TOKEN must be set

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

  client.login(discordBotToken).then(async () => {
    console.log(`Bot online. Current server[s]: ${client.guilds.cache.map(g => g.name).join(',')}`);
  });
})()