import SlashCommand from "../../structures/Command";
import { ChatInputCommandInteraction } from "discord.js";
import { primaryEmbed } from "../../utils/embed";

export default class ExampleCommand extends SlashCommand {
  constructor() {
    super({
      name: "ping",
      description: "Check the current latency of the bot",
    });
  }

  async exec(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    await interaction.editReply({
      embeds: [
        primaryEmbed(
          "Pong!",
          `Latency: \`${Date.now() - interaction.createdTimestamp}ms\``
        ),
      ],
    });
  }
}
