/************************************************
 *
 * Node.js dev server
 *
 ***********************************************/

var express = require("express"),
  restler = require('restler'),
  app = express(),
  port = 2000;

// Keep node from complaining about the 404 on the fav icon
app.get("/favicon.ico", function(req, res) {
  res.writeHead(200, {'Content-Type': 'image/x-icon'} );
  res.end();
  return;
});

// Proxy - obviously, the particulars of this will need to be update to suit your needs.
// northwind api url included for testing purposes
app.get('/test', function(req, res) {
  restler.get('http://www.servicestack.net/ServiceStack.Northwind/orders?format=json', {}).on('complete', function (data) {
    console.log(data) // Uncomment if you want to debug responses
    res.json(data)
  });
});

// Server config
app.configure(function() {
  console.info("Server started @ localhost:" + port);
  
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + "/public"));
  app.use(express.logger());
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));

  app.use(app.router);
});

app.listen(port);