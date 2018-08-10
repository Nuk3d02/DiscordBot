const Discord = require('discord.js');
const { prefix, token } = require('./config.json');


const client = new Discord.Client();

client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	/*if (message.content === `${prefix}ping`) {
    	// send back "Pong." to the channel the message was sent in
    	message.channel.send('Pong.');
	}
	else if (message.content === `${prefix}beep`) {
		message.channel.send('Boop');
	}*/
	if (command === 'ping') {
		message.reply('Pong');
	}
	else if (command === 'beep') {
		message.reply('Boop');
	}
	else if (command === 'args-info') {
		if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		else if (args[0] === 'foo') {
			return message.channel.send('bar');
		}
		message.channel.send(`First argument: ${args[0]}`);
	}
    //console.log(message.content);
});

client.login(token);
