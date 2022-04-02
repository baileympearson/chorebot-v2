import { Client, Intents } from "discord.js";
import * as dotenv from "dotenv";
import { on } from "stream";
import { buildCommand } from "./commands";
import { once } from "events";

dotenv.config();

const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

async function initialize(client: Client, token: string): Promise<string> {
  const [_, string] = await Promise.all([
    once(client, "ready"),
    client.login(token),
  ]);

  return string;
}

async function main() {
  await initialize(client, token!);

  for await (const [interaction] of on(client, "interactionCreate")) {
    const command = buildCommand(interaction);
    if (command != null) {
      try {
        await command.execute(interaction);
      } catch (err) {
        await interaction.reply("oops, something went wrong");
      }
    }
  }
}

main();
