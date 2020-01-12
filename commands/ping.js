const Discord = require('discord.js');

client.on('message', message => {
    if(message.content.startsWith("!ping")) {
            message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");        
    }
}
