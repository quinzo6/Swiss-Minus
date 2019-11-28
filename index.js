
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		let noDm = new Discord.RichEmbed
		noDm
		.setTitle("Error")
		.setAuthor(message.author.tag,message.author.avatarURL)
		.setColor('#4DF8E8')
		.addField("This command cant be used in direct messages!")
		message.reply(noDm)
	}

	if (command.args && !args.length) {
		let noArgs = new Discord.RichEmbed
		noArgs
		.setTitle("Argument")
		.setAuthor(message.author.tag,message.author.avatarURL)
		.setColor('#4DF8E8')
		.addField("Error","You didnt provide any arguments!")
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
		 let pUsage = `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		 noArgs.addField("Usage:",`The proper usage would be ${pUsage} `)
		}
		message.channel.send(noArgs);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			let timeOut = new Discord.RichEmbed
			.setAuthor(message.author.tag,message.author.avatarURL)
		    .setTitle("Cooldown has Not finnished")
			.addField("Error",`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
			.setColor('#4DF8E8')
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		let userMen = message.author.id
		console.error(error);
		let err = new Discord.RichEmbed
		err
		.setAuthor(message.author.tag,message.author.avatarURL)
		.setTitle("An Error Occered")
		.setColor('##E80C0C')
		.addField(`Hey, <@${userMen}>, a error occered. Error: ${error}`)
		message.send(err)
	}
}); 

client.login(token);