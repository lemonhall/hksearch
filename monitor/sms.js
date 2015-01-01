var http = require('http');
var querystring = require('querystring');
var postData = {
    uid:'hJzRxVTAYOvg',
    pas:'hvx6p83e',
    mob:'15289475287',
    cid:'ttdYygYhgVIb', 
   type:'json'
};
var content = querystring.stringify(postData);
var options = {
    host:'api.weimi.cc',
    path:'/2/sms/send.html',
    method:'POST',
    agent:false,
    rejectUnauthorized : false,
    headers:{
        'Content-Type' : 'application/x-www-form-urlencoded', 
        'Content-Length' :content.length
    }
};
var req = http.request(options,function(res){
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log(JSON.parse(chunk));
    });
    res.on('end',function(){
        console.log('over');
    });
});
req.write(content);
req.end();
