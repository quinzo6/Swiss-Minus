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
    if (mentionedChannel && !args[1]) {
      const oof = new Discord.RichEmbed();
      oof
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle('Error!')
        .setColor('#F90B0B')
        .addField('I think you forgot something', 'Your frogot what you wanted to say! Think deeper');
      return message.channel.send(oof);
    }
    const messages1 = args.slice(1, messageCount).join(' ');
    const log = new Discord.RichEmbed();
    log
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setTitle('Say Cmd Log')
      .setColor('#F5AA42')
      .addField('This person used the command!:', `<@${message.author.id}>`)
      .addField('The message was:', messages1);
    const chl = client.channels.get('668987003517534259');
    chl.send(log);
    return mentionedChannel.send(messages1);
  },
};
