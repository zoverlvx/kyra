const readline = require("readline");
const fs = require("fs");
const request = require("request");

const KEY = process.env.API_KEY;

const readChannelIds = readline.createInterface({
	input: fs.createReadStream("./channels.txt"),
	// output: process.stdout,
	console: false
});

readChannelIds.on("line", function(line) {
	const CHANNEL_ID = line;
	const URL = `https://www.googleapis.com/youtube/v3/search?type=video&key=${KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`
		request.get(URL)
			.on("response", resp => console.log(resp.body));
		//console.log(JSON.stringify(response));
        // res.end(JSON.stringify(response));
});
