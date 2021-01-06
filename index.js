/*
Copyright 2019-2021 SpicyCombo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
associated documentation files (the "Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
 portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Licensed under the "MIT" license. See https://en.wikipedia.org/wiki/MIT_License
*/

const Discord = require("discord.js");
const client = new Discord.Client();

client.once('ready', () => {
	console.log("Creeper bot has started");
});
 
client.on("ready", () => {
  client.user.setPresence({
      game: { 
          name: 'c!help | Trying to blow up',
          type: 'PLAYING'
      },
      status: 'idle'
  })
});

// Embed fields.
const lyricsEmbed = new Discord.MessageEmbed()
	.setColor('#2fff00')
	.setTitle('Creeper bot - Lyrics')
	.setAuthor('Creeper bot', 'https://i.imgur.com/4AiJcoJ.png')
	.setDescription('These are the lyrics you can send to me for me to respond to!\n```Creeper\nAww man\nSo we back in the mine\nGot our pickaxe swinging from\nSide to side\nSide side to side\nThis task was a crueling one\nHope to find some diamonds tonight night nigh\nDiamonds tonight\n** SpicyCombo#1665 should add more of these..```')
	.setTimestamp()
  .setFooter('Creeper bot v1.0 by SpicyCombo#1665, made officially for Mikecraft Discord');
  
const helpEmbed = new Discord.MessageEmbed()
	.setColor('#2fff00')
	.setTitle('Creeper bot - Help')
	.setAuthor('Creeper bot', 'https://i.imgur.com/4AiJcoJ.png')
	.setDescription('**My prefix is** `c!`, the commands are:\n\n`help` - Displays this help message\n`ping` - Gets the latency of the bot.\n`restart` - Restarts the bot.')
	.setTimestamp()
	.setFooter('Creeper bot v1.0 by SpicyCombo#1665, made officially for Mikecraft Discord');

const shutdownEmbed = new Discord.MessageEmbed()
	.setColor('#2fff00')
	.setAuthor('Creeper bot', 'https://i.imgur.com/4AiJcoJ.png')
	.setDescription('**Shutting down the bot, please check the console for more details.**')
	.setTimestamp()
	.setFooter('Creeper bot v1.0 by SpicyCombo#1665, made officially for Mikecraft Discord');

const pinglEmbed = new Discord.MessageEmbed()
	.setColor('#2fff00')
	.setTitle('Creeper bot - Ping')
	.setAuthor('Creeper bot', 'https://i.imgur.com/4AiJcoJ.png')
	.setDescription('Pinging...')
	.setTimestamp()
  .setFooter('Creeper bot v1.0 by SpicyCombo#1665, made officially for Mikecraft Discord');

// Set the prefix
let prefix = "c!";
// Now let's set the owner of the bot. So the eval command will work.
let ownerID = "665691795685900316";
// Time to make it, so it will ignore all the messages from other bots. Including itself!

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "help")) { // If a message starts with the prefix then help, then it should do this operation
    message.channel.send(helpEmbed) // It should send "helpEmbed". An operation that was defined above.
  } else if (message.content.startsWith(prefix + "ping")) { // Now moving onto the ping command. Just like the help command. But we start with else if arguements. So the bot knows that we are moving onto the next command!
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
  } else if (message.content.toLowerCase() == prefix + "restart") { // Note that this is an example and anyone can use this command.
      message.channel.send(shutdownEmbed).then(() => { // And this is called "restart" because I have PM2 installed.
          client.destroy(); // The place where the bot is shutdown
      })
    } else if (message.content.startsWith(prefix + "lyrics")) { // Simple creeper command. If anyone types "creeper" or "Creeper" in the chat, then the bot will respond with "Aww man"
    message.channel.send(lyricsEmbed);
    } else if (message.content.startsWith("Creeper")) { // Simple creeper command. If anyone types "creeper" or "Creeper" in the chat, then the bot will respond with "Aww man"
    message.channel.send("Aww man");
    }  else if (message.content.startsWith("creeper")) { // :D Now thngs are the same
      message.channel.send("Aww man");
    } else if (message.content.startsWith("Aww man")) {
    message.channel.send("So we back in the mine");
    } else if (message.content.startsWith("aww man")) {
    message.channel.send("So we back in the mine");
    } else if (message.content.startsWith("So we back in the mine")) {
    message.channel.send("Got our pickaxe swinging from");
    } else if (message.content.startsWith("so we back in the mine")) {
    message.channel.send("Got our pickaxe swinging from");
    } else if (message.content.startsWith("Got our pickaxe swinging from")) {
      message.channel.send("Side to side");
    } else if (message.content.startsWith("got our pickaxe swinging from")) {
      message.channel.send("Side to side");
    } else if (message.content.startsWith("Side to side")) {
    message.channel.send("Side side to side");
    } else if (message.content.startsWith("side to side")) {
    message.channel.send("Side side to side");
    } else if (message.content.startsWith("Side side to side")) {
    message.channel.send("This task was a crueling one");
    } else if (message.content.startsWith("side side to side")) {
    message.channel.send("This task was a crueling one");
    } else if (message.content.startsWith("This task was a crueling one")) {
    message.channel.send("Hope to find some diamonds tonight night night");
    } else if (message.content.startsWith("this task was a crueling one")) {
    message.channel.send("Hope to find some diamonds tonight night night");
    } else if (message.content.startsWith("Diamonds tonight")) {
    message.channel.send("[Lyrics end here. SpicyCombo#1665 should add more later]");
    } else if (message.content.startsWith("diamonds tonight")) {
    message.channel.send("[Lyrics end here. SpicyCombo#1665 should add more later]");
    }
});
 
client.login("get-your-token-from-discord"); //Set your bot's token here - P.S. I forgot to remove the bot's token, so now they reset the whole shit. Ahh

