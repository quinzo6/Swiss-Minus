/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
const Discord = require('discord.js');
const userids = require('./sayusers.json');

module.exports = {
  name: 'say',
  description: 'Says a message!',
  usage: '[channel] [message]',
  execute(client, message, args) {
    const mentionedChannel = message.mentions.channels.first() || client.channels.get(args[0]);
    const mod = userids.includes(message.author.id);
    if (!mod) {
      const embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle('Missing Permisions')
        .setColor('#F90B0B')
        .addField('Missing Perms!', `Hey ${message.author}, you are missing permissions to use this command.`);
      return message.channel.send(embed);
    }
    if (!mentionedChannel) {
      const embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle('Invalid Channel!')
        .setColor('F90B0B')
        .addField('Whats that?', 'That\'s not a channel!');
      return message.channel.send(embed);
    }
    if (mentionedChannel && !args[1]) {
      const embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle('Error!')
        .setColor('#F90B0B')
        .addField('I think you forgot something', 'Your forgot what you wanted to say! Think deeper');
      return message.channel.send(embed);
    }
    const messages1 = args.slice(1).join(' ');
    const embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setTitle('Say Cmd Log')
      .setColor('#F5AA42')
      .addField('This person used the command!:', `<@${message.author.id}>`)
      .addField('The message was:', messages1);
    const chl = client.channels.get('668987003517534259');
    chl.send(embed);
    return mentionedChannel.send(messages1);
  },
};
