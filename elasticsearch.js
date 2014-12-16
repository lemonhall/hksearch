var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200'
});
var NodeCache = require( "node-cache" );
//var myCache = new NodeCache();
var myCache = new NodeCache( { stdTTL: 1000, checkperiod: 120 } );

function isEmpty(obj){
    for (var name in obj){
        return false;
    }
    return true;
};
var clearResult = function(hits){
	var temp_array = [];
        var testJson ;
	for(var ii=0;ii<hits.length;ii++){
		temp_array.push(hits[ii].fields);
	}
        for(var i=0; i<temp_array.length;i++){
        testJson ={"PRODUCT_NAME":temp_array[i].PRODUCT_NAME,"UNIT_PRICE":temp_array[i].UNIT_PRICE,"LIST_PRICE":temp_array[i].LIST_PRICE,"APP_USERCOUNT":temp_array[i].APP_USERCOUNT,"VISITCOUNT":temp_array[i].VISITCOUNT,"PRODUCT_ID":temp_array[i].PRODUCT_ID,"CENTER_PICTURE":temp_array[i].CENTER_PICTURE,"SMALL_PICTURE":temp_array[i].SMALL_PICTURE,"PRODUCT_TYPE_FLAG":temp_array[i].PRODUCT_TYPE_FLAG};
         if(i<temp_array.length-1){
               testJson=testJson+",";
         }
        }
   //     var json = eval('(' + testJson + ')');
	return temp_array;	
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


var getProducts = function(queryParams,queryCb){

	var searchkey = queryParams["searchkey"];
	var start     =     0    ;//queryParams["start"];
        var end       =     1000 ;//queryParams["end"];
        var cacheKey  = searchkey+"#"+start+"#"+end;


        myCache.get(cacheKey, function( err, value ){
        	if( !err && !isEmpty(value) ){
                	queryCb(value[cacheKey]);
        	}else{
		client.search({
  			index: 'jdbc',
  			type: 'jdbc',
  			body: {
    				fields : ["PRODUCT_NAME","CHECK_STATUS","CREATE_TIME","UNIT_PRICE","LIST_PRICE","APP_USERCOUNT","VISITCOUNT","PRODUCT_ID","CENTER_PICTURE","SMALL_PICTURE","PRODUCT_TYPE_FLAG"],
    				query: {
      					filtered: {
						query  : { multi_match  : { query:searchkey,fields : ["PRODUCT_NAME","SEARCHKEY"]}},
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
					query: {
      					filtered: {
						query  : { multi_match  : { query:searchkey,fields : ["PRODUCT_NAME","SEARCHKEY"]}},
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
