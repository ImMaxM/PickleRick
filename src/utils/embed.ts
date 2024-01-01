import { EmbedBuilder, resolveColor } from "discord.js";
import { config } from "./config";
import log from "./logger";

export const primaryEmbed = (title: string, description: string) =>
  new EmbedBuilder()
    .setColor(resolveColor(config.PRIMARY_COLOR))
    .setTitle(title)
    .setDescription(description);

export const errorEmbed = (title: string, description: string) =>
  new EmbedBuilder()
    .setColor(resolveColor(config.ERROR_COLOR))
    .setTitle(title)
    .setDescription(description);
