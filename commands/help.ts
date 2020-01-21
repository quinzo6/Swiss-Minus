import Discord, {Client, Message} from "discord.js";
import {getSetting} from "../index";

export let name = 'help';
export let description = 'List all of my commands or info about a specific command.';
export let aliases = ['commands', 'Help', 'Commands'];
export let usage = '[command name]';
export let cooldown = 5;

export async function execute(client: Client, message: Message, args: string[]) {
    const {
    // @ts-ignore
        commands,
    } = message.client;

    if (!args.length) {
        const cmds = commands.map((command) => command.name).join(', ');
        const helpEmbed = new Discord.RichEmbed()
            .setTitle('Help!')
            .setColor('#4DF8E8')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .addField('Commands:', `${cmds}`)
            .addField('Tip:', `You can send \`${await getSetting('prefix')}help [command name]\` to get info on a specific command!`);
        return message.author.send(helpEmbed)
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('I\'ve sent you a DM with all my commands!');
            })
            .catch((error) => {
                const embed = new Discord.RichEmbed()
                    .setTitle('Error!')
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setColor('#F90B0B')
                    .setTitle('Error')
                    .setDescription('Unable to send you a dmd with my commands! This may be because your dms are turned off. Please try again later.')
                    .addField('Error:', error);
                message.channel.send(embed);
            });
    }

    const name = args[0].toLowerCase();
    // eslint-disable-next-line max-len
    const command = commands.get(name) || commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
        const nValidComm = new Discord.RichEmbed();
        nValidComm
            .setTitle('Error!')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('#E80C0C')
            .addField('Invalid Command!', 'The Command you put in is invalid!');
        return message.reply(nValidComm);
    }

    const cmdName = `${command.name}`;
    const cmd = new Discord.RichEmbed();
    cmd
        .setTitle('Help')
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField('Command:', cmdName);

    if (command.aliases) {
        const alli = `${command.aliases.join(', ')}`;
        cmd.addField('Aliases:', alli);
    }
    if (command.description) {
        const description1 = `${command.description}`;
        cmd.addField('Description', description1);
    }
    if (command.usage) {
        const usage = `!${command.name} ${command.usage}`;
        cmd.addField('Usage:', usage);
    }
    const cmdCoolDown = `${command.cooldown || 3} second(s)`;
    cmd.addField('Cooldown:', cmdCoolDown);
    return message.channel.send(cmd);
}
