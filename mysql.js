var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'heike_product',
    port: 3306
});
var NodeCache = require( "node-cache" );
//var myCache = new NodeCache();
var myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

var selectSQL_product = 'select PRODUCT_NAME,UNIT_PRICE,LIST_PRICE,APP_USERCOUNT,VISITCOUNT,PRODUCT_ID,CENTER_PICTURE,SMALL_PICTURE from product where CHECK_STATUS = 1 AND store_check_status =1 AND uc_activation_status =1 AND uc_status = 1 limit 20';

function isEmpty(obj){
    for (var name in obj){
        return false;
    }
    return true;
};

var getProducts = function(queryCb){
	myCache.get( "myKey", function( err, value ){
  	if( !err && !isEmpty(value) ){
		console.log("Hit......cache.........");
		console.log(isEmpty(value));
		console.log(value["myKey"]);
		queryCb(value["myKey"]);
  	}else{
	pool.getConnection(function (err, conn) {
    		if (err) console.log("POOL ==> " + err);
        		conn.query(selectSQL_product, function (err2, rows) {
            			if (err2) console.log(err2);
            				console.log("SELECT ==> ");
            				//for (var i in rows) {
                			//	console.log(rows[i]);
           				//}
					myCache.set( "myKey", rows, function( err, success ){
  					if( !err && success ){
    						console.log( success );
  					}
					});
					queryCb(rows);
	    				conn.release();
			});//END of query SQL.......
	});//END of getConnection...
  	}
	});//END of get from cache...
}//END of getProducts;

var selectSQL_details = "select * from templateblobfield where PRODUCT_ID='002a41857'";

var getProductDetails = function(queryCb){
        pool.getConnection(function (err, conn) {
                if (err) console.log("POOL ==> " + err);
                        conn.query(selectSQL_details, function (err2, rows) {
                                if (err2) console.log(err2);
                                        console.log("SELECT ==> ");
                                        for (var i in rows) {
                                                console.log(rows[i]);
                                         }
                                        queryCb(rows);
                                        conn.release();
                        });
        });
}//END of getProducts;
module.exports.getProducts		=  getProducts;
module.exports.getProductDetails	=  getProductDetails;

