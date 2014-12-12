var mysql       = require("./mysql.js");

var searchkey = "迎宾";
var start     = 0;
var end       = 1000;

mysql.getProductsIpad({searchkey:searchkey},1,function(result){
        console.log(result);
});
