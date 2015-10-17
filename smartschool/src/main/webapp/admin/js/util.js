

//*****************************************************************
//	작성자		: 이동규
//	최종 작성일	: 2012.11.05
//	프로그램명	: util.js
//	설명	    : 공통적인 자바스크립트 유틸리티
//*****************************************************************


var rootPath = "http://192.168.0.12:9000";
//var rootPath = "http://210.127.55.205:9000/ap/";
//var rootPath = "http://192.168.0.198/HealthCare/";

/**
 * 2014.02.10 DongQ 추가
 * Android : 1
 * iPhone  : 2
 * iPad    : 3
 * else    : 4
 */
function getDevice() {
	var UserAgent = navigator.userAgent;
	var res = 0;
	if(UserAgent.match(/Android/i) != null){
		res = 1;
	} else if ( (UserAgent.match(/iPhone/i) != null)){
		res = 2; 
	} else if((UserAgent.match(/iPad/i) != null) ) {
		res = 3;
	} else { // PC
		res = 4;
	}
	return res;
}
	

function fncObjectWrite(id) {
		document.write(id.text);id.id='';
}

//*****************************************************************
//Cookie
//*****************************************************************
var expDays = 1; // 쿠키를 적용할 일수

var page = "popup/event.html";

// 쿠키 종료일
var exp = new Date();
exp.setTime(exp.getTime() + (expDays * 24 * 60 * 60 * 1000));

// 쿠키 값 조회
function GetCookie(name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return getCookieVal(j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0)
			break;
	}
	return null;
}

// 쿠키 설정
function SetCookie(name, value) {
	var argv = SetCookie.arguments;
	var argc = SetCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : false;
	document.cookie = name
			+ "="
			+ escape(value)
			+ ((expires == null) ? "" : ("; expires=" + expires
					.toGMTString()))
			+ ((path == null) ? "" : ("; path=" + path))
			+ ((domain == null) ? "" : ("; domain=" + domain))
			+ ((secure == true) ? "; secure" : "");
}

// 쿠키 삭제
function DeleteCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = GetCookie(name);
	document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

function getCookieVal(offset) {
	var endstr = document.cookie.indexOf(";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

// DONGQ
function checkEventPopup() {
	
	// AJAX로 이벤트 여부 확인
	$.ajax({
		type : "post",
		dataType : "json",
		url : rootPath + "/CheckEvent",
		contentType : 'application/json',
		cache : false,
		success : function(response) {

			// test용 - 항상 뜨게			
//			$("#popup_contents").load(rootPath + page);
//			$("#popup_layer").show();
			if(response.result == 0){
				console.log('event popup success!!!');
				var count = GetCookie('isPopupOpen');

				if (count == null) {
					
					$("#popup_contents").load(rootPath + page);
					$("#popup_layer").show();
					
					count = 1;
					SetCookie('isPopupOpen', count, exp);
				} 
			}
		},
		error : function() {
			alert('Error while request..');
		}
	});
}


function popupHide(Pop) {
	$("#popup_layer").hide();
}

//*****************************************************************
// 숫자값인지 확인하는 함수
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

//*****************************************************************
// 한글과 같이 2byte 문자를 포함하는 문자열의 길이 계산하여 반환하는 함수
//*****************************************************************
 	function calStrLength(str) {
		var tmpStr;
		var strLength;
        tmpStr = str;
       	strLength = calByte(tmpStr);
		return strLength;
	}

	function calByte(byteStr) {
		var tmpStr;
		var temp=0;
		var onechar;
		var tcount;

		tcount = 0;
		tmpStr = new String(byteStr);
		temp = tmpStr.length;

		for(var k=0;k<temp;k++){
			onechar = tmpStr.charAt(k);
			if(escape(onechar).length > 4)
				tcount += 2;
			else //if(onechar!='\r')
           	   	tcount++;
		}
   	    return tcount;
	}

//*****************************************************************
// 문자열의 공백을 모두 제거하여 반환하는 함수
//*****************************************************************
	function removeSpace(str) {
    	var ch;
    	var trimStr = "";

    	for (var i=0;i<str.length;i++) {
        	ch = str.charAt(i);
        	if (ch != " ") trimStr += ch;
    	}
    	return trimStr;
	}

//*****************************************************************
// Email 적합성을 판단하여 반환하는 함수
//*****************************************************************
	function isEmail(str) {
    	var ch;
    	var chk = true;

    	if(str.indexOf('@') == -1) chk = false;
    	else if(str.indexOf('.') == -1) chk = false;
    	else {
    		for (var i=0;i<str.length;i++) {
        		ch = str.charAt(i);
        		if (!isEmailChar(ch)) {
        			chk = false;
        			break;
        		}
    		}
    	}
    	return chk;
	}

	function isEmailChar(ch) {
    	return ( (ch >= 'A' && ch <= 'Z')||(ch >= 'a' && ch <= 'z')||(ch >= '0' && ch <= '9')||(ch == '@')||(ch == '.')||(ch == '_')||(ch == '-') );
	}

//*****************************************************************
// Id validation : 4-12 자리 영문 + 숫자
//*****************************************************************
	function isValidId(pId) {
     	if( (pId.length < 4) || (pId.length > 12) ) chk  = false;
     	else
	     	for (var i=0; i <pId.length ; i++) {
				ch = pId.charAt(i);
        		if ((ch >= "0" && ch <= "9") || (ch >= "a"  && ch <= "z") ||(ch >= "A"  && ch <= "Z")) chk=true;
        		else {
	        		chk = false;
        			break;
        		}
	 		}
     	return chk;
	}

//*****************************************************************
//	ID 중복검사 : InputTag에서 검색할 ID값을 입력받아 팝업창에 결과띄움.
//*****************************************************************
	function idCheck(pId, pFormName, pIdTagName, pIdTag, pIdTagCheck) {
		if(removeSpace(pId) == "") {
			alert(err_msg_id);
			pIdTag.focus();
			return;
		}else if(!isValidId(pId)) {
			alert(err_msg_validId);
			pIdTag.focus();
			return;
		}else
			window.open("idTest?loginId="+pId+"&formName="+pFormName+"&idTagName="+pIdTagName+"&idTagCheck="+pIdTagCheck, info_msg_idcheck, "status=no, width=300, height=150");
	}

//*****************************************************************
// Passsword validation : 4-12 자리 영문 + 숫자
//*****************************************************************
	function isValidPasswd(pPasswd) {
     	if( (pPasswd.length < 4) || (pPasswd.length > 12) ) chk  = false;
     	else
	     	for (var i=0; i < pPasswd.length ; i++) {
				ch = pPasswd.charAt(i);
        		if ((ch >= "0" && ch <= "9") || (ch >= "a"  && ch <= "z") ||(ch >= "A"  && ch <= "Z")) chk=true;
        		else {
        			chk = false;
        			break;
        		}
	 		}
     	return chk;
	}

//*****************************************************************
// Passsword validation : 4-20 자리 영문 + 숫자
//*****************************************************************
	function isValidPasswdChk(pPasswd) {
     	if( (pPasswd.length < 4) || (pPasswd.length > 20) ) chk  = false;
     	else
	     	for (var i=0; i < pPasswd.length ; i++) {
				ch = pPasswd.charAt(i);
        		if ((ch >= "0" && ch <= "9") || (ch >= "a"  && ch <= "z") ||(ch >= "A"  && ch <= "Z")) chk=true;
        		else {
        			chk = false;
        			break;
        		}
	 		}
     	return chk;
	}

//*****************************************************************
// 전화번호 validation : 0 ~ 9, ), - 만 허용
//*****************************************************************
	function isPhoneNumber(pPhoneNumber) {
		var c;
		if (isEmpty(pPhoneNumber)) return true;
		for (var i = 0; i < pPhoneNumber.length; i++) {
        	c = pPhoneNumber.charAt(i);
			if (!isPhoneNum(c)) return false;
		}
		return true;
	}

	function isPhoneNum(ch) {
    	return ( (ch >= '0' && ch <= '9')||(ch == ')')||(ch == '-') );
	}

//*****************************************************************
// AlphaNumeric validation : 영문 , 숫자만 허용
//*****************************************************************
	function isAlphaNumeric(pWord) {
		for (var i=0; i < pWord.length ; i++) {
			ch = pWord.charAt(i);
        	if ((ch >= "0" && ch <= "9") || (ch >= "a"  && ch <= "z") ||(ch >= "A"  && ch <= "Z")) chk=true;
        	else {
        			chk = false;
        			break;
        	}
	 	}
     	return chk;
	}

//*****************************************************************
// 숫자 콤마
//*****************************************************************
	function commaSplit(Ptarget) {
		Ptarget=Ptarget.replace(/,/gi,"")
		var txtNumber = '' + Ptarget;
		var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
		var arrNumber = txtNumber.split('.');
		arrNumber[0] += '.';
		do {
			arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
		} while (rxSplit.test(arrNumber[0]));
		if (arrNumber.length > 1) {
			return arrNumber.join('');
		}
		else {
			return arrNumber[0].split('.')[0];
		}
	}


	function num_check() {
        // ie에서만 작동
        var keyCode = event.keyCode;
        if (keyCode < 48 || keyCode > 57){
                alert("문자는 사용할 수 없습니다.");
                event.returnValue=false;
        }
	}

	function FormatNumber2(num){
        fl="";
        if(isNaN(num)) { alert("문자는 사용할 수 없습니다.");return 0;}
        if(num==0) return num;

        if(num<0){
                num=num*(-1);
                fl="-";
        }else{
                num=num*1;
        }
        num = new String(num);
        temp="";
        co=3;
        num_len=num.length
        while (num_len>0){
                num_len=num_len-co
                if(num_len<0){co=num_len+co;num_len=0;}
                temp=","+num.substr(num_len,co)+temp;
        }
        return fl+temp.substr(1);
	}

	function FormatNumber3(num){
	        num=new String(num);
	        num=num.replace(/,/gi,"");
	        return FormatNumber2(num);
	}

	function FormatNumber4(num){
	        num=new String(num);
	        num=num.replace(/,/gi,"");
	        return num;
	}


    function isFloat(str){
    	var c;
    	var point = 0;

    	if (isEmpty(str)) return true;
    	for (var i = 0; i < str.length; i++)
    	{
        	c = str.charAt(i) ;

            if (c==".")
            {
                point+=1;
                continue;
            }

    		if (!isDigit(c) ) return false;
    	}

    	if(point == 1 && c==".")
    	{
    	    return false;
    	}

    	if (point <= 1)
    	{
    	    return true;
    	}
    	else
    	{
    	    return false;
    	}
    }
	function trim(str) {

	    if (str.length < 1) return "";

	    if (str.charAt(0) == ' ') // 왼쪽 공백 제거
	        str = trim(str.substring(1, str.length));

	    if (str.charAt(str.length-1) == ' ') // 오른쪽 공백 제거
	        str = trim(str.substring(0, str.length-1));

	    return str;
	}
//*****************************************************************
// 조회 기간 체크
//*****************************************************************
	function checkPeriod(tmpStartDate,tmpEndDate) {
	    // 검색 시작일
	    var m_Startyear  = tmpStartDate.substring(0,4);
	    var m_Startmonth = tmpStartDate.substring(5,7);
	    var m_Startday   = tmpStartDate.substring(8,10);

	    // 검색 종료일
	    var m_Endyear    = tmpEndDate.substring(0,4);
	    var m_Endmonth   = tmpEndDate.substring(5,7);
	    var m_Endday     = tmpEndDate.substring(8,10);

	    var dateStartTime = new Date(m_Startyear, m_Startmonth, m_Startday);
	    var dateEndTime   = new Date(m_Endyear, m_Endmonth, m_Endday);
	    var timeStartTime = dateStartTime.getTime();
	    var timeEndTime   = dateEndTime.getTime();

	    if (timeStartTime > timeEndTime)
	    {
	        return false;
	    }
	    return true;
	}
//*****************************************************************
// 특수문자 걸러내기 
// 사용법 if(!isProper(A,B,C)) return;
// 		A = input 태그의 name  예) document.eplayParticipantList.keyId
// 		B = 입력필드명 예)"관계자명"
//		C = input 태그의 value 예) document.eplayParticipantList.keyId.value
//   EX) if(!isProper(document.eplayParticipantList.keyId,"관계자ID",document.eplayParticipantList.keyId.value)) return;  
//*****************************************************************
	function isProper(formInputId,formInputName,str) {
    	var ch;
		for (var i=0;i<str.length;i++) {
    		ch = str.charAt(i);
    		if (ch=="'"
				|| ch=="%"
				|| ch=="^" 
				|| ch=="&"
				|| ch=="#"
				|| ch=="@" 
				|| ch=="*"){
				
				alert( formInputName+" 검색 내용으로 특수문자를 사용할 수 없습니다.");
		    	formInputId.focus();
		    	return false;
		    }
		}
		return true;
		
	}
	function isProperInput(formInputId,formInputName,str) {
    	var ch;
		for (var i=0;i<str.length;i++) {
    		ch = str.charAt(i);
    		if (ch=="'"
				|| ch=="%"
				|| ch=="^" 
				|| ch=="&"
				|| ch=="#"
				|| ch=="@" 
				|| ch=="*"){
				
				alert( formInputName+" 입력값으로 특수문자를 사용할 수 없습니다.(%, ^, &, #, @, *)");
		    	formInputId.focus();
		    	return false;
		    }
		}
		return true;
		
	}
//------------------------------------------------------------------------
// 해당 문자열을 지정된 bytes 수 만큼만 잘라낸다.
// (한글과 같은 2 Byte 문자는 지정된 Byte 가 넘을 경우 잘릴수도 있음)
//
//   ARGUMENTS
//      str = 대상문자열
//      len = 잘라낼 Byte 수 (한글은 2byes 처리함)
//
//   RETURN
//      처리된 문자열
//
//------------------------------------------------------------------------
	function charCutBytes(str, len) {
		var byteLength = 0;
		var result = '';
		
		for (var inx = 0; inx < str.length; inx++) {
			var oneChar = escape(str.charAt(inx));
			if ( oneChar.length == 1 ) {
				byteLength ++;
			} else if (oneChar.indexOf("%u") != -1) {
				byteLength += 2;
			} else if (oneChar.indexOf("%") != -1) {
				byteLength += oneChar.length/3;
			}
			
			// bytes 길이를 넘어버리면 마지막 글자는 넣지않고 리턴한다.
			if( byteLength > len )		break;
			
			result += str.charAt(inx);
			
			if( byteLength == len )	break;
		}
		
		return result;
	}
	

/***********************************************
 * IP 유효성 체크
 * ---------------------------------------------
 *  정상적인 IP인지 체크
 * 정상 예1) 222.107.254.169
 * 정상 예2) 222.7.54.69
 * 비정상 예1) 022.107.254.169
 * 비정상 예2) 222107.254.169
 * 비정상 예3) 222.107.254.1699
 * 비정상 예4) 222.107.254.
 * 비정상 예5) 222.107.254
 * 비정상 예6) 222.107.254.169:80
 **********************************************/
	function checkIP(strIP) {
	    var expUrl = /^(1|2)?\d?\d([.](1|2)?\d?\d){3}$/;
	    return expUrl.test(strIP);
	}
	
	function doMouseOverOnTR(trObject) {
		trObject.style.backgroundColor='#FFEEEE';
	}

	function doMouseOutOnTR(trObject) {
		trObject.style.backgroundColor='';
	}
	
	function viewFile(doc_url)
	{
	    window.open(doc_url, "viewFile","status=no,top=0, left=0, width=619,height=680", scrolling="auto");
	}

	function checkDocNum(strDocNum) {		
		//check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/;
	    var expUrl = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]{2,5}\-\d{4}\-\d{3}$/;
	    return expUrl.test(strDocNum);
	}

	function checkDateFormat(strDate) {	
	    var expUrl = /^(19|20)\d{2}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[0-1])$/;
	    return expUrl.test(strDate);
	}


	function ButtonProcessingSmall(form)
	{
	    try{
	        oPopup = window.createPopup();
	        var  oPopBody  =  oPopup.document.body;
	        oPopBody.style.backgroundColor  =  "white";
	        oPopBody.style.border  =  "solid  #dddddd 1px";
	
	        // "처리중입니다"라는 메시지와 로딩이미지가 표시되도록 한다.
	        oPopBody.innerHTML  = "<body onLoad='self.focus();window.onblur=function(){window.focus()}'>"
	                            + "<table width='100%' height='100%'>"
	                            +     "<tr><td align='center' style='font-size:9pt;'>"
	                            +       "처리중입니다. 잠시만 기다려주세요...<br>"
	                            +       "<img src='../images/loading.gif'>"
	                            +     "</td></tr>"
	                            + "</table>"
	                            + "</body>";
	
	        var leftX = document.body.clientWidth/2 - 130;
	        var topY = (document.body.clientHeight/2) - (oPopBody.offsetHeight/2) - 30;
	        oPopup.show(leftX,  topY,  260,  150,  document.body);
	
	        // createPopup()를 이용해 팝업페이지를 만드는 경우
	        // 기본적으로 해당 팝업에서 onblur이벤트가 발생하면 그 팝업페이지는 닫히게 됩니다.
	
	        // 해당 팝업페이지에서 onblur이벤트가 발생할때마다  메소드를 재호출하여
	
	        // 팝업페이지가 항상 표시되게 합니다.
	        oPopBody.attachEvent("onblur", ButtonProcessing);
	    }
	    catch(e) {}
	}
	
	
//----------------------------------------------------------------------------
// 입력문자열을 3자리마다 콤마(,) 를 삽입하여 리턴한다. (moneyType)
//
//	ARGUMENTS
//		str : 문자열
//
//	RETURN
//		retValue : 처리된 문자열
//---------------------------------------------------------------------------*/
function cm_moneyStrForm(obj){
	var str = ""+obj.value+"";
	str = cm_commaCut(str);
	var retValue = "";
	var number = new Number(str);

	// 음수인 경우 "-" 제거하고 "," 처리
	if( number < 0 ) str = str.substring(1);

	for(var i=0; i<str.length; i++){
		if(i > 0 && (i%3)==0){
			retValue = str.charAt(str.length - i -1) + "," + retValue;
		}else{
			retValue = str.charAt(str.length - i -1) + retValue;
		}
	}

	// 음수인 경우 "-"를 붙혀준다.
	if( number < 0 ) retValue = "-" + retValue;

	//return retValue;
	obj.value = retValue;
}
function cm_moneyStrForm2(str){
	str = ""+str+"";
	var retValue = "";
	var number = new Number(str);

	// 음수인 경우 "-" 제거하고 "," 처리
	if( number < 0 ) str = str.substring(1);

	for(var i=0; i<str.length; i++){
		if(i > 0 && (i%3)==0){
			retValue = str.charAt(str.length - i -1) + "," + retValue;
		}else{
			retValue = str.charAt(str.length - i -1) + retValue;
		}
	}

	// 음수인 경우 "-"를 붙혀준다.
	if( number < 0 ) retValue = "-" + retValue;

	return retValue;
}


//----------------------------------------------------------------------------
// 입력된 문자열의 ','를 없앤 문자열을 리턴한다.
//
//	ARGUMENTS
//		money : 문자열 (moneyType)
//
//	RETURN
//		처리된 문자열
//---------------------------------------------------------------------------*/
function cm_commaCut(money) {
	if(money == '') return '';
	return money.split(",").join("");
}

// 마이너스(-) 입력가능
function cm_onlyNumberInput2(obj) {

	if(  ( (event.keyCode<48)||(event.keyCode>57) || event.shiftKey )
		&& event.keyCode != 8
		&& event.keyCode != 9
		&& event.keyCode != 13
		&& event.keyCode != 16
		&& event.keyCode != 17
		&& event.keyCode != 18
		&& event.keyCode != 19
		&& event.keyCode != 20
		&& event.keyCode != 21
		&& event.keyCode != 25
		&& event.keyCode != 27
		&& event.keyCode != 33
		&& event.keyCode != 34
		&& event.keyCode != 45
		&& event.keyCode != 46
		&& event.keyCode != 91
		&& event.keyCode != 93
		&& event.keyCode != 144
		&& event.keyCode != 145
		&& event.keyCode != 173
		&& event.keyCode != 174
		&& event.keyCode != 175
		&& event.keyCode != 189
		&& event.keyCode != 109
		&& !( event.keyCode >= 112 && event.keyCode <= 123 )
		&& !( event.keyCode >= 96 && event.keyCode <= 105 )
		&& !( event.keyCode >= 35 && event.keyCode <= 40 ) ) {

		if (!obj.readOnly)
		{
		    alert("숫자만 입력해 주십시오!");
		}
		event.returnValue=false;
		return false;
	}

	event.returnValue = true;
	return true;
}
function cm_onlyNumberInput3(obj) {

	if(  ( (event.keyCode<48)||(event.keyCode>57) || event.shiftKey )
		&& event.keyCode != 8
		&& event.keyCode != 9
		&& event.keyCode != 13
		&& event.keyCode != 16
		&& event.keyCode != 17
		&& event.keyCode != 18
		&& event.keyCode != 19
		&& event.keyCode != 20
		&& event.keyCode != 21
		&& event.keyCode != 25
		&& event.keyCode != 27
		&& event.keyCode != 33
		&& event.keyCode != 34
		&& event.keyCode != 45
		&& event.keyCode != 46
		&& event.keyCode != 91
		&& event.keyCode != 93
		&& event.keyCode != 144
		&& event.keyCode != 145
		&& event.keyCode != 173
		&& event.keyCode != 174
		&& event.keyCode != 175
		&& event.keyCode != 189
		&& event.keyCode != 109
		&& !( event.keyCode >= 112 && event.keyCode <= 123 )
		&& !( event.keyCode >= 96 && event.keyCode <= 105 )
		&& !( event.keyCode >= 35 && event.keyCode <= 40 ) ) {

		if (!obj.readOnly)
		{
		    alert("숫자만 입력해 주십시오!");
		}
		event.returnValue=false;
		return false;
	}

	event.returnValue = true;
	return true;
}
	function onlyNumDecimalInput(){
	 var code = window.event.keyCode;
	  if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105) || code == 110 || code == 190 || code == 8 || code == 9 || code == 13 || code == 46){
	  window.event.returnValue = true;
	   return;
	  }
	  window.event.returnValue = false;
	}
	

	function getSelectedValueRadio(str) {
    	var rtStr = "";

    	for (var i=0; i<document.getElementsByName(str).length;i++) {
    		if (document.getElementsByName(str)[i].checked) {
    			rtStr = document.getElementsByName(str)[i].value;
    			break;
    		}
    	}
    	return rtStr;
	}
	
	/**
	 * 요일 리턴 함수
	 */
	function getDay(idx){
		var str='';
		switch (idx) {
		case '1':
			str = '(월)'; 
			break;
		case '2':
			str = '(화)'; 
			break;
		case '3':
			str = '(수)'; 
			break;
		case '4':
			str = '(목)'; 
			break;
		case '5':
			str = '(금)'; 
			break;
		default:
			str = '( )'; 
			break;
		}
		return str;
	}
	
	/**
	 * 날짜 포맷 - 급식 정보에서 사용
	 * XXXX년 YY월 ZZ일 (W)
	 */
	
	function getFullDateString (pDateStr) {
		var week = new Array('일', '월', '화', '수', '목', '금', '토');
		
		var yFullDateString = parseInt(pDateStr.substring(0,4), 10);
		var mFullDateString = parseInt(pDateStr.substring(4,6), 10);
		var dFullDateString = parseInt(pDateStr.substring(6)  , 10);
		
		var tmpObjDate = new Date(yFullDateString, mFullDateString -1 , dFullDateString); 
		
		return yFullDateString + "년 " + mFullDateString + "월 " + dFullDateString + "일 (" + week[tmpObjDate.getDay()] + ")";
	}
	
	/*
	 * Ranking 증.감 반환
	 * @return str
	 * */
	function getChangeRank(rank, beforeRank){
		var numRank = rank*1;
		var numBeforeRank = beforeRank*1;
		var rStr='';
		
		if(numRank < numBeforeRank){
			rStr = '▲'+(numBeforeRank - numRank);
		}else if(numRank > numBeforeRank){
			rStr = '▼'+(numRank - numBeforeRank);
		}else{
			rStr = '-';
		}
		
		return rStr;
	}