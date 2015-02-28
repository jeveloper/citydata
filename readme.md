### Why do this?
 - This project is specific to Toronto Open Data
 - Open Data api from the city is super slow, you can't use it to build anything meaningful because it'll probably slow down even further
 - 4+ years worth of data is enough to analyze 
 - as a citizen , it is simply interesting and responsible to analyze what our city does and how it performs



## DEV Stack

 - .env is used for environment variables (MONGOURL,etc)
 - NodeJS
 - MongoDB
 - Outbound connection to scrape data from opendata site


 ## Architecture

 - Toronto Open data api is slow , seriously slow, this project provides much faster data access
 - Data for 311 requests is available from 2009 onwards
 - Scraping is possibly by running importdata311.js 



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