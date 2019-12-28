const server = require("express")();
const request = require("request");
const fs = require("fs");

/* 
FOR USE IN DEV ONLY. ALLOWS CROSS ORIGIN. HACK TO GET AROUND CHROME
*/
server.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	next();
})

server.get("/", function(req, res) {
	fs.readFile(
		"./data/db.json", 
		function(
			error, 
			data
		){
			res.json(JSON.parse(data));
		}
	);
});

module.exports = server;
