var Hapi = require('hapi')
fs = require("fs");


var dotenv = require('dotenv');
dotenv.load();
var routes = require('./routes');




// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = parseInt(process.env.PORT, 10) || 5000;
var env = process.env.NODE_ENV || 'development'


//http://spumko.github.io/resource/api/#server-route-routes-

//http://blog.modulus.io/nodejs-and-hapi-create-rest-api

var config = {cors:true };
var server = new Hapi.Server('0.0.0.0',   theport, config);

// MongoDB connection

var mongoose = require('mongoose');
var mongourl = process.env.MONGOURL;

// Bootstrap db connection
// Connect to mongodb
var connect = function () {
	var options = { server: { socketOptions: { keepAlive: 1 } } }
  //mongoose.connect(config.db, options)
  mongoose.connect(mongourl, options);
}
connect();

// Error handler
mongoose.connection.on('error', function (err) {
	console.log(err)
})

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
	connect()
})



// Bootstrap models
var models_path = __dirname + '/models'
fs.readdirSync(models_path).forEach(function (file) {
	if (~file.indexOf('.js')) require(models_path + '/' + file)
});



server.pack.require({ lout: { endpoint: '/docs' } }, function (err) {

	if (err) {
		console.log('Failed loading plugins');
	}
});

server.route(routes);

server.start();

console.log("Started server on port %s",theport)

module.exports = server;

