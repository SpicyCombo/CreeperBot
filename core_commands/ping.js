
exports.run = (client, message, args, level) => {
  if (message.content.startsWith(prefix + "ping")) { // Now moving onto the ping command. Just like the help command. But we start with else if arguements. So the bot knows that we are moving onto the next command!
      message.channel.send(pinglEmbed).then((msg) => { // First send the embed saying "Getting the ping"
        ping = msg.createdTimestamp - message.createdTimestamp; // Here's where we define what the variable "ping" is.
        const pingEmbed = new Discord.MessageEmbed() // And this is the embed that comes after the command the user typed.
         .setFooter('Creeper bot v1.0 by SpicyCombo#1665, made officially for Mikecraft Discord')
         .setAuthor('Creeper bot', 'https://i.imgur.com/4AiJcoJ.png')
         .setColor(`#2fff00`)
         .setTimestamp()
         .setTitle(`Creeper bot - Ping`)
         .setDescription(
          ":ping_pong: | Pong! Bot's latency is `" + ping + 'ms`.'
        );
        message.channel.send(pingEmbed); // This is the step when the place when the bot sends the embed, that tells the user that the bot is getting the value of the embed.
         msg.delete(); // Delete the previous message.
    })
  }

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["latency"],
    permLevel: "User"
  };
  
  exports.ping = {
    name: "ping",
    category: "Core",
    description: "Gets the latency of the bot.",
    usage: "ping"
  }};
