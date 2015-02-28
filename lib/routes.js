'use strict';
var Types = require('hapi').types;

var mongoose = require('mongoose');

module.exports = [

{ method: 'GET', path: '/issues/offset/{offset}', config: { handler: getIssues } },
{ method: 'GET', path: '/issues', config: { handler: getIssues } },
    { method: 'GET', path: '/issues/{id}', config: { handler: getIssue } }, //TODO parameter rule
    { method: 'GET', path: '/issues/search', config: { handler: searchIssues } } 

    ];

    var get311Requests = require("./routes_411.js");


    function getIssues(request,reply){


//.sort({'date':-1})
//.skip(10)  offset
var Issue = mongoose.model('Issue');

Issue.find({ service_name: "Road - Pot hole" }).limit(10).exec(function (err, issues) {
    if (!err){

        reply(issues);
    }else{
        reply("no data");
    }
});


}

function getIssue(request, reply){
    var Issue = mongoose.model('Issue');
    if (request.params.id){
      Issue.findOne({ _id : request.params.id})
      .exec(function (err, issue) {
        if (!err){

            reply(issue);
        }else{
            reply(null);
        }
    });
  }else{
    reply(null);
}


}

/*
 @Description 
  request.query.search -GET - searching by service name only (for now)
  */
  function searchIssues(request, reply){
    //query string ?search=blah
    if (request.query.search){
        var Issue = mongoose.model('Issue');
        var query = request.query.search || "Road - Pot hole"

        Issue.find({ service_name: query }).limit(10).exec( function(err,data){

            if (err)
                console.log(">> ERR" +err);
            else{
                reply(data);
            }

        });
    }
}
