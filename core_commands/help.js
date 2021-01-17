  
/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/

exports.run = (client, message, args, level) => {
    // If no specific command is called, show all filtered commands.
    if (!args[0]) {
      // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
      const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);
  
      // Here we have to get the command names only, and we use that array to get the longest name.
      // This make the help commands "aligned" in the output.
      const commandNames = myCommands.keyArray();
      const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
  
      let currentCategory = "";
      let output = `= Command List =\n\n[Use ${message.settings.prefix}help <commandname> for details]\n`;
      const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
      sorted.forEach( c => {
        const cat = c.help.category.toProperCase();
        if (currentCategory !== cat) {
          output += `\u200b\n== ${cat} ==\n`;
          currentCategory = cat;
        }
        output += `${message.settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
      });
      message.channel.send(output, {code: "asciidoc", split: { char: "\u200b" }});
    } else {
      // Show individual command's help.
      let command = args[0];
      if (client.commands.has(command)) {
        command = client.commands.get(command);
        if (level < client.levelCache[command.conf.permLevel]) return;
        message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(", ")}\n= ${command.help.name} =`, {code:"asciidoc"});
      }
    }
  };
  
  /*
    if (message.content.startsWith(prefix + "help")) { // If a message starts with the prefix then help, then it should do this operation
    message.channel.send(helpEmbed) // It should send "helpEmbed". An operation that was defined above.
    }

    const helpEmbed = new Discord.MessageEmbed()
	.setColor('#2fff00')
	.setTitle('Creeper bot - Help')
	.setAuthor('Creeper bot', 'https://i.imgur.com/4AiJcoJ.png')
	.setDescription('**My prefix is** `c!`, the commands are:\n\n`help` - Displays this help message\n`ping` - Gets the latency of the bot.\n`restart` - Restarts the bot.')
	.setTimestamp()
	.setFooter('Creeper bot v1.0 by SpicyCombo#1665, made officially for Mikecraft Discord');
    */

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["h", "?"],
    permLevel: "User"
  };
  
  exports.help = {
    name: "help",
    category: "Core",
    description: "Displays all the available commands for your permission level.",
    usage: "help <command>"
  };
