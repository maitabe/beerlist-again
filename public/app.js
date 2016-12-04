var app = angular.module('beerlist', []);

app.controller('MainCtrl', function($scope, $http) {

	$scope.beers =[];

	$http.get('/beers').success(function (data) {
    // this copies the response posts to the client side
    // 'beers' under 'beerService'
    console.log(data);

    angular.copy(data, $scope.beers);
  	});

	$scope.addBeer = function() {

		var beer = {
			name: $scope.name,
			style: $scope.style,
			abv: $scope.abv,
			image_url: $scope.image_url
		};

		$scope.name = '';
		$scope.style = '';
		$scope.abv = '';
		$scope.image_url = '';


		$http.post('/beers', beer).success(function(response) {
			$scope.beers.push(response);
		});

	};

	$scope.removeBeer = function(index) {
		// $scope.beers.splice(index, 1);
		var beer = $scope.beers[index]
		console.log(beer._id);

		$http.delete('/beers/' + beer._id).success(function(data) {

			console.log(data);;

		});
	};

});