var mysql       = require("./mysql.js");

var searchkey = "红酒";
var start     = 0;
var end       = 1000;

mysql.getProductsIpad({searchkey:searchkey},2,function(result){
        console.log(result);
});
