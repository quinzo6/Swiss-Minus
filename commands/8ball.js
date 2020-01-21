const Discord = require('discord.js')
module.exports = {
  name: "8ball",
  description: "Fortune Teller.",
  cooldown: 5,
  aliases: ['8ball', 'eightball', 'future'],
  execute(client, message, args) {
    const choices = [
      "Outlook Good!",
      "Outlook not so good.",
      "My Reply is : YES",
      "My Sources tell me no",
      "My reply is No",
      "You may rely on it."
    ];
    const randomOption = choices[Math.floor(Math.random() * choices.length)];
    const randomembed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setTitle('8Ball')
      .setColor('4DF8E8')
      .addField('Fortune:', randomOption)
    message.channel.send(randomembed)
  }
}