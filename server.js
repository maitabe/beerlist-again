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

app.get('/beers', function(req, res, next) {
	Beer.find({}, function(err, beersInDB){
		if(err) {
			return next(err);
		}else{
			res.send(beersInDB);
		}
	});

	// Beer.remove();
});

app.post('/beers', function(req, res, next) {
	console.log(req.body);

	var beer = new Beer(req.body);

// was beer
	beer.save(function(err, beer) {
		if(err) {
			return next(err);
		}else{
			res.send(beer);
		}
	});


});

app.delete('/beers/:id', function(req, res, next){
	//send the beer id through the req.params.id
	var beerId =  req.params.id;
	console.log('this is the ' + beerId);

	//find the beer by id
	Beer.find(beerId, function(err, beersInDB) {
		console.log(beersInDB);
		if(err) {
			return next(err);
			// res.send({status:'error'});
		}
		//delete that beer from the database
		Beer.remove(beerId, function(err) {
			// was beer.name
			console.log(beerId, beersInDB.name + 'is been removed');
			if(err) { return next(err); }
			console.log('deleted');
			res.send({status:'ok'});
		});
	});

});

// start application server
app.listen(port, function(){
	console.log('server start, listening on', port);
});
