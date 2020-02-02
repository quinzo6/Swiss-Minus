import Discord, {
    Client,
    Message,
    TextChannel
} from "discord.js";
import {
    version
} from '../package.json'


export let name = 'update';
export let description = 'Provides a changelog message for the test server';
export let usage = '[Version Name] [Description]';

export async function execute(client: Client, message: Message, args: string[]) {
    if (message.author.id !== '660238973943152707') return
    let vName = args[0]
    let description = args.splice(1).join(" ")
    let embed = new Discord.RichEmbed()
    embed
        .setAuthor(vName, client.user.avatarURL)
        .setDescription(description)
        .setFooter(version)
        .setTimestamp()
        .setColor('#4DF8E8')
    let betaChannel = client.channels.get('665372860885499939') as TextChannel;
    return betaChannel.send(embed)
}