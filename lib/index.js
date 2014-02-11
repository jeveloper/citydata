var Hapi = require('hapi');
var routes = require('./routes');

//http://spumko.github.io/resource/api/#server-route-routes-


var config = { };
var server = new Hapi.Server('0.0.0.0',  parseInt(process.env.PORT, 10) || 8000, config);



server.pack.require({ lout: { endpoint: '/docs' } }, function (err) {

    if (err) {
        console.log('Failed loading plugins');
    }
});

server.route(routes);

server.start();

module.exports = server;