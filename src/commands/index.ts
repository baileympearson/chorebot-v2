import { Command } from "./abstract-command";
import {
  CacheType,
  Interaction,
} from "./../../node_modules/discord.js/typings/index.d";
import { CompleteChoreCommand } from "./complete-chore";
import { ListChoresCommand } from "./list-chores";

type Commands = ListChoresCommand | CompleteChoreCommand;
type CommandName = Commands["commandName"];

export const COMMAND_NAMES: CommandName[] = ["list-chores", "complete-chore"];

function isValidCommand(commandName: string): commandName is CommandName {
  return COMMAND_NAMES.includes(commandName as any);
}

export function buildCommand(
  interaction: Interaction<CacheType>
): Commands | null {
  if (!interaction.isCommand()) {
    return null;
  }

  let { commandName } = interaction;

  if (!isValidCommand(commandName)) {
    return null;
  }

  switch (commandName) {
    case "complete-chore":
      return new CompleteChoreCommand();
    case "list-chores":
      return new ListChoresCommand();
  }
}
