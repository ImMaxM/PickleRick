import { Client, CommandInteraction, Interaction } from "discord.js";

export type EventOptions = {
  name: string;
  once: boolean;
  event: string;
};

export default class Event {
  constructor(public options: EventOptions) {}

  async exec(interaction: Interaction) {
    throw new Error("Execute function not implemented.");
  }

  async register(client: Client, once: boolean = this.options.once) {
    once
      ? client.once(this.options.event, this.exec)
      : client.on(this.options.event, this.exec);
  }

  async unregister(client: Client) {
    client.removeListener(this.options.event, this.exec);
  }
}
