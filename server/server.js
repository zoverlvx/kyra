const server = require("express")();

server.get("/", function(req, res) {
    res.send("Server is running");
});

module.exports = server;
