const server = require("express")();
const request = require("request");
const KEY = "AIzaSyDvSaImRfPecutxUo833sNROdjbhaDPYQQ";
const CHANNEL_ID = "OCvO6uJUVJQ6SrATfsWR5_aA";
const URL = `https://www.googleapis.com/youtube/v3/search?key=${KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`

function makeAPICall(cb) {
    request(URL, {json: true}, function(err, res, body) {
        if (err) return cb(err);
        return cb(body);
    });
}

server.get("/", function(req, res) {
    makeAPICall(function(response) {
        res.write(JSON.stringify(response));
        res.end();
    });
});

module.exports = server;
