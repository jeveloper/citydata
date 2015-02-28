### Why do this?
 - This project is specific to Toronto Open Data
 - Open Data api from the city is super slow, you can't use it to build anything meaningful because it'll probably slow down even further
 - 4+ years worth of data is enough to analyze 
 - as a citizen , it is simply interesting and responsible to analyze what our city does and how it performs



 ## DEV Stack

 - .env is used for environment variables (MONGOURL,etc)
 - Front End: AngularJS + Bootstrap
 - NodeJS (hapi for api endpoints ,requests, Promises, Grunt)
 - MongoDB (mongoose)
 - Outbound connection to scrape data from opendata site


 ## Architecture

 - Toronto Open data api is slow , seriously slow, this project provides much faster data access
 - Data for 311 requests is available from 2009 onwards
 - Scraping is possibly by running importdata311.js , for each 25 days (maximum their api provides)
 - AngularJS based ui with bootstrap for data 
 - Grunt tasks



 ## Notes about data

 - "status_notes": "In progress - The request is being investigated, assessed and/or responded to; additional work may be required, if applicable.",
 - "status_notes": "Completed - The request has been concluded.",
 - "status_notes": "In progress - The request has been scheduled.",
 - status is open or closed
 - agency_responsible is always 311 Toronto
 - most are "service_name": "Road - Pot hole", or "...... Graffiti Complaint"
 - lat/lng and address can be null - Weird, where did the work occur 




 ## ENV stuff

 Mandatory:

  - MONGOURL=mongodb://username:pwd@ds033559.mongolab.com:33559/dbname
  - PORT



  ## Model (mongoose) for issues (properly indexes for GEO lookup)

```

  var IssueSchema = Schema( 
	{ 
		status: String,
		service_request_id: Number,
		status_notes: String,
		service_name: String,
		desc: String,
		agency: String,
		service_notice: String,
		requested_datetime: Date,
		updated_datetime: Date,
		expected_datetime: Date,
		address: String,
		address_id: Number,
		zipcode: String,
		media_url: String,
		loc: {lat: Number,  lng: Number }

	});

```


 ## Raw Access to Toronto Open data


```

https://secure.toronto.ca/webwizard/ws/requests.json?start_date=2012-02-01T00:00:00Z&end_date=2012-02-07T00:00:00Z&jurisdiction_id=toronto.ca&status=open

{
	"service_requests":[]
}

```


## RESPONSE OBJECT

```
 {
"service_requests": [
{
"service_request_id": 101001356540,
"status": "open",
"status_notes": "In progress - The request has been scheduled.",
"service_name": "Road - Pot hole",
"service_code": null,
"description": null,
"agency_responsible": "311 Toronto",
"service_notice": null,
"requested_datetime": "2012-02-05T20:29:00-05:00",
"updated_datetime": null,
"expected_datetime": "2012-02-10T20:30:00-05:00",
"address": "296 BRUNSWICK AVE",
"address_id": 8417961,
"zipcode": null,
"long": -79.407597678,
"lat": 43.665497385,
"media_url": null
},
{
"service_request_id": 101001353098,
"status": "open",
"status_notes": "In progress - The request has been scheduled.",
"service_name": "Road - Pot hole",
"service_code": null,
"description": null,
"agency_responsible": "311 Toronto",
"service_notice": null,
"requested_datetime": "2012-02-02T07:50:00-05:00",
"updated_datetime": null,
"expected_datetime": "2012-02-07T07:50:00-05:00",
"address": "police #86479, toronto (Ms.)",
"address_id": null,
"zipcode": null,
"long": null,
"lat": null,
"media_url": null
}
]
}

```