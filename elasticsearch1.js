var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: '192.168.60.2:9200'
});
var NodeCache = require( "node-cache" );
//var myCache = new NodeCache();
var myCache = new NodeCache( { stdTTL: 400, checkperiod: 120 } );

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
    				fields : ["PRODUCT_NAME","CHECK_STATUS","CREATE_TIME","UNIT_PRICE","LIST_PRICE","APP_USERCOUNT","VISITCOUNT","PRODUCT_ID","CENTER_PICTURE","SMALL_PICTURE","PRODUCT_TYPE_FLAG"],
    				query: {
      					filtered: {
						query  : { multi_match  : { query:searchkey,fields : ["PRODUCT_NAME","SEARCHKEY","PRODUCT_NO"]}},
						filter : { term         : {CHECK_STATUS:1,store_check_status:1,uc_activation_status:1,uc_status:1,STATUS:1}  }
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

//Pad版本/微信版本也要用
var getProductsByPage = function(queryParams,pageFrom,queryCb){

	var searchkey = queryParams["searchkey"];
	var start     =     0    ;//queryParams["start"];
    	var end       =     1000 ;//queryParams["end"];
    	var cacheKey  = searchkey+"#"+start+"#"+end;
    	var pageFrom   =     pageFrom;	
	var from     =     0;//queryParams["start"];
	var pageSize  =     20;//
            from = pageSize*(pageFrom -1);
            end   = pageSize;    

        myCache.get(cacheKey, function( err, value ){
        	if( !err && !isEmpty(value) ){
                	queryCb(value[cacheKey]);
        	}else{
		client.search({
  			index: 'jdbc',
  			type: 'jdbc',
  			body: {
    				fields : ["PRODUCT_NAME","CHECK_STATUS","CREATE_TIME","UNIT_PRICE","LIST_PRICE","APP_USERCOUNT","VISITCOUNT","PRODUCT_ID","CENTER_PICTURE","SMALL_PICTURE","PRODUCT_TYPE_FLAG"],
    				"from": from,
					"size": pageSize,
					"sort":{ "create_time":{"order":"desc"}},
					query: {
      					filtered: {
						query  : { multi_match  : { query:searchkey,fields : ["PRODUCT_NAME","SEARCHKEY","PRODUCT_NO"]}},
						filter : { term         : {CHECK_STATUS:1,store_check_status:1,uc_activation_status:1,uc_status:1,STATUS:1}  }
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
}//END of getProductsByPage


module.exports.getProducts              =  getProducts;
module.exports.getProductsByPage        =  getProductsByPage;
