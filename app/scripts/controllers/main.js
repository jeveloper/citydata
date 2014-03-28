'use strict';

angular.module('citydataApp')
.controller('MainCtrl',['$scope', 'IssueService',function ($scope, IssueService)  {
	
	$scope.appname = "CityData Explorer "


	  var promise = IssueService.search('Robin Hood');

$scope.nodata = true;
	  promise.then(function(data){
	  	

	  	

	  	$scope.total = "Total "+data.length;

	  }, function(err){
	  	console.log(err);
	  })


}])

