const request = require("request");

module.exports = function(url, cb) {
	request(url, {json: true}, function(err, res, body) {
		if (err) return cb(err);
		return cb(body);
	});
}
