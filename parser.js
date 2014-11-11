var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'heike_product',
    port: 3306
});



var insertSQL = "select PRODUCT_NAME,UNIT_PRICE,LIST_PRICE,APP_USERCOUNT,VISITCOUNT,PRODUCT_ID,CENTER_PICTURE,SMALL_PICTURE from product where PRODUCT_NAME like ? AND SEARCHKEY like ? AND CHECK_STATUS = 1 AND store_check_status =1 AND uc_activation_status =1 AND uc_status = 1";

var axml = require ('axml')
axml.readFile ("./maotai.xml", function (err, data) {
  // data is a JsonML object.
	console.log(data[0]);
})
