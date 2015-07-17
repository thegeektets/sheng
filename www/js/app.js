
angular.module('sheng', ['ionic', 'ngCordova',
  'ionic.service.core', 'ionic.service.deploy', 'ionic.service.analytics', 'ionic.service.push','starter.controllers', 
  'starter.services','restangular','ngRoute',
  'ngLoadingSpinner'])

.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
})
.run(function($ionicPlatform,$ionicAnalytics,$ionicUser, $ionicPush,$ionicDeploy) {
  
  $ionicPlatform.ready(function() {
    
    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $ionicUser.generateGUID();
    };

    // Add some metadata to your user object.
    angular.extend(user, {
      name: 'Ionitron',
      bio: 'I come from planet Ion'
    });

    // Identify your user with the Ionic User Service
    $ionicUser.identify(user);
    /*.then(function(){
     // $scope.identified = true;
     console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
    });*/

    //registering for push 

      // Register with the Ionic Push service.  All parameters are optional.
    /*$ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
         alert("New Notification" + notification);
  
        return true;
      }
    });
    */
  
    //register for analytics

    $ionicAnalytics.register();





    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})
.config(function($ionicAppProvider,$routeProvider, $urlRouterProvider, RestangularProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '273137a3',
    // The public API key all services will use for this app
    api_key: 'e4b06490eea62ecb993ad42c878f428a1d6dcd62daa64d78',
    // Set the app to use development pushes
    gcm_id: '355694469772',

    dev_push: true
  });


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

 

