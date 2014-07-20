var Hapi = require('hapi');
var config = require('./config');

var server = new Hapi.Server(8080, "localhost");

server.route({
    path: '/favicon.ico',
    method: 'GET',
    handler: {
        file: './favicon.ico'
    }
});

server.route({
    path: '/',
    method: 'GET',
    handler: {
        file: './index.html'
    }
});

server.route({
    path: '/static/{path*}',
    method: 'GET',
    handler: {
        directory: {
            path: './static',
            listing: false,
            index: false
        }
    }
});

server.route({
    path: '/*',
    method: 'GET',
    handler: function(request, reply) {
        reply.redirect('/#' + request.url);
    }
});

server.start(function() {
    console.log("server started @ " + server.info.uri);
});
