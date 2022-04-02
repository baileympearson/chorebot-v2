import { Command } from "./abstract-command";
import { CommandInteraction } from "./../../node_modules/discord.js/typings/index.d";

export class CompleteChoreCommand implements Command {
  readonly commandName = "complete-chore" as const;

  async execute(interaction: CommandInteraction) {
    await interaction.reply("Completed chore");
  }
}
