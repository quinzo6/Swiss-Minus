const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
console.log("Loged In")
//sets prefix
let prefix ="!";
client.on("message", (message) => {
  // Exit and stop if the prefix is not there or if user is a bot
  if (!message.content.startsWith(prefix) || message.author.bot) return;
   
  let args = message.content.split(' ')
    //array of words (with prefix)

  let command = message.content.slice(prefix.length).split(' ')[0]
    //array of words (without prefix)
  if (command === "ping") {
    message.channel.send("Pong!");
  } else if (command === "foo") {
    message.channel.send("Bar!");
  } else if (command === "help") {
    const embed = new Discord.RichEmbed();
    embed
    .setTitle("Help")
    .setAuthor(message.author.tag,message.author.avatarURL)
    .setColor("#FF00FF")
    .addField("Ping", "Sends Pong")
    .addField("Foo","Sends Bar Back")
    .addField("Topic", "Gives a Chat Topic")
    .addField("Help","Shows This Message")
    .setFooter("Made by Mark")
    message.channel.send(embed);
  } else if (command === "topic") {
    const embeded = new Discord.RichEmbed();
    var quotes = [
      "If you where any animal, what would you be, and why?",
      "Iphone or Andriod ",
      "Look left than right, or right than left?",
      "Is it half full, or half empty",
      "Twix left, or twix right",
      "Is the max safe?",
      "Democrat or Republican",
    ];
    var q = quotes[ Math.floor( Math.random() * quotes.length ) ]
    embeded
    .setTitle("")
    .setAuthor(message.author.tag,message.author.avatarURL)
    .setColor("#FF00FF")
    .addField("**Topic:**",q)
    message.channel.send(embeded)
    .catch(error => {
      const errorTopic1 = new Discord.RichEmbed
      errorTopic1
       .setTitle("Error")
       .setAuthor(message.author.tag,message.author.avatarURL)
       .setColor('#FF00FF')
       .addField("Error, please contact moderation with this error: $(error) ")
      message.reply(errorTopic1)
    })
  } else {
   const invalidCommandEmbed = new Discord.RichEmbed
   let messgaeAuthorPing = message.author.id
   invalidCommandEmbed
    .setTitle("Error: Invalid Command")
    .setAuthor(message.author.tag,message.author.avatarURL)
    .setColor("#FF00FF")
    .addField("Error:",`Hey, <@${messgaeAuthorPing}> , that dosent seem to be a command, please try again. If you are sure this is a command, or is listed in the help section, please message a moderator. Thanks!`)
    .setFooter("Made by mark")
  message.channel.send(invalidCommandEmbed)
  }
});
  
client.login(auth.token);