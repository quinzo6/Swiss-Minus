import { Client, Message, MessageEmbed } from "discord.js";
import { swiss_blue } from "../config";
import { version } from "../package.json";

export let name = "topic";
export let description = "Gets a random chat topic, if the chat is dying!";
export let aliases = ["Topic", "t", "T"];
export let canBeOff = true;

const quotes = [
  "If you where any animal, what would you be and why?",
  "iPhone or Android?",
  "Swiss001 old format or new?",
  "Look left than right, or right than left?",
  "Is it half full, or half empty",
  "Twix left, or twix right",
  "Is the max safe?",
  "Democrat or Republican",
  "What have you been up to recently?",
  "Whats your favourite plane?",
  "SwissBot or SwissPlus?",
  "Windows or Apple?"
];

export async function execute(
  client: Client,
  message: Message,
  args: string[]
) {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  const embed = new MessageEmbed()
    .setTitle("")
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setColor(swiss_blue)
    .addField("**Topic:**", q)
    .setFooter(version)
    .setTimestamp();
  await message.channel.send(embed);
}
