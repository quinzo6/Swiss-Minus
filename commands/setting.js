const fs = require('fs')
const Discord = require('discord.js');
module.exports = {
	name: 'setting',
	description: 'Changes my setting',
	aliases: ['Settings','settings','Setting'],
	usage: '[setting] [boolagan]',
	execute(client, message, args) {
    		let roles = message.member.roles.array()
    		if (roles.includes("665803445923479570" || '<@Moderator>' || '<@Admin>')) {
     			var mod = true
     		} else {
       			var mod = false 
       		}
    		console.log(mod) 
    		console.log(roles)
		message.channel.send(mod)
	}
}
