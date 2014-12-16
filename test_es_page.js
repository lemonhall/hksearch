var elasticsearch = require("./elasticsearch.js");

var searchkey = "羊腿";
var start     = 0;
var end       = 1000;

elasticsearch.getProductsByPage({searchkey:searchkey},1,function(result){
        console.log(result);
});
