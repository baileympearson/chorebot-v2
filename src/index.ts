import { on } from "stream";
import { Client, Intents, CacheType, Interaction } from "discord.js";
import * as dotenv from "dotenv";
import { buildCommand } from "./commands";
import { once } from "events";
import { logger } from "./utils";

dotenv.config();

const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

async function initialize(client: Client, token: string): Promise<string> {
  logger.debug("Initializing client...");
  const [_, string] = await Promise.all([
    once(client, "ready"),
    client.login(token),
  ]);

  logger.debug("Successfully initialized client.");
  return string;
}

async function* interactionCreateEvents(client: Client) {
  for await (const [event] of on(client, "interactionCreate")) {
    const _event = event as Interaction<CacheType>;
    if (_event.isCommand()) {
      yield _event;
    }
  }
}

async function main() {
  await initialize(client, token!);

  for await (const interaction of interactionCreateEvents(client)) {
    const command = buildCommand(interaction);
    if (command != null) {
      logger.debug(`Processing command ${command.commandName}`);
      try {
        await command.execute(interaction);
        logger.debug(`Successfully executed ${command.commandName}`);
      } catch (err) {
        await interaction.reply("oops, something went wrong");
        logger.debug(`Something went wrong processing ${command.commandName}`);
      }
    } else {
      logger.error(
        undefined,
        "Received unknown command",
        interaction.commandName
      );
    }
  }
}

main();
