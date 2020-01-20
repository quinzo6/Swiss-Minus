const Discord = require("discord.js");
const ud = require('urban-dictionary')
module.exports = {
    name: 'ud',
    description: 'Gets A Urban Dictonary Defenition',
    usage: 'Word',
    execute(client, message, args) {
        let word = args[0]
        ud.term(word).then((result) => {
            const entries = result.entries
            let embed = new Discord.RichEmbed
            if (entries[0].definition.length > 1024) {
                let big = new Discord.RichEmbed
                big
                    .setColor('#E80C0C')
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setTitle('Error')
                    .addField('Its To Big!', 'The definition was tooo big')
                return message.channel.send(big)
            }
            embed
                .setColor('4DF8E8')
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setTitle(word)
                .addField('Definition:', entries[0].definition)
                .addField('Example', entries[0].example)
                message.channel.send(embed)
        }).catch((error) => {
            console.error(error.message)
            let err = new discord.RichEmbed
            err
            .setColor('E80C0C')
            .setTitle('Error!')
            .addField('A error happened', error)
            return message.channel.send(err)
        })
    }
}