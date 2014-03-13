
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/toronto_issues');


require("../lib/models/issuemodel.js");



Issue = mongoose.model('Issue');

  Issue
    .findOne({ _id : "52ffa36fc675474a37cac6ee" })
    .exec(function (err, issue) {
 		if (!err){
 			console.log(" Got osmething ");
 			console.dir(issue);
 		}else{
 			console.log("didnt find");
 		}
    });




//make a simple query find(status: closed)

// print 