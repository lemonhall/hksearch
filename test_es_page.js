var elasticsearch = require("./elasticsearch1.js");

var searchkey = "苹果";

elasticsearch.getProductsByPage({searchkey:searchkey},1,function(result){
        console.log(result);
});
