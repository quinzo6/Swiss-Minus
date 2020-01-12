const fs = require('fs')
const Discord = require('discord.js');
module.exports = {
	name: 'setting',
	description: 'Changes my setting',
	aliases: ['Settings'],
	usage: '[setting] [boolagan]',
	execute(message, args) {
   let messageSenderRoles = message.member.roles.map(r => r)
   if (messageSenderRoles.includes("Mod" || 'Moderator' || 'Admin')) {
     let mod = true
     } else {
       let mod = false 
       }
    console.log(mod) 
    console.log(messageSenderRoles)
  }}
