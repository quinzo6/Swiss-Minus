const Discord = require('discord.js');

module.exports = {
  name: 'topic',
  discription: 'Gets a random chat topic, if the chat is dying!',
  aliases: ['Topic', 't', 'T'],
  // eslint-disable-next-line no-unused-vars
  execute(client, message, args) {
    const embeded = new Discord.RichEmbed();
    const quotes = [
      'If you where any animal, what would you be and why?',
      'iPhone or Android ',
      'Look left than right, or right than left?',
      'Is it half full, or half empty',
      'Twix left, or twix right',
      'Is the max safe?',
      'Democrat or Republican',
      'What have you been up to recently?',
      'Whats your favourite plane?',
      'SwissBot or SwissPlus?',
      'Windows or Apple?',
    ];
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    embeded
      .setTitle('')
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setColor('#4DF8E8')
      .addField('**Topic:**', q);
    message.channel.send(embeded);
  },
};
