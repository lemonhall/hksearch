var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
var mysql	= require("./mysql.js");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));


var todo  = {};

var todos = [];

// app.get('/', function(req, res){
//        res.send('hello world');
// });

app.get("/",function(req,res){
        res.redirect('search2.html');
});

app.get("/getProducts",function(req,res){
	mysql.getProducts(function(result){
		res.send(result);
	});
});

app.get("/getProductDetails",function(req,res){
        mysql.getProducts(function(result){
                res.send(result);
        });
});
app.listen(3000);
