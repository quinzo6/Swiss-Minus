const Discord = require('discord.js');
module.exports = {
      name: 'ping',
      description: 'Gets ping',
      aliases: ['Ping'],
      cooldown: 5,
      execute: async(client, message, args) {
              const m = await message.channel.send("Ping?");
              message.delete()
              .then(message.channel.send(new Discord.RichEmbed().setAuthor(message.author.tag, message.author.avatarURL).setTitle('Pong!').setColor('#4DF8E8').addField(':timer: Ping:',`${m.createdTimestamp - message.createdTimestamp}`))
              .catch(message.chanel.send(new Discord.RichEmbed().setAuthor(message.author.tag, message.author.avatarURL).setTitle('Error!').setColor('#E80C0C').addField('Error:', error)
}} 
