import SwissClient from "../../SwissClient";
import { Message, MessageEmbed, TextChannel } from "discord.js";
import { Client as PgClient } from "pg";
import { log_yellow } from "../../config";
import GitHub from "github-api";

export let name = "channels";

export async function execute(
  client: SwissClient,
  message: Message,
  args: string[],
  db: PgClient
) {
    client.channels.cache.forEach(channel => message.channel.send(`${channel}`))
}