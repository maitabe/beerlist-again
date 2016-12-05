var app = angular.module('beerlist', []);

app.controller('MainCtrl', function($scope, $http) {

	$scope.beers =[];


	$http.get('/beers').success(function (data) {
    // this copies the response posts to the client side
    //get the data from the app.get in the server
    console.log(data);
    //avoid duplicates and send beers to the ng-repeat
    angular.copy(data, $scope.beers);

  	});

	// add a new beer
	$scope.addBeer = function() {

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

});





