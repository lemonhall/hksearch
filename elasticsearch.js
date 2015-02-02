var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: '192.168.60.2:9200'
});

var NodeCache = require( "node-cache" );
  

var storeIdStr = ['1111111812343','1111111819204'];  //接收海禾的store_id

//var myCache = new NodeCache();
var myCache 	= new NodeCache( { stdTTL: 400, checkperiod: 120 } );
var co          = require('co');
var redisClient = require('redis').createClient("6379","192.168.60.15");
var wrapper     = require('co-redis');
var redisCo     = wrapper(redisClient);

var log4js      = require('log4js');

//console log is loaded by default, so you won't normally need to do this
//log4js.loadAppender('console');
log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.console());
log4js.addAppender(log4js.appenders.file('logs/elasticsearch.log'), 'es');
log4js.addAppender(log4js.appenders.file('logs/redis.log'), 'redis');

var logger 	= log4js.getLogger('es');
var redisLogger = log4js.getLogger('redis');


redisClient.on("error", function(error) {
    redisLogger.error(error);
});

function isEmpty(obj){
    for (var name in obj){
        return false;
    }
    return true;
};

var clearArray = function(o){
	for(var oo in o){
	  if(o[oo]){
	  	if(o[oo].length>0){
			o[oo]=o[oo][0];
		}
	  }
	}//end of for...........
	return o;
};

var clearR = function(hits){
        var temp_array = [];
        var testJson ;
        for(var ii=0;ii<hits.length;ii++){
		var item = clearArray(hits[ii].fields);
                temp_array.push(item);
        }
	return temp_array;
};

//PC版本
var getProducts = function(queryParams,queryCb){

	var searchkey = queryParams["searchkey"];
	var start     =     0    ;//queryParams["start"];
        var end       =     200 ;//queryParams["end"];
        var cacheKey  = searchkey+"#"+start+"#"+end;

        myCache.get(cacheKey, function( err, value ){
        	if( !err && !isEmpty(value) ){
                	queryCb(value[cacheKey]);
        	}else{
		client.search({
  			index: 'jdbc',
  			type: 'jdbc',
			size: 1000,
  			body: {
    				fields : ["PRODUCT_NAME","CHECK_STATUS","CREATE_TIME","UNIT_PRICE","LIST_PRICE","APP_USERCOUNT","VISITCOUNT","PRODUCT_ID","CENTER_PICTURE","SMALL_PICTURE","product_type_flag","store_id"],
    				query: {
      					filtered: {
						query  : { multi_match  : { query:searchkey,fields : ["PRODUCT_NAME","SEARCHKEY","PRODUCT_NO"]}},
						//filter : { term         : {CHECK_STATUS:1,store_check_status:1,uc_activation_status:1,uc_status:1,STATUS:1},bool:{must_not: {term:{store_id: storeId}}}   }
      					filter : { bool:{must:{term:{CHECK_STATUS:1,store_check_status:1,uc_activation_status:1,uc_status:1,STATUS:1}},must_not:{term:{store_id:storeIdStr}}} }
						}
    				}
  			}
		}).then(function (resp) {
    			var hits = resp.hits.hits;
			if(hits){
				hits = clearR(hits);
			}
			                myCache.set(cacheKey, hits, function( err, success ){
                                        	if( !err && success ){
                                                	//console.log( success );
                                        	}
                                        });
			queryCb(hits);
		}, function (err) {
    			console.trace(err.message);
		});
		}//END of cache else
	})//END of get from cache...
}//END of getProducts

//Pad版本也要用
var getProductsByPage = function(queryParams,page,queryCb){
	var searchkey = queryParams["searchkey"];
    	var page      = page || 1;	
    	var cacheKey  = searchkey+"#"+page;
	var from      = 0 ;
	var pageSize  = 20;
        var end       = pageSize;    
	    from      = pageSize  *  (page -1);
	 //   logger.info("cacheKey:"+cacheKey);
	redisClient.get(cacheKey,function (err, cacheValue) {
		if(err){logger.info("getCachError:"+err);}
		//logger.info("cacheValue="+cacheValue);
		if(cacheValue){
			queryCb(JSON.parse(cacheValue));
			logger.info("hit cache");
		}else{
		client.search({
  			index: 'jdbc',
  			type:  'jdbc',
  			body: {
    				fields : ["PRODUCT_NAME","CHECK_STATUS","CREATE_TIME","UNIT_PRICE","LIST_PRICE","APP_USERCOUNT","VISITCOUNT","PRODUCT_ID","CENTER_PICTURE","SMALL_PICTURE","product_type_flag","store_id"],
    				"from" : from,
				"size" : pageSize,
				query: {
      					filtered: {
						query  : { multi_match  : { query:searchkey,fields : ["PRODUCT_NAME","SEARCHKEY","PRODUCT_NO"]}},
					//	filter : { term         : {CHECK_STATUS:1,store_check_status:1,uc_activation_status:1,uc_status:1,STATUS:1},bool:{must_not: { term: {store_id: storeId}}}  }
      					filter : { bool:{must:{term:{CHECK_STATUS:1,store_check_status:1,uc_activation_status:1,uc_status:1,STATUS:1}},must_not:{term:{store_id:storeIdStr}}} }
						}
    				}
  			}
		}).then(function (resp) {
    				var hits = resp.hits.hits;
				if(hits){ hits = clearR(hits);}
					redisClient.set(cacheKey,JSON.stringify(hits),function (err, reply) {
						if(err){
							logger.error("setCacheError:"+err);
						}else{
							logger.info("setCacheWith:"+cacheKey+" and "+hits);
						}
					});
					queryCb(hits);
		}, function (err) {
    			logger.error(err.message);
		});
		}//END of cache else
	})//END of client cache....
}//END of getProductsByPage

//微信版本
var getProductsByPageAndWX = function(queryParams,page,queryCb){
	logger.info("I am in getProductsByPageAndWX Mothed");
	var searchkey = queryParams["searchkey"];
    var page      = page || 1;	
    var cacheKey  = "wx#"+searchkey+"#"+page;
	var from      = 0 ;
	var pageSize  = 20;
    var end       = pageSize;    
	    from      = pageSize  *  (page -1);
	 //   logger.info("cacheKey:"+cacheKey);
	redisClient.get(cacheKey,function (err, cacheValue) {
		if(err){logger.info("getCachError:"+err);}
		//logger.info("cacheValue="+cacheValue);
		if(cacheValue){
			queryCb(JSON.parse(cacheValue));
	//		logger.info("hit cache");
		}else{
		client.search({
  			index: 'jdbc',
  			type:  'jdbc',
  			body: {
    				fields : ["PRODUCT_NAME","CHECK_STATUS","CREATE_TIME","UNIT_PRICE","LIST_PRICE","APP_USERCOUNT","VISITCOUNT","PRODUCT_ID","CENTER_PICTURE","SMALL_PICTURE","product_type_flag","store_id"],
    				"from" : from,
				"size" : pageSize,
				query: {
      					filtered: {
						query  : { multi_match  : { query:searchkey,fields : ["PRODUCT_NAME","SEARCHKEY","PRODUCT_NO"]}},
					//	filter : { term         : {CHECK_STATUS:1,store_check_status:1,uc_activation_status:1,uc_status:1,STATUS:1},bool:{must_not: { term: {store_id: storeId}}}  }
      					filter : { bool:{must:{term:{CHECK_STATUS:1,store_check_status:1,uc_activation_status:1,uc_status:1,STATUS:1}},should:{term:{product_type_flag:0}},must_not:{term:{store_id:storeIdStr}}} }
						}
    				}
  			}
		}).then(function (resp) {
    			var hits = resp.hits.hits;
				if(hits){ hits = clearR(hits);}
				redisClient.set(cacheKey,JSON.stringify(hits),function (err, reply) {
						if(err){
							logger.error("setCacheError:"+err);
						}else{
							logger.info("setCacheWith:"+cacheKey+" and "+hits);
						}
				});
				queryCb(hits);
		}, function (err) {
    		logger.error(err.message);
		});
		}//END of cache else
	})//END of client cache....
}//END of getProductsByPageAndWX

//海禾专用搜索
var getProductsByPagehaihe = function(queryParams,page,queryCb){
	
	var searchkey = queryParams["searchkey"];
    var page      = page || 1;	
    var cacheKey  = "haihe#"+searchkey+"#"+page;
	var from      = 0 ;
	var pageSize  = 20;
    var end       = pageSize;    
	    from      = pageSize  *  (page -1);
	//logger.info("cacheKey="+cacheKey);
	redisClient.get(cacheKey,function (err, cacheValue) {
		if(err){logger.info("getCachError:"+err);}
		//logger.info("cacheValue="+cacheValue);
		if(cacheValue){
			queryCb(JSON.parse(cacheValue));
	//		logger.info("hit cache");
		}else{
	client.search({
  			index: 'jdbc',
  			type:  'jdbc',
  			body: {
    			fields : ["PRODUCT_NAME","CHECK_STATUS","CREATE_TIME","UNIT_PRICE","LIST_PRICE","APP_USERCOUNT","VISITCOUNT","PRODUCT_ID","CENTER_PICTURE","SMALL_PICTURE","product_type_flag","store_id"],
    			"from" : from,
				"size" : pageSize,
				query: {
      					filtered: {
						  query  : { multi_match  : { query:searchkey,fields : ["PRODUCT_NAME","SEARCHKEY","PRODUCT_NO"]}},
						  filter : { term:{CHECK_STATUS:1,store_check_status:1,uc_activation_status:1,uc_status:1,STATUS:1,store_id:storeIdStr} }
      					}
    				}
  			}
		}).then(function (resp) {
    		var hits = resp.hits.hits;
			if(hits){ hits = clearR(hits);}
			redisClient.set(cacheKey,JSON.stringify(hits),function (err, reply) {
					if(err){
						logger.error("setCacheError:"+err);
					}else{
						logger.info("setCacheWith:"+cacheKey+" and "+hits);
					}
			});
			queryCb(hits);logger.info(hits);
		}, function (err) {
    		logger.error(err.message);
		});
		}//END of cache else
	})//END of client cache....
}//END of getProductsByPagehaihe


module.exports.getProducts              =  getProducts;
module.exports.getProductsByPage        =  getProductsByPage;
module.exports.getProductsByPageAndWX   =  getProductsByPageAndWX;
module.exports.getProductsByPagehaihe   =  getProductsByPagehaihe
