/******
		Simbyungki /
		dung8524@naver.com
						*****/
var winHeight = $(window).height();
var winWindh = $(window).width();
$('document').ready(function(){

	
});

//gnb
function gnbShow(){
	$('.gnb_wrap .dim_area').fadeIn(300);
	$('.gnb_wrap .btn_layer_close').animate({'left':'11px'}, 300);
	$('.gnb_wrap .gnb_area').animate({'right':'0%'}, 300);
}
function gnbHide(){
	$('.gnb_wrap .dim_area').fadeOut(300);
	$('.gnb_wrap .btn_layer_close').animate({'left':'-20px'}, 300);
	$('.gnb_wrap .gnb_area').animate({'right':'-58.6%'}, 300);
}

//class curr toggle
function currControl(thisClass){
	if($('.'+ thisClass).hasClass('curr')){
		$('.'+ thisClass).removeClass('curr');
	}else{
		$('.'+ thisClass).addClass('curr');
	}
}

//layer popup
function commonLayerOpen(thisClass){
	$('.header').css({'z-index':'0'});
	$('.'+thisClass).fadeIn();
}
function commonLayerClose(thisClass){
	$('.header').css({'z-index':'400'});
	$('.'+thisClass).fadeOut();
}