function getClient(){
	var l,t,w,h;
　l = document.documentElement.scrollLeft || document.body.scrollLeft;
　t = document.documentElement.scrollTop || document.body.scrollTop;
　w = document.documentElement.clientWidth;
　h = document.documentElement.clientHeight;
　return {'left':l,'top':t,'width':w,'height':h} ;
}

//返回待加载资源位置
function getSubClient(p){
	var l = 0,t = 0,w,h;
	w = p.offsetWidth ;
	h = p.offsetHeight;
	
	while(p.offsetParent){
		l += p.offsetLeft ;
		t += p.offsetTop ;
		p = p.offsetParent;
	}
	
	return {'left':l,'top':t,'width':w,'height':h } ;
}
			
			
//判断两个矩形是否相交,返回一个布尔值
function intens(rec1,rec2 ,showValue){
	var lc1,lc2,tc1,tc2,w1,h1;
　lc1 = rec1.left + rec1.width / 2;
　lc2 = rec2.left + rec2.width / 2;
	tc1 = rec1.top + rec1.height / 2 ;
　tc2 = rec2.top + rec2.height / 2 ;
　w1 = (rec1.width + rec2.width) / 2 ;
　h1 = (rec1.height + rec2.height) / 2;
 
  if(document.getElementById(showValue).value == "1") {
  	return false ;
  }else{ 	
　	return Math.abs(lc1 - lc2) < w1 && Math.abs(tc1 - tc2) < h1 ;
	}
}


