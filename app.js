var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json());

var quotes = [
  { author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
  { author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
  { author : 'Unknown', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
  { author : 'Neale Donald Walsch', text : "You are afraid to die, and you're afraid to live. What a way to exist."}
];

app.get('/', function(req, res){
  res.json(quotes);
});

app.get('/quote/random', function(req, res){
  var randomInt = Math.floor(Math.random() * quotes.length);
  var randomQuote = quotes[randomInt];
  res.json(randomQuote);
});

app.get('/quote/:id', function(req, res){
  var quoteID = req.params.id,
      invalidID = (quotes.length <= quoteID) || (quoteID < 0),
      quote = quotes[quoteID];

  if (invalidID) {
    res.statusCode = 404;
    res.send('404: The quote was not found');
  }
  res.json(quote);
});

app.post('/quote', function(req, res){
  var bodyLacksAuthor = req.body.hasOwnProperty('author'),
      bodyLacksText = req.body.hasOwnProperty('text'),
      newQuote;

  if (bodyLacksAuthor || bodyLacksText) {
    res.statusCode = 400;
    res.send('400: You must include both an author and text');
  }

  newQuote = {
    author: req.body.author,
    text: req.body.text
  };
  quotes.push(newQuote);
  res.json(true);
});

app.delete('/quote/:id', function(req, res){
  var invalidID = quotes.length <= req.params.id;

  if (invalidID) {
    res.statusCode = 404;
    res.send("404: Sorry, that quote doesn't exist");
  }
  quotes.splice(req.params.id, 1);
  res.json(true);
});

app.listen(4700);