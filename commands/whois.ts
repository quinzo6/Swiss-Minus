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

export let name = 'whois';
export let description = 'Gets info about a user';
export let aliases = ['Whois'];
export let usage = '[user]';
export let cooldown = 5;
import {
    version
} from '../package.json'


export async function execute(client: Client, message: Message, args: string[]) {
    const on = await getSetting("whois") === "on";
    if (!on) {
        const notOn = new Discord.RichEmbed();
        notOn
            .setTitle(message.author.tag)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(error_red)
            .addField("I'm Not On!", 'This command it turned off! Please ask a mod or admin to turn it back on!');
        return await message.channel.send(notOn);
    }

    const whoisUser = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!whoisUser) {
        const roles = message.member.roles.map((r) => r).join(',');
        const {
            highestRole
        } = message.member;
        const whois = new Discord.RichEmbed();
        whois
            .setThumbnail(message.author.avatarURL)
            .setTitle(message.author.tag)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(swiss_blue)
            .addField('ID:', message.author.id)
            .addField('Username:', message.author.tag)
            .addField('Roles:', roles)
            .addField('Highest Role:', highestRole)
            .addField('Account Created on:', message.author.createdAt)
            .addField('Joined on:', message.member.joinedAt)
            .addField('Presence:', message.author.presence.status)
            .setFooter(version)
            .setTimestamp()
        await message.channel.send(whois);
    }
    if (whoisUser) {
        const roles1 = whoisUser.roles.map((r) => r).join(',');
        const highestRole1 = whoisUser.highestRole;
        const whois1 = new Discord.RichEmbed();
        whois1
            .setThumbnail(whoisUser.user.avatarURL)
            .setTitle(whoisUser.user.tag)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(swiss_blue)
            .addField('ID:', whoisUser.id)
            .addField('Username:', whoisUser.user.username)
            .addField('Roles:', roles1) // Says undefined
            .addField('Highest Role:', highestRole1) // says undefined
            .addField('Account Created On:', whoisUser.user.createdAt)
            .addField('Joined The Server on:', whoisUser.joinedAt) // says undefined
            .addField('Pressence:', whoisUser.user.presence.status) // says [object Object]
            .setFooter(version)
            .setTimestamp()
        await message.channel.send(whois1);
    }
}