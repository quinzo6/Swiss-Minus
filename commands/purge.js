/* eslint-disable vars-on-top */
const Discord = require('discord.js');

module.exports = {
  name: 'purge',
  description: 'Purges a selected amount of messages',
  usage: 'message count',
  aliases: ['Purge'],
  // eslint-disable-next-line consistent-return
  execute(client, message, args) {
    const roles = message.member.roles.map((role) => role.name);
    const mentionedChannel = message.mentions.channels.first();
    if (roles.includes('Mod') || roles.includes('Moderator') || roles.includes('Admin')) {
      // eslint-disable-next-line no-var
      var mod = true;
    } else {
      // eslint-disable-next-line vars-on-top
      // eslint-disable-next-line no-var
      // eslint-disable-next-line block-scoped-var
      mod = false;
    }
    // eslint-disable-next-line block-scoped-var
    if (mod === false) {
      const noPerms = new Discord.RichEmbed();
      noPerms
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle('Missing Permisions')
        .setColor('#F90B0B')
        .addField('Missing Perms!', `Hey <@${message.author.id}>, you are missing permissions to use this command.`);
      return message.channel.send(noPerms);
    }
    if (!args[1]) {
      if (args[0] > 0 && args[0] < 99) {
        const messagesDelete = args[0];
        const sucsess = new Discord.RichEmbed();
        sucsess
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setTitle('Purge')
          .setColor('#4DF8E8')
          .addField('Purged Messages', `I purged ${messagesDelete} messages!`);
        message.channel.bulkDelete(messagesDelete)
          .then(() => message.channel.send(sucsess))
          .catch((error) => {
            const err = new Discord.RichEmbed()
              .setTitle('Error')
              .setAuthor(message.author.tag, message.author.avatarURL)
              .setColor('#F90B0B')
              .addField('Error!', `An error occored. ${error}`);
            message.channel.send(err);
          });
        setTimeout(() => {
          message.delete();
        }, 2000);
      } else {
        const oops = new Discord.RichEmbed();
        oops
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setTitle('Invalid Arguments')
          .setColor('#F90B0B')
          .addField('Arguments!', 'Either you provided a number below 0, a number above 100, or it wasn\'t a number at all!');
        return message.channel.send(oops);
      }
    } else if (args[1]) {
      if (!mentionedChannel) {
        const yikes = new Discord.RichEmbed();
        yikes
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setTitle('What?')
          .setColor('#F90B0B')
          .addField('What is that?', 'Thats not a channel? Try again with mentioning a channel');
        return message.channel.send(yikes);
      }
      const messagesDelete = args[0];
      const sucsess = new Discord.RichEmbed();
      sucsess
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle('Purge')
        .setColor('#4DF8E8')
        .addField('Purged Messages', `I purged ${messagesDelete} messages!`);
      message.mentions.channels.first().bulkDelete(messagesDelete)
        .then(() => message.channel.send(sucsess))
        .catch((error) => {
          const err = new Discord.RichEmbed()
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('#F90B0B')
            .addField('Error!', `An error occored. ${error}`);
          message.channel.send(err);
        });
      setTimeout(() => {
        message.delete();
      }, 2000);
    }
  },
};
