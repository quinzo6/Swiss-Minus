import Discord, { Client, Message, MessageEmbed } from "discord.js";

import { swiss_blue } from "../config";
import { error_red } from "../config"
import { version } from '../package.json'

export let name = "coinflip";
export let description = "Game: Coin, return head or tails to the user";
export let cooldown = 5;
export let aliases = ['coinflip', 'coin'];

export async function execute(client: Client, message: Message, _args: string[]) {

    const coinArray = [
        'Heads',
        'Tails'
    ];

    const answer = coinArray[Math.floor(Math.random() * coinArray.length)];

    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle('Coinflip')
        .setColor(swiss_blue)
        .addField('Flipping:', answer)
        .setFooter(version)
        .setTimestamp() 
    message.channel.send(embed);

}