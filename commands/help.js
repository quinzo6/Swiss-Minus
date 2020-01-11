const {
	prefix
} = '!';
const Discord = require('discord.js');
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands', 'Help', 'Commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const {
			commands
		} = message.client;

		if (!args.length) {
			let help = new Discord.RichEmbed
			let comds = commands.map(command => command.name).join(', ')
			help
				.setTitle("Help!")
				.setColor('#4DF8E8')
				.setAuthor(message.author.tag, message.author.avatarURL)
				.addField('Commands:', `${comds}`)
				.addField('Tip:', `You can send \`!help [command name]\` to get info on a specific command!`)
			return message.author.send(help)
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					let unAbleDm = Discord.RichEmbed
					unAbleDm
						.setTitle('Error!')
						.setAuthor(message.author.tag, message.author.avatarURL)
						.setColor('#F90B0B')
						.setTitle('Error', 'Unable to send you a dmd with my commands! Please tyr again')
					message.channel.send(unAbleDm)
				});
		}

		const name = args[0].toLowerCase()
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			let nValidComm = new Discord.RichEmbed
			nValidComm
				.setTitle("Error!")
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#E80C0C')
				.addField("Invalid Command!", "The Command you put in is invalid!")
			return message.reply(nValidComm)
		}

		let cmdName = `${command.name}`
		let cmd = new Discord.RichEmbed
		cmd
			.setTitle('Help')
			.setAuthor(message.author.tag, message.author.avatarURL)
			.addField('Command:',cmdName)

		if (command.aliases) {
			let alli = `${command.aliases.join(', ')}`
			cmd.addField('Aliases:', alli)
		}
		if (command.description) {
			let description1 = `${command.description}`
			cmd.addField('Description', description1)
		}
		if (command.usage) {
			let usage = `!${command.name} ${command.usage}`
			cmd.addField('Usage:', usage)
		}
		let cmdCoolDown = `${command.cooldown || 3} second(s)`
		cmd.addField('Cooldown:', cmdCoolDown)
		return message.channel.send(cmd)
	},
};
