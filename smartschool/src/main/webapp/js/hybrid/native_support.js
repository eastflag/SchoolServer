// 정광영 
// 네이티브 팝업을 호출하기위한 Wrapper
// 네이티브 확장성을 생각해서 HYBRID로 감쌌음.
//
// [ 설명 ] 
//
// NATIVE : 네이티브와 인터페이스할 js

var NATIVE = function(){
	
	var _CONST_COMMAND_ALERT_TYPE_NORMAL	= 'ALERT';		// Alert Type 
	var _CONST_COMMAND_ALERT_TYPE_CONFIRM	= 'CONFIRM';	// Confirm Type
	var _CONST_COMMAND_GET_PUSH_TOKEN		= 'GET_PUSH_TOKEN'; // 푸시토큰 받기 
	var _CONST_COMMAND_SET_USER_KEY			= 'SET_USER_KEY'; // 사용자 정보 네이티브에 저장하기 
	var _CONST_COMMAND_GET_USER_KEY			= 'GET_USER_KEY'; // 네이티브에 저장되어있는 사용자 키 가져오기 
	var _CONST_COMMAND_GET_USER_KEY_AND_TOKEN = 'GET_USER_KEY_AND_TOKEN'; // 네이티브에 저장되어있는 사용자 정보 및 푸시토큰 데이터 받기 
	var _CONST_COMMAND_EXTERNAL_BROWSER		= 'EXTERNAL_BROWSER';
	var _CONST_COMMAND_GET_GPS_DATA			= "GET_GPS_DATA";
	var _CONST_COMMAND_GET_VERSION_DATA		= "GET_VERSION_DATA";

	/*
	 * NATIVE.HYBRID : HYBRID js
	 */
	var _HYBRID = function() {
		
		var _CONST_SUCCESS 	= 'success';			// 네이티브 결과 파라미터 : success
		var _CONST_ERROR 	= 'error';				// 네이티브 결과 파라미터 : error 또는 cancel
		
		
		var _successCallback 	= undefined;		// 네이티브 결과가 success시 호출될 callback
		var _errorCallback 		= undefined;		// 네이티브 결과가 error 또는 cancel시 호출될 callback
		
		var _isMobile = function(){
			var mobileCheckArr = ['samsung', 'iphone', 'ipod', 'ipad', 'blackberry', 'android', 'windows ce', 'lg', 'mot', 'sonyericsson'];
			for(var i=0; i<mobileCheckArr.length; i++){
				if(navigator.userAgent.toLowerCase().match(mobileCheckArr[i]) != null){
					return true;
				}
			}
			return false;
		}
		
		/*
		 * NATIVE.HYBRID.ALERT
		 * 네이티브의 ALERT DIALOG를 이용한다.
		 * 아직 일반 웹과 네이티브를 분리하지 않아 웹에서는 에러 발생함.
		 *
		 * @param param				: ( *필수* )Json Format Data
		 * @param successCallback 	: ( *옵션* )success일때 호출됨, CONST_ALERT_TYPE_NORMAL은 호출되지 않음 
		 * @param errorCallback 	: ( *옵션* )error 일때 호출됨 
		 * 
		 * [ 사용방법 ]
		 *
		 * [Confirm Type]
		 * NATIVE.HYBRID.EXECUTE({}, function(){ document.info_form.submit(); }, function(){ alert('cancel'); });
		 *
		 * [Alert Type]
		 * NATIVE.HYBRID.EXECUTE({}, undefined, function(){ alert('close'); });
		 *
		 * [ CONST_ALERT_TYPE_NORMAL 의 콜백이 필요하지 않을때 ]
		 * 파라미터를 undefine처리하거나 뒤에있는 파라미터일 경우 파라미터를 제거해도 무방함 
		 *
		 * NATIVE.HYBRID.EXECUTE({}, function(){ document.info_form.submit(); }); 
		 * NATIVE.HYBRID.EXECUTE({});
		 * 
		 */
		var _EXECUTE = function(param, successCallback, errorCallback) {
		
			_successCallback = successCallback;
			_errorCallback = errorCallback;
			
			// 타입이 없는경우 일반 Alert으로 설정한다. 
			if ( param.type == undefined || param.type == '' ) {				
				if ( errorCallback ) {
					errorCallback();
				}
				return;
			}
			
			
			
			if ( _isMobile() ) {
			
				try {
					var sendData = undefined;
					var commandType = param.type;
					
					if ( commandType == _CONST_COMMAND_ALERT_TYPE_NORMAL || commandType == _CONST_COMMAND_ALERT_TYPE_CONFIRM) {
						// 얼럿이나 컨펌창을 보여준다.
						sendData = {
							'type'		: commandType,
							'title' 	: param.title,
							'msg'		: param.msg
						};	
					}
					else if ( commandType == _CONST_COMMAND_SET_USER_KEY ) {
						sendData = {
							'type'		: commandType,
							'home_id'	: param.home_id,
							'mdn'		: param.mdn,
							'isauto'	: param.isauto
						};	
					}
					else if ( commandType == _CONST_COMMAND_GET_PUSH_TOKEN || commandType == _CONST_COMMAND_GET_USER_KEY || commandType == _CONST_COMMAND_GET_USER_KEY_AND_TOKEN ) {
						sendData = {
							'type'		: commandType
						};	
					}
					else if ( commandType == _CONST_COMMAND_EXTERNAL_BROWSER ) {
						sendData = {
							'type'		: commandType,
							'linkType'	: param.linkType,
							'linkParam'	: param.linkParam
						};	
					}
					else {
						// 단순한 type만 보낼것들...
						/*
							commandType == _CONST_COMMAND_GET_PUSH_TOKEN || 
							commandType == _CONST_COMMAND_GET_USER_KEY || 
							commandType == _CONST_COMMAND_GET_USER_KEY_AND_TOKEN ||
							commandType == _CONST_COMMAND_GET_USER_ID
						*/
						sendData = {
							'type'		: commandType
						};
					}
					
					if ( sendData != undefined ) {
						location.href = 'nativecommand://execute?' + JSON.stringify(sendData); // 이부분 해당 스키마로 변경해야함.	
					}
				} catch(e){
					if ( errorCallback ) {
						errorCallback();
					}
				}
			}
		};
		
		
		/*
		 * 네이티브에서 호출한다.
		 */
		var _nativeCallback = function() {
			var param = arguments;
			var code = param[0];
			if ( code != undefined ) {
				
				var resultValue = code.result;
				
				if ( resultValue == _CONST_SUCCESS && _successCallback != undefined ) {
					_successCallback(code);
				}
				else if ( resultValue == _CONST_ERROR && _errorCallback != undefined ) {
					_errorCallback();
				}				
			}
			else {
				if ( _errorCallback != undefined ) {
					_errorCallback();
				}
			}
		};

		return {
			EXECUTE		: _EXECUTE,
			CALLBACK 	: _nativeCallback
		};
	}();
	
	
	return {
		HYBRID								: _HYBRID,
		CONST_COMMAND_ALERT_TYPE_NORMAL 	: _CONST_COMMAND_ALERT_TYPE_NORMAL,
		CONST_COMMAND_SET_USER_KEY 			: _CONST_COMMAND_SET_USER_KEY,
		CONST_COMMAND_ALERT_TYPE_CONFIRM 	: _CONST_COMMAND_ALERT_TYPE_CONFIRM,
		CONST_COMMAND_GET_PUSH_TOKEN		: _CONST_COMMAND_GET_PUSH_TOKEN,
		CONST_COMMAND_SET_USER_KEY 			: _CONST_COMMAND_SET_USER_KEY,
		CONST_COMMAND_GET_USER_KEY			: _CONST_COMMAND_GET_USER_KEY,
		CONST_COMMAND_GET_USER_KEY_AND_TOKEN: _CONST_COMMAND_GET_USER_KEY_AND_TOKEN,
		CONST_COMMAND_EXTERNAL_BROWSER		: _CONST_COMMAND_EXTERNAL_BROWSER,
		CONST_COMMAND_GET_GPS_DATA			: _CONST_COMMAND_GET_GPS_DATA,
		CONST_COMMAND_GET_VERSION_DATA		: _CONST_COMMAND_GET_VERSION_DATA
	};
}();