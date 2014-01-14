/*************************************************
 *
 * Node.js dev server for BoilerPlus
 *
 ************************************************/

var http = require('http'),
  os = require('os'),
  express = require('express'),
  httpProxy = require('http-proxy'),
  url = require('url'),
  app = express(),
  proxy = new httpProxy.RoutingProxy(),
  port = 2000,
  remoteHost = {
    route: '/api/*',
    name: 'localhost',
    port: 3000
  }

// Keep node from complaining about the 404 on the fav icon
app.get('/img/app/favicon.ico', function(req, res) {
  res.writeHead(200, {'Content-Type': 'image/x-icon'} );
  res.end();
  return;
});

// Proxy requests
app.all(remoteHost.route, function(req, res) {
  proxy.proxyRequest(req, res, {
    host: remoteHost.name, 
    port: remoteHost.port,
    enable: {xforward: true}
  });
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

  console.log('Server started @ ' + os.hostname() + ':' + port);
});

app.listen(port);
