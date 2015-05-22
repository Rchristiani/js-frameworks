//Initialize our application
var app = angular.module('art-app',[]);
//Add main controller
app.controller('MainCtrl', function($scope,Art){
	//When the page is loaded get info to fill the page
	Art.getArt().then(function(result) {
		//When the promise is resolved the result is sent 
		//to the callback in the .then() method
		$scope.art = result.artObjects;
	});
	//Search function on our scope
	$scope.search = function() {
		//Get the query from the ng-model
		var query = $scope.searchQuery;
		//Send that query to your .seach() method in the factory
		Art.search(query).then(function(result) {
			//When it resolves we get our art
			$scope.art = result.artObjects;
		});
	};
});
//Factory for getting the Art
app.factory('Art', function($http,$q) {
	var apiKey = 'pUaGTYo5';
	var apiUrl = 'https://www.rijksmuseum.nl/api/en/collection/?key=' + apiKey;
	
	//Return an object with our methods 
	return {
		getArt: function() {
			//We use a defered object to see if our request is ready
			var def = $q.defer();
			//Make the request
			$http.get(apiUrl)
				//If it is success resolve the def
				.success(def.resolve)
				//If not reject it
				.error(def.reject);

			//Return the promise so we can 
			return def.promise;
		},
		search: function(serchTerm) {
			//Use a defered object to see if our request is ready
			var def = $q.defer();
			//Make our request
			$http.get(apiUrl+'&q='+serchTerm)
				//If it is successful resolve the def
				.success(def.resolve)
				//else reject it
				.error(def.reject);
			//Return the promise
			return def.promise;
		}
	};
});