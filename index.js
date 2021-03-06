#!/usr/bin/env node

/**
 * Module dependencies.
 */
var config = require('./configs/config');
var pathParser = require('./configs/pathParser');
var runServer = function(options) {
  var port = options.port || 3000;
  var path = pathParser.getAbsolutePath(options.src || process.cwd());
  var dist = pathParser.getAbsolutePath(options.dist || (path + '/dist'));
  var imgSrc = options.imgSrc || process.cwd() + '/images';
  config.resourcePath = path;
  config.dist = dist;
  config.imgSrc = imgSrc;
  var app = require('./src/app.js');
  var debug = require('debug')('NodeDemo:server');
  var http = require('http');

  /**
   * Get port from environment and store in Express.
   */

  var port = normalizePort(port);
  app.set('port', port);

  /**
   * Create HTTP server.
   */

  var server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  /**
   * Normalize a port into a number, string, or false.
   */

  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
};

module.exports = runServer;
