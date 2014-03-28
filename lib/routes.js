'use strict';
var Types = require('hapi').types;

var mongoose = require('mongoose');




module.exports = [
    { method: 'GET', path: '/products', config: { handler: getProducts, validate: { query: { name: Types.String() } } } },
    { method: 'GET', path: '/products/{id}', config: { handler: getProduct } },
    { method: 'POST', path: '/products', config: { handler: addProduct  } },
    { method: 'GET', path: '/issues/offset/{offset}', config: { handler: getIssues } },
    { method: 'GET', path: '/issues', config: { handler: getIssues } },
    { method: 'GET', path: '/issues/{id}', config: { handler: getIssue } }, //TODO parameter rule
    { method: 'GET', path: '/issues/search', config: { handler: searchIssues } } 

];

var get311Requests = require("./routes_411.js");
// var Datastore = require('nedb')
//   , db = new Datastore();

// db.loadDatabase(function (err) {    // Callback is optional
//   // Now commands will be executed
//   console.log(">>> DB loaded");

//   var document = { hello: 'world'
//                , n: 5
//                , today: new Date()
//                , nedbIsAwesome: true
//                , notthere: null
//                , notToBeSaved: undefined  // Will not be saved
//                , fruits: [ 'apple', 'orange', 'pear' ]
//                , infos: { name: 'nedb' }
//                };

// db.insert(document, function (err, newDoc) {   // Callback is optional
//   // newDoc is the newly inserted document, including its _id
//   // newDoc has no key called notToBeSaved since its value was undefined

//   console.log(" DONE YESS ");
// });

// });


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


function searchIssues(request, reply){
    //query string ?search=blah
    if (request.query.search){
var Issue = mongoose.model('Issue');

    Issue.find({ service_name: "Road - Pot hole" }).limit(10).exec( function(err,data){

        if (err)
            console.log(">> ERR" +err);
        else{

        console.log(" >>> DATA BACK");

        reply(data);
        //deferred.resolve(data);
        }
        
    });
    }
}


function getProducts(request,reply) {

    if (request.query.name) {
        reply(findProducts(request.query.name));
    }
    else {
       reply(products);
    }
}

function findProducts(name) {

    return products.filter(function(product) {
        return product.name.toLowerCase() === name.toLowerCase();
    });
}

function getProduct(request,reply) {

    var product = products.filter(function(p) {
        return p.id === parseInt(request.params.id);
    }).pop();

    reply(product);
}

function addProduct(request,reply) {

    var product = {
        id: products[products.length - 1].id + 1,
        name: request.payload.name
    };

    products.push(product);

    reply(product).code(201).header('Location,: /products/' + product.id);
}

var products = [{
        id: 1,
        name: 'Guitar'
    },
    {
        id: 2,
        name: 'Banjo'
    }
];