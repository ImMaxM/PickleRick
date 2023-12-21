import log from "./utils/logger";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import fs from "fs";
import SlashCommand from "./structures/Command";
import path from "path";

import "./utils/config";
import { config } from "./utils/config";

export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
});

export const start = Date.now();

log.info("| Loading all commands...");
export const commands = new Collection<string, SlashCommand>();
const cmdsLoading = (async function loadCommands(
  dir = path.resolve(__dirname, "commands")
) {
  const files = fs.readdirSync(dir);
  for (const file in files) {
    const isDir = fs.lstatSync(path.join(dir, files[file])).isDirectory();

    if (isDir) {
      await loadCommands(path.join(dir, files[file]));
      continue;
    }

    const loadedCommand = await import(path.join(dir, files[file]));
    const command: SlashCommand = new loadedCommand.default();

    commands.set(command.options.name, command);

    log.info(`| * Loaded command ${command.options.name}`);
  }
})();

Promise.all([cmdsLoading]).then(() => {
  log.info("| Loading all events...");
  const eventsLoading = (async function loadEvents(
    dir = path.resolve(__dirname, "events")
  ) {
    const files = fs.readdirSync(dir);
    for (const file in files) {
      const isDir = fs.lstatSync(path.join(dir, files[file])).isDirectory();

      if (isDir) {
        await loadEvents(path.join(dir, files[file]));
        continue;
      }

      const loadedEvent = await import(path.join(dir, files[file]));
      const event = new loadedEvent.default();

      await event.register(client);

      log.info(`| * Loaded event ${event.options.name}`);
    }
  })().then(() => {
    log.info(
      "Finished loading all commands and events. (Took " +
        (Date.now() - start) +
        "ms)"
    );
    log.info("Logging into Discord...");
    client.login(config.TOKEN);
  });
});
