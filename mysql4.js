var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'heike_product',
    port: 3306
});

var selectSQL = "select * from product limit 1";

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

