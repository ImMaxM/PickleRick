import { HexColorString } from "discord.js";
import dotenv from "dotenv";

type Config = {
  ENV: string;
  TOKEN: string;
  DEV_SERVER_ID: string;

  MEILISEARCH_HOST: string;

  PRIMARY_COLOR: HexColorString;
  ERROR_COLOR: HexColorString;
};

const defaultConfig: Config = {
  ENV: "dev",
  TOKEN: "",
  DEV_SERVER_ID: "",

  MEILISEARCH_HOST: "http://localhost:7700",

  PRIMARY_COLOR: "#3D5839",
  ERROR_COLOR: "#CC3748",
};

export const config: Config = {
  ...defaultConfig,
  ...dotenv.config().parsed,
};
