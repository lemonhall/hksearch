var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
var mysql	= require("./mysql.js");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

app.get("/",function(req,res){
	console.log(req.query.key);
        res.redirect('search2.html?key='+req.query.key);
});

app.get("/getProducts",function(req,res){
	console.log(req.query);
	var searchkey = req.query.searchkey 	      || "";
	var start     = parseInt(req.query.start)     || 0;
	var end       = parseInt(req.query.end)       || 20;
	
	if(searchkey ==="" || searchkey === undefined){
		res.send("");
	}else{
		mysql.getProducts({searchkey:searchkey,start:start,end:end},function(result){
			res.send(result);
		});
	}
});

app.get("/getProductDetails",function(req,res){
        mysql.getProducts(function(result){
                res.send(result);
        });
});
app.listen(3000);
