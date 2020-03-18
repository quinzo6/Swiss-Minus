import SwissClient from "../../SwissClient";
import { Message } from "discord.js";

export let name = "ping";
export let description = "Gets the bot's latency";
export let aliases = ["pong"];
export let cooldown = 0;

export async function execute(client: SwissClient, message: Message) {
  const m = await message.channel.send("Pinging...");
  m.edit(
    `Pong! Latency of Discord messages is ${(m.createdTimestamp -
      message.createdTimestamp) /
      2} ms. Latency of Discord API is ${client.ws.ping} ms.`
  );
}
