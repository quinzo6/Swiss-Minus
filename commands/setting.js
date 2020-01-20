const fs = require('fs')
const Discord = require('discord.js');
module.exports = {
	name: 'setting',
	description: 'Changes my setting',
	aliases: ['Settings', 'settings', 'Setting'],
	usage: '[setting] [boolagan]',
	execute(client, message, args) {
		let roles = message.member.roles.map(role => role.name)
		if (roles.includes("Mod") || roles.includes('Moderator') || roles.include('Admin')) {
			var mod = true
		} else {
			var mod = false
		}
		console.log(mod)
		console.log(roles)
		message.channel.send(mod)
	}
}