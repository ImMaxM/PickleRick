import { ChatInputCommandInteraction } from "discord.js";

export type SlashCommandOptions = {
  name: string;
  description: string;
};

export default class SlashCommand {
  constructor(public options: SlashCommandOptions) {}

  async exec(interaction: ChatInputCommandInteraction) {
    throw new Error("Execute function not implemented.");
  }

  async register() {
    throw new Error("Register function not implemented.");
  }
}
