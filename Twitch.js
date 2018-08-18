/*const tAPI = require('twitch-api-v5');
var test = "";
/*module.exports = {
    name: 'Twitchy',
    cooldown: 1,
    async execute() {
    	tAPI.clientID = 'f7se3re1vei907r8x7l7yg5zubuuvj';

    	tAPI.streams.channel({channelID: 'HCJustin'}, (err,res) => {
    		if (err) console.log(err);
    		else console.log(res);
    	});
    },
};

function getTwitchID(name) {
	tAPI.clientID = 'f7se3re1vei907r8x7l7yg5zubuuvj';
	tAPI.users.usersByName({users: name}, (err,res) => {
		if (err) console.log(err);
		else {
			//console.log(res.users);
			getStream(res.users[0]._id);
		}
	});
}

function getStream(tID) {
	tAPI.streams.channel({channelID: tID}, (err,res) => {
		if (err) console.log(err);
		else console.log(res);
	});
}*/