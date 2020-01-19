const Discord = require('discord.js');
var q1 = "Why are there Spirals in the turbines?"
var o1 = "Options: \n1.Ground Safety \n2.Cooling the Pilot \nKilling Birds"
var q2 = "Can a Passenger land a plane?"
var o2 = "Options : 1.Yes\n2.No"
var q3 = "How dangerous are Thunderstorms?"
var o3 = "Options : 1.Very Dangerous \n2.Very fun to walk through!"
if (command === 'quiz'){
    message.channel.send("Welcome to the QUIZ. \nYou can answer a question only by entering numbers.\n Let's Start.")
    message.channel.send(q1);
    message.channel.send(o1);
    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60 });
    console.log(collector)
    collector.on('collect', message => {
        if (message.content == "1") {
          message.channel.send("That is Correct! Spirals are used for Ground Safety!")
        }
        else {
          message.channel.send("That is Incorrect! Correct answer is `OPTION 1`")
        }
    })

    message.channel.send("Welcome to the QUIZ. \nYou can answer a question only by entering numbers.\n Let's Start.")
    message.channel.send(q2);
    message.channel.send(o2);
    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60 });
    console.log(collector)
    collector.on('collect', message => {
        if (message.content == "2") {
          message.channel.send("That is Correct! A Pilot with training can only land a plane, not a passenger!")
        }
        else {
          message.channel.send("That is Incorrect! Correct answer is `OPTION 1`")
        }
    })

    message.channel.send("Welcome to the QUIZ. \nYou can answer a question only by entering numbers.\n Let's Start.")
    message.channel.send(q3);
    message.channel.send(o3);
    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60 });
    console.log(collector)
    collector.on('collect', message => {
        if (message.content == "1") {
          message.channel.send("That is Correct! Thunderstorms are very dangerous")
        }
        else {
          message.channel.send("That is Incorrect! Correct answer is `OPTION 1`")
        }
    })
}
