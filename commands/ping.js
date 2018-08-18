module.exports = {
	name: 'ping',
	description: 'Ping!',
	guildOnly: true,
	cooldown: 1,
	aliases: ['beep'],
	async execute(message, args) {
		message.reply('Pong.');
	},
};
