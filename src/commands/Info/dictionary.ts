import SwissClient from "../../SwissClient";
import { Message, MessageEmbed } from "discord.js";
import urban from "urban-dictionary";
import badwords from "../../badwords.json";
import { swiss_blue, error_red } from "../../config";

export let name = "dictionary";
export let description = "Search for the meaning of words";
export let aliases = ["urban", "whatdoesthismean"];
export let cooldown = 0;
<<<<<<< HEAD
=======
export let canBeOff = true;
>>>>>>> ef04a72d6539885062fca003e196c289cbd4bcb4

export async function execute(
  client: SwissClient,
  message: Message,
  args: string[]
) {
<<<<<<< HEAD
  const word = args[0] || "swiss001";
=======
  var word = args.join(" ") || "swiss001";
>>>>>>> ef04a72d6539885062fca003e196c289cbd4bcb4
  const vowels = /[aeiou]/gi;
  const filter = /[^a-z]/gi;
  if (
    badwords.includes(
      word
        .toLowerCase()
<<<<<<< HEAD
        .replace(vowels, " ")
        .replace(filter, " ")
    ) ||
    word
      .toLowerCase()
      .replace(vowels, " ")
      .replace(filter, " ")
      .trim() === ""
  )
    return message.channel.send(`You can't fool me, try harder`);
=======
        .replace(filter, " ")
        .trim()
        .replace(vowels, " ")
    ) ||
    word
      .toLowerCase()
      .replace(filter, " ")
      .trim()
      .replace(vowels, " ") === ""
  )
    word = "hell nah";
>>>>>>> ef04a72d6539885062fca003e196c289cbd4bcb4
  urban
    .term(word)
    .then(result => {
      const embed = new MessageEmbed()
        .setAuthor(
          `${message.author.tag} | Dictionary`,
          message.author.displayAvatarURL()
        )
        .setColor(swiss_blue)
        .setTitle(`Meaning of ${result.entries[0].word}`)
        .setDescription(
          `${result.entries[0].definition}\n\n\n${
            result.entries[0].example
              ? `For example: ${result.entries[0].example}`
              : ""
          }`.trim()
        )
        .setFooter(client.version)
        .setTimestamp();
      message.channel.send(embed);
    })
    .catch(error => {
      const embed = new MessageEmbed()
        .setAuthor(
          `${message.author.tag} | Dictionary`,
          message.author.displayAvatarURL()
        )
        .setColor(error_red)
        .setTitle(`That word doesn't exist!`)
        .setDescription(`${error}`)
        .setFooter(client.version)
        .setTimestamp();
      message.channel.send(embed);
    });
}
