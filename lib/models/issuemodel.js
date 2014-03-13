
var mongoose = require('mongoose')
  , Schema = mongoose.Schema


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

IssueSchema.index({
       loc : "2d",
       status: 1,
       service_notes: 1, // can use "text",
       service_name: 1

});
 // var Issue = mongoose.model("Issue", issueSchema);


//TODO
// if (prod){
// issueSchema.set('autoIndex', false);
// }



// exports.IssueModel = mongoose.model('Issue', IssueSchema);


mongoose.model('Issue', IssueSchema);