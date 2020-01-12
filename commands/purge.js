const Discord = require("discord.js")
module.exports = {
    name: 'purge',
    description: 'Purges a selected amount of messages',
    usage: 'message count',
    aliases: ['Purge'],
    execute(client, message, args){
        let roles = message.member.roles.map(role => role.name)
    		if (roles.includes("Mod") || roles.includes('Moderator') || roles.include('Admin')) {
     			var mod = true
     		} else {
       			var mod = false 
       		}
         if (mod === false){
          let noPerms = new Discord.RichEmbed()
          noPerms
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setTitle('Missing Permisions')
          .setColor('#F90B0B')
          .addField('Missing Perms!', `Hey <@${message.author.id}>, you don't have the permisions to use this command.`)
          return message.channel.send(noPerms)
         }
         if (!args[1]){
           if(args[0]>0 && args[0]<500){
             let messagesDelete = args[0]
             console.log(args)
             let sucsess = new Discord.RichEmbed()
             sucsess
             .setAuthor(message.author.tag, message.author.avatarURL)
             .setTitle('Purge')
             .setColor('#4DF8E8')
             .addField('Purged Messages', `I purged ${messageDelete} messages!`)
             message.channel.bulkDelete(messagesDelete)
             .then(messages => message.channel.send(sucsess))
             .catch(error => {
             let err = new Discord.RichEmbed()
             .setTitle('Error')
             .setAuthor(message.author.tag,message.author.avatarURL)
             .setColor('#F90B0B')
             .addField('Error!',`An error occored. ${error}`)
             message.channel.send(err)})
             setTimeout(() => { messages.delete() }, 2000)
             }
          }
           }}
