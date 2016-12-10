var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beers');
mongoose.Promise = global.Promise;

var Beer = require('./BeerModel');

var port = 8000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));

//collect data in the db and send back to the http get
app.get('/beers', function(req, res, next) {
	//find all data in the DB - beerinDB is the responds to send back
	Beer.find({}, function(err, beersInDB){
		if(err) {
			return next(err);
		}else{
			//send data to http.get
			res.send(beersInDB);
		}
	});
});

//
app.post('/beers', function(req, res, next) {
	console.log(req.body);
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
	console.log('server start, listening on', port);
});






