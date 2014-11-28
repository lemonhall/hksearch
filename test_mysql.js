var mysql       = require("./mysql.js");

var searchkey = "羊腿";
var start     = 0;
var end       = 1000;

mysql.getProducts({searchkey:searchkey,start:start,end:end},function(result){
        console.log(result);
});
