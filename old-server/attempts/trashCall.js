const readline = require("readline");
const fs = require("fs");
const request = require("request");

const KEY = process.env.API_KEY;

const readChannels = readline.createInterface({
	input: fs.createReadStream("./channels.txt"),
	// output: process.stdout,
	console: false
});

// TODO: replace this with a write to file process
const array = [];



function makeAPICall(id, token) {
	const config = {
		json: true
	};
	
	if (!token) {		
		const URL = `https://www.googleapis.com/youtube/v3/search?type=video&key=${KEY}&channelId=${id}&part=snippet,id&order=date&maxResults=50`;
		request(URL, config, handleResponse);
		
		function handleResponse (err, res, body) {
			if (err) {
				console.log(err);
				return;
			}

			array.push(body);

			if (body.nextPageToken) {
				makeAPICall(id, URL + `&pageToken=${body.nextPageToken}`);
			}
			if (!body.nextPageToken) {
				return;
			}
		}

	}

	if (token) {
		const URL = `https://www.googleapis.com/youtube/v3/search?type=video&key=${KEY}&channelId=${id}&part=snippet,id&order=date&maxResults=50`;
		request(URL + token, config, handleResponse);

		function handleResponse (err, res, body) {
			if (err) {
				console.log(err);
				return;
			}

			array.push(body);

			if (body.nextPageToken) {
				makeAPICall(id, URL + `&pageToken=${body.nextPageToken}`);
			}
			if (!body.nextPageToken) {
				return;
			}
		}
	}
}

readChannels.on("line", function(line) {
	const CHANNEL_ID = line;
	makeAPICall(CHANNEL_ID);
});

console.log(array);
