var elasticsearch = require("./elasticsearch.js");

var searchkey = "100049903";

elasticsearch.getProductsByPage({searchkey:searchkey},1,function(result){
        console.log(result);
});
