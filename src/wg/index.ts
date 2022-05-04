import { EventRecord, Hash } from "@polkadot/types/interfaces";
import { Header } from '@polkadot/types/interfaces'
import { wsLocation} from "../../config";
import { DiscordChannels } from "../types";
import { ApiPromise } from "@polkadot/api";
import Discord, { Intents } from "discord.js";
import { getDiscordChannels } from "../util";
import { connectApi, getBlockHash, getEvents } from "./api_extension";
import { processGroupEvents } from "./wg_event_handlers";

; (async () => {

  const discordBotToken = process.env.TOKEN || undefined; // environment variable TOKEN must be set

  const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS] });

    client.once("ready", async () => {
      console.log('Discord.js client ready');
      const channels: DiscordChannels = await getDiscordChannels(client);
      const api: ApiPromise = await connectApi(wsLocation);
      await api.isReady;
      api.rpc.chain.subscribeFinalizedHeads(async (header: Header) => {
        getBlockHash(api, +header.number).then((hash) =>
          getEvents(api, hash).then((events: EventRecord[]) =>
            processGroupEvents(+header.number, events, channels)
          )
        )
      })
    });

  client.login(discordBotToken).then(async () => {
    console.log(`Bot logged in. Current server[s]: ${client.guilds.cache.map(g => g.name).join(', ')}`);
  });
})()