var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'heike_product',
    port: 3306
});

var selectSQL = "SELECT product.PRODUCT_NAME, product.UNIT_PRICE, product.LIST_PRICE,product.APP_USERCOUNT,product.VISITCOUNT,product.PRODUCT_ID,templateblobfield.FIELD_VALUE,templateblobfield.FIELD_SMALLVALUE,templateblobfield.FIELD_CENTERVALUE FROM product LEFT JOIN templateblobfield ON product.PRODUCT_ID=templateblobfield.PRODUCT_ID limit 10";

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

