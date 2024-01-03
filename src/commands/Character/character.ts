import SlashCommand from "../../structures/Command";
import {
  Client,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { primaryEmbed } from "../../utils/embed";
import Meili from "../../handlers/meili";

export default class CharacterCommand extends SlashCommand {
  constructor() {
    super({
      name: "character",
      description: "Lookup information about a specific character",
    });
  }

  async exec(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    const characterData = await Meili.get(
      "characters",
      interaction.options.getString("character")!
    );

    await interaction.editReply({
      embeds: [
        primaryEmbed(
          `🔎 Information on: ${characterData.name}`,
          `**Full Name:** ${characterData.name}
          **Gender:** ${characterData.gender}

          **Status:** ${
            characterData.status == "Alive"
              ? "<:online:970075299096166450> Alive"
              : "<:offline:1187804674171084910> Dead"
          }

          **Species:** ${characterData.species}
          **Special Attributes:** ${
            characterData.type == "" ? "None" : characterData.type
          }

          **Origin:** ${characterData.origin.name}
          **Location:** ${characterData.location.name}`
        ).setThumbnail(characterData.image),
      ],
    });
  }

  build(client: Client<boolean>, command: SlashCommandBuilder) {
    return command
      .addStringOption((string) =>
        string
          .setName("character")
          .setDescription("Character to lookup")
          .setRequired(true)
          .setAutocomplete(true)
      )
      .toJSON();
  }
}
