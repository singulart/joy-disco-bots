import { OpeningId, Opening, ApplicationId, Application } from "@joystream/types/working-group";
// import { Application as HiringApplication, Opening as HiringOpening} from "@joystream/types/hiring";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Hash, EventRecord } from "@polkadot/types/interfaces";
import { BlockNumber } from "@joystream/types/common";
import { Option, u32, u64, Vec, StorageKey } from "@polkadot/types";
import { types } from "@joystream/types";

export const getApplication = async (api: ApiPromise, group: string, hash: Hash, applicationId: ApplicationId): Promise<Application> => {
    return api.query[group].applicationById.at(hash, applicationId)
}

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
  