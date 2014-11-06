0、安装node.js
wget http://nodejs.org/dist/v0.11.14/node-v0.11.14.tar.gz
tar zxvf node-v0.11.14.tar.gz
cd node-v0.11.14
./confingure
make
make install


===============================================================
1、创建工程
mkdir hkssearch

vim package.json
{
  "name": "sf-hk-search",
  "version": "0.0.1",
  "description": "sf express",
  "dependencies": {},
  "license": "MIT",
  "repository": {
    "type": "git"
  },
  "readmeFilename": "Readme.md",
  "bugs": {
    "url": "https://github.com/visionmedia/co/issues"
  },
  "homepage": "https://github.com/visionmedia/co"
}

===============================================================

2、命令行当中输入
npm install express --save
npm install body-parser --save
npm install log4js --save
npm install node-dev --save


===============================================================

3、server的模板
var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));


var todo  = {};

var todos = [];

// app.get('/', function(req, res){
//        res.send('hello world');
// });

app.get("/",function(req,res){
        res.redirect('search.html');
});


app.listen(3000);

===================================================================
4、安装nginx
apt-get install nginx


vim /etc/nginx/sites-enabled/default

加入：

    location / {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;
            proxy_pass http://127.0.0.1:3000/;
            proxy_redirect off;
    }

===================================================================

5、新建一个启动测试用脚本

/root/hksearch/node_modules/node-dev/bin/node-dev server.js


===================================================================

6、mysql链接池

npm install mysql --save

参考：http://blog.fens.me/nodejs-mysql-intro/

--------------------------------------

var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'heike_product',
    port: 3306
});

var selectSQL = 'select * from product limit 1';

pool.getConnection(function (err, conn) {
    if (err) console.log("POOL ==> " + err);

        conn.query(selectSQL, function (err2, rows) {
            if (err2) console.log(err2);

            console.log("SELECT ==> ");
            for (var i in rows) {
                console.log(rows[i]);
            }

            conn.release();
        });
});

----------------------------------------
之后package.json文件的内容变成：

{
  "name": "sf-hk-search",
  "version": "0.0.1",
  "description": "sf express",
  "dependencies": {
    "body-parser": "^1.9.2",
    "express": "^4.10.1",
    "log4js": "^0.6.21",
    "mysql": "^2.5.3",
    "node-dev": "^2.6.0"
  },
  "license": "MIT",
  "repository": {
    "type": "git"
  },
  "readmeFilename": "Readme.md",
  "bugs": {
    "url": "https://github.com/visionmedia/co/issues"
  },
  "homepage": "https://github.com/visionmedia/co"
}

--------------------------------------

===================================================================

7、mysql的链接组件
https://github.com/felixge/node-mysql

池化、自动重连、cluster化都支持


===================================================================

8、优化mysql本身的配置



===================================================================

9、数据库的字段

DB for Heike product:
-- database: heike_product
-- user: heike
-- password: 123456

There are 2 tables in db heike_product:
product
templateblobfield

What you need to display on the search result page are,
---------------------------------------------------------------------------------
| TABLE                 | FIELD                 | DISPLAY                       |
---------------------------------------------------------------------------------
| product               | product_name          | product name                  |
| product               | unit_price            | the heike price               |
| product               | list_price            | market price                  |
| product               | app_usercount         | comment counts                |
| product               | visit_count           | customer care counts          |
| product               | product_id            | used for the product link     |
| templateblobfield     | field_smallvalue      | small-size pic relative path  |
| templateblobfield     | field_centervalue     | median-size pic relative path |
---------------------------------------------------------------------------------

Rule for picture url: http://hkimg.sf-express.com/<relative path stored in db>
Rule for product page url: http://www.sfheike.com/p_<product_id>.htm

Table templateblobfield use field "PRODUCT_ID" to associate with table product.

Search fields: product_name & searchkey

Sorting:
-- Default: by create_time desc;
-- Popularity: by visit_count;
-- Price: by unit_price.

===================================================================
10、数据库的字段

product表：
{ PRODUCT_NAME: '健司KENJI 健康时刻瑞士高山牛乳脆片  160g',
  UNIT_PRICE: 12.9,
  LIST_PRICE: 22,
  APP_USERCOUNT: 0,
  VISITCOUNT: 0,
  PRODUCT_ID: '002a41857' 
}

templateblobfield表:
{ ID: '8aefac984978d6be01498155d4996998',
  FIELD_ID: '',
  FIELD_VALUE: 'userfiles/product/img/20141106/big/big_big_1415214164241.jpg',
  PRODUCT_ID: '002a41857',
  FIELD_SMALLVALUE: 'userfiles/product/img/20141106/small/small_big_1415214164241.jpg',
  FIELD_CENTERVALUE: 'userfiles/product/img/20141106/center/center_big_1415214164241.jpg' }
{ ID: '8aefac984978d6be01498155d4ef6999',
  FIELD_ID: '',
  FIELD_VALUE: 'userfiles/product/img/20141106/big/big_big_1415214163826.jpg',
  PRODUCT_ID: '002a41857',
  FIELD_SMALLVALUE: 'userfiles/product/img/20141106/small/small_big_1415214163826.jpg',
  FIELD_CENTERVALUE: 'userfiles/product/img/20141106/center/center_big_1415214163826.jpg' }
{ ID: '8aefac984978d6be01498155d68d699a',
  FIELD_ID: '',
  FIELD_VALUE: 'userfiles/product/img/20141106/big/big_big_1415214164811.jpg',
  PRODUCT_ID: '002a41857',
  FIELD_SMALLVALUE: 'userfiles/product/img/20141106/small/small_big_1415214164811.jpg',
  FIELD_CENTERVALUE: 'userfiles/product/img/20141106/center/center_big_1415214164811.jpg' }
{ ID: '8aefac984978d6be01498155d6b9699b',
  FIELD_ID: '',
  FIELD_VALUE: 'userfiles/product/img/20141106/big/big_big_1415214164466.jpg',
  PRODUCT_ID: '002a41857',
  FIELD_SMALLVALUE: 'userfiles/product/img/20141106/small/small_big_1415214164466.jpg',
  FIELD_CENTERVALUE: 'userfiles/product/img/20141106/center/center_big_1415214164466.jpg' }
{ ID: '8aefac984978d6be01498155d85c699c',
  FIELD_ID: '',
  FIELD_VALUE: 'userfiles/product/img/20141106/big/big_big_1415214165301.jpg',
  PRODUCT_ID: '002a41857',
  FIELD_SMALLVALUE: 'userfiles/product/img/20141106/small/small_big_1415214165301.jpg',
  FIELD_CENTERVALUE: 'userfiles/product/img/20141106/center/center_big_1415214165301.jpg' }
{ ID: '8aefac984978d6be01498155d8c8699d',
  FIELD_ID: '',
  FIELD_VALUE: 'userfiles/product/img/20141106/big/big_big_1415214164980.jpg',
  PRODUCT_ID: '002a41857',
  FIELD_SMALLVALUE: 'userfiles/product/img/20141106/small/small_big_1415214164980.jpg',
  FIELD_CENTERVALUE: 'userfiles/product/img/20141106/center/center_big_1415214164980.jpg' }
{ ID: '8aefac984978d6be01498155da18699e',
  FIELD_ID: '',
  FIELD_VALUE: 'userfiles/product/img/20141106/big/big_big_1415214165748.jpg',
  PRODUCT_ID: '002a41857',
  FIELD_SMALLVALUE: 'userfiles/product/img/20141106/small/small_big_1415214165748.jpg',
  FIELD_CENTERVALUE: 'userfiles/product/img/20141106/center/center_big_1415214165748.jpg' }
{ ID: '8aefac984978d6be01498155dabe699f',
  FIELD_ID: '',
  FIELD_VALUE: 'userfiles/product/img/20141106/big/big_big_1415214165507.jpg',
  PRODUCT_ID: '002a41857',
  FIELD_SMALLVALUE: 'userfiles/product/img/20141106/small/small_big_1415214165507.jpg',
  FIELD_CENTERVALUE: 'userfiles/product/img/20141106/center/center_big_1415214165507.jpg' }
{ ID: '8aefac984978d6be01498155dbe069a0',
  FIELD_ID: '',
  FIELD_VALUE: 'userfiles/product/img/20141106/big/big_big_1415214166188.jpg',
  PRODUCT_ID: '002a41857',
  FIELD_SMALLVALUE: 'userfiles/product/img/20141106/small/small_big_1415214166188.jpg',
  FIELD_CENTERVALUE: 'userfiles/product/img/20141106/center/center_big_1415214166188.jpg' }
{ ID: '8aefac984978d6be01498155dc7969a1',
  FIELD_ID: '',
  FIELD_VALUE: 'userfiles/product/img/20141106/big/big_big_1415214165936.jpg',
  PRODUCT_ID: '002a41857',
  FIELD_SMALLVALUE: 'userfiles/product/img/20141106/small/small_big_1415214165936.jpg',
  FIELD_CENTERVALUE: 'userfiles/product/img/20141106/center/center_big_1415214165936.jpg' }

product表：
{ PRODUCT_ID: '002a41857',
  PRODUCT_NAME: '健司KENJI 健康时刻瑞士高山牛乳脆片  160g',
  UNIT_PRICE: 12.9,
  LIST_PRICE: 22,
  QUANTITY: 5,
  BRAND: '8aefac9b497114ef01497a2cfa7b3e31',
  MODEL: '',
  SPEC: '',
  UNIT: '盒',
  MANUFACTORY: '',
  RESELLER: '',
  PRODUCINGAREA: '',
  DESCRIPTION: '<img src="http://p.sfbest.com/web/decba728/decba7281ece1ee210997f242fb66893.gif"><p style="text-align: center;"><img src="http://p01.sfbest.com/1700027803/1700027803_1.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_2.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_3.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_4.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_5.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_6.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_7.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_8.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_9.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_10.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_11.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_12.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_13.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_14.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_15.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_16.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_17.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_18.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_19.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_20.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_21.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_22.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_23.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_24.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_25.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_26.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_27.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_28.jpg" style="margin:0;" alt="" /><div style="{display:none}"></div> <img src="http://p01.sfbest.com/1700027803/1700027803_29.jpg" style="margin:0;" alt="" /></p>',
  UPDATE_TIME: '2014-11-06 13:02:02',
  SMALL_PICTURE: 'userfiles/product/img/20141106/small/1415214128626_1415214166482.jpg',
  CENTER_PICTURE: 'userfiles/product/img/20141106/center/1415214128566_1415214166482.jpg',
  BIG_PICTURE: 'userfiles/product/img/20141105/big/1415214166482.jpg',
  NOTE: '健司KENJI 健康时刻瑞士高山牛乳脆片  160g',
  INTRO: '',
  SEARCHKEY: '',
  TEMPLATE_ID: '101',
  STATUS: 1,
  CREATE_TIME: '2014-11-04 17:40:10',
  MAIN_CATEGORY: '4vfi3265',
  SORTINDEX: 0,
  CORPID: '',
  POP_PICTURE: 'userfiles/product/img/20141106/pop/1415214128651_1415214166482.jpg',
  LINKURL: '',
  EXT_FIELD1: '北京、嘉兴、广州、常温',
  EXT_FIELD2: '',
  DISPLAYID: '',
  SPEC_NAME1: '',
  SPEC_NAME2: '',
  SPEC_VALUE1: '',
  SPEC_VALUE2: '',
  POP_TYPE: '',
  PRODUCT_NO: '100026572',
  SID: '002a41857',
  TAG: '盒',
  VISITCOUNT: 0,
  TYPE: 0,
  STARTTIME: '',
  ENDTIME: '',
  EXTFILELD3: '',
  EXTFILELD4: '',
  OWNER_ROLE: '',
  CREATOR: '',
  REFER_PRICE: 0,
  PARENT_ID: '',
  ISCONFIG: 0,
  SHORT_NAME: '',
  EXT_FILELD20: '',
  EXT_FILELD19: '',
  EXT_FILELD18: '',
  EXT_FILELD17: '',
  EXT_FILELD16: '',
  EXT_FILELD15: '',
  EXT_FILELD14: '',
  EXT_FILELD13: '',
  EXT_FILELD12: '',
  EXT_FILELD11: '',
  EXT_FILELD10: '',
  EXT_FILELD9: '',
  EXT_FILELD8: '',
  EXT_FILELD7: '',
  EXT_FILELD6: '',
  EXT_FILELD5: '',
  DB_STATUS: '',
  DEL_TIME: '',
  CUSTOM_IMAGE: 0,
  APP_USERCOUNT: 0,
  BUY_TOTALCOUNT: 0,
  APP_TOTALCOUNT: 0,
  POP_PICTURE1: 'userfiles/product/img/20141106/pop/002a418571/pop11415214128674_14152141664821.jpg',
  POP_PICTURE2: 'userfiles/product/img/20141106/pop/002a418572/pop21415214128697_14152141664822.jpg',
  POP_PICTURE3: 'userfiles/product/img/20141106/pop/002a418573/pop31415214128724_14152141664823.jpg',
  POP_PICTURE4: 'userfiles/product/img/20141106/pop/002a418574/pop41415214128746_14152141664824.jpg',
  POP_PICTURE5: 'userfiles/product/img/20141106/pop/002a418575/pop51415214128770_14152141664825.jpg',
  weight: 200,
  INTEGRAL: 0,
  IS_USERPRICE: 1,
  SHORT_NAME_COLOR: '',
  SHORT_NAME_BOLD: 0,
  P_COLOR: '',
  P_COLOR_PIC: '',
  INTEGRAL_COUNT: 0,
  BASE_PRICE: 0,
  STORE_ID: '1111110002',
  STOCK_WARNING: 0,
  SUPPLIER_ID: '',
  STOCK_WARNING2: 0,
  SHIP_TYPE: '',
  CHARGES_FLAG: 0,
  BOOKINGS: 0,
  CHECK_STATUS: '0',
  CHECK_MAN: '',
  CHECKED_NOTE: '',
  CHECK_TIME: '2014-11-04 17:40:10',
  ESALESNO: '',
  CLASSTYPE: '',
  GAME_TYPE: '0',
  EACH_BUY_COUNT: 0,
  LIMIT_BUY_COUNT: 0,
  START_LIMIT_TIME: '',
  CHANNEL_FLAG: '0',
  END_LIMIT_TIME: '',
  ORGID: '|1|',
  PIFANUM0: 0,
  PIFANUM1: 0,
  PIFANUM2: 0,
  PIFANUM3: 0,
  PIFANUM4: 0,
  PFPRICE1: 0,
  PFPRICE2: 0,
  PFPRICE3: 0,
  PFPRICE4: 0,
  INFORMATION_SOURCE: '卖家添加',
  ISNEW: 1,
  FLAG: 0,
  ISUPDATE: 0,
  EXT_FILELD21: '',
  EXT_FILELD22: '',
  EXT_FILELD23: '',
  EXT_FILELD24: '',
  EXT_FILELD25: '',
  EXT_FILELD26: '',
  EXT_FILELD27: '',
  EXT_FILELD28: '',
  EXT_FILELD29: '',
  EXT_FILELD30: '',
  EXT_FILELD31: '',
  EXT_FILELD32: '',
  EXT_FILELD33: '',
  EXT_FILELD34: '',
  EXT_FILELD35: '',
  EXT_FILELD36: '',
  EXT_FILELD37: '',
  EXT_FILELD38: '',
  EXT_FILELD39: '',
  EXT_FILELD40: '',
  BARCODE: '',
  FACTORY: '',
  PROVINCE: '',
  CITY: '',
  AREA: '',
  GIFT_CARD_TYPE: '',
  TW_PARENT_ID: '',
  WHO_BEAR: 'buyer',
  TRANSFER_ID: 'ff808081476dd42101477ad88af51803',
  EMS_TRANSFER_ID: '',
  NOMAL_TRANSFER_ID: '',
  TRANSFER_TYPE: '1',
  PRODUCT_LENGTH: 0,
  PRODUCT_HEIGHT: 0,
  FREIGHT_AMOUNT: 0,
  INTEGRAL_AMOUNT: 0,
  INTEGRAL_TYPE: '0',
  INTEGRAL_EXCHANGE_AMOUNT: 0,
  USE_TRAN_MODEL: '0',
  PRIVATE_AREAS: '',
  USER_PRIVATE: '0',
  USER_LEVEL: '',
  PRIVATE_USERS: '',
  AREA_PRIVATE: '0',
  MODEL_NO: '',
  TP_SPEC_VALUE1: '',
  TP_SPEC_VALUE2: '',
  SUPPORT_STORE_BUY: '1',
  RAPID_REPLENISHMENT: '0',
  SPECIAL_SERVICE: '',
  IS_SALESPROMOTION: '0',
  PROMOTION_CREATETIME: '',
  PROMOTION_ENDTIME: '',
  PROMOTION_QUANTITY: 0,
  PROMOTION_PRICE: 0,
  PROMOTION_TYPE: '',
  PROMOTION_BUY_COUNT: 0,
  PROMOTION_GIFT_NOTE: '',
  PROMOTION_CHECK_STATUS: '0',
  PROMOTION_CHECK_NOTE: '',
  YDPRICE: 0,
  TQYD_DAYS: 0,
  TV_NOTE: '',
  MOBILE_NOTE: '',
  VD_ID1: '',
  IS_YYPRODUCT: '',
  SCOPE: '',
  PROMOTION_IMAGE: '',
  PRODUCT_WIDTH: 0,
  VD_ID2: '',
  VD_ID3: '',
  VD_ID4: '',
  VD_ID5: '',
  premium_percent: 0,
  shipping_type: '2',
  piece_price: 0,
  virtual_buy_totalCount: 0,
  SHIP_STATUS: '1',
  COD_STATUS: '1',
  product_splitRate: 0,
  storeSalesArea: '8aefac9a48ae02bf0148c43609931c1a',
  create_man: '',
  quick_markurl: '',
  prodcutpropotis: '',
  store_product_no: '1700027803',
  product_type_flag: '0',
  uc_activation_status: '1',
  uc_status: '1',
  store_check_status: '1' }

===================================================================

11、对应的模板

<li class="">
<div class="y_bigpic">
  <div>
      <a target="_blank" href="http://www.sfheike.com/p_{{PRODUCT_ID}}.htm" title="{{PRODUCT_NAME}}"><img data-url="http://hkimg.sf-express.com/{{FIELD_CENTERVALUE}}" src="http://hkimg.sf-express.com/{{FIELD_CENTERVALUE}}" alt="{{PRODUCT_NAME}}}" width="208" height="208"></a>
  </div>
</div>
<div class="y_smpicli">
    <span class="y_cur"><img src="./search_files/small_1410766518833.jpg" alt="{{PRODUCT_NAME}}"></span>
</div>
    <p class="price"><span>￥{{UNIT_PRICE}}</span><del>{{LIST_PRICE}}</del></p>
    <p class="name"><a target="_blank" title="{{PRODUCT_NAME}}" href="http://www.sfheike.com/p_{{PRODUCT_ID}}.htm">{{PRODUCT_NAME}}</a></p>
    <p class="xl">累计评价:{{APP_USERCOUNT}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关注：{{VISITCOUNT}}次</p>
</li>


====================================================================

12、模板引擎
官网：https://github.com/borismoore/jsrender
示例：http://www.jsviews.com/#samples


<ul id="productsList">
<!-- 大图展示 -->
<!-- Item 1 -->
<!-- Templates -->
<script id="productTemplate" type="text/x-jsrender">
<li class="">
<div class="y_bigpic">
  <div>
      <a target="_blank" href="http://www.sfheike.com/p_{{PRODUCT_ID}}.htm" title="{{>PRODUCT_NAME}}"><img data-url="http://hkimg.sf-express.com/{{>CENTER_PICTURE}}" src="http://hkimg.sf-express.com/{{>CENTER_PICTURE}}" alt="{{>PRODUCT_NAME}}}" width="208" height="208"></a>
  </div>
</div>
<div class="y_smpicli">
    <span class="y_cur"><img src="./search_files/small_1410766518833.jpg" alt="{{>PRODUCT_NAME}}"></span>
</div>
    <p class="price"><span>￥{{>UNIT_PRICE}}</span><del>{{>LIST_PRICE}}</del></p>
    <p class="name"><a target="_blank" title="{{>PRODUCT_NAME}}" href="http://www.sfheike.com/p_{{>PRODUCT_ID}}.htm">{{>PRODUCT_NAME}}</a></p>
    <p class="xl">累计评价:{{>APP_USERCOUNT}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关注：{{>VISITCOUNT}}次</p>
</li>
</script>
<script type="text/javascript">
  var products = [
      { PRODUCT_NAME: '健司KENJI 健康时刻瑞士高山牛乳脆片  160g',
        UNIT_PRICE: 12.9,
        LIST_PRICE: 22,
        APP_USERCOUNT: 0,
        VISITCOUNT: 0,
        PRODUCT_ID: '002a41857' }
  ];
  $("#productsList").html($("#productTemplate").render(products));
</script>

====================================================================

13、商品的状态问题

CHECK_STATUS = 1 AND store_check_status =1 AND uc_activation_status =1 AND uc_status = 1

====================================================================

14、对MYSQL的查询加上缓存



