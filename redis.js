var co          = require('co');
var redisClient = require('redis').createClient("6379","192.168.60.15");
var wrapper     = require('co-redis');
var redisCo     = wrapper(redisClient);

redisClient.set("testKey","1",function (err, reply) {
	if(err){
		console.log(err);
	}
});
