const Discord = require("discord.js");
const randomPuppy = require("random-puppy");
const subreddits = require('./subreddits.json')
const fs = require('fs')
module.exports = {
        name: 'Meme',
        description: 'Gives a meme from reddit!',
        aliases: ['meme'],
        cooldown: 10,
        execute: async (client, message, args) => {
            // In this array, 
            // you can put the subreddits you want to grab memes from
            // Grab a random property from the array
            let subReddits = subreddits.subReddits   
            const random = subReddits[Math.floor(Math.random() * subReddits.length)];
            // Get a random image from the subreddit page
            if (!args[0]) {
                const img = await randomPuppy(random);
                const embed = new Discord.RichEmbed()
                    .setColor("#4DF8E8")
                    .setImage(img)
                    .setTitle(`From /r/${random}`)
                    .setURL(`https://reddit.com/r/${random}`)
                    .setFooter("Requested By: {}")
                    .setColor('#4DF8E8')
                message.channel.send(embed)

            } else if (args[0] === "add" && args[1] && !args[2]) {
                let whoAdded = new Discord.RichEmbed
                whoAdded
                    .setColor('#4DF8E8')
                    .setTitle(message.author.tag)
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .addField('The SubReddit was suggested by:', `<@${message.author.id}>  ${message.author.tag}`)
                    .addField('The SubReddit they sugeested is:', args[1])
                    client.channels.get('665825128415887370').send(whoAdded);
                    let confirm = new Discord.RichEmbed
                    confirm
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setTitle(message.author.tage)
                    .setColor('$4DF8E8')
                    .addField('I got it!', `I got your subreddit of ${args[1]}!`)
                    message.channel.send(confirm)
                    subReddits.push(args[1])
                    try{
                    const file = fs.writeFileSync('subreddits.json', subReddits );
                    }catch(error){
		console.error(error);
		let err = new Discord.RichEmbed
		err
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setTitle("An Error Occered")
			.setColor('#E80C0C')
			.addField('Attetion!', `Hey, <@${userMen}>`)
			.addField('Error', `A error occered. Error: ${error}`)
		message.channel.send(err)
                    }
	    }else if (args[2]) {
                    let wohh = new Discord.RichEmbed
                    wohh
                        .setTitle(message.author.tag)
                        .setAuthor(message.author.tag, message.author.avatarURL)
                        .setColor("#4DF8E8")
                        .addField("To many items, ahhhh", 'Hey buddy, either you put a extra space or your drunk. Use _ insted of spaces for SubReddit names, thanks')
                }
            }
        }
