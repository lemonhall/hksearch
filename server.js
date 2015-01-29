var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
var mysql	= require("./mysql.js");
var es		= require("./elasticsearch.js");
var log4js 	= require('log4js');

//console log is loaded by default, so you won't normally need to do this
//log4js.loadAppender('console');
log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.console());
log4js.addAppender(log4js.appenders.file('logs/hksearch.log'), 'hksearch');
var logger = log4js.getLogger('hksearch');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

app.get("/",function(req,res){
	var from = req.query.froms;
	if(from === "pc"){
        	res.redirect('search2.html?key='+req.query.key);
	}else{
		if(from === "wx"){
		  res.redirect('heike.html?key='+req.query.key);
		}else if(from === "vo"){
                  res.redirect('vosearch2.html?key='+req.query.key);
                }else if(from === "haihe"){
                   res.redirect('haihesearch.html?key='+req.query.key);
                }else{
		  res.redirect('padsearch2.html?key='+req.query.key);
		}		
	}
});

app.get("/getProducts",function(req,res){
	var searchkey = req.query.searchkey 	      || "大米";
	var start     = parseInt(req.query.start)     || 0;
	var end       = parseInt(req.query.end)       || 20;
	var page      = parseInt(req.query.page);
	var source    = req.query.froms;
	logger.info(source+":"+searchkey);
	if(searchkey === "" || searchkey === undefined){
		res.send("");
	}else{
	   if(source === "pad"){
	        logger.info("I am in Pad");
               es.getProductsByPage({searchkey:searchkey},page,function(result){
                        res.send(result);
                 });
	   }else{
		  if(source === "wx"){
			  logger.info("I am in WX");
	      	  es.getProductsByPageAndWX({searchkey:searchkey},page,function(result){
                        res.send(result);
                 });		   
		  }else if(source === "vo"){
		      logger.info("I am in VO");
               es.getProductsByPage({searchkey:searchkey},page,function(result){
                        res.send(result);
                 });
		  }else if(source === "pc"){
			  logger.info("I am in PC");
		      es.getProducts({searchkey:searchkey,start:start,end:end},function(result){
                      res.send(result);
                 });
		  }else if(source === "haihe"){
                      logger.info("I am in haihe");
			  es.getProductsByPagehaihe({searchkey:searchkey},page,function(result){
                      res.send(result);
                 });
                  }else{
		     logger.info("no search method");
		  }
                 
	   }
	}
});

app.get("/getProductDetails",function(req,res){
        mysql.getProducts(function(result){
                res.send(result);
        });
});
app.listen(3000);

