var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'heike_product',
    port: 3306
});

var selectSQL = "select PRODUCT_NAME,UNIT_PRICE,LIST_PRICE,APP_USERCOUNT,VISITCOUNT,PRODUCT_ID,CENTER_PICTURE,SMALL_PICTURE from product where PRODUCT_NAME like '%大米%' AND SEARCHKEY like '%大米%' AND CHECK_STATUS = 1 AND store_check_status =1 AND uc_activation_status =1 AND uc_status = 1 limit 0,20";

pool.getConnection(function (err, conn) {
    if (err) console.log("POOL ==> " + err);

        conn.query(selectSQL, function (err2, rows) {
            if (err2) console.log(err2);

            console.log("SELECT ==> ");
            for (var i in rows) {
                console.log(rows[i]);
            }
	
	    conn.release();
	});
});

