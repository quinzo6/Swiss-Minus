const Discord = require('discord.js');
const settings = require('./settings.json')
const on = settings.whois
module.exports = {
      name: 'whois',
      description: 'Gets info about a user',
      aliases: ['Whois'],
      usage: '[user]',
      cooldown: 5,
      execute(client, message, args) {
            let whoisUser = message.mentions.members.first() || message.guild.members.get(args[0])
            if (on !== "on") {
                  let notOn = new Discord.RichEmbed
                  notOn
                        .setTitle(message.author.tag)
                        .setAuthor(message.author.tag, message.author.avatarURL)
                        .setColor("#4DF8E8")
                        .addField("I'm Not On!", 'This command it turned off! Please ask a mod or admin to turn it back on!')
                  return message.channel.send(notOn)
            }
            if (!whoisUser) {
                  let roles = message.member.roles.map(r => r).join(',')
                  let highestRole = message.member.highestRole
                  const whois = new Discord.RichEmbed()
                  whois
                        .setThumbnail(message.author.avatarURL)
                        .setTitle(message.author.tag)
                        .setAuthor(message.author.tag, message.author.avatarURL)
                        .setColor("#4DF8E8")
                        .addField("ID:", message.author.id)
                        .addField("Username:", message.author.tag)
                        .addField("Roles:", roles)
                        .addField("Highest Role:", highestRole)
                        .addField("Account Created on:", message.author.createdAt)
                        .addField("Joined on:", message.member.joinedAt)
                        .addField("Presence:", message.author.presence.status)
                  message.channel.send(whois)
            } else if (whoisUser) {
                  let roles1 = whoisUser.roles.map(r => r).join(',')
                  let highestRole1 = whoisUser.highestRole
                  const whois1 = new Discord.RichEmbed()
                  whois1
                        .setThumbnail(whoisUser.user.avatarURL)
                        .setTitle(whoisUser.user.tag)
                        .setAuthor(message.author.tag, message.author.avatarURL)
                        .setColor("#4DF8E8")
                        .addField("ID:", whoisUser.id)
                        .addField("Username:", whoisUser.user.username)
                        .addField("Roles:", roles1) //Says undefined
                        .addField("Highest Role:", highestRole1) //says undefined
                        .addField("Account Created On:", whoisUser.user.createdAt)
                        .addField("Joined The Server on:", whoisUser.joinedAt) //says undefined
                        .addField("Pressence:", whoisUser.user.presence.status) // says [object Object]
                  message.channel.send(whois1)
            }
      }
}