/*************************************************
 *
 * Test server
 *
 ************************************************/

var express = require('express'),
  app = express();

// test
app.get('/test', function(req, res) {
  console.log('what what');

  var objToJson = {test: 'yo'};

  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(JSON.stringify(objToJson));
  res.end();
});

var server = app.listen(2020, function() {
    console.log('Listening on port %d', server.address().port);
});