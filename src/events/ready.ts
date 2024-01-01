import Event from "../structures/Event";
import log from "../utils/logger";
import { client, commands, start } from "..";
import { config } from "../utils/config";
import SlashCommand from "../structures/Command";
import {
  RESTPostAPIApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from "discord.js";

export default class ReadyEvent extends Event {
  constructor() {
    super({
      name: "ready",
      once: true,
      event: "ready",
    });
  }

  async exec() {
    log.info(`Logged in as ${client.user?.tag} in ${Date.now() - start}ms`);

    if (["deploy", "d"].includes(process.argv[2])) {
      log.info(
        `| Deploying ${commands.size} command${commands.size > 1 ? "s" : ""} ${
          config.ENV == "prod" ? "globally" : "locally"
        }...`
      );

      const commandsToDeploy = commands.map((command) => command);

      for (const command of commandsToDeploy) {
        try {
          if (config.ENV == "prod") {
            await client.application?.commands.create(
              buildSlashCommand(command)
            );
          } else {
            await client.guilds.cache
              .get(config.DEV_SERVER_ID)
              ?.commands.create(buildSlashCommand(command));
          }
          log.info(`| * Deployed command ${command.options.name}!`);
        } catch (error) {
          log.error(
            `An error occurred while deploying the command ${command.options.name}!`
          );
          log.error(error);
        }
      }
    }
  }
}

function buildSlashCommand(
  command: SlashCommand
): RESTPostAPIApplicationCommandsJSONBody {
  const defaultOptions = new SlashCommandBuilder()
    .setName(command.options.name)
    .setDescription(command.options.description);

  var data = command.build(client, defaultOptions);
  if (data instanceof SlashCommandBuilder) data = data.toJSON();

  return data;
}
