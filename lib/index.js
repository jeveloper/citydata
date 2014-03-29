var Hapi = require('hapi')
fs = require("fs");



var routes = require('./routes');


var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/HelloMongoose';

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;
var env = process.env.NODE_ENV || 'development'


//http://spumko.github.io/resource/api/#server-route-routes-

//http://blog.modulus.io/nodejs-and-hapi-create-rest-api

var config = {cors:true };
var server = new Hapi.Server('0.0.0.0',  parseInt(process.env.PORT, 10) || 8000, config);

// MongoDB connection

var mongoose = require('mongoose');


// Bootstrap db connection
// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } }
  //mongoose.connect(config.db, options)
  mongoose.connect('mongodb://issuer:crazy321@ds033559.mongolab.com:33559/toronto_issues', options);
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

module.exports = server;

