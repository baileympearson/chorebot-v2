import { CommandInteraction } from "./../../node_modules/discord.js/typings/index.d";

interface Executable {
  execute: (interaction: CommandInteraction) => Promise<void>;
}

interface Namable {
  commandName: string;
}

export type Command = Executable & Namable;
