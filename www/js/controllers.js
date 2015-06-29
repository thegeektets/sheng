angular.module('starter.controllers', [])

.controller('DictCtrl', function($scope,$location, Restangular,$rootScope,$http) {
  $scope.dictionary = Restangular.all("dictionary").getList().$object;

})

.controller('DictionCtrl', function($scope,$location, Restangular,$rootScope,$http,diction) {
  var original = diction;
 	$scope.random = 0;
  $scope.diction = Restangular.copy(original);

})
.controller('WordCtrl',function($scope,$location, Restangular){

	$scope.random = Math.floor((Math.random() * 10) + 1);
	$scope.dictionary = Restangular.all("dictionary").getList().$object;
	$scope.diction = $scope.dictionary;


})

.controller('SubCtrl',function($scope,$location, Restangular){

	$scope.save = function () {
       
        Restangular.all('queries').post($scope.query).then(function (query) {
        	$scope.message = 'word submitted successfully';
        	$scope.query ='';

            $location.path('/submit');
        });
	 };

});

