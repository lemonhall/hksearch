var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: '192.168.60.2:9200'
});

var storeIdStr = ['1111111812343','1111111819204'];  //接收海禾的store_id
//var storeIdStr = '1111111812343';


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

//Pad版本也要用
var getProductsByPage = function(queryParams,page,queryCb){
        var searchkey = queryParams["searchkey"];
        var page      = page || 1;
        var cacheKey  = searchkey+"#"+page;
        var from      = 0 ;
        var pageSize  = 20;
        var end       = pageSize;
            from      = pageSize  *  (page -1);
        

	client.search({
            index: 'jdbc',
            type:  'jdbc',
            body: {
               fields : ["PRODUCT_NAME","CHECK_STATUS","CREATE_TIME","UNIT_PRICE","LIST_PRICE","APP_USERCOUNT","VISITCOUNT","PRODUCT_ID","CENTER_PICTURE","SMALL_PICTURE","product_type_flag","store_id"],
               "from" : from,
               "size" : pageSize,
               query: {
                      filtered: {
                      		query  :  { multi_match  : { query:searchkey,fields : ["PRODUCT_NAME","SEARCHKEY","PRODUCT_NO"]}},
                      		filter :  { 
					    bool: { must:    { term:{CHECK_STATUS:1,store_check_status:1,uc_activation_status:1,uc_status:1,STATUS:1}},
					  	    must_not:{ terms:{store_id:storeIdStr} } 
					  	  } 
					  }
                                }
                       }
                  }
                }).then(function (resp) {
                                var hits = resp.hits.hits;
                                if(hits){ hits = clearR(hits);}
                                queryCb(hits);
                }, function (err) {
                        console.log(err.message);
                });
}//END of getProductsByPage

module.exports.getProductsByPage        =  getProductsByPage;
