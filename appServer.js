
// Initialize requirements
var express = require('express');

// Initialize variables
var path = 'build/';

// Run Server: runs all server tasks
var runServer = function () {

	// Setup server
	var server = express();
	server.listen(3000, "127.0.0.1", function () {
	    console.log('Serving cChange app...');
	});

	// Start Express static
	server.use(express.static(path));

	// Load base HTML
	server.get('*', function (req, res) {
	    res.sendFile(path, {"root": "."});
	});
}

// Run server
runServer();