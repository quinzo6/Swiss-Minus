import SwissClient from "../SwissClient";
import { Message, MessageEmbed } from "discord.js";
import { swiss_blue } from "../config";

export let name = "diceroll";
export let description = "Game: Dice roll, returns a number between 1 and 6";
export let cooldown = 5;
export let aliases = ["diceroll", "dice", "roll"];

const diceArray = ["1", "2", "3", "4", "5", "6"];

export async function execute(
  client: SwissClient,
  message: Message,
  _args: string[]
) {
  const answer = diceArray[Math.floor(Math.random() * diceArray.length)];

  const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setTitle("Dice roll")
    .setColor(swiss_blue)
    .addField("I threw a dice and it turned out to be", answer)
    .setFooter(client.version)
    .setTimestamp();
  message.channel.send(embed);
}
