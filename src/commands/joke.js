const jokes = require('./jokes.json')

module.exports = {
    name: 'joke',
    description: 'A joke.',
    execute (msg, args) {
        const joke = dick_jokes[Math.floor(Math.random() * dick_jokes.length)]
        if (msg.mentions.users.size > 0) {
            msg.guild.members.fetch(msg.mentions.users.first())
                .then(member => {
                    msg.channel.send(`<@${member.id}>, ${joke}`)
                })
        } else {
            msg.channel.send(joke)
        }
    },
}