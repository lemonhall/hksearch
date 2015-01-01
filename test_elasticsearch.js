var elasticsearch = require("./elasticsearch.js");

var searchkey = "毛线";

elasticsearch.getProductsByPage({searchkey:searchkey},2,function(result){
        console.log(result);
});
