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

// Before the bot starts, let the bot itself to see if the machine's NodeJS version is 12.0.0 or above. (From AnIdiotsGuide's GuideBot Github repository)
if (Number(process.version.slice(1).split(".")[0]) < 12) throw new Error("Node 12.0.0 or higher is required. Update Node on your system.");

// Discord.js is required for this bot to work.
const Discord = require("discord.js");
// Configurations are needed for some features to work. And I am making this now customization for you ;p
const config = require("./config.js");
// Core comtumizations, don't edit the core_config.js file if you still want the bot to stay cool :D
const coreconfig = require("./core_config.js");

// Now this is your client. Some people call it bot, some people call it clinet. You can call it whatever you want it to be, but I am going with client.
const client = new Discord.Client({
  ws: {
    intents: config.intents
  }
});

// Now, this is the place where the bot will send a message in console saying it's starting.
client.once('ready', () => {
	console.log(config.logstart); // Look in config.js if you would like to make changes to the message
});
 
// Alright, the bot is online. But, we want it to have some cool custom status (Bot presence) So lets make that happen
client.on("ready", () => {
  client.user.setPresence({
      game: { 
          name: 'c!help | Trying to blow up', // This is the status of the bot
          type: 'PLAYING' // Type of that status
      },
      status: 'idle' // Status status
  })
});

const init = async () => {
  // Load commands from the folder "core_commands". I named it that since it's core commands. Obvious... Right??
  const cmdFiles = await readdir("./core_commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });
}

/*
const evtFiles = await readdir("./events/");
client.logger.log(`Loading a total of ${evtFiles.length} events.`);
evtFiles.forEach(file => {
  const eventName = file.split(".")[0];
  client.logger.log(`Loading Event: ${eventName}`);
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
});
*/

// Embeds.
const lyricsEmbed = new Discord.MessageEmbed()
	.setColor('#2fff00')
	.setTitle(coreconfig.botname + ' - Lyrics')
	.setAuthor(coreconfig.botname, 'https://i.imgur.com/4AiJcoJ.png')
	.setDescription('These are the lyrics you can send to me for me to respond to!\n```Creeper\nAww man\nSo we back in the mine\nGot our pickaxe swinging from\nSide to side\nSide side to side\nThis task was a crueling one\nHope to find some diamonds tonight night nigh\nDiamonds tonight\n** SpicyCombo#1665 should add more of these..```')
	.setTimestamp()
  .setFooter(coreconfig.embedfooter);

const shutdownEmbed = new Discord.MessageEmbed()
	.setColor('#2fff00')
	.setAuthor(coreconfig.botname, 'https://i.imgur.com/4AiJcoJ.png')
	.setDescription('**Shutting down the bot, please check the console for more details.**')
	.setTimestamp()
	.setFooter(coreconfig.embedfooter);

const pinglEmbed = new Discord.MessageEmbed()
	.setColor('#2fff00')
	.setTitle(coreconfig.botname + ' - Ping')
	.setAuthor(coreconfig.botname, 'https://i.imgur.com/4AiJcoJ.png')
	.setDescription('Pinging...')
	.setTimestamp()
  .setFooter(coreconfig.embedfooter);

// Set the prefix
let prefix = config.prefix;
// Now let's set the owner of the bot. So the eval command will work.
let ownerID = config.ownerID;
// Time to make it, so it will ignore all the messages from other bots. Including itself!

client.on("message", (message) => {
  if (message.author.bot) return;
    if (message.content.toLowerCase() == prefix + "shutdown") { // Note that this is an example and anyone can use this command.
      message.channel.send(shutdownEmbed).then(() => {
          client.destroy(); // The place where the bot is shutdown
          console.log(config.logstart); // Should also possibily tell us if anyone actually triggers this command.
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
 
client.login(config.token); //Set your bot's token here
