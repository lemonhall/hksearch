function a(x,y){
	//l = $(body).offset().left;
	//w = $(body).width();
	$('#tbox').css('right',x + 'px');
	$('#tbox').css('bottom',y + 'px');
}
function b(){
	//h = $(window).height();
	h = 0;
	t = $(document).scrollTop();
	if(t > h){
		$('#gotop').fadeIn('slow');
	}else{
		$('#gotop').fadeOut('slow');
	}
}
$(document).ready(function(e) {		
	a(10,10);//#tbox的div距浏览器底部和页面内容区域右侧的距离
	b();
	$('#gotop').click(function(){
		$(document).scrollTop(0);	
	})
});
$(window).resize(function(){
	a(10,10);//#tbox的div距浏览器底部和页面内容区域右侧的距离
});

$(window).scroll(function(e){
	b();		
})