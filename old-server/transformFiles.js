const fs = require("fs");
const process = require("process");

// Reads through the directory where we have json file
// Each json file stores 50 video data entries from the YT API
fs.readdir("./apiData", function (error, files) {
	if (error) {
		console.log("Could not list the directory");
		process.exit(1);
	}
	
	files.forEach(function(file) {
		fs.readFile("./apiData/" + file, "utf-8", function (err, content) {
			if (err) throw err;
			// parse the JSON into an object
			console.log(JSON.parse(content));
		});
	});
});
