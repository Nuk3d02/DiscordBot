const Sequelize = require('sequelize');

module.exports = {
	name: 'add',
	description: 'Add twitch streams to monitor.',
	guildOnly: true,
	cooldown: 1,
	async execute(message, args, guild, Tags) {
		try {

			//Get twitch ID and display name.
			var twitchID = getTwitchID(args[0]);

			if (await twitchID.ID != null) {
				console.log("TEST");
				var tCat = null;
				try {
					tCat = message.guild.channels.find(val => val.type === 'category' && val.name === 'Twitch');
					let channel = await guild.createChannel(twitchID.disName);
					channel = await channel.setParent(tCat).then(updated => console.log(`Set the category of ${updated.name} to ${updated.parent.name}`)).catch(console.error);
				}
				catch(err) { console.log(err); }

				try {
					const tag = await Tags.create({
						name: twitchID.disName,
						channel: twitchID.ID,
					});
				}
				catch (e) {
					if (e.name === 'SequelizeUniqueConstraintError') {
						return message.reply('That tag already exists');
					}
					return message.reply('Something went wrong with adding a tag.');
				}
			}
			return message.reply('Got Twitch API. ' + twitchID.ID);
		}
		catch(err) {
			return message.reply(err.message);
			console.log("ERROR " + err);
		}
	}
}

function getTwitchID(name) {
	var twitchID = {
		ID: "16678946",
		disName: "Coestar"
	};
	return twitchID;
}
