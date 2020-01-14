const {
	prefix
} = '!';
const Discord = require('discord.js');
let embed = new Discord.RichEmbed() 
        .setColor('RANDOM')
        .setTitle(`Loading...`)
        .setTimestamp()

    message.channel.send(embed).then(message => {
        embed.setColor('RANDOM')
        embed.setTitle('🏓 Pong!')
        embed.setDescription(`**${client.pings[0].toFixed(1)}ms**`)
        embed.setFooter(`${client.user.username} 2019`, message.author.avatarURL)
        embed.setTimestamp()

        message.edit(embed)
    })

  }
