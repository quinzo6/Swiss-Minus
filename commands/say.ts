import Discord, {Client, Message, TextChannel} from "discord.js";

export let name = 'say';
export let description = 'Says a message!';
export let usage = '[channel] [message]';

export async function execute(client: Client, message: Message, args: string[]) {
    const mentionedChannel = message.mentions.channels.first() || client.channels.get(args[0]) as TextChannel;
    const mod = message.member.hasPermission("MANAGE_ROLES");
    if (!mod) {
        const embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle('Missing Permissions')
            .setColor('#F90B0B')
            .addField('Missing Perms!', `Hey ${message.author}, you are missing permissions to use this command.`);
        return message.channel.send(embed);
    }
    if (!mentionedChannel) {
        const embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle('Invalid Channel!')
            .setColor('F90B0B')
            .addField('Whats that?', 'That\'s not a channel!');
        return message.channel.send(embed);
    }
    if (mentionedChannel && !args[1]) {
        const embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle('Error!')
            .setColor('#F90B0B')
            .addField('I think you forgot something', 'Your forgot what you wanted to say! Think deeper');
        return message.channel.send(embed);
    }
    const messages1 = args.slice(1).join(' ');
    const embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle('Say Cmd Log')
        .setColor('#F5AA42')
        .addField('This person used the command!:', `<@${message.author.id}>`)
        .addField('The message was:', messages1);
    const chl = client.channels.get('668987003517534259') as TextChannel;
    await chl.send(embed);
    return await mentionedChannel.send(messages1);
}
