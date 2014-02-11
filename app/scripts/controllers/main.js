'use strict';

angular.module('citydataApp')
.controller('MainCtrl',['$scope', 'mydb',function ($scope, mydb)  {
	$scope.awesomeThings = [
	'HTML5 Boilerplate',
	'AngularJS',
	'MAKarma'
	];

	$scope.db = mydb.getdb();


	//console.log(" testing");
}])

