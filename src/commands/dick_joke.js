const dick_jokes = require('./dick_jokes.json')

module.exports = {
    name: 'joke',
    description: 'A dick joke.',
    execute (msg, args) {
        const joke = dick_jokes[Math.floor(Math.random() * dick_jokes.length)]
        if (args) {
            let buff = ''
            args.forEach(e => {
                buff+=`@${e},`
            })
            msg.channel.send(`${buff} ${joke}`)
        } else {
            msg.channel.send(joke)
        }
    },
}
