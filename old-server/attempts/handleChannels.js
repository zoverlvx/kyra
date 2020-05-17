const readline = require("readline");
const fs = require("fs");
const request = require("request");

const KEY = process.env.API_KEY;

const readChannels = readline.createInterface({
	input: fs.createReadStream("./channels.txt"),
	// output: process.stdout,
	console: false
});

function makeAPICall(url, cb) {
	request(url, {json: true}, function(err, res, body) {
		if (err) return cb(err);
		return cb(body);
	});
}

readChannels.on("line", function(line) {
	const CHANNEL_ID = line;
	const URL = `https://www.googleapis.com/youtube/v3/search?type=video&key=${KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`
	
	makeAPICall(URL, function(response) {
		console.log(JSON.stringify(response));
        // res.end(JSON.stringify(response));
		// return JSON.stringify(response)
    });

});
