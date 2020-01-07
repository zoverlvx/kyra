const readline = require("readline");
const fs = require("fs");
const request = require("request");
const makeAPICall = require("./makeAPICall.js");


const readChannels = readline.createInterface({
	input: fs.createReadStream("./channels.txt"),
	// output: process.stdout,
	console: false
});

readChannels.on("line", function(line) {
	const CHANNEL_ID = line;
	const KEY = process.env.API_KEY;
	const URL = `https://www.googleapis.com/youtube/v3/search?type=video&key=${KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`
	
	makeAPICall(URL, function(response) {
		// write response to file
		const data = JSON.stringify(response);
		fs.writeFile(
			`./apiData/channel-${line}.json`, 
			data, 
			function(
				error
			){
				if (error) throw error;
				console.log(`${data} written to file ${line}`);
			}
		);
		//console.log(JSON.stringify(response));
    });
});
