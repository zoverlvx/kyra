const request = require("request");

function getVideoList(playListId) {
	const videoList = [];
	const getVideos = function(
		playListId, 
		apiKey, 
		nextPageToken
	) {
		const playListOptions = {
			url: `https://googleapis.com/youtube/v3/playListItems?part=snippet%2CcontentDetails&maxResults=50&playListId=${playListId}&key=${process.env.API_KEY}`,
			method: "GET"
		};
		if (nextPageToken) {
			playListOptions.url = playListOptions.url + "&pageToken=" + nextPageToken
		}
		return new Promise(function(fulfill, reject) {
			request(
				playListOptions, 
				function (
					error, 
					results, 
					body
				) {
					if (error) {
						reject(error);
					}
					const result = JSON.parse(body);
					let i;
					const len = result.items.length;
					for (i = 0; i < len; i += 1) {
						const dataObj = {};
						dataObj.videoId = result.items[i].contentDetails.videoId;
						dataObj.title = result.items[i].snippet.title;
						if (result.items[i].snippet.thumbnails) {
							dataObj.thumbnail = result.items[i].snippet.thumbnails;
						}
						videoList.push(dataObj);
					}
					if (result.nextPageToken) {
						getVideos(
							playListId, 
							process.env.API_KEY,
							result.nextPageToken
						);
						fulfill(videoList);
					} else {
						fulfill(videoList);
					}
			});
		});
	}
}

/*
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
*/
