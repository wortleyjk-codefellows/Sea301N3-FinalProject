var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/findVet', function(req, res) { ///////////////// TESTING
  res.sendFile(__dirname + '/findVet.html');
});

app.listen(port, function(){
  console.log('Listening on port:', port);
});
