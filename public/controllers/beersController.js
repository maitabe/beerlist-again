app.controller('BeersCtrl', ['$scope', 'beers', '$stateParams', function($scope, beers, $stateParams) {
	$scope.beer = beers.findById($stateParams.id);
}]);