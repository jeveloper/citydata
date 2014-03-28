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
.factory("IssueService", function ($http, $q){
  return {
    search: function (_input) {  
         var deferred = $q.defer();

        $http({
        method: "GET",
        url: 'http://localhost:8000/issues'
      }).success(function(json,status){
        deferred.resolve(json);
      }).error(function(err,status){

        deferred.reject(err);
      }); 
      return deferred.promise;

  },
  }
});
