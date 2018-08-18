const snekfetch = require('snekfetch');

module.exports = {
    name: 'cat',
    description: 'Random cat',
    guildOnly: true,
    cooldown: 1,
    async execute(message, args) {
		const { body } = await snekfetch.get('https://aws.random.cat/meow');
		message.channel.send(body.file);
    },
};
