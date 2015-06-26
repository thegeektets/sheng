angular.module('starter.controllers', [])

.controller('DictCtrl', function($scope,$location, Restangular,$rootScope,$http) {
  $scope.dictionary = Restangular.all("dictionary").getList().$object;

})

.controller('DictionCtrl', function($scope,$location, Restangular,$rootScope,$http,diction) {
  var original = diction;
 
  $scope.diction = Restangular.copy(original);
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
