var elasticsearch = require("./elasticsearch.js");
var _ 		  = require('lodash');

var searchkey 	  = "羊腿";
var start     	  = 0;
var end       	  = 1000;

elasticsearch.getProducts({searchkey:searchkey,start:start,end:end},function(result){
        console.log(result);
});
