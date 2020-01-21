import Discord, {Client, Message} from "discord.js";

export let name = 'permissions';
export let description = 'Check the permissions of a user';
export let aliases = ['Permissions', 'perms', 'Perms', 'p', 'P'];
export let usage = 'user';
export let cooldown = 5;

export async function execute(client: Client, message: Message, args: string[]) {
    const permMentioned = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!permMentioned) {
        const permNoMentionedEmbed = new Discord.RichEmbed();
        permNoMentionedEmbed
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('#F90B0B')
            .addField('Error', 'You didnt mention who you wanted to view permissions of!');
        await message.channel.send(permNoMentionedEmbed);
    } else {
        const permEmbed = new Discord.RichEmbed();
        permEmbed
            .setTitle('Permissions')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('#4DF8E8')
            .addField('Permissions:', permMentioned.permissions.toArray().join(' , '));
        await message.channel.send(permEmbed);
    }
}
