// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongojs = require('mongojs');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));


var bodyParser = require('body-parser');
var request = require('request');


// Main Route. This route will redirect to our rendered React application
app.get('/', function(req, res){
  res.sendFile('./public/index.html');
});

app.post('/api/search', function(req, res){
	console.log("api: " + req.body.term);
	// api test
	request.get({
	  url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
	  qs: {
	    'api-key': "51e97822ecd646c0b8a6b7f0999fd3e6",
	    'q': req.body.term,
	    'begin_date': "20170501",
	    'end_date': "20170808"
	  },
	}, function(err, response, body) {
		console.log(JSON.parse(body.response.docs[0]));
	 	
	  res.json(body.response.docs[0]);
	});
});


// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});