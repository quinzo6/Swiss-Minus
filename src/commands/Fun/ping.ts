import SwissClient from "../../SwissClient";
import { Message } from "discord.js";
<<<<<<< HEAD
=======
import { convertMs } from "../../utils";
>>>>>>> ef04a72d6539885062fca003e196c289cbd4bcb4

export let name = "ping";
export let description = "Gets the bot's latency";
export let aliases = ["pong"];
export let cooldown = 0;
<<<<<<< HEAD
=======
export let canBeOff = true;
>>>>>>> ef04a72d6539885062fca003e196c289cbd4bcb4

export async function execute(client: SwissClient, message: Message) {
  const m = await message.channel.send("Pinging...");
  m.edit(
<<<<<<< HEAD
    `Pong! Latency of Discord messages is ${(m.createdTimestamp -
      message.createdTimestamp) /
      2} ms. Latency of Discord API is ${client.ws.ping} ms.`
=======
    `🏓 Pong! Latency of Discord messages is ${convertMs(
      (m.createdTimestamp - message.createdTimestamp) / 2
    )}. Latency of Discord API is ${convertMs(client.ws.ping)}.`
>>>>>>> ef04a72d6539885062fca003e196c289cbd4bcb4
  );
}
