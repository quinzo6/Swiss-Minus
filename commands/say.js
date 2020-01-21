/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
const Discord = require('discord.js');
const users = require('./sayusers.json');

module.exports = {
  name: 'say',
  description: 'Says a message!',
  usage: '[channel] [message]',
  execute(client, message, args) {
    const userids = users.usersID;
    const messageCount = args.length;
    const mentionedChannel = message.mentions.channels.first() || client.channels.get(args[0]);
    if (userids.includes(message.author.id)) {
      var mod = true;
    } else {
      mod = false;
    }
    if (mod === false) {
      const noPerms = new Discord.RichEmbed();
      noPerms
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle('Missing Permisions')
        .setColor('#F90B0B')
        .addField('Missing Perms!', `Hey <@${message.author.id}>, you are missing permissions to use this command.`);
      return message.channel.send(noPerms);
    }
    if (!mentionedChannel) {
      const none = new Discord.RichEmbed();
      none
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle('Invalid Channel!')
        .setColor('F90B0B')
        .addField('Whats that?', 'Thats not a channel!');
      return message.channel.send(none);
    }
    const messages1 = args.slice(1, messageCount).join(' ');
    return mentionedChannel.send(messages1);
  },
};
