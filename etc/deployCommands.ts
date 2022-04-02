import {
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

const { config } = require("dotenv");
config();

const commands = [
  new SlashCommandBuilder()
    .setName("list-chores")
    .setDescription("Lists the chores to be done."),
  new SlashCommandBuilder()
    .setName("complete-chore")
    .addStringOption(
      new SlashCommandStringOption()
        .setName("chorename")
        .setDescription("The name of the chore to complete.")
        .setRequired(true)
    )
    .setDescription("Complete a chore."),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN!);

rest
  .put(
    Routes.applicationGuildCommands(process.env.APP_ID!, process.env.GUILD_ID!),
    { body: commands }
  )
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
