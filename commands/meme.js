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
        const img = await randomPuppy(random);
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)
        try {
        command.execute(client, message, args();
    } catch (error) {
          let err = new Discord.RichEmbed
          err
          .setTitle("Error!")
	    .setAuthor(message.author.tag , message.author.avatarURL)
	    .setColor('#E80C0C')
	    .addField(`An Error Occored`, `${error} `)
          message.channel.send(err)
    }
      }}
