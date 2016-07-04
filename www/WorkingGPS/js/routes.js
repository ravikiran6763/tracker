angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('trackerHome', {
    url: '/homePage',
    templateUrl: 'templates/trackerHome.html',
    controller: 'trackerHomeCtrl'
  })

  .state('listOfMembers', {
    url: '/memberList',
    templateUrl: 'templates/listOfMembers.html',
    controller: 'listOfMembersCtrl'
  })

  .state('trackingMap', {
    url: '/trackingMap',
    templateUrl: 'templates/trackingMap.html',
    controller: 'trackingMapCtrl'
  })
  
  .state('myLocationMap', {
    url: '/myLocationMap',
    templateUrl: 'templates/myLocationMap.html',
    controller: 'myLocationMapCtrl'
  })

$urlRouterProvider.otherwise('/homePage')

  

});