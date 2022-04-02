import { Command } from "./abstract-command";
import { CommandInteraction } from "./../../node_modules/discord.js/typings/index.d";

export class ListChoresCommand implements Command {
  readonly commandName = "list-chores" as const;

  async execute(interaction: CommandInteraction) {
    const message = Array.from(
      { length: 5 },
      () => `- "Hello from chorebot"`
    ).join("\n");
    await interaction.reply(message);
  }
}
