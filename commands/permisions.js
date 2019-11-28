const Discord = require('discord.js')
module.exports = {
      name: "permisions",
      description: "Check the permisions of a user",
      aliases: ['Permisions', 'perms', 'Perms', 'p', 'P'],
      usage: 'user',
      cooldown: 5,
      execute(message, args) {
            let permMentioned = message.mentions.members.first() || message.guild.members.get(args[0])
            if (!permMentioned) {
                  const permNoMentionedEmbed = new Discord.RichEmbed
                  permNoMentionedEmbed
                        .setTitle("Error")
                        .setAuthor(message.author.tag, message.author.avatarURL)
                        .setColor("#F90B0B")
                        .addField("Error", "You didnt mention who you wanted to veiw permisions of!")
                  message.channel.send(permNoMentionedEmbed)
            } else {
                  const permEmbed = new Discord.RichEmbed
                  permEmbed
                        .setTitle("Permisions")
                        .setAuthor(message.author.tag, message.author.avatarURL)
                        .setColor('#4DF8E8')
                        .addField("Permisions:", permMentioned.permissions.toArray().join(' , '))
                  message.channel.send(permEmbed)
            }
      }
}