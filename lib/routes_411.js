'use strict';
var request = require("request");
var qs = require('qs');

var Q = require("q");
require("./util");

function getDefaultDates(_offset){


	var offset = 1;

	if (_offset)
		offset =_offset;

	var startDate= new Date();
	startDate.setDate(startDate.getDate() - offset );  

	var endDate = new Date();
	endDate.setDate(endDate.getDate());


	var startDate = startDate.format('yyyy-MM-dd');
	endDate = endDate.format('yyyy-MM-dd'); 

	return {start_date: startDate, end_date: endDate}

}


function searchByNotes(str, arg){
	var deferred = Q.defer();
	var limit = 100;
	if (arg.limit)
		limit = arg.limit

	//Grafitti lookup
	Issue.find({ service_name: /^Graf/ }, function(data){
		deferred.resolve(data);
	});

	return deferred.promise;


}


function get311Requests(arg){

	var defdates = getDefaultDates();
	var status = "";
	var start_date = defdates.start_date;
	var end_date = defdates.end_date;

	

	if (arg.status){
		status = arg.status;
	}

	//this needs to be tested against allowed format

	if (arg.start_date)
		start_date = arg.start_date;

	if (arg.end_date)
		end_date = arg.end_date;


	if (arg.offset){

		defdates = getDefaultDates(parseInt(arg.offset));
		start_date = defdates.start_date;
		end_date = defdates.end_date;


	}

	//qs is part of request to work with query string

	//wrap this around promise or just callback

	var q = qs.stringify( { start_date: start_date, end_date: end_date ,jurisdiction_id: "toronto.ca", status: status});
	
	//hit the cache using nedb

	var url = "https://secure.toronto.ca/webwizard/ws/requests.json?"+q;

	var deferred = Q.defer();
	request(url, function(error, response, body){
		if (!error && response.statusCode == 200) {
			deferred.resolve(JSON.parse(body));
		}else{
			deferred.reject(new Error("OHH JEEZ what happend toronto?"));
		}
	});

	return deferred.promise;

}


module.exports = get311Requests