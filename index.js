var sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const Discord = require('discord.js');
//const Twitch = require('./Twitch.js');
const Sequelize = require('sequelize');
const { prefix, token } = require('./config.json');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    operatorsAliases: false,
    // SQLite only
    storage: 'database.sqlite',
});
const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	channel: Sequelize.STRING,
});

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on('ready', () => {
    console.log('Ready!');
    Tags.sync();
    client.user.setActivity('Bots!', { type: 'LISTENING' });
});

client.on('message', async message => {
	var tCat = null;
	if (tCat = message.guild.channels.find(val => val.type === 'category' && val.name === 'Twitch') === null) {
		tCat = await guild.createChannel('Twitch', 'category', [{
			id: guild.id,
			deny: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'ADD_REACTIONS', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'ATTACH_FILES', 'MENTION_EVERYONE', 'MANAGE_WEBHOOKS', 'MANAGE_ROLES'],
			allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
			}]).then(console.log).catch(console.error);
	}
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


	if (!command) return;
	if (command.guildOnly && message.channel.type !== 'text') {
    	return message.reply('I can\'t execute that command inside DMs!');
	}
	if (command.args && !args.length) {
        let reply = `Wrong usage.`;
        if (command.usage) {
        	reply += `\nPlease use \`${prefix}${command.name} ${command.usage}\``
        }
        return message.reply(reply);
    }

    if (!cooldowns.has(command.name)) {
    	cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (!timestamps.has(message.author.id)) {
    	timestamps.set(message.author.id, now);
    	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    else {
    	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    	if (now < expirationTime) {
    		const timeLeft = (expirationTime - now) / 1000;
    		return message.reply(`Please wait ${timeLeft.toFixed(1)} second(s) before using the \`${command.name}\` command again.`);
    	}
    	timestamps.set(message.author.id, now);
    	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
	try {
		command.execute(message, args, message.guild, Tags);
	}
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command.');
	}
    //console.log(message.content);
});

client.login(token);
