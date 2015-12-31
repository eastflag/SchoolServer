var UTIL = function() {
	
	/*
	 * 뒤로 이동
	 * index가 있는경우 index만큼 이동함.
	 * UTIL.historyGO(); 
	 */
	var _historyGO = function(index) {
		if ( index == undefined || index == 0 ) {
			history.back();
		}
		else if ( index < 0 ) {
			history.go(index);
		}
	};
	
	var _getDateDays = function(date){
		var dateDays = "";
		var enWeekstr = ['일','월','화','수','목','금','토'];
		
		var temp = date.replace(/[^0-9]/gi,'');
		var year = temp.substr(0,4);
		var month = temp.substr(4,2);
		var day = temp.substr(6,2);
		
		var newDay = new Date(parseInt(year), parseInt(month)-1, parseInt(day));
		
		dateDays = year+"년 "+month+"월 "+day+"일 "+enWeekstr[newDay.getDay()]+"요일";
		
		return dateDays;
	}
	
	var _comma = function(price) {
		var result = "";
		
		price = price.toString();
		if(price==""){
			return "0";
		}
		result = price.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
		return result;
	}
	
	/**
	 * 숫자만 리턴함.
	 * UTIL.getOnlyNumber('a123');
	 */
	var _getOnlyNumber = function(str) {
		return str.replace(/[^0-9]/g, '');
	};
	
	var _numberWithCommas = function(x)
	{
	    var parts = x.toString().split(".");
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    return parts.join(".");
	}
	
	/**
	 * 페이지 전환
	 * UTIL.changePage('/main');
	 */
	var _goPage = function(url) {
		if ( url == undefined || url == '' ) {
			UTIL.alert(LANGUAGE.getText(LANGUAGE.TEXT_URL_UNKNOWN_ERROR));
			return;
		}
		location.href = url;
	};
	
	/**
	 * URL 파라미터 Getter
	 * 주의 : GET방식의 파라미터만 가져올 수 있으며, POST방식은 불가능함.
	 * UTIL.getParam('key');
	 */
	var _getParam = function(valuename) {
        var rtnval;
        var nowAddress = unescape(location.href);
        var parameters = new Array();
        
        parameters = (nowAddress.slice(nowAddress.indexOf("?")+1, nowAddress.length)).split("&");
        
        for(var i=0; i< parameters.length; i++)
        {
            if(parameters[i].indexOf(valuename) != -1){
            
                rtnval = parameters[i].split("=")[1];
                
                if(rtnval == undefined || rtnval == null)
                {
                    rtnval = "";
                }
                return rtnval;
            }
        }   
    };
	
    /**
     * E-Mail 유효성검사
     * UTIL.emailCheck('muskadev@pixelab.co.kr');
     */
	var _emailCheck = function(email)
	{
		var v_re=/^((\w|[\-\.])+)@((\w|[\-\.][^(\.)\1])+)\.([A-Za-z]+)$/;
		
		if(email.search(v_re) != -1) { 		
			return true; 
		} else { 
			return false; 
		}	 
	}
	
	var _phoneCheck = function (phoneNum) {
		var phone = phoneNum
		console.log('email check = ' + phone);
		var reg_phone =/^01[016789]{1}-?[0-9]{3,4}-?[0-9]{4}$/;
		if (!reg_phone.test(phone)) {
			return false;
		} else {
			return true;
		}
	}
	
	/**
	 * 영문 숫자 조합 아이디 체크
	 */
	var _usrIdCheck = function (str){
		var reg1 = /[0-9]/;
		var reg2 = /[a-z]/i;
		var reg3 = /[0-9a-z]/i;

		var number_cnt = 0;
		var alpha_cnt = 0;
		var err_cnt = 0;
		
		for(var i=0;i<str.length;i++){
			if(reg1.test(str.charAt(i))){
				number_cnt++;
			}
			if(reg2.test(str.charAt(i))){
				alpha_cnt++;
			}
			if(!reg3.test(str.charAt(i))){
				err_cnt++;
			}
		}
		
		if(number_cnt==0 || alpha_cnt==0){
			return false;
		} else if(err_cnt >0){
			return false;
		}else{
			return true;
		}
	}
	
	/**
	 * 숫자 체크
	 */
	var _isNumber = function (str){
		var err = 0;
		var reg = /[0-9]/;
		
		for(var i=0;i<str.length;i++){
			if(!reg.test(str.charAt(i))){
				err++;
			}
		}
		
		if(err>0){
			return false;
		} else {
			return true;
		}
	}
	
	/**
	 * 모바일 여부 확인
	 * UTIL.isMobile();
	 */
	var _isMobile = function(){
		var mobileCheckArr = ['samsung', 'iphone', 'ipod', 'ipad', 'blackberry', 'android', 'windows ce', 'lg', 'mot', 'sonyericsson'];
		for(var i=0; i<mobileCheckArr.length; i++){
			if(navigator.userAgent.toLowerCase().match(mobileCheckArr[i]) != null){
				return true;
			}
		}
		return false;
	}
	
	/**
	 * Alert 팝업을 보여준다.
	 * UTIL.alert('noti');
	 */
	var _alert = function(msg, confirmCallback, cancelCallBack) {
		if ( UTIL.isMobile() ) {

			var data = {
				'type' : NATIVE.CONST_COMMAND_ALERT_TYPE_NORMAL,
				'title' : "알림",
				'msg' : msg
			};
			NATIVE.HYBRID.EXECUTE(data, confirmCallback, cancelCallBack);
		}
		else 
		{
			alert(msg);
		}
	};
	
	/**
	 * Confirm 팝업을 보여준다.
	 * UTIL.confirm('noti'); 
	 */
	var _confirm = function(msg, confirmCallback, cancelCallBack) {
		if ( UTIL.isMobile() ) {
			var data = {
				'type' : NATIVE.CONST_COMMAND_ALERT_TYPE_CONFIRM,
				'title' : "알림",
				'msg' : msg
			};
			NATIVE.HYBRID.EXECUTE(data, confirmCallback, cancelCallBack);
		}
		else 
		{
			if ( confirm(msg) ) {
				confirmCallback();
			}
			else {
				cancelCallBack();
			}
		}
	};
	
	/**
	 * 타입을 확인한다.
	 * _typeCheck(value, 'string', 'value');
	 */
	var _typeCheck = function(val, type, valueName){
		var valType = typeof(val);
		var isMatch = valType.toLowerCase() == type.toLowerCase();
		
		if(undefined != valueName && !isMatch){
			console.log('[' + valueName + '] type error. [' + valueName + '] 타입은 [' + valType + '] 입니다. 그것은 [' + type + ']이(가) 되어야 합니다.');
		}
		return isMatch;
	};
	
	/**
	 * 공유하기 
	 * UTIL.shared(공유타입, function(data){}, function(){});
	 */
	var _shared = function(linkType, success, error) {
		var data = {
			'type'		: NATIVE.CONST_COMMAND_EXTERNAL_SHARED,
			'linkType'	: linkType,
			'msg'		: "주식의 정석 공유",
			'linkUrl'	: 'http://allthestock.com/user/index.do' // 나중에 스토어 이동
		};
		NATIVE.HYBRID.EXECUTE(data, success, error);
	};
	
	/**
	 * 단말 타입과 토큰정보 가져오기 
	 */
	var _getDeviceTypeAndToken = function(success, error) {
		var data = {
			'type'		: NATIVE.CONST_COMMAND_GET_DEVICE_TYPE_AND_TOKEN,
		};
		NATIVE.HYBRID.EXECUTE(data, success, error);
	};
	
	/**
	 * 사용자 ID를 가져온다.
	 */
	var _getUserID = function(success, error) {
		var data = {
			'type'		: NATIVE.CONST_COMMAND_GET_USER_ID
		};
		NATIVE.HYBRID.EXECUTE(data, success, error);
	};
	
	/**
	 * 로딩 Dialog를 보여준다.
	 * UTIL.showIndicator();
	 */
	var _showIndicator = function() {
		NATIVE.HYBRID.EXECUTE({'type':NATIVE.CONST_COMMAND_SHOW_LOADING});
	};
	
	/**
	 * 로딩 Dialog를 제거한다.
	 * UTIL.hideIndicator();
	 */
	var _hideIndicator = function() {
		NATIVE.HYBRID.EXECUTE({'type':NATIVE.CONST_COMMAND_HIDE_LOADING});
	};
	
	/**
	 * 자동 로그인 저장
	 * UTIL.setAutoLogin(Y or N);
	 */
	var _setAutoLogin = function(flag) {
		var data = {
			'type':NATIVE.CONST_COMMAND_SET_AUTO_LOGIN,
			'isauto':flag
		};
		NATIVE.HYBRID.EXECUTE(data);
	};

	/**
	 * 로그아웃
	 * UTIL.logout();
	 */
	var _logout = function() {
		NATIVE.HYBRID.EXECUTE({'type' :NATIVE.CONST_COMMAND_USER_LOGOUT});
	};
	
	/**
	 * 친구추가 
	 * UTIL.addFriend();
	 */
	var _addFriend = function(success, cancel) {
		NATIVE.HYBRID.EXECUTE({'type' :NATIVE.CONST_COMMAND_GET_FRIENDS}, success, cancel);
	};
	
	/**
	 * 오디오 사용여부 
	 * UTIL.useAudio(false/true);
	 */
	var _useAudio = function(flag) {
		NATIVE.HYBRID.EXECUTE({'type' :NATIVE.CONST_COMMAND_USE_TTS, 'use':(flag ? 'Y':'N')});
	};
	
	/**
	 * 로그 코드  
	 * UTIL.startWalk(function, function); 
	 */
	var _setLogCode = function(logCode) {
		NATIVE.HYBRID.EXECUTE({'type' :NATIVE.CONST_COMMAND_SET_LOG_CODE, 'code':logCode});
	};
	
	/**
	 * 걷기 시작 
	 * UTIL.startWalk(function, function); 
	 */
	var _startWalk = function(success, cancel) {
		NATIVE.HYBRID.EXECUTE({'type' :NATIVE.CONST_COMMAND_START_STOP_WALK, 'flag':'Y'}, success, cancel);
	};
	
	/**
	 * 걷기 종료 
	 * UTIL.stopWalk(function, function); 
	 */
	var _stopWalk = function(success, cancel) {
		NATIVE.HYBRID.EXECUTE({'type' :NATIVE.CONST_COMMAND_START_STOP_WALK, 'flag':'N'}, success, cancel);
	};
	
	/**
	 * 사용자 키 몸무게
	 * UTIL.setUserStrenght(키, 모무게, function, function);
	 */
	var _setUserStrenght = function(height, weight, success, error) {
		NATIVE.HYBRID.EXECUTE({'type' :NATIVE.CONST_COMMAND_USER_STRENGHT, 'height':(''+height), 'weight':(''+weight)}, success, error);
	};
	
	/**
	 * 사용자 목표 설정
	 * UTIL.setUserGoals(목표걸음, 목표거리, 목표칼로리, function, function); 
	 */
	var _setUserGoals = function(count, kilometer, kcalorie, success, error) {
		NATIVE.HYBRID.EXECUTE({'type' :NATIVE.CONST_COMMAND_SET_USER_GOALS, 'count':(''+count), 'kilometer':(''+kilometer), 'kcalorie':(''+kcalorie)}, success, error);
	}
	
	/**
	 * Session Storage
	 * UTIL.SESSION.....
	 */
	var _session = function(){
        // private variable
		var webStoragePreKey = '_mobile_';
		
		/**
		 * Session Storage Key
		 * 실제 저장되는 Key는 _mobile_이 앞에 붙는다.
		 */
		var _CONST_MEDICAL_FILTER_KEY = 'medical_filter';
		var _CONST_MEDICAL_RESERVATION_KEY = 'medical_reservation';
		var _CONST_SUCCESS_VIEW_KEY	= 'medical_success_view';
		var _CONST_LOGIN_ERROR_KEY	= 'member_login_flag';

		// session storage 가능 여부 체크
		var _sessionStorageCheck = function(){
			if(('sessionStorage' in window) && window['sessionStorage'] !== null){
				return true;
			}
			else{
				UTIL.alert(LANGUAGE.getText(LANGUAGE.TEXT_NOT_SUPPORT_ERROR));
				return false;
			}
		};

		/**
		 * Session Storage에 데이터 Getter/Setter
		 * Getter : UTIL.SESSION.sessionStorage(key);
		 * Setter : UTIL.SESSION.sessionStorage(key, value);
		 */
		var _sessionStorage = function(k, value){
			var key = webStoragePreKey + k;
			
			if(undefined === value){
				return window.sessionStorage[key];
			}
			else{
				if(!_typeCheck(value, 'string', 'value')){
					return;
				}
				window.sessionStorage[key] = value;
			}
			
		};

		/**
		 * Session Storage에 데이터를 삭제한다.
		 * UTIL.SESSION.removeSessionStorage(key);
		 */
		var _removeSessionStorage = function(k){
			if(!_typeCheck(k, 'string', 'session storage key')){
				return;
			}
			var key = webStoragePreKey + k;

			window.sessionStorage.removeItem(key);
		};
		
		// session 외부 접근가능하도록 설정 
		return {
			CONST_MEDICAL_FILTER_KEY	: _CONST_MEDICAL_FILTER_KEY,
			CONST_SUCCESS_VIEW_KEY		: _CONST_SUCCESS_VIEW_KEY,
			CONST_LOGIN_ERROR_KEY		: _CONST_LOGIN_ERROR_KEY,
			CONST_MEDICAL_RESERVATION_KEY : _CONST_MEDICAL_RESERVATION_KEY,
		    sessionStorage          : _sessionStorage,
		    sessionStorageCheck     : _sessionStorageCheck,
		    removeSessionStorage    : _removeSessionStorage
		};
		
    }();
    
    // UTIL 외부 접근 가능하도록 설정 
	return {
		changePage 	: _goPage,
		getOnlyNumber : _getOnlyNumber,
		numberWithCommas : _numberWithCommas,
		historyGO	: _historyGO,
		getParam		: _getParam,
		emailCheck 	: _emailCheck,
		phoneCheck : _phoneCheck,
		isNumber : _isNumber,
		usrIdCheck : _usrIdCheck,
		isMobile		: _isMobile,
		alert		: _alert,
		confirm		: _confirm,
		shared		: _shared,
		getDeviceTypeAndToken : _getDeviceTypeAndToken,
		getUserID	: _getUserID,
		SESSION		: _session,
		showIndicator: _showIndicator,
		hideIndicator:_hideIndicator,
		setAutoLogin : _setAutoLogin,
		logout		: _logout,
		addFriend	: _addFriend,
		useAudio	: _useAudio,
		setLogCode	: _setLogCode,
		startWalk	: _startWalk,
		stopWalk	: _stopWalk,
		setUserStrenght : _setUserStrenght,
		setUserGoals : _setUserGoals,
		getDateDays : _getDateDays,
		comma : _comma
	};
}();