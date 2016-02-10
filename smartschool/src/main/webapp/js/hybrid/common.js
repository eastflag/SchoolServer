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

function setSwiper(){
	setTimeout(function(){
		var imgHeight = $('.photo_wrap .swiper-slide img').height();
		$('.megazine_view_wrap .photo_wrap').css({'height':imgHeight});
		var swiper = new Swiper('.megazine_view_wrap .photo_wrap', {
			loop: true,
			grabCursor: true,
			pagination : '.indicator'
		});
		swiper.params.onSlideChangeEnd = function(){
			//다음 이미지 높이 세팅
			var i = $('.indicator .swiper-active-switch').index()+1;
			var currImgHeignt = $('.photo_wrap .swiper-slide').eq(i).children('img').height();
			$('.megazine_view_wrap .photo_wrap').animate({'height':currImgHeignt}, 300);
		}	
	}, 300);
}

function animateGrowthDetail(section){
	var diff = 0;
	if(section=='height'){
		diff = 100;
	}else if(section=='weight'){
		diff = 20;
	}
	setTimeout(function(){
			var standard = $('.growth_detail_wrap .standard_bar').html();
			$('.growth_detail_wrap .standard_bar').css({'bottom':standard-diff+'%'});
			var k = $('.chart > div').length;
			for(var i = 0; i < k; i++){
				var data = $('.growth_detail_wrap .chart > div').eq(i).children('span').children('em').html();
				transData = "";
				if(section=='height'){
					transData = data-diff + '%';
				}else if(section=='weight'){
					transData = ((data/100) * 100) - diff + '%';
				}
				var transData = data-diff + '%';
				$('.growth_detail_wrap .chart > div').eq(i).children('span').animate({'height':transData}, 500);
			}
	}, 500);
}

function b64(s) {
	var key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	var i = 0, len = s.length,
		c1, c2, c3,
		e1, e2, e3, e4,
		result = [];

	while (i < len) {
		c1 = s.charCodeAt(i++);
		c2 = s.charCodeAt(i++);
		c3 = s.charCodeAt(i++);

		e1 = c1 >> 2;
		e2 = ((c1 & 3) << 4) | (c2 >> 4);
		e3 = ((c2 & 15) << 2) | (c3 >> 6);
		e4 = c3 & 63;

		if (isNaN(c2)) {
			e3 = e4 = 64;
		} else if (isNaN(c3)) {
			e4 = 64;
	}

		result.push(e1, e2, e3, e4);
	}
	
	return result.map(function (e) { return key.charAt(e); }).join('');
}