import { AutocompleteInteraction, CommandInteraction } from "discord.js";
import Event from "../structures/Event";
import Meili from "../handlers/meili";

export default class ReadyEvent extends Event {
  constructor() {
    super({
      name: "interactionCreate",
      once: false,
      event: "interactionCreate",
    });
  }

  async exec(interaction: AutocompleteInteraction) {
    if (!interaction.isAutocomplete()) return;

    if (interaction.commandName !== "character") return;

    const characters = await Meili.search(
      "characters",
      interaction.options.getFocused()
    );

    const result = characters.hits.map((character) => {
      return {
        name: `${character.name} (${character.location.name})`,
        value: character.id.toString(),
      };
    });

    interaction.respond(result);
  }
}
