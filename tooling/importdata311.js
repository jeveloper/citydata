'use strict';

require(".././lib/util");
var dotenv = require('dotenv');
dotenv.load();
var get311Requests = require(".././lib/routes_411.js");


function getDefaultDates(start, _offset){
	var endDate = addDays(start,_offset);
	return {startDate: start, endDate: endDate}
}

function formatDates(start, end){
	var startDate = start.format('yyyy-MM-dd');
	var endDate = end.format('yyyy-MM-dd'); 
	return {startDate: startDate, endDate: endDate}
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
}
//migrate plan

//https://secure.toronto.ca/webwizard/ws/requests.json?start_date=2009-08-01T00:00:00Z&end_date=2009-08-25T00:00:00Z&jurisdiction_id=toronto.ca

//data starts from 2009 - August 01 

//iterate 20 days until it hits past todays date 

//for each call , get data back and store into mongodb 


var startDate = new Date(Date.parse("August 01, 2009"));

console.log(" >>> Starts {0}".format(startDate.toString()));


var curd = startDate;


//media url: http://seeclickfix.com/files/issue_images/0006/9270/6ef88a0.jpg

//mongoimport —db toronto_issues —collection requests < /Users/sergebornow/Documents/mystuff/citydata/dump.json -u issuer -p crazy321 —host ds033559.mongolab.com —port 33559
var mongoose = require('mongoose');
var mongourl = process.env.MONGOURL;
mongoose.connect(mongorul);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.debug("IM CONNECTED");
});
//TODO do i need this above?



var count =1;
while(curd < new Date()){
	var df = getDefaultDates(curd, 25);
	var form = formatDates(df.startDate, df.endDate);
	curd = df.endDate;


	console.log(">>> date range {0} - {1} cycle {2}".format(form.startDate, form.endDate,count++));


	get311Requests({start_date: form.startDate ,end_date: form.endDate})
 	.then(function(data){
         if (data && data.service_requests){
            console.log(">>> Tally {0}".format(data.service_requests.length));

            data.service_requests.forEach(function(r1){


            	var rec = new Issue({
            	status: r1.status, 
            	service_request_id: r1.service_request_id, 
            	status_notes: r1.status_notes,
            	service_name: r1.service_name,
            	desc: r1.description,
            	agency: r1.agency_responsible,
            	service_notice: r1.service_notice,
            	requested_datetime: new Date(r1.requested_datetime),
            	updated_datetime: new Date(r1.updated_datetime),
            	expected_datetime: new Date(r1.expected_datetime),
            	address: r1.address,
            	address_id: r1.address_id,
            	zipcode: r1.zipcode,
            	media_url: r1.media_url,
            	
            });

            	if (r1.lat && r1.lng){
            		rec.loc =  {lat: r1.lat, lng: r1.long};
            	}


            rec.save(function (err, record) {
			  if (err){
			  	console.log(">>> failed to save a record "+err);
			  	console.debug(r1);

			  }else{
			  	console.debug(">>> Saved !");
			  }
				});

            });
           
           

          
        }else{
            console.log(">>> NO data for that range");
        }
    }); 

}



//GEOspatial lookup - stuff in my area, does forest hill get things done quicker than poor area?
// RentModel.find({loc : { $near : [20, 50], $maxDistance: 30 }} , function(err, docs){
//                 if (err) {
//                     console.log("error in finding near", err);
//                     throw err;
//                 }
//                 console.log('docs.length : ' , docs.length);
//                 console.log('docs : ',docs)
//             })

var df = getDefaultDates(curd, 25);
var form = formatDates(df.startDate, df.endDate);
 get311Requests({start_date: form.startDate ,end_date: form.endDate})
 .then(function(data){
         if (data && data.service_requests){
            console.log(">>> Tally {0}".format(data.service_requests.length));

            data.service_requests.forEach(function(r1){


            	var rec = new issue({
            	status: r1.status, 
            	service_request_id: r1.service_request_id, 
            	status_notes: r1.status_notes,
            	service_name: r1.service_name,
            	desc: r1.description,
            	agency: r1.agency_responsible,
            	service_notice: r1.service_notice,
            	requested_datetime: new Date(r1.requested_datetime),
            	updated_datetime: new Date(r1.updated_datetime),
            	expected_datetime: new Date(r1.expected_datetime),
            	address: r1.address,
            	address_id: r1.address_id,
            	zipcode: r1.zipcode,
            	media_url: r1.media_url,
            	
            });

            	if (r1.lat && r1.lng){
            		rec.loc =  {lat: r1.lat, lng: r1.long};
            	}


            rec.save(function (err, record) {
			  if (err){
			  	console.log(">>> failed to save a record "+err);
			  	console.dir(r1);

			  }else{
			  	console.log(">>> Saved !");
			  }
				});

            });
           
           

          
        }else{
            console.log(">>> nada");
        }
    }); 