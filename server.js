var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beers');
mongoose.Promise = global.Promise;

var Beer = require('./models/BeerModel');
var Review = require('./models/ReviewModel');
// console.log(Beer);

var port = 8000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));

//collect data in the db and send back to the http get
app.get('/beers', function(req, res, next) {
	console.log("get all beers");
	//find all data in the DB - beerinDB is the responds to send back
	Beer.find({}, function(err, beersInDB){
		if(err) {
			return next(err);
		}else{
			//send data back to http.get in the client side app.js
			res.json(beersInDB);
		}
	});
});

//add a new beer
app.post('/beers', function(req, res, next) {
	// console.log(req.bodyParser);

	//create a new beer with constructor
	var beer = new Beer(req.body);

	console.log('added a beer' + beer);
// save beer to the server
	beer.save(function(err, beer) {
		console.log('beer saved ' + beer);
		if(err) {
			return next(err);
		}else{
			res.send(beer);
		}
	});
});

//adding a review
app.post('/beers/:id/reviews', function(req, res, next) {

	Beer.findById(req.params.id, function(err, beer) {
		if(err) {return next (err);}

		//create a new review
		var review = new Review(req.body);
console.log(beer);
		//save the new review to the DB to the selected beer
		review.save(function(err, review) {
			if(err) {return next(err);}
			//push the review to the beer object, added to the review property
			beer.reviews.push(review);
console.log(review);
			//save the beer with the already added review to the DB
			beer.save(function (err, beer) {
				if(err) {return next(err);}
console.log(beer);
				//finish the process and sent this responds to the client side app.js
				res.json(beer);
			});
		});
	});
});

//delete post
app.delete('/beers/:id', function(req, res){
	//send the beer id through the req.params.id
	var beerId =  req.params.id;
	console.log('this is the ' + beerId);

		//delete that beer from the database
		Beer.remove({_id:beerId}, function(err) {
			if(err) { res.send(err); }
			console.log('deleted' + beerId);
			//process MUST end with the respond
			res.end();
		});
});

//update a beer
app.put('/beers/:id', function(req, res){
	console.log('this is the ' + beerId);
	var beerId =  req.params.id;


	Beer.save(function(err) {
		if(err) {res.send(err);}
		console.log(beerId + 'has been updated');
		res.send();
	});
});

// start application server
app.listen(port, function(){
	console.log('beers server start, listening on', port);
});






