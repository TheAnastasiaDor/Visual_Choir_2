// Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

// Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);

// Require newFile.js for socket.io configuration
let setupSocketIO = require('./newFile');

// Call the function exported from newFile.js and pass the server to it
setupSocketIO(server);

let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});