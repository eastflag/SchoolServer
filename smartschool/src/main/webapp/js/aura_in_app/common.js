/******
		Simbyungki /
		dung8524@naver.com
						*****/
var winHeight = $(window).height();
var winWindh = $(window).width();
$(document).ready(function(){
	//page tab
	$('.main_tab li a').bind('click', function(){
		var i = $('.main_tab li a').index(this);
		$('.main_tab li').removeClass('curr').eq(i).addClass('curr');
	});

});

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
	$('.'+thisClass).fadeIn();
	$('#wrapper #container .load').scrollTop(0);
	$('#wrapper #container .load').css({'overflow':'hidden'});
}
function commonLayerClose(thisClass){
	$('.'+thisClass).fadeOut();
	$('#wrapper #container .load').css({'overflow':'auto'});
}

function animateGrowthDetail(section){
	var diff = 0;
	if(section=='height'){
		diff = 100;
	}else if(section=='weight'){
		diff = 20;
	}
	console.log('diff => '+diff);
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

function slide(object,distance,direction){
	var list = object.find('.swiper-slide');
	console.log('object =>'+object+' ,distance => '+distance+', direction=>'+direction);
}