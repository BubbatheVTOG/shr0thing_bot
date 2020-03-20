adjectives = ['MASSIVE', 'veiny', 'tiny', 'narrow', 'pocket sized', 'miniature', 'shrimp']
nouns = ['dick', 'penis', 'peen', 'shlong', 'meat', 'cock', 'one-eyed monster', 'moby dick', 'pee wee']

module.exports = {
    name: 'poke',
    description: 'A poke.',
    execute (msg, args) {
        if (msg.mentions.users.size > 0) {
            const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
            const noun = nouns[Math.floor(Math.random() * nouns.length)]
            msg.guild.members.fetch(msg.mentions.users.first())
                .then(member => {
                    msg.channel.send(`<@${member.id}>, slaps you with their ${adjective} ${noun}`)
                })
        }
        else {
            msg.reply('you need to provide a person to slap with your dick.')
        }
    },
}