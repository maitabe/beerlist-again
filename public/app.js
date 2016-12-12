var app = angular.module('beerlist', []);

app.controller('MainCtrl', function($scope, $http) {

	$scope.beers =[];
	var id;


	$http.get('/beers').success(function (data) {
    // this copies the response posts to the client side
    //get the data from the app.get in the server
    console.log(data);
    //avoid duplicates and send beers to the ng-repeat
    angular.copy(data, $scope.beers);

  	});



	// add a new beer
	$scope.addBeer = function() {

				//add a new beer
				var beer = {
					name: $scope.name,
					style: $scope.style,
					abv: $scope.abv,
					image_url: $scope.image_url
				};

				//empty input after adding a new beer
				$scope.name = '';
				$scope.style = '';
				$scope.abv = '';
				$scope.image_url = '';

				console.log('the beer before the $http pst ');
				console.log(beer);
				//send the post request to the server
				$http.post('/beers', beer).success(function(response) {
					console.log('this is the success funct ');
					console.log(response);
					//reflect the success response in the browser
					$scope.beers.push(response);
					console.log('list of beers: ');
					console.log($scope.beers);
				});

	};


	//remove A beer
	$scope.removeBeer = function(index) {
		//find the beer to be removed
		var beer = $scope.beers[index];
		console.log($scope.beers[index]._id);

		$http.delete('/beers/' + beer._id).success(function(data) {

			console.log(data);
			$scope.beers.splice(index, 1);

		});
	};

	/*$scope.addReview = function(){
		console.log(this);

			//add review
			var beerReview = {
					name: $scope.username,
					text: $scope.userReview,
					id: this.beer._id
			};

			//empty input after submitting review
			$scope.username = '';
			$scope.userReview = '';

			//send review post request to the server
			$http.post('/beers', beerReview).success(function(response) {
				console.log(response);

				//display data to the html
			});

	};*/

	//edit beer
	/*$scope.updateBeer = function() {
			//initialize value of add button
			$scope.editing = false;

			//add text to the form to be edit
			$scope.name = this.beer.name;
			$scope.style = this.beer.style;
			$scope.abv = this.beer.abv;
			$scope.image_url = this.beer.image_url;
			id = this.beer._id;


			//update text of button to 'update'
			$scope.editing = true;

	};*/



});


// get data from the scope.beer array
// fill it up in the form with the selected beer
//change button text to save
// ng click to save button
//send changes to the DB


/*$scope.addBeer = function() {

		//check if to edit or add a beer
		if($scope.editing) {
			//edit a beer
			var editBeer = {
					name: $scope.name,
					style: $scope.style,
					abv: $scope.abv,
					image_url: $scope.image_url,
					id: id
				};

				console.log(editBeer);
				//send the put request to the server
				$http.put('/beers', editBeer).success(function(response) {
				console.log(response);

			});

		}else {
				//add a new beer
				var beer = {
					name: $scope.name,
					style: $scope.style,
					abv: $scope.abv,
					image_url: $scope.image_url
				};

				//empty input after adding a new beer
				$scope.name = '';
				$scope.style = '';
				$scope.abv = '';
				$scope.image_url = '';

				console.log('the beer before the $http pst ');
				console.log(beer);
				//send the post request to the server
				$http.post('/beers', beer).success(function(response) {
					console.log('this is the success funct ');
					console.log(response);
					//reflect the success response in the browser
					$scope.beers.push(response);
					console.log('list of beers: ');
					console.log($scope.beers);
				});
		}
	};*/







