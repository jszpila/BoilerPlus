/*************************************************
 *
 * Test server
 *
 ************************************************/

var express = require('express'),
  app = express();

// test
app.get('/test', function(req, res) {
  console.log('GET /test');

  var objToJson = {test: 'ok!'};

  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(JSON.stringify(objToJson));
  res.end();
});

var server = app.listen(2020, function() {
    console.log('Listening on port %d', server.address().port);
});