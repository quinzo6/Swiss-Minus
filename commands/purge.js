const Discord = require("discord.js")

module.exports = {
    name: 'purge',
    description: 'Purges a selected amount of messages',
    usage: 'message count',
    aliases: ['Purge'],
    execute(client, message, args) {
        let roles = message.member.roles.map(role => role.name)
        const mentionedChannel = message.mentions.channels.first();
        if (roles.includes("Mod") || roles.includes('Moderator') || roles.includes('Admin')) {
            var mod = true
        } else {
            var mod = false
        }
        console.log(mentionedChannel)
        if (mod === false) {
            let noPerms = new Discord.RichEmbed()
            noPerms
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setTitle('Missing Permisions')
                .setColor('#F90B0B')
                .addField('Missing Perms!', `Hey <@${message.author.id}>, you don't have the permisions to use this command.`)
            return message.channel.send(noPerms)
        }
        if (!args[1]) {
            if (args[0] > 0 && args[0] < 100) {
                let messagesDelete = args[0]
                console.log(args)
                let sucsess = new Discord.RichEmbed()
                sucsess
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setTitle('Purge')
                    .setColor('#4DF8E8')
                    .addField('Purged Messages', `I purged ${messagesDelete} messages!`)
                message.channel.bulkDelete(messagesDelete)
                    .then(messages => message.channel.send(sucsess))
                    .catch(error => {
                        let err = new Discord.RichEmbed()
                            .setTitle('Error')
                            .setAuthor(message.author.tag, message.author.avatarURL)
                            .setColor('#F90B0B')
                            .addField('Error!', `An error occored. ${error}`)
                        message.channel.send(err)
                    })
                setTimeout(() => {
                    message.delete()
                }, 2000)
            } else {
                let oops = new Discord.RichEmbed
                oops
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setTitle('Invalid Arguments')
                    .setColor(`#F90B0B`)
                    .addField('Arguments!', 'Either you provided a number below 0, a number above 100, or it wasn\'t a number at all!')
                return message.channel.send(oops)
            }
        } else if (args[1] && !args[2]) {
            if (!mentionedChannel) {
                let yikes = new Discord.RichEmbed
                yikes
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setTitle('What?')
                    .setColor('#F90B0B')
                    .addField('What is that?', 'Thats not a channel? Try again with mentioning a channel')
                return message.channel.send(yikes)
            }
        } else {
            let sucsess = new Discord.RichEmbed()
            sucsess
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setTitle('Purge')
                .setColor('#4DF8E8')
                .addField('Purged Messages', `I purged ${messagesDelete} messages!`)
            client.channels.get(mentionedChannel).bulkDelete(messagesDelete)
                .then(messages => message.channel.send(sucsess))
                .catch(error => {
                    let err = new Discord.RichEmbed()
                        .setTitle('Error')
                        .setAuthor(message.author.tag, message.author.avatarURL)
                        .setColor('#F90B0B')
                        .addField('Error!', `An error occored. ${error}`)
                    message.channel.send(err)
                })
            setTimeout(() => {
                message.delete()
            }, 2000)
        }
    }
}

