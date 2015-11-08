/******
		2015.10.05 ~ 
		Simbyungki
						*****/
var winHeight = $(window).height();
var winWindh = $(window).width();
$('document').ready(function(){


});

//footer 영역 이용약관, 개인정보취급방침, 개인정보 활용동의
//aura의 소스 사용 (레이어팝업을 기존 사이트 그대로 사용하기로 함)
function company_info(layerNumber){
	var temp = $('#' + layerNumber);
	var bg = temp.prev().hasClass('popup_bg');//dimmed 레이어를 감지하기 위한 boolean 변수
	if(bg && layerNumber == 'layer1'){
		$('.rules_layout').fadeIn();//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다.
	}else if(bg && layerNumber == 'layer2'){
		$('.policy_layout').fadeIn();
	}else if(bg && layerNumber == 'layer3'){
		$('.consent_layout').fadeIn();
	}else{
		temp.fadeIn();
	}
	
	if(temp.outerHeight() < $(document).height()){
		temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
	}else{
		temp.css('top', '0px');
	}
	
	if(temp.outerWidth() < $(document).width()){
		temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
	}else{
		temp.css('left', '0px');
	}
	temp.find('a.close_btn').click(function(e){
		
		if(bg && layerNumber == 'layer1'){
			$('.rules_layout').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
		}else if(bg && layerNumber == 'layer2'){
			$('.policy_layout').fadeOut();
		}else if(bg && layerNumber == 'layer3'){
			$('.consent_layout').fadeOut();
		}else{
			temp.fadeOut();
		}
		e.preventDefault();
	});
	$('.rules_layout .popup_bg, .policy_layout .popup_bg, .consent_layout .popup_bg').click(function(e){  //배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
		$('.rules_layout, .policy_layout, .consent_layout').fadeOut();
		e.preventDefault();
	});
}

function setPaginationInfo(targetPage, page_size, total){
	var currentPage = targetPage;
	var pageSize = page_size;
	var totalItemCount = total;
	var totalPageCount=1;
	var firstPageNoOnPageList;
	var lastPageNoOnPageList;
	var prevPageNoOnPageList;
	var nextPageNoOnPageList;
	
	if(totalItemCount==0){
		var result = [1,1,1];
		return result;
	} else {
		totalPageCount = parseInt((totalItemCount-1)/pageSize) + 1;
		firstPageNoOnPageList = parseInt((currentPage-1)/pageSize)*pageSize + 1;
		lastPageNoOnPageList = firstPageNoOnPageList+pageSize-1;
		if(lastPageNoOnPageList > totalPageCount){
			lastPageNoOnPageList = totalPageCount;
		}
		prevPageNoOnPageList = firstPageNoOnPageList-pageSize;
		if(prevPageNoOnPageList<1){
			prevPageNoOnPageList=1;
		}
		nextPageNoOnPageList = lastPageNoOnPageList+1;
		if(nextPageNoOnPageList > totalPageCount){
			nextPageNoOnPageList = totalPageCount;
		}
	
		var result = [totalPageCount+2];
		var j=0;
		result[j] = prevPageNoOnPageList;
		j++;
		for(var i=firstPageNoOnPageList; i<=lastPageNoOnPageList; i++){
			result[j]=i;
			j++;
		}
		result[j] = nextPageNoOnPageList;
		return result;
	}
}

//*****************************************************************
//숫자값인지 확인하는 함수
//*****************************************************************
function isInteger(s) {
	var c;
	if (isEmpty(s)) return true;
	for (var i = 0; i < s.length; i++) {
		c = s.charAt(i);
		if (!isDigit(c)) return false;
	}
	return true;
}

function isEmpty(s){
	return ((s == null) || (s.length == 0));
}

function isDigit(c) {
	return ((c >= "0") && (c <= "9"));
}