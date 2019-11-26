const Discord = require('discord.js');
const client = new Discord.Client();
console.log("Loged In")
//sets prefix
let prefix ="!";
client.on("message", (message) => {
  // Exit and stop if the prefix is not there or if user is a bot
let args = message.content.slice(prefix.length).trim().split(/ +/g);
    //array of words (with prefix)
let command = args.shift().toLowerCase()
    //array oaf words (without prefix)
  if (command === "ping") {}
  else if (command === "memes") {}
  else if (command === "fortune") {}
  else if (command === "foo") {
    message.channel.send("Bar!")
  }else if (command === "help") {
    let pageOrCommand = args[2]
    if (!pageOrCommand){
      const help1 = new Discord.RichEmbed();
      help1
      .setTitle("Help, Page 1")
      .setAuthor(message.author.tag,message.author.avatarURL)
      .setColor("#FF00FF")
      .addField("Ping", "Sends Pong")
      .addField("Foo","Sends Bar Back")
      .addField("Topic", "Gives a Chat Topic")
      .addField("Help","Shows This Message")
      .addField("Memes","Gives a epic gammer meme")
      message.channel.send(help1)
    }else if(pageOrCommand === 1){
      const help1 = new Discord.RichEmbed();
      help1
      .setTitle("Help, Page 1")
      .setAuthor(message.author.tag,message.author.avatarURL)
      .setColor("#FF00FF")
      .addField("Ping", "Sends Pong")
      .addField("Foo","Sends Bar Back")
      .addField("Topic", "Gives a Chat Topic")
      .addField("Help","Shows This Message")
      .addField("Memes","*deprecated")
      message.channel.send(help1)
    }else if(pageOrCommand === 2){    
      const help2 = new Discord.RichEmbed();
      help2
      .setTitle("Help, Page 2")
      .setAuthor(message.author.tag,message.author.avatarURL)
      .setColor("#FF00FF")
      .addField("whois","Gives info about a user")
      .addField("botinfo","*deprecated*")
  }}else if (command === "topic"){
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
  }else if(command === "whois"){
    let whoisUser = message.mentions.members.first() || message.guild.members.get(args[0])
      if(!whoisUser){
        let roles = message.member.roles.map(r => r).join(',')
        let highestRole = message.member.highestRole
        const whois = new Discord.RichEmbed
        whois
        .setThumbnail(message.author.avatarURL)
        .setTitle(message.author.tag)
        .setAuthor(message.author.tag,message.author.avatarURL)
        .setColor("#FF00FF")
        .addField("ID:",message.author.id)
        .addField("Username:",message.author.tag)
        .addField("Roles:",roles)
        .addField("Highest Role:",highestRole)
        .addField("Account Created on:", message.author.createdAt)
        .addField("Joined on:", message.member.joinedAt)
        .addField("Presence:",message.author.presence.status)
        message.channel.send(whois)
      }else if (whoisUser){
        let roles1 = whoisUser.roles.map(r => r).join(',')
        let highestRole1 = whoisUser.highestRole
        const whois1 = new Discord.RichEmbed
        whois1
        .setThumbnail(whoisUser.user.avatarURL)
        .setTitle(whoisUser.user.tag)
        .setAuthor(message.author.tag,message.author.avatarURL)
        .setColor("#FF00FF")
        .addField("ID:",whoisUser.id)
        .addField("Username:",whoisUser.user.username)
        .addField("Roles:",roles1) //Says undefined
        .addField("Highest Role:",highestRole1) //says undefined
        .addField("Account Created On:",whoisUser.user.createdAt)
        .addField("Joined The Server on:",whoisUser.joinedAt) //says undefined
        .addField("Pressence:",whoisUser.user.presence.status) // says [object Object]
        message.channel.send(whois1)
  }} else if (command === "permisions"){
    let permMentioned = message.mentions.members.first() || message.guild.members.get(args[0])
      if (!permMentioned){
        const permNoMentionedEmbed = new Discord.RichEmbed
        permNoMentionedEmbed
        .setTitle("Error")
        .setAuthor(message.author.tag,message.author.avatarURL)
        .setColor("#FF00FF")
        .addField("Error","You didnt mention who you wanted to veiw permisions of!")
        message.channel.send(permNoMentionedEmbed)
      }else {
        const permEmbed = new Discord.RichEmbed
        permEmbed 
        .setTitle("Permisions")
        .setAuthor(message.author.tag,message.author.avatarURL)
        .setColor('#FF00FF')
        .addField("Permisions:",permMentioned.permissions.toArray().join(' , '))
        message.channel.send(permEmbed)
          }
  }else {
   const invalidCommandEmbed = new Discord.RichEmbed
   let messgaeAuthorPing = message.author.id
   invalidCommandEmbed
  .setTitle("Error: Invalid Command")
  .setAuthor(message.author.tag,message.author.avatarURL)
  .setColor("#FF00FF")
  .addField("Error:",`Hey, <@${messgaeAuthorPing}> , that dosent seem to be a command, please try again. If you are sure this is a command, or is listed in the help section, please message a moderator. Thanks!`)
  .setFooter("Made by mark")
  message.channel.send(invalidCommandEmbed)
}})
client.login(process.env.BOT_TOKEN);
