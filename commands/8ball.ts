import Discord, {
    Client,
    Message,
    MessageEmbed
} from "discord.js";
import {
    swiss_blue
} from "../config";
import {
    error_red
} from "../config"
import {
    version
} from '../package.json'

export let name = "8ball";
export let description = "Fortune Teller.";
export let cooldown = 5;
export let aliases = ['8ball', 'eightball', 'future'];

export async function execute(client: Client, message: Message, _args: string[]) {
    
    const choices = [
        'It is certain',
        'It is decidedly so',
        'Without a doubt',
        'Yes - definitely',
        'You may rely on it',
        'As I see it, yes',
        'Most likely',
        'Outlook good',
        'Yes',
        'Signs point to yes',
        'Reply hazy, try again',
        'Ask again later',
        'Better not tell you now',
        'Cannot predict now',
        'Concentrate and ask again',
        'Dont count on it',
        'My reply is no',
        'My sources say no',
        'Outlook not so good',
        'Very doubtful'
    ];

    const randomOption = choices[Math.floor(Math.random() * choices.length)];
    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle('8Ball')
        .setColor(swiss_blue)
        .addField('Fortune:', randomOption)
        .setFooter(version)
        .setTimestamp() 
    message.channel.send(embed);
}