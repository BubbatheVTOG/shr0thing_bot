const Discord = require('discord.js')
const bot = new Discord.Client()
const fs = require('fs')
const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));
require('dotenv').config()

bot.once('ready', () => {
	console.log('Ready!');
})

bot.commands = new Discord.Collection();
for (const file of commandFiles) {
	const cmd = require(`./commands/${file}`);
	bot.commands.set(cmd.name, cmd);
}

bot.on('message', async msg => {
	if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return

	const args = msg.content.slice(process.env.PREFIX.length).split(/ +/)
	args.shift()
	const cmd = args.shift().toLowerCase()

	if (!bot.commands.has(cmd)) return;

	try {
		bot.commands.get(cmd).execute(msg, args)
	} catch (error) {
		console.error(error)
		msg.reply('there was an error trying to execute that command!')
	}

})

bot.login(process.env.BOT_TOKEN)