import Discord, {Client, Message, GuildMember} from "discord.js";
import {swiss_blue} from "../config";
import {error_red} from "../config"
import { version } from '../package.json'



export let name = 'permissions';
export let description = 'Check the permissions of a user';
export let aliases = ['Permissions', 'perms', 'Perms', 'p', 'P'];
export let usage = 'user';
export let cooldown = 5;
export let guildOnly = true

export async function execute(client: Client, message: Message, args: string[]) {
    const permMentioned = message.mentions.members.first() || message.guild.members.fetch(args[0]) as unknown as GuildMember;
    if (!permMentioned) {
        const permNoMentionedEmbed = new Discord.MessageEmbed();
        permNoMentionedEmbed
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor(error_red)
            .addField('Error', 'You didnt mention who you wanted to view permissions of!')
            .setFooter(version)
            .setTimestamp()
        await message.channel.send(permNoMentionedEmbed);
    } else {
        const permEmbed = new Discord.MessageEmbed();
        permEmbed
            .setTitle('Permissions')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor(swiss_blue)
            .addField('Permissions:', permMentioned.permissions.toArray().join(' , '))
            .setFooter(version)
            .setTimestamp()
        await message.channel.send(permEmbed);
    }
}
