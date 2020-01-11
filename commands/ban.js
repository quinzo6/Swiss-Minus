const Discord = require('discord.js');
module.exports = {
      name: 'ban',
      description: 'Bans a user',
      aliases: ['Ban'],
      usage: '[user]',
      execute(message, args) {
         let mentionedUser = 
