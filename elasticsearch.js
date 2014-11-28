var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});


var NodeCache = require( "node-cache" );
//var myCache = new NodeCache();
var myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

function isEmpty(obj){
    for (var name in obj){
        return false;
    }
    return true;
};
var clearResult = function(hits){
	var temp_array = [];

	for(var ii=0;ii<hits.length;ii++){
		temp_array.push(hits[ii].fields);
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
    				fields : ["PRODUCT_NAME","CHECK_STATUS","CREATE_TIME","UNIT_PRICE","LIST_PRICE","APP_USERCOUNT","VISITCOUNT","PRODUCT_ID","CENTER_PICTURE","SMALL_PICTURE"],
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
				hits = clearResult(hits);
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

module.exports.getProducts              =  getProducts;
