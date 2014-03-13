'use strict';


//constants can be set here or in pkg

angular.module('citydataApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory("mydb", function (){
    return {
      getdb: function () { return "blah blah"; },
    }
});
