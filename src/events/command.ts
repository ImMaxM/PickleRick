import { ChatInputCommandInteraction } from "discord.js";
import Event from "../structures/Event";
import { commands } from "..";
import log from "../utils/logger";

export default class InteractionEvent extends Event {
  constructor() {
    super({
      name: "interactionCreate",
      once: false,
      event: "interactionCreate",
    });
  }

  async exec(interaction: ChatInputCommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    const commandName = interaction.commandName;
    const commandData = commands.get(commandName);

    if (!commandData) {
      return log.warn(`Missing command: ${commandName}!`);
    }

    try {
      commandData.exec(interaction);
    } catch (error) {
      log.error(
        `An error occurred while executing the command ${commandName}!`
      );
      log.error(error);
    }
  }
}
