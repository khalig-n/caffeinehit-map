var app = angular.module('caffeinehit.controllers', []);

app.controller("YelpController", function ($scope, YelpService, NgMap) {
	$scope.yelp = YelpService;


  NgMap.getMap().then(function(map) {
    $scope.map = map;    });

  $scope.doRefresh = function () {
		if (!$scope.yelp.isLoading) {
			$scope.yelp.refresh().then(function () {
				$scope.$broadcast('scroll.refreshComplete');
			});
		}
	};

	$scope.loadMore = function () {
		console.log("loadMore");
		if (!$scope.yelp.isLoading && $scope.yelp.hasMore) {
			$scope.yelp.next().then(function () {
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}
	};

	$scope.getDirections = function (cafe) {
		console.log("Getting directions for cafe");
		var destination = [
			cafe.location.coordinate.latitude,
			cafe.location.coordinate.longitude
		];

		var source = [
			$scope.yelp.lat,
			$scope.yelp.lon
		];

		launchnavigator.navigate(destination, source);
	};

	$scope.showCafeDetails=function (event,cafe)
  {
    $scope.yelp.cafe=cafe;
    $scope.map.showInfoWindow.apply(this, [event, 'marker-info']);
  }

});
