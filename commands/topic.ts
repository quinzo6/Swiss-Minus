import Discord, {
    Client,
    Message
} from "discord.js";
import {
    getSetting
} from "../index";
import {
    swiss_blue
} from "../config";
import {
    error_red
} from "../config"
import {
    version
} from '../package.json'


export let name = 'topic';
export let description = 'Gets a random chat topic, if the chat is dying!';
export let aliases = ['Topic', 't', 'T'];

export async function execute(client: Client, message: Message, args: string[]) {
    const on = await getSetting("topic") === "on";
    if (!on) {
        const notOn = new Discord.MessageEmbed();
        notOn
            .setTitle(message.author.tag)
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor(error_red)
            .addField("I'm Not On!", 'This command it turned off! Please ask a mod or admin to turn it back on!');
        return await message.channel.send(notOn);
    }
    const quotes = [
        'If you where any animal, what would you be and why?',
        'iPhone or Android ',
        'Look left than right, or right than left?',
        'Is it half full, or half empty',
        'Twix left, or twix right',
        'Is the max safe?',
        'Democrat or Republican',
        'What have you been up to recently?',
        'Whats your favourite plane?',
        'SwissBot or SwissPlus?',
        'Windows or Apple?',
    ];
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    const embed = new Discord.MessageEmbed()
        .setTitle('')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setColor(swiss_blue)
        .addField('**Topic:**', q).setFooter(version)
        .setTimestamp()
    await message.channel.send(embed);
}