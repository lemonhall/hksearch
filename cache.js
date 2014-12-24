var co 		= require('co');
var redisClient = require('redis').createClient("6379","192.168.60.15");
var wrapper 	= require('co-redis');
var redisCo 	= wrapper(redisClient);

var getCache = co(function* () {
	var result = yield redisCo.getall(key);
        return result;
});

var setCache = co(function* (key,value) {
	var result = yield redisCo.set(key,value);
        return result;
});

module.exports.getCache		=  getCache;
module.exports.setCache		=  setCache;

