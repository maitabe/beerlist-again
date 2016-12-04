var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beers');

var Beer = require('./BeerModel');

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

	Beer.remove();
});

app.post('/beers', function(req, res, next) {
	console.log(req.body);

	var beer = new Beer(req.body);

	beer.save(function(err, beer) {
		if(err) {
			return next(err);
		}else{
			res.send(beer);
		}
	});


});

app.delete('/beers', function(req, res){

});

app.listen(8000);