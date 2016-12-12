var mongoose = require('mongoose');

var BeerSchema = new mongoose.Schema({
	name: {type:String, required:true},
	style: String,
	image_url: String,
	abv: Number,
	reviews: []
});

var Beer = mongoose.model('Beer', BeerSchema);

module.exports = Beer;

