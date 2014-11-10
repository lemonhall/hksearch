var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
var mysql	= require("./mysql.js");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

app.get("/",function(req,res){
        res.redirect('search2.html');
});

app.get("/getProducts",function(req,res){
	console.log(req.query);
	var searchkey = req.query.searchkey;
	if(searchkey ==="" || searchkey === undefined){
		res.send("");
	}else{
		mysql.getProducts({searchkey:searchkey,start:0,end:20},function(result){
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
