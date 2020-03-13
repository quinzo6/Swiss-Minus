import { Client, Message, TextChannel, MessageEmbed } from "discord.js";
import randomPuppy from "random-puppy";
const subreddits = require("./subreddits.json");
import { swiss_blue } from "../config";
import { log_yellow } from "../config";
import { version } from "../package.json";

export let name = "meme";
export let description = "Gives a meme from reddit!";
export let cooldown = 10;
export let canBeOff = true;

export async function execute(
  client: Client,
  message: Message,
  args: string[]
) {
  const { subReddits } = subreddits;
  const random = subReddits[Math.floor(Math.random() * subReddits.length)];
  if (!args[0]) {
    const img = await randomPuppy(random);
    const embed = new MessageEmbed()
      .setColor(swiss_blue)
      .setImage(img)
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setTitle(`From /r/${random}`)
      .setURL(`https://reddit.com/r/${random}`)
      .setColor(swiss_blue)
      .setFooter(version)
      .setTimestamp();
    await message.channel.send(embed);
  } else if (args[0] === "add" && args[1] && !args[2]) {
    const whoAdded = new MessageEmbed()
      .setColor(log_yellow)
      .setTitle(message.author.tag)
      .setAuthor(message.author.tag, message.author.avatarURL())
      .addField(
        "The SubReddit was suggested by:",
        `<@${message.author.id}>  ${message.author.tag}`
      )
      .addField("The SubReddit they suggeted is:", args[1])
      .setFooter(version)
      .setTimestamp();
    (client.channels.cache.get("665825128415887370") as TextChannel).send(
      whoAdded
    );
    const confirm = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setTitle(message.author.tag)
      .setColor(swiss_blue)
      .addField(
        "I got it!",
        `I got your subreddit of ${args[1]}! will be reviewed by the staff team`
      )
      .setFooter(version)
      .setTimestamp();
    message.channel.send(confirm);
  } else if (args[2]) {
    const wohh = new MessageEmbed()
      .setTitle(message.author.tag)
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor(swiss_blue)
      .addField(
        "Too many items, ahhhh",
        "Hey buddy, either you put a extra space or your drunk. Use _ instead of spaces for SubReddit names, thanks"
      )
      .setFooter(version)
      .setTimestamp();
    message.channel.send(wohh);
  }
}
