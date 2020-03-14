const Discord = require('discord.js')
const bot = new Discord.Client()
const fs = require('fs')
const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));
require('dotenv').config()

bot.commands = new Discord.Collection();
for (const file of commandFiles) {
	const cmd = require(`./commands/${file}`);
	bot.commands.set(cmd.name.toLowerCase(), cmd);
}

bot.on('message', async msg => {
	try {
		// Check for our !<prefix>
		if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return

		// Remove our !<prefix>
		const args = msg.content.slice(process.env.PREFIX.length).split(/ +/)
		args.shift()

		// Prevent issue where null cmd cause bot to die.
		// Get our command from the first arg.
		let cmd = ''
		if (args.length > 0) {
			cmd = args.shift().toLowerCase()
		}

		// If the bot does not have the command tell the user and return.
		if (!bot.commands.has(cmd)) {
			msg.reply('you need to supply a command.')
			return;
		}

		// Run the command.
		bot.commands.get(cmd).execute(msg, args)

	} catch (error) {
		console.error(error)
		msg.reply('there was an error trying to execute that command!')
	}
})

bot.once('ready', () => {
	console.log('Ready!');
})

bot.login(process.env.BOT_TOKEN)