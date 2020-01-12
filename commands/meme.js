const Discord = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
        name: 'Meme',
        description: 'Gives a meme from reddit!',
        aliases: ['meme'],
        cooldown: 10,
        execute: async (client, message, args) => {
            // In this array, 
            // you can put the subreddits you want to grab memes from
            const subReddits = ["dankmeme", "meme", "me_irl"];
            // Grab a random property from the array
            const random = subReddits[Math.floor(Math.random() * subReddits.length)];

            // Get a random image from the subreddit page
            if (!args[0]) {
                const img = await randomPuppy(random);
                const embed = new Discord.RichEmbed()
                    .setColor("RANDOM")
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
                    .addField('The SubReddit was suggested by:', `<@${message.author.tag}>${message.author.tag}`)
                    .addField('The SubReddit they sugeested is:', args[1] )
                    channel.get('665825128415887370').send(whoAdded); 
                    subReddits.push(`${args[1]}`)
                    }
                else if (args[2]) {
                    let wohh = new Discord.RichEmbed
                    wohh
                        .setTitle(message.author.tag)
                        .setAuthor(message.author.tag, message.author.avatarURL)
                        .setColor("#4DF8E8")
                        .addField("To many items, ahhhh", 'Hey buddy, either you put a extra space or your drunk. Use _ insted of spaces for SubReddit names, thanks')
                }
            }
        }
