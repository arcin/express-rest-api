var express = require('express'),
    app = express();

app.get('/', function(req, res){
  res.type('text/plain');
  res.send('This is a response from an express server!');
});

app.listen(4700);