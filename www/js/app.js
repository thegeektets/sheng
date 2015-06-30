
angular.module('sheng', ['ionic', 'starter.controllers', 'starter.services','restangular','ngRoute',
  'ngLoadingSpinner'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($routeProvider, $urlRouterProvider, RestangularProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $routeProvider

  // Each tab has its own nav history stack:



  .when('/', {
 
        templateUrl: 'views/dictionary.html',
        controller: 'DictCtrl'
      })
     .when('/submit', {
 
        templateUrl: 'views/submit.html',
        controller: 'SubCtrl'
      })
      .when('/word', {
 
        templateUrl: 'views/word.html',
        controller: 'WordCtrl'
      })

    .when('/diction/:dictionID', {
 
        templateUrl: 'views/diction.html',
        controller: 'DictionCtrl',
        resolve: {
          diction: function (Restangular, $route) {
            return Restangular.one('dictionary', $route.current.params.dictionID).get();
          }
        }
      })
  .otherwise({redirectTo: '/'});

    RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/sheng/collections');
    RestangularProvider.setDefaultRequestParams({ apiKey: 'Iwy7zOOBBd6lUzN5jBhLNhv68Wv8UfUl' })
    RestangularProvider.setRestangularFields({
      id: '_id.$oid'
    });
   
  });

 

