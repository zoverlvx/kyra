const server = require("express")();
const request = require("request");
const KEY = process.env.API_KEY;
const CHANNEL_ID = "UCvO6uJUVJQ6SrATfsWR5_aA"
const URL = `https://www.googleapis.com/youtube/v3/search?type=video&key=${KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`

/* 
FOR USE IN DEV ONLY. ALLOWS CROSS ORIGIN. HACK TO GET AROUND CHROME
*/
server.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	next();
})

function makeAPICall(cb) {
    request(URL, {json: true}, function(err, res, body) {
        if (err) return cb(err);
        return cb(body);
    });
}

server.get("/", function(req, res) {
    makeAPICall(function(response) {
        res.end(JSON.stringify(response));
    });
});

module.exports = server;
