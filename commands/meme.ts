import Discord, {Client, Message, TextChannel} from "discord.js";
import randomPuppy from "random-puppy";
const subreddits = require('./subreddits.json');
import {getSetting} from "../index";
import {swiss_blue} from "../config";
import {error_red} from "../config"
import {log_yellow} from "../config"



export let name = "meme";
export let description = "Gives a meme from reddit!";
export let aliases = ["meme"];
export let cooldown = 10;
export async function execute(client: Client, message: Message, args: string[]) {
  const on = await getSetting("meme") === "on";
    if(!on) {
        const notOn = new Discord.RichEmbed();
        notOn
            .setTitle(message.author.tag)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(error_red)
            .addField("I'm Not On!", 'This command it turned off! Please ask a mod or admin to turn it back on!');
        return await message.channel.send(notOn);
    }
    if (message.channel.id === '592463507124125706') return;
    const { subReddits } = subreddits;
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    // Get a random image from the subreddit page
    if (!args[0]) {
      const img = await randomPuppy(random);
      const embed = new Discord.RichEmbed()
        .setColor(swiss_blue)
        .setImage(img)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(`From /r/${random}`)
        .setURL(`https://reddit.com/r/${random}`)
        .setColor(swiss_blue);
      await message.channel.send(embed);
    } else if (args[0] === 'add' && args[1] && !args[2]) {
      const whoAdded = new Discord.RichEmbed();
      whoAdded
        .setColor(log_yellow)
        .setTitle(message.author.tag)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField('The SubReddit was suggested by:', `<@${message.author.id}>  ${message.author.tag}`)
        .addField('The SubReddit they suggeted is:', args[1]);
        (client.channels.get('665825128415887370') as TextChannel).send(whoAdded);
      const confirm = new Discord.RichEmbed();
      confirm
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(message.author.tag)
        .setColor(swiss_blue)
        .addField('I got it!', `I got your subreddit of ${args[1]}! will be reviewed by the staff team`);
      message.channel.send(confirm);
    } else if (args[2]) {
      const wohh = new Discord.RichEmbed();
      wohh
        .setTitle(message.author.tag)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor(swiss_blue)
        .addField('To many items, ahhhh', 'Hey buddy, either you put a extra space or your drunk. Use _ instead of spaces for SubReddit names, thanks');
    }
}
