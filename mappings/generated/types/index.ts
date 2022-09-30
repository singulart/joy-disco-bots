import { TypeRegistry, Metadata } from "@polkadot/types";
import metadataHex from "./metadata.json";
import path from "path";
import fs from "fs";

const typeRegistry = new TypeRegistry();
const metadata = new Metadata(typeRegistry, metadataHex as `0x${string}`);

typeRegistry.setMetadata(metadata);

export { typeRegistry };

export * from "./members";
export * from "./storage-working-group";
export * from "./proposals-codex";
export * from "./proposals-engine";
export * from "./proposals-discussion";
export * from "./forum";
export * from "./content";
export * from "./storage";
export * from "./council";
export * from "./referendum";
export * from "./joystream-utility";
