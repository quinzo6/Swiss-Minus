import {Client, Message} from "discord.js";

export let name = "ping";
export let description = "gets the bot's latency"
export let cooldown = 0;

export async function execute(
    client: Client,
    message: Message,
) {
    const m = await message.channel.send("Pinging...");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp} ms.`)
}