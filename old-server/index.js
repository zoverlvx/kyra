const server = require("./server.js");
const PORT = 5000;

server.listen(PORT, function() {
    console.log(`Server on port ${PORT}`);
});
