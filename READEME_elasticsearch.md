UBUNTU 14.04 LTS 安装 elasticseach
同步MYSQL表
并实现中文搜索

===========================================================================================

1、下载
wget https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.4.1.deb


===========================================================================================

2、安装
dpkg -i elasticsearch-1.4.1.deb

===========================================================================================

3、启动脚本
Selecting previously unselected package elasticsearch.
(Reading database ... 90313 files and directories currently installed.)
Preparing to unpack elasticsearch-1.4.1.deb ...
Unpacking elasticsearch (1.4.1) ...
Setting up elasticsearch (1.4.1) ...
Adding system user `elasticsearch' (UID 107) ...
Adding new user `elasticsearch' (UID 107) with group `elasticsearch' ...
Not creating home directory `/usr/share/elasticsearch'.
### NOT starting elasticsearch by default on bootup, please execute
 sudo update-rc.d elasticsearch defaults 95 10
### In order to start elasticsearch, execute
 sudo /etc/init.d/elasticsearch start
Processing triggers for ureadahead (0.100.0-16) ...


===========================================================================================

4、安装JAVA
wget http://119.254.108.84:8080/jdk.tar.gz
tar zxvf jdk.tar.gz

sudo update-alternatives --install /usr/bin/java java /opt/jdk/bin/java 300
sudo update-alternatives --install /usr/bin/javac javac /opt/jdk/bin/javac 300
sudo update-alternatives --install /usr/bin/jar jar /opt/jdk/bin/jar 300
sudo update-alternatives --config  java

vim /etc/profile
export JAVA_HOME=/opt/jdk
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$PATH:$JAVA_HOME/bin

source /etc/profile

验证
java -version

===========================================================================================

5、校验是否启动

netstat -nlp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      690/sshd
tcp6       0      0 :::9200                 :::*                    LISTEN      10610/java
tcp6       0      0 :::9300                 :::*                    LISTEN      10610/java
tcp6       0      0 :::22                   :::*                    LISTEN      690/sshd
tcp6       0      0 :::3000                 :::*                    LISTEN      1584/pm2: Daemon
udp        0      0 0.0.0.0:43449           0.0.0.0:*                           1149/dhclient
udp        0      0 0.0.0.0:68              0.0.0.0:*                           1149/dhclient
udp6       0      0 :::12563                :::*                                1149/dhclient
udp6       0      0 :::54328                :::*                                10610/java
Active UNIX domain sockets (only servers)
Proto RefCnt Flags       Type       State         I-Node   PID/Program name    Path
unix  2      [ ACC ]     STREAM     LISTENING     8720     1584/pm2: Daemon    /root/.pm2/pub.sock
unix  2      [ ACC ]     STREAM     LISTENING     8721     1584/pm2: Daemon    /root/.pm2/rpc.sock
unix  2      [ ACC ]     SEQPACKET  LISTENING     5391670  17731/systemd-udevd /run/udev/control
unix  2      [ ACC ]     STREAM     LISTENING     10362    1/init              @/com/ubuntu/upstart
unix  2      [ ACC ]     STREAM     LISTENING     1641     833/acpid           /var/run/acpid.socket
unix  2      [ ACC ]     STREAM     LISTENING     9453     619/dbus-daemon     /var/run/dbus/system_bus_socket

===========================================================================================

6、与MYSQL之间完成同步
http://blog.csdn.net/alen1985/article/details/41356361

官方地址：
https://github.com/jprante/elasticsearch-river-jdbc


6.1 去安装目录安装

cd /usr/share/elasticsearch/bin/

./plugin --install jdbc --url http://xbib.org/repository/org/xbib/elasticsearch/plugin/elasticsearch-river-jdbc/1.3.4.4/elasticsearch-river-jdbc-1.3.4.4-plugin.zip

root@node1:/usr/share/elasticsearch/bin# ./plugin --install jdbc --url http://xbib.org/repository/org/xbib/elasticsearch/plugin/elasticsearch-river-jdbc/1.3.4.4/elasticsearch-river-jdbc-1.3.4.4-plugin.zip
-> Installing jdbc...
Trying http://xbib.org/repository/org/xbib/elasticsearch/plugin/elasticsearch-river-jdbc/1.3.4.4/elasticsearch-river-jdbc-1.3.4.4-plugin.zip...
Downloading ......................................................................DONE
Installed jdbc into /usr/share/elasticsearch/plugins/jdbc

---------------------------------------

6.2 下载mysql的driver

curl -o mysql-connector-java-5.1.33.zip -L 'http://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-5.1.33.zip/from/http://cdn.mysql.com/'

---------------------------------------

6.3 拷贝jar包到指定目录
cp mysql-connector-java-5.1.33-bin.jar /usr/share/elasticsearch/plugins/jdbc/
cd /usr/share/elasticsearch/plugins/jdbc/
chmod 644 *

6.4 重启elasticsearch
sudo /etc/init.d/elasticsearch restart

6.5 出现主机名解析问题

改/etc/hostname

---------------------------------------

6.6 出现了插件错误

[2014-11-27 23:26:52,838][INFO ][node                     ] [Powderkeg] initializing ...
[2014-11-27 23:26:52,859][INFO ][plugins                  ] [Powderkeg] loaded [jdbc-1.3.4.4-d2e33c3], sites []
[2014-11-27 23:26:52,905][ERROR][bootstrap                ] {1.4.1}: Initialization Failed ...
- IncompatibleClassChangeError[Implementing class]

./plugin --install jdbc --url http://xbib.org/repository/org/xbib/elasticsearch/plugin/elasticsearch-river-jdbc/1.4.0.3.Beta1/elasticsearch-river-jdbc-1.4.0.3.Beta1-plugin.zip

./plugin -r jdbc

service elasticsearch restart

OK，解决了
---------------------------------------

6.7 搞定同步

curl -XPUT 'localhost:9200/_river/my_jdbc_river/_meta' -d '{
    "type" : "jdbc",
    "jdbc" : {
        "url" : "jdbc:mysql://192.168.60.5:3306/heike_product",
        "user" : "。。。。。。",
        "password" : "。。。。。",
        "sql" : "select * from product"
    }
}'

6.8 安装head插件
tail -f /var/log/elasticsearch/elasticsearch.log
cd /usr/share/elasticsearch/bin/
./plugin -install mobz/elasticsearch-head

6.9 卸载
service elasticsearch stop
apt-get remove elasticsearch

wget https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.3.4.deb
dpkg -i elasticsearch-1.3.4.deb
service elasticsearch restart

=======================================================

7. node.js封装

http://www.elasticsearch.org/guide/en/elasticsearch/client/javascript-api/current/quick-start.html


var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});


var pageNum = request.param('page', 1);
var perPage = request.param('per_page', 15);
var userQuery = request.param('search_query');
var userId = request.session.userId;

client.search({
  index: 'posts',
  from: (pageNum - 1) * perPage,
  size: perPage,
  body: {
    filtered: {
      query: {
        match: {
          // match the query agains all of
          // the fields in the posts index
          _all: userQuery
        }
      },
      filter: {
        // only return documents that are
        // public or owned by the current user
        or: [
          {
            term: { privacy: "public" }
          },
          {
            term: { owner: userId }
          }
        ]
      }
    }
  }
}, function (error, response) {
  if (err) {
    // handle error
    return;
  }

  response.render('search_results', {
    results: response.hits.hits,
    page: pageNum,
    pages: Math.ceil(response.hits.total / perPage)
  })
});

-------------------------------------

npm install elasticsearch --save


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
        )}//END of get from cache...
}//END of getProducts

module.exports.getProducts              =  getProducts;


==========================================================
vim test_elasticsearch.js

var elasticsearch = require("./elasticsearch.js");

var searchkey = "羊腿";
var start     = 0;
var end       = 1000;

elasticsearch.getProducts({searchkey:searchkey,start:start,end:end},function(result){
        console.log(result);
});

==========================================================
vim test_mysql.js

var mysql       = require("./mysql.js");

var searchkey = "羊腿";
var start     = 0;
var end       = 1000;

mysql.getProducts({searchkey:searchkey,start:start,end:end},function(result){
        console.log(result);
});
