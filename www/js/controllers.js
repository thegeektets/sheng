angular.module('starter.controllers',[])

.controller('DictCtrl', function($scope,$location, Restangular,$rootScope,$http) {
  
 $http.get('ajax_suspend.php');



  $scope.dictionary = Restangular.all("dictionary").getList().$object;

  	$scope.go = function (link) {

  		 $location.path(link);
  	}

  $scope.loading = false;   
       

})


.controller('DictionCtrl', function($scope,$location, Restangular,$rootScope,$http,diction,usSpinnerService) {
   $http.get('ajax_suspend.php');

   
  var original = diction;
 	$scope.random = 0;
  $scope.diction = Restangular.copy(original);

})
.controller('WordCtrl',function($scope,$location, Restangular,$http){
  $http.get('ajax_suspend.php');

  
	$scope.dictionary = Restangular.all("dictionary").getList().$object;
	
	$scope.random = Math.floor((Math.random() * 10) + 1);
	
	$scope.diction = $scope.dictionary;


})

.controller('SubCtrl',function($scope,$location, Restangular,$http){
  $http.get('ajax_suspend.php');



	$scope.save = function () {
       
        Restangular.all('queries').post($scope.query).then(function (query) {
        	$scope.message = 'word submitted successfully';
        	$scope.query ='';

            $location.path('/submit');
        });
	 };

});

