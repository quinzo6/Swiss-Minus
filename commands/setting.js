const fs = require('fs')
const Discord = require('discord.js');
module.exports = {
	name: 'setting',
	description: 'Changes my setting',
	aliases: ['Settings','settings','Setting'],
	usage: '[setting] [boolagan]',
	execute(message, args) {
    let roles = message
    if (roles.includes("Mod" || 'Moderator' || 'Admin')) {
     let mod = true
     } else {
       let mod = false 
       }
    console.log(mod) 
    console.log(roles)
  }}
