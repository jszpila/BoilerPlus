/*************************************************
 *
 * Node.js dev server for BoilerPlus
 *
 ************************************************/

var http = require('http'),
  os = require('os'),
  express = require('express'),
  httpProxy = require('http-proxy');
  app = express(),
  proxy = new httpProxy.RoutingProxy(),
  port = 2000;

// Keep node from complaining about the 404 on the fav icon
app.get('img/app/favicon.ico', function(req, res) {
  res.writeHead(200, {'Content-Type': 'image/x-icon'} );
  res.end();
  return;
});

// Proxy requests to API
app.all('/api/*', function(req, res) {
  proxy.proxyRequest(req, res, {host: 'localhost', port: 3000});
});

app.configure(function() {
  'use strict';
  
  app.set('port', port);
  app.use(require('connect-restreamer')());
  app.use(express.methodOverride());
  //app.use(express.bodyParser()); disabled because it munges POST request body during proxying
  app.use(express.static(__dirname + '/app'));
  app.use(express.logger());
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));

  app.use(app.router);

  console.log('Server started @ ' + os.hostname() + ':' + app.get('port'));
});

app.listen(port);
