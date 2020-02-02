import Discord, {Client, Message} from "discord.js";
import {swiss_blue} from "../config";
import {error_red} from "../config"


export let name = "8ball";
export let description = "Fortune Teller.";
export let cooldown = 5;
export let aliases = ['8ball', 'eightball', 'future'];

export async function execute(client: Client, message: Message, _args: string[]) {
    const choices = [
        "Outlook Good!",
        "Outlook not so good.",
        "My Reply is : YES",
        "My Sources tell me no",
        "My reply is No",
        "You may rely on it."
    ];
    const randomOption = choices[Math.floor(Math.random() * choices.length)];
    const embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle('8Ball')
        .setColor(swiss_blue)
        .addField('Fortune:', randomOption);
    await message.channel.send(embed);
}