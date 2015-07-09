<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%

	String pType = request.getParameter("p") == null ? "height" : request.getParameter("p");
	String pUserId = request.getParameter("member_id");
	String pToken = request.getParameter("token");
	String isUpdate = (String)request.getAttribute("isUpdate");

	String pUserName = (String)request.getAttribute("userName");
	String pUserSex = (String)request.getAttribute("userSex");
	String pUserSexStr = "";

	if (pUserSex != null && "M".equals(pUserSex)) {
		pUserSexStr = "군의";
	} else if (pUserSex != null && "F".equals(pUserSex)) {
		pUserSexStr = "양의";
	} else {
		pUserSexStr = "님의";
	}		
	
%>
<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"/>
    <title>health care</title>

	<link rel="Stylesheet" href="/css/health-care.css" />
	<link rel="Stylesheet" href="/css/jquery.mobile.structure-1.3.2.css" />
	<link rel="Stylesheet" href="/css/basic.css" />
	<link rel="stylesheet" href="/css/jquery.jqplot.min.css">
	
	<script type="text/javascript" src="/js/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="/js/jquery.mobile-1.3.2.min.js"></script>
	<script type="text/javascript" src="/js/swipe.js"></script>
	<script type="text/javascript" src="/js/jquery.mobile.simpledialog2.min.js"></script>
	<script type="text/javascript" src="/js/jquery.jqplot.min.js"></script>
  	<script type="text/javascript" src="/js/util.js"></script>
	<script class="include" type="text/javascript" src="/plugins/jqplot.barRenderer.min.js"></script>
	<script class="include" type="text/javascript" src="/plugins/jqplot.pointLabels.min.js"></script> 
	<script class="include" type="text/javascript" src="/plugins/jqplot.categoryAxisRenderer.min.js"></script> 
	<script class="include" type="text/javascript" src="/plugins/jqplot.highlighter.min.js"></script>
	
	<!--[if IE]><script type="text/javascript" src="./js/excanvas.js"></script><![endif]-->
	
	<!--[if lt IE 9]>
	<script src="./js/html5shiv.js"></script>
	<![endif]-->
	
	<script type="text/javascript">
		$.ajaxSetup ({
			cache: false
		});

	  	var deviceType = getDevice();
	</script>
	
	<style>
	/* 동적으로 생성하는 태그에 css를 적용하는것이라 분리하면 속성 적용이 안되어 style 태그 생성하였습니다. -yongH- */
	
	/* 신장 팝업 */
	.popup #cm_pop_header{
		font-weight:bold;font-family:'MalgunGothicBold';text-align:center;	
	}
	.popup .cm_popImage1{
		float:left;
		margin-left:2.3em;
		width:45px;
		height:62px;
	}
	.popup .cm_popImage2{
		float:right;
		margin-right:2.3em;
		width:53px;
		height:57px;
	}
	.popup .cm_popText1{
		clear:both;
		float:left;
		color:#eb2b2a;
		font-weight:bold;
		margin:0.4em 0 0 0.9em;
	}
	.popup .cm_smallText1{
		clear:both;
		float:left;
		margin:0.1em 0 0 -0.4em;
		color:#464646;
	}
	.popup .cm_popText2{
		float:right;
		color:#eb2b2a;
		font-weight:bold;
		margin:0.4em 1.2em 0 0;
		text-align:center;
	}
	.popup .cm_smallText2{
		clear:both;
		float:right;
		margin:0.1em 0.3em 0 0;
		color:#464646;
	}
	/* 체중 팝업 */
	.popup #kg_pop_header{
		font-weight:bold;font-family:'MalgunGothicBold';text-align:center;	
	}
	.popup .kg_popImage1{
		float:left;
		margin-left:2.3em;
		width:55px;
		height:60px;
	}
	.popup .kg_popImage2{
		float:right;
		margin-right:2.3em;
		width:53px;
		height:57px;
	}
	.popup .kg_popText1{
		clear:both;
		float:left;
		color:#eb2b2a;
		font-weight:bold;
		margin:0.4em 0 0 1.3em;
	}
	.popup .kg_smallText1{
		clear:both;
		float:left;
		margin:0.1em 0 0 0.5em;
		color:#464646;
	}
	.popup .kg_popText2{
		float:right;
		color:#eb2b2a;
		font-weight:bold;
		margin:0.4em 1.2em 0 0;
		text-align:center;
	}
	.popup .kg_smallText2{
		clear:both;
		float:right;
		margin:0.1em 0.5em 0 0;
		color:#464646;
	}
	#chart_datail_info{
		position:relative;
		border:1px double rgb(175, 204, 18);
		line-height:24px;
		margin:1em 1em 0 1em;
		color:#444444;
		font-weight:bold;
		text-align:right;
		padding-right:1.5em;
	}
	</style>
</head>
<%
	if(isUpdate.equals("Y")) {
%>
<body>
		<div style='text-align:center;margin-top:20%;'>
    	어플리케이션이 업데이트 되었습니다.<br>
    	반드시 업데이트 후 사용이 가능합니다.<br><br>
    	아래 링크를 누르시면<br>
    	업데이트 페이지로 이동합니다.<br><br>
    	<a href="http://play.google.com/store/apps/details?id=kr.co.aura.mtelo.healthcare" target="_blank">구글 스토어로 이동</a>
    	</div>
</body> 
</html>
<%
	} else {
%>
<body>
<div data-role="page" id="height_page">
 	<div data-role="header" data-theme="a">
 		<div class="ui-bar ui-bar-c">
            <table><tr>
				<td class="t_left">
					<a href="javascript:pSwipe.prev()">
						<img src="/images/common/arrow_left.png" class="imgsl"></a>
				</td>
				<td class="t_center" >
					<div id="title">
					</div>
				</td>
				<td class="t_right">
					<a href="javascript:pSwipe.next()">
						<img src="/images/common/arrow_right.png" class="imgsl"></a>
				</td>
			</tr></table>
        </div>
 		<div class="ui-btn-right">
			<a href="javascript:setDetail()">
				<div id="_detail">
					<img src="/images/common/detail.png" >
				</div>
			</a>
 		</div>
 	</div>
 	<div data-role="content">
 		<div class="rollingCircle" id="circleLocation">
			<a href="javascript:pSwipe.slide(0)" class="on"><span></span></a>
			<a href="javascript:pSwipe.slide(1)"><span></span></a>
			<a href="javascript:pSwipe.slide(2)"><span></span></a>
			<a href="javascript:pSwipe.slide(3)"><span></span></a>
			<a href="javascript:pSwipe.slide(4)"><span></span></a>
			<a href="javascript:pSwipe.slide(5)"><span></span></a>
		</div>
 		<div id="pSwipe" class="swipe">
			<div class="swipe-wrap">
				<div></div><div></div><div></div><div></div><div></div><div></div>
			</div>
 		</div>
 	</div>


<script type="text/javascript">

	var pType = "<%= pType%>";

	var pTypes = [
		{"name":"height",	isFirst: true, hname: "신장",		detail: "h"},
		{"name":"weight",	isFirst: true, hname: "체중",		detail: "w"},
		{"name":"bmi",		isFirst: true, hname: "체형", 		detail: "b"},
		{"name":"smoke",	isFirst: true, hname: "흡연지수"},
		{"name":"rank",		isFirst: true, hname: "랭킹"},
		{"name":"score",	isFirst: true, hname: "성장점수"}
	];
	var pageIndex = 0;
	for(var i=0; i<pTypes.length; i++){
		if(pTypes[i].name == pType){
			pageIndex = i;
			break;
		}
	}

	$('#height_page').on('pageshow',function(){
		//var the_height = ($(window).height() - $(this).find('[data-role="header"]').height() - $(this).find('[data-role="footer"]').height());
		//the_height -= 55;
		var the_height = 500;
	    $(this).height($(window).height()).find('.swipe-wrap div').height(the_height);

		window.pSwipe = Swipe(document.getElementById('pSwipe'), {
			startSlide: pageIndex,
			//auto: 1000,
			continuous: true,
			disableScroll: false,
			stopPropagation: false,
			callback: function(idx, element) {
			},
			transitionEnd: function(idx, element) {
				initPage(idx);
			}
		});

		initPage(pageIndex);
		//금연 도움 사이트 닫기 이벤트
		$(document).on("vmousedown", "#_smoke_sub img", function(evt){
			var idx = $(this).attr('data-href');
			$(this).attr({src: "/images/common/smoke"+idx+"_on.png"});
		});

		$(document).on("vmouseup", "#_smoke_sub img", function(evt){
			var idx = $(this).attr('data-href');
			$(this).attr({src: "/images/common/smoke"+idx+"_off.png"});
		});
		//상세이력 가기 버튼 이벤트
		$(document).on("vmousedown", "#_detail img", function(evt){
			var idx = $(this).attr('data-href');
			$(this).attr({src: "/images/common/detail_on.png"});
		});

		$(document).on("vmouseup", "#_detail img", function(evt){
			var idx = $(this).attr('data-href');
			$(this).attr({src: "/images/common/detail.png"});
		});
		//신장 상세이력 닫기 버튼 이벤트
		$(document).on("vmousedown", "#sub_height .sub_button", function(evt){
			$(".sub_button").css("background", "url('/images/common/button_on.png') no-repeat center top");
		});

		$(document).on("vmouseup", "#sub_height .sub_button", function(evt){
			$(".sub_button").css("background", "url('/images/common/button_off.png') no-repeat center top");
		});

		//체중 상세이력 닫기 버튼 이벤트
		$(document).on("vmousedown", "#sub_weight .sub_button", function(evt){
			$(".sub_button").css("background", "url('/images/common/button_on.png') no-repeat center top");
		});

		$(document).on("vmouseup", "#sub_weight .sub_button", function(evt){
			$(".sub_button").css("background", "url('/images/common/button_off.png') no-repeat center top");
		});

		//금연도움 사이트 클릭이벤트
		$(document).on("vmousedown", "#_smoke_sub .sub_button", function(evt){
			$(".sub_button").css("background", "url('/images/common/button_on.png') no-repeat center top");
		});

		$(document).on("vmouseup", "#_smoke_sub .sub_button", function(evt){
			$(".sub_button").css("background", "url('/images/common/button_off.png') no-repeat center top");
		});

		$(document).on("vmousedown", ".footer table", function(){
			$(this).css("background-color", "#29B6B2");
		});

		$(document).on("vmouseup", ".footer table", function(){
			$(this).css("background-color", "#46d7c6");
		});

		// $(this).height($(window).height()).find('[data-role="content"]').height(the_height);
	});

	function initPage(idx){
		//DongQ
		
		if (deviceType != "1") {
			parent.subChart_index = idx;
			parent.isLocSubChart = false;
		}
		
		//--------------------------------
		// alert($.mobile.activePage.attr("id"));
		$("#circleLocation a").removeClass('on').eq(idx).addClass('on');
		typeObj = pTypes[idx];
		if(typeObj.isFirst){
			$("#pSwipe > .swipe-wrap > div:eq("+idx+")").load("/HealthCare/subHtml.html #_"+typeObj.name, function(){
          		// 해당페이지가 로드되고 나서 데이터 바인딩
          		setDataPage(idx);
			});
			typeObj.isFirst = false;
		}
		$(".ui-simpledialog-container").hide();
		if(typeObj.detail){
			$(".ui-btn-right").show();
		}else{
			$(".ui-btn-right").hide();
		}
		$("#title").text(typeObj.hname);

		$("#dialog").on("touchmove",function(){return false;});

		//page가 변경될때 마다 index_web에 aside를 같이 변경 해 주기위해 함수 호출
		
		if (deviceType != "1") {
			parent.changeItemInfo(idx);
		}
		
	}

	// END 초기 설정 *******************************************************************************
	function setDataPage(idx){
		switch(idx){
			case 0: setUserData("GetHeight", setHeight);			break; //신장
			case 1: setUserData("GetWeight", setWeight);			break;// 체중
			case 2: setUserData("GetBmi", setBMI);					break;// BMI
			case 3: setUserData("GetSmoke", setSmoke);				break;// 흡연지수
			case 4: setRankDataPage(0);								break;// 랭킹
			case 5: setUserData("GetScore", setScore);				break;// 성장점수
		}
	}
	function setDetailPage(idx){
		
		switch(idx){
			case 0: setUserData("GetHeightHistory", subDetail);		break;// 신장이력	
			case 1: setUserData("GetWeightHistory", subDetail);		break;// 체중이력	
		}
	}
	// DongQ
	var selYearStr = "";
	var selYearOrgIndex = 0;
	function setDetailYearPage(selYear){
		
		setInitYearDataArray();
		selYearStr = selYear;
		
		if (selYear != 'yearSelect') {
			switch(chart_index){
				case 0: setUserYearData("GetHeightHistoryYear", selYear, subDetailYear); break;// 신장이력	
				case 1: setUserYearData("GetWeightHistoryYear", selYear, subDetailYear); break;// 체중이력
				case 2: setUserYearData("GetBmiHistoryYear",    selYear, subDetailYear); break;
			}
		}
	}

	var rankDataPageScale = 'class';
	var reloadRankingIdx = 0;
	function setRankDataPage(idx){
		
		if(rankDataPageScale == 'school'){
			switch(idx){
				case 0: setUserData("GetRankingOfHeightPerSchool", setRank);		break;// 신장 행킹
				case 1: setUserData("GetRankingOfWeightPerSchool", setRank);		break;// 체중 랭킹	
				case 2: setUserData("GetRankingOfBmiPerSchool", setRank);		break;// BMI 랭킹	
			}
		}else{
			reloadRankingIdx = idx;
			switch(idx){
				case 0: setUserData("GetRankingOfHeightPerClass", setRank);		break;// 신장 행킹
				case 1: setUserData("GetRankingOfWeightPerClass", setRank);		break;// 체중 랭킹	
				case 2: setUserData("GetRankingOfBmiPerClass", setRank);		break;// BMI 랭킹	
			}
		}
		
	}

// data 바인딩 *******************************************************************************

$.jqplot.config.enablePlugins = true;
if(typeof chart_option == "undefined"){chart_option={};}
// option value 

// {
// colors : ["#3fc6f3", "#a4da00", "#febd01"],
// term : 500,
// count : 10,
// label:false
// }
//기본 차트
chart_option = function(opt){
	this.opt = opt;
	var option={
			animate : true,
	        seriesDefaults:{
	        	pointLabels: {
                    show: typeof this.opt.label == "undefined" ? true : this.opt.label
                },
	        	renderer:$.jqplot.BarRenderer,shadow:false,showHighlight:false,
	            rendererOptions:{barWidth:30,barPadding:-30,barMargin:0,highlightMouseOver:false}
	        },
	        axes:{xaxis:{renderer:$.jqplot.CategoryAxisRenderer}},
	        grid:{borderWidth:0,drawGridlines:false,shadow:false,backgroundColor:"#ffffff"},
	        series:[]
	    };

	    if(typeof this.opt.yaxis != "undefined"){
	    	option.axes.yaxis = this.opt.yaxis;
	    }

	option.series = this.setSeries();

	return option;
};
chart_option.prototype={
	setSeries: function(){
		var series = [];

		this.opt.colors = this.opt.colors || ["#fc7736", "#a4da00", "#febd01", "#558ED5", "#3fc6f3"];
		var count = this.opt.count || this.opt.colors.length;
		var speed = 1500;
		for(var i=0; i<count; i++){
			var sopt = {rendererOptions:{animation:{speed: speed},color: this.opt.colors[i%this.opt.colors.length] }};
			series.push(sopt);
			speed += this.opt.term || 0;
		}
		return series;
	}
};

var vMe 	= new Array("0","0","0","0");
var vClass 	= new Array("0","0","0","0");
var vLocal 	= new Array("0","0","0","0");
var vSchool = new Array("0","0","0","0");
var vMonth 	= new Array("01","02","03","04","05","06","07","08","09","10","11","12"); // DongQ
var vM 		= new Array("A","A","A","A");

var vMeYear      = new Array("0","0","0","0","0","0","0","0","0","0","0","0");
var vMYear       = new Array("0","0","0","0","0","0","0","0","0","0","0","0");
var vClassYear 	 = new Array("0","0","0","0","0","0","0","0","0","0","0","0");
var vLocalYear 	 = new Array("0","0","0","0","0","0","0","0","0","0","0","0");
var vSchoolYear  = new Array("0","0","0","0","0","0","0","0","0","0","0","0");

var vMeYearBmi     = new Array("-","-","-","-","-","-","-","-","-","-","-","-");
var vMyPercFatYear = new Array("-","-","-","-","-","-","-","-","-","-","-","-");
var vMyMsGradeStr  = new Array("-","-","-","-","-","-","-","-","-","-","-","-");

var month = new Array("-","-","-","-");
var yearArr = new Array(); // DongQ 2014.03,07 측정 연도별 조회를 위해 추가
var year = ""; // DongQ 2014.03,07 측정 연도별 조회를 위해 추가

//이력 차트 월별 
chart_option2 = function(opt){
	this.opt = opt;
	//var ticks = [[1, yearArr[0] + '.' + month[0]],[2,  yearArr[1] + '.' + month[1]],[3,  yearArr[2] + '.' + month[2]],[4,  yearArr[3] + '.' + month[3]]];
	var ticks = [[1, vM[0]], [2, vM[1]], [3, vM[2]], [4, vM[3]]];
	var option={
			animate : true,
			animateReplot: true,
			legend: {
                show: false,
                location: 'se',
            },
			seriesDefaults: {
                pointLabels: { show: true}, 
                renderer:$.jqplot.BarRenderer,
                showHighlight:false,
                shadow: false,
                yaxis: 'yaxis',
                rendererOptions:{
                //	barDirection:'horizontal',                	   
                //	barPadding:0,
                //	barMargin:-5,  // 표준선 낮게 나오는 문제 수정을 위해 DongQ가 주석처리.
                	highlightMouseOver:true
            	}
            },			
	        axes:{xaxis:{
	        		ticks: ticks,
	        		tickInterval: 1,
                    drawMajorGridlines: false,
                    drawMinorGridlines: true,
                    drawMajorTickMarks: false,
                    rendererOptions: {
                        tickInset: 0.8,
                        minorTicks: 1
                    }
	        	//	renderer:$.jqplot.CategoryAxisRenderer
	        	},
	        		yaxis: {
	        			    tickOptions: {
                            formatString: "%d",
                            showGridline: false 
                        },rendererOptions: {
                            alignTicks: true,
                            forceTickAt0: true
                        }
                        // autoscale: true
                    }
                }, 
                highlighter: {
                	show: true
            },
	        grid:{borderWidth:0,drawGridlines:false,shadow:false,backgroundColor:"#ffffff"}	        
	    };

	    if(typeof this.opt.yaxis != "undefined"){
	    	option.axes.yaxis = this.opt.yaxis;
	    }

	option.series = this.setSeries();

	return option;
};

chart_option2.prototype={
	setSeries: function(){
		var series = [];

		this.opt.colors = this.opt.colors || ["#a4da00", "#fc7736", "#febd01", "#3fc6f3"];
		var count = this.opt.count || this.opt.colors.length;
		var speed = 1500;
		for(var i=0; i<count; i++){
			if(i == 0){
				var sopt = {rendererOptions:{barDirection:'horizontal',animation:{speed: speed},barMargin:0, barWidth:5, barPadding:-5, color: this.opt.colors[i%this.opt.colors.length]}};
			}else{
				//var sopt = {rendererOptions:{animation:{speed: speed}, barMargin:-5, barWidth:10, barPadding:0, color: this.opt.colors[i%this.opt.colors.length]}}; // DongQ 2014.03.07 Aura 수정 요청에 의하여 그래프 편집
				var sopt = {rendererOptions:{animation:{speed: speed}, barMargin:0, barWidth:30, barPadding:-30, color: this.opt.colors[i%this.opt.colors.length]}};
			}
			series.push(sopt);
			speed += this.opt.term || 0;
		}
		return series;
	}
};


//이력 차트 년도별
chart_option4 = function(opt){
	this.opt = opt;
	var ticks = [[1, vMonth[0]],[2,  vMonth[1]],[3,  vMonth[2]],[4,  vMonth[3]],[5,  vMonth[4]]
	            ,[6,  vMonth[5]],[7,  vMonth[6]],[8,  vMonth[7]],[9,  vMonth[8]],[10,  vMonth[9]]
	            ,[11,  vMonth[10]],[12,  vMonth[11]]];
	var option={
			animate : true,
			animateReplot: true,
			legend: {
              show: false,
              location: 'se',
          },
			seriesDefaults: {
              pointLabels: { show: true}, 
              renderer:$.jqplot.BarRenderer,
              showHighlight:false,
              shadow: false,
              yaxis: 'yaxis',
              rendererOptions:{
              //	barDirection:'horizontal',                	   
              //	barPadding:0,
              //	barMargin:-5,  // 표준선 낮게 나오는 문제 수정을 위해 DongQ가 주석처리.
              	highlightMouseOver:true
          	}
          },			
	        axes:{xaxis:{
	        		ticks: ticks,
	        		tickInterval: 1,
                  	drawMajorGridlines: false,
                  	drawMinorGridlines: true,
                  	drawMajorTickMarks: false,
                  	rendererOptions: {
                      tickInset: 0.8,
                      minorTicks: 1
                  	}
	        	//	renderer:$.jqplot.CategoryAxisRenderer
	        	},
	        		yaxis: {
	        			    tickOptions: {
                          formatString: "%d",
                          showGridline: false 
                      },rendererOptions: {
                          alignTicks: true,
                          forceTickAt0: true
                      }
                      // autoscale: true
                  }
              }, 
              highlighter: {
              	show: true
          },
	        grid:{borderWidth:0,drawGridlines:false,shadow:false,backgroundColor:"#ffffff"}	        
	    };

	    if(typeof this.opt.yaxis != "undefined"){
	    	option.axes.yaxis = this.opt.yaxis;
	    }

	option.series = this.setSeries();

	return option;
};

chart_option4.prototype={
	setSeries: function(){
		var series = [];

		this.opt.colors = this.opt.colors || ["#a4da00", "#fc7736", "#febd01", "#3fc6f3"];
		var count = this.opt.count || this.opt.colors.length;
		var speed = 1500;
		for(var i=0; i<count; i++){
			if(i == 0){
				var sopt = {rendererOptions:{barDirection:'horizontal',animation:{speed: speed},barMargin:0, barWidth:5, barPadding:-5, color: this.opt.colors[i%this.opt.colors.length]}};
			}else{
				//var sopt = {rendererOptions:{animation:{speed: speed}, barMargin:-5, barWidth:10, barPadding:0, color: this.opt.colors[i%this.opt.colors.length]}}; // DongQ 2014.03.07 Aura 수정 요청에 의하여 그래프 편집
				var sopt = {rendererOptions:{animation:{speed: speed}, barMargin:0, barWidth:10, barPadding:-10, color: this.opt.colors[i%this.opt.colors.length]}};
			}
			series.push(sopt);
			speed += this.opt.term || 0;
		}
		return series;
	}
};
//랭킹 차트 
chart_option3 = function(opt){
	this.opt = opt;
	var option={
			animate : true,
	        seriesDefaults:{
	        	pointLabels: {
                    show: (typeof this.opt.label == "undefined" ? true : this.opt.label),
                    formatString: '%s'
                },
	        	renderer:$.jqplot.BarRenderer,shadow:false,showHighlight:false,
	            rendererOptions:{barWidth:28,barPadding:-30,barMargin:0,highlightMouseOver:true}
	        },
	        axes:{xaxis:{renderer:$.jqplot.CategoryAxisRenderer}},
	        grid:{borderWidth:0,drawGridlines:false,shadow:false,backgroundColor:"#ffffff"},
	        series:[]
	    };

	    if(typeof this.opt.yaxis != "undefined"){
	    	option.axes.yaxis = this.opt.yaxis;
	    }

	option.series = this.setSeries();

	return option;
};
chart_option3.prototype={
	setSeries: function(){
		var series = [];
		var count = this.opt.count || 1;
		
		var speed = 1500;
		for(var i=0; i<count; i++){			
			var sopt = {rendererOptions:{animation:{speed: speed},color: "#ed6942"}};
			series.push(sopt);
			speed += this.opt.term || 0;
		}
		return series;
	}
};

var chart_index = 0;

var pUserId = "<%= pUserId%>";
var pToken = "<%= pToken%>";

	//사용자 정보 가져오기
	function setUserData(pUrl, func){

			//console.log(arguments);
			//var argu = arguments;
			//var pars = "{\"userId\":\"" + pUserId + 
			//		"\",\"token\":\"" + pToken +"\"}";
			var pars = {};
			pars.member_id = pUserId;
			//console.log(pars);

		$.ajax({
			type : "post",
			dataType : "json",
			url : rootPath + pUrl,
			contentType : 'application/json',
			cache : false,
			data : JSON.stringify(pars),
			success : func,
			error : function() {
				alert('Error while request..');
			}
		});
	}
	

	function setUserYearData(pUrl, selYear, func){

			//console.log(arguments);
			//var argu = arguments;
			var pars = '{"userId":"' + pUserId + '", "selYear":"' + selYear + '","token":"' + pToken +'"}';
			//console.log(pars);

		$.ajax({
			type : "post",
			dataType : "json",
			url : rootPath + "/" + pUrl,
			contentType : 'application/json',
			cache : false,
			data : pars,
			success : func,
			error : function() {
				alert('Error while request..');
			}
		});
	}
	var vMin = 0;
	var vMax = 0;
	//최소,최대값 구하기
	function setMinMax(a,b,c,d){
		var arr =[parseFloat(a), parseFloat(b),parseFloat(c), parseFloat(d)];
		vMin= arr[0];
		vMax= 0;
		//최소값
		for(var i=0; i<arr.length; i++){
		 	if(vMin > arr[i]){
		 		vMin = arr[i];
		 	}
		}
		//최대값
		 for(var i=0; i<arr.length; i++){
		 	if(vMax < arr[i]){
		 		vMax = arr[i];
		 	}
		}	
		
		vMin = parseInt(Math.floor(vMin)-5);
		vMax = parseInt(Math.ceil(vMax)+5);
	}
	var gradeIdHeight = "";
	var gradeIdWeight = "";
	var gradeIdBmi = "";
	var gradeIdScore = "";
	var vFintColor =""; // 종합평가 글자색
	function setFontColor(str){
		str = str.replace(/(^\s*)|(\s*$)/gi, "");
		switch(str){
			case "표준 이상": 	vFintColor = "#3fc6f3";	break; //신장
			case "표준": 		vFintColor = "#afcc12";	break; //신장
			case "표준 이하": 	vFintColor = "#fc7736";	break; //신장
		}
	}
	// 신장
	function setHeight(jo){
		
		effectFadeIn('height_finger_image',1);
		
		function effectFadeIn(idname,val){
			$('#'+idname).fadeIn(700);
			setTimeout( function(){effectFadeOut(idname,val);},700); 
		}
		function effectFadeOut(idname,val) {
			//console.log(val);
			if(val == 3){ 
				$("#"+idname).fadeOut(700); clearTimeout("#"+idname); return; }
			else { val = val + 1; }
			$("#"+idname).fadeOut(1000);
			setTimeout( function(){effectFadeIn(idname,val);},700); 
		}

		//첫번째 point_box에 마우스 오버시 pointer 스타일 적용
		$('#_height .point_box:eq(0)').css('cursor','pointer');
		chart_index=0;
		var val = jo.value;
		var data = [ [['나', val.value]], [['표준', val.averageOfNation]], [['반평균', val.averageOfClass]], [['학교평균', val.averageOfSchool]], [['광명평균', val.averageOfLocal]] ]; 
		setMinMax(val.value, val.averageOfNation, val.averageOfClass, val.averageOfSchool);
		gradeIdHeight = val.gradeId;
	//	console.log(gradeId);
		//var data = [ [['나', 170.1]], [['표준', 164.3]], [['반평균', 162.5]], [['학교평균', 163.7]] ]; 
		$('#chart_height').jqplot(data, new chart_option({term : 500, yaxis: {min:vMin, max:vMax}}) );
		//$('#chart_height').jqplot(data, new chart_option({term : 500, yaxis: {min:140, max:180}}) );
		
		//첫번째 point_box 클릭시 info를 호출하여 팝업을 생성합니다.
		$('#_height .point_box:eq(0)').click(function(){
			info(5);
			
			if(val.beforeValue > val.value){
				$('.cm_popText1').html((val.value - val.beforeValue).toFixed(1)+'cm 감소<br><small class="cm_smallText1">바른 측정자세 요망</small>');
			}else if(val.value > val.beforeValue){
				$('.cm_popText1').html((val.value - val.beforeValue).toFixed(1)+'cm 증가');
			}else{
				$('.cm_popText1').html('-').css('margin-left','3.5em');
			}
			$('.cm_popText2').html(val.schoolGrade+"등<br><small class='cm_smallText2'>이전 "+val.beforeSchoolGrade+"등</small>");
		});
		
		// 신장 등수
		$("#_height .point_box:eq(0) td .he1").text(val.schoolGrade);
		$("#_height .point_box:eq(0) td .he2").text("/"+val.totalNumberOfStudent);
				
		setFontColor(val.gradeString);
		// 신장등급		
		$("#_height .point_box:eq(1) td").css("color",vFintColor);
		$("#_height .point_box:eq(1) td").text((val.gradeString).replace(/ /gi,""));
	}

	
	// 체중
	function setWeight(jo){
		
		effectFadeIn('weight_finger_image',1);

		function effectFadeIn(idname,val){
			$('#'+idname).fadeIn(700);
			setTimeout( function(){effectFadeOut(idname,val);},700); 
		}
		function effectFadeOut(idname,val) {
			//console.log(val);
			if(val == 3){ 
				$("#"+idname).fadeOut(700); clearTimeout("#"+idname); return; }
			else { val = val + 1; }
			$("#"+idname).fadeOut(1000);
			setTimeout( function(){effectFadeIn(idname,val);},700); 
		}
		
		//첫번째 point_box에 마우스 오버시 pointer 스타일 적용
		$('#_weight .point_box:eq(0)').css('cursor','pointer');
		chart_index=1;
		var val = jo.value;
		var data = [ [['나', val.value]], [['표준', val.averageOfNation]], [['반평균', val.averageOfClass]], [['학교평균', val.averageOfSchool]], [['광명평균', val.averageOfLocal]] ]; 
		setMinMax(val.value, val.averageOfNation, val.averageOfClass, val.averageOfSchool);

		gradeIdWeight = val.gradeId;
		//var data = [ [['나', 84.1]], [['표준', 57.6]], [['반평균', 54.3]], [['학교평균', 56.8]] ];
		//$('#chart_weight').jqplot(data, new chart_option({term : 500, yaxis: {min:30, max:90}}) );  
		$('#chart_weight').jqplot(data, new chart_option({term : 500, yaxis: {min:vMin, max:vMax}}) ); 
		
		//첫번째 point_box 클릭시 info를 호출하여 팝업을 생성합니다.
		$('#_weight .point_box:eq(0)').click(function(){
			info(6);
			
			if(val.beforeValue > val.value){
				$('.kg_popText1').html((val.value - val.beforeValue).toFixed(1)+'kg 감소');
			}else if(val.value > val.beforeValue){
				$('.kg_popText1').html((val.value - val.beforeValue).toFixed(1)+'kg 증가');
			}else{
				$('.kg_popText1').html('-').css('margin-left','3.5em');
			}
			$('.kg_popText2').html(val.schoolGrade+"등<br><small class='kg_smallText2'>이전 "+val.beforeSchoolGrade+"등</small>");
		});
		
		// 체중 등수
		$("#_weight .point_box:eq(0) td .he1").text(val.schoolGrade);
		$("#_weight .point_box:eq(0) td .he2").text("/"+val.totalNumberOfStudent);
		
		setFontColor(val.gradeString);
		// 체중등급
		$("#_weight .point_box:eq(1) td").css("color",vFintColor);
		$("#_weight .point_box:eq(1) td").text((val.gradeString).replace(/ /gi,""));
	}

	// BMI(체형)
	function setBMI(jo){

		chart_index=2; // DongQ 2014.03.07
		var val = jo.value;
		var vGradeString = val.gradeString;
		var vImg = "default";
		gradeIdBmi = val.gradeId;
		vGradeString = vGradeString.replace(/(^\s*)|(\s*$)/gi, "");
		
		//console.log(vGradeString);
		switch(vGradeString){
			case "정상 A": 		vImg = "normal-A";					vFintColor="#afcc12";	break; 
			case "정상 B": 		vImg = "normal-B";					vFintColor="#6acc12";	break; 
			case "저체중 A": 	vImg = "underweight-A";				vFintColor="#3fc6f3";	break; 
			case "저체중 B": 	vImg = "underweight-B";				vFintColor="#3fa0f3";	break; 
			case "저체중 C": 	vImg = "underweight-C";				vFintColor="#3f6ef3";	break; 
			case "과체중 A": 	vImg = "fat-A";						vFintColor="#febd01";	break; 
			case "과체중 B": 	vImg = "fat-B";						vFintColor="#fea801";	break; 
			case "비만 A": 		vImg = "overweight-A";				vFintColor="#fc7736";	break; 
			case "비만 B": 		vImg = "overweight-B";				vFintColor="#ff5d15";	break; 
			case "비만 C": 		vImg = "overweight-C";				vFintColor="#ff4e00";	break; 
			case "중도비만 A": 	vImg = "very-overweight-A";			vFintColor="#ff6f84";	break; 
			case "중도비만 B": 	vImg = "very-overweight-B";			vFintColor="#ff5c8b";	break; 
			case "중도비만 C": 	vImg = "very-overweight-C";			vFintColor="#f64a8a";	break; 
			case "고도비만 A": 	vImg = "extremely-overweight-A";	vFintColor="#eb2b2a";	break; 
			case "고도비만 B": 	vImg = "extremely-overweight-B";	vFintColor="#d30000";	break; 
			case "고도비만 C": 	vImg = "extremely-overweight-C";	vFintColor="#bf0000";	break; 
		}

		$("#bmi_view img:eq(0)").fadeTo(3000, 0);
		$("#bmi_view img:eq(1)").attr({
			src: '/images/inbody/'+vImg+'.png'
		}).fadeIn(3000);
		
		// BMI
		$("#_bmi .point_box:eq(0) td").css("color",vFintColor);
		$("#_bmi .point_box:eq(0) td").text(val.bmi);

		// 체지방률
		$("#_bmi .point_box:eq(1) td").css("color",vFintColor);
		$("#_bmi .point_box:eq(1) td").text(val.percentageOfBodyFat);
	}

	// 흡연지수
	function setSmoke(jo){
		chart_index=3;
		var val = jo.value;
		var vGradeString ="";
		var vPPM = "";
		var vCohd = "";
		var vSchoolGradeId = ""; //학년
		var smoke = 1;	//point_type 이미지를 저장하기 위한 변수
		var imageIndex = 0;	//subHtml.html에 이미지 index 번호를 저장하기 위한 변수
		
		val == null ? vGradeString = "" : vGradeString = val.gradeString;
		val == null ? vPPM ="" :  vPPM =val.ppm;
		val == null ? vCohd ="" :  vCohd =val.cohd;
		vSchoolGradeId = jo.schoolGradeId;

		if(val == null){
			//console.log("null");
			//popup_flag = false;
			//info(4);
			$("#_smoke .smoke_numeric table td:eq(0) span").text('-');
			$("#_smoke .smoke_numeric table td:eq(1) span").text('-');
			4 < vSchoolGradeId ? info(12) : info(4);
			
			typeObj.isFirst = true;
		}else{
			//console.log("in");						
				vGradeString = vGradeString.replace(/(^\s*)|(\s*$)/gi, "");
				var vImg = "smoking-default";
				//console.log(vGradeString);
				//초등학교 5학년이하인 경우는 흡연측정없음
				switch(vGradeString){
					case "비흡연": 		vImg = "smoking1"; imageIndex=0; smoke=1; break; 
					case "정상": 		vImg = "smoking1"; imageIndex=0; smoke=1; break; 
					case "간접": 		vImg = "smoking2"; imageIndex=1; smoke=2; break; 
					case "초기흡연": 	vImg = "smoking2"; imageIndex=1; smoke=2; break; 
					case "흡연중": 		vImg = "smoking3"; imageIndex=2; smoke=3; break; 
					case "과다흡연": 	vImg = "smoking4"; imageIndex=3; smoke=5; break; 
				}
		
			$("#smoke_view img:eq(0)").fadeTo(3000, 0);
			$("#smoke_view img:eq(1)").attr({
				src: '/images/inbody/'+vImg+'.png'
			}).fadeIn(3000);
			
			// CO
			vPPM == null ? $("#_smoke .smoke_numeric table td:eq(0) span").text('-') : $("#_smoke .smoke_numeric table td:eq(0) span").text(vPPM); 
			// COHb
			vCohd == null ? $("#_smoke .smoke_numeric table td:eq(1) span").text('-') : $("#_smoke .smoke_numeric table td:eq(1) span").text(vCohd);
		}
		$("#_smoke .weight_bar img").removeClass('on').each(function(index){
		//$(this).attr("src", "/images/inbody/point_"+index+".png");
		}).eq(imageIndex).attr("src", "/images/inbody/point_type_"+smoke+".png").addClass('on');
	}

	var popup_flag = false;
	function info(idx){
		var pop_title = "";
		var pop_comment = "";
		switch(idx){
			case 0: pop_title="BMI란?";			pop_comment="체질량지수. 체중(kg)을 키의 제곱(㎡)으로 나눈 값을 통해 지방의 양을 추정하는 비만측정법이다. 수치가 클수록 체격이 커진다."; break;// bmi
			case 1: pop_title="체지방률이란?";	pop_comment="체중에서 체지방이 차지하는 비율. 수치가 작을수록 근육형체형이다"; break;// 체지방률
			case 2: pop_title="CO란?";			pop_comment="일산화탄소. 흡연시 혈액중의 헤모글로빈과 결합하여 체내 산소 공급을 방해한다."; break;// CO
			case 3: pop_title="CHOb란?";		pop_comment="카복시헤모글로빈. 일산화탄소와 헤모글로빈의 결합분자로 산소공급을 방해하여 일산화탄소 중독을 일으킨다."; break;// CHOb
			case 4: pop_title="흡연측정안내";	pop_comment="흡연 측정은 5학년부터 실시됩니다"; break;
			case 10: pop_title=""; pop_comment="선택하신 해에 측정한 기록이 없습니다."; break;
			case 11: pop_title=""; pop_comment="올해에 측정한 기록이 없습니다."; break;
			case 12: pop_title="흡연측정안내"; pop_comment="측정한 기록이 없습니다."; break;
		}
		$('#popup p.pop_title').text(pop_title);
		$('#popup p.pop_comment').text(pop_comment);

		$('#popup').simpledialog2();
			
		popup_flag = true;
		
		//신장 팝업
		if(idx == '5'){
			$('<div>').simpledialog2({
			     mode: 'blank',
			     headerText: false,
			     headerClose: false,
			     blankContent : 
			       "<div class='popup'><p id='cm_pop_header'><%= pUserName + pUserSexStr%> 신장 변화</p><div><img class='cm_popImage1' src='/images/inbody/big_cm_popImage1.png' alt='신장팝업이미지1'></div><div><img class='cm_popImage2' src='/images/inbody/big_cm_popImage2.png' alt='신장팝업이미지2'></div><span class='cm_popText1'></span><span class='cm_popText2'></span></div>"
			});	
		}
		
		//체중 팝업
		if(idx == '6'){
			$('<div>').simpledialog2({
			     mode: 'blank',
			     headerText: false,
			     headerClose: false,
			     blankContent : 
			       "<div class='popup'><p id='kg_pop_header'><%= pUserName + pUserSexStr%> 체중 변화</p><div><img class='kg_popImage1' src='/images/inbody/big_kg_popImage1.png' alt='체중팝업이미지1'></div><div><img class='kg_popImage2' src='/images/inbody/big_kg_popImage2.png' alt='체중팝업이미지2'></div><span class='kg_popText1'></span><span class='kg_popText2'></span></div>"
			});	
		}
		 
	}
	$(document).on("vmouseup",  function(evt){
			if(popup_flag == false){

			}else{
				$(".ui-simpledialog-container").hide();
				$('#popup').simpledialog2('close');
				popup_flag = false;
			}				
		});
	var vIdx ="";
	function subRank(idx){
		setRankDataPage(idx);
		vIdx = idx;
	}
	// 랭킹
	function setRank(jo,idx){
		
		var val = jo.value;
		var len = val.length;
		var pasteVal = '<table id="rank_table" style="margin-top:0.1em;"><colgroup><col id="rank_col_first" width="15%" /><col id="rank_col_second" width="35%" /><col id="rank_col_third" width="30%" /><col id="rank_col_third" width="20%" /></colgroup><tbody>';
		var grade = 0;
		var unitStr = '';
		switch (reloadRankingIdx) {
		case 0:
			unitStr = 'cm';
			break;
		case 1:
			unitStr = 'kg';
			break;
		default:
			break;
		}
		
		if(0<len){
			if(rankDataPageScale == 'class'){
				for(var i=0;i<len;i++){
					grade = Number(val[i].schoolGrade);
					pasteVal += '<tr class="class_ranking_list"><td style="background:#e7e2de;">'+val[i].ranking+'위</td><td style="background:beige;">'+ ((6 < grade) ? (grade-6) : grade) +'학년 '+val[i].name+'반</td><td style="background:#e7e2de;">'+val[i].value+unitStr+'</td><td style="background:beige;">'+getChangeRank(val[i].ranking, val[i].beforeRanking)+'</td></tr>';
				}
			}else{
				for(var i=0;i<len;i++){
					pasteVal += '<tr class="class_ranking_list"><td style="background:#e7e2de;">'+val[i].ranking+'위</td><td style="background:beige;">'+val[i].name+'</td><td style="background:#e7e2de;">'+val[i].value+unitStr+'</td><td style="background:beige;">'+getChangeRank(val[i].ranking, val[i].beforeRanking)+'</td></tr>';
				}
			}
		}else{
			pasteVal += '<tr class="class_ranking_list"><td style="background:#e7e2de;">데이터가 없습니다.</td></tr>';
		}
		
		pasteVal += '</tbody></table>';
		
		$('#writeRanking').html(pasteVal);
		
		//pc버전....스크롤이 생길경우 th영역 width값 변경
		if(deviceType == 4){
			if($('#rank_table').height() > 345){
				$('#rank_table #rank_col_first').css('width','15.7%');
				$('#rank_table #rank_col_second').css('width','37%');
				$('#rank_table #rank_col_third').css('width','31%');
			}	
		}
		
		rankDataPageScale = 'class';
		
		/* 
		var data = new Array();
		var data1 = new Array();
				
		for(var i=0;i<len;i++){			
			data1.push([val[i].name,val[i].value]);
		}		
		var td = new Array();
		var rst = "";
		var rst_min = "";  // 랭킹 하위 데이터가 안보이는 경우가 발생하여 DongQ가 추가
		for(var i=0;i<len;i++){
			rst = data1[i][1];			
			td.push([[data1[i][0]+'반',parseFloat(rst)]]);	
		}
	//	console.log(td);
	//	td.sort(td[]);
		var data = td;
		rst = data1[0][1];
		rst_min = data1[len-1][1];
     	vMin = parseInt(rst_min)-5;
		vMax = parseInt(rst)+5;
 		//$("#tooltip1b1").hide();
    	//$('#chart_rank').empty();
		//$('#chart_rank').jqplot(data, new chart_option3({
					//colors:["#ed6942"],
					//term : 500,
					//count:len, 
					//label:true,
					//yaxis:{min:vMin,max:vMax}
				//}
			//)					
		//);

		//$("#chart_rank .jqplot-point-label").hide();

 		//$("#chart_rank").bind('jqplotDataHighlight', function (ev, seriesIndex, pointIndex, data) {
 				//$("#chart_rank .jqplot-point-label").css({
 					//"font-size": "20px",
 					//"color": "#ed6942"
 				//}).hide().eq(seriesIndex).show();


            //});

 		$("#_rank .main_view a").removeClass('on').eq(vIdx).addClass('on');
 		 */
	}
	
	var scoreDescription = "";
	var scoreEatingHabits = "";
	var scoreExericise = "";
	var vGradeString = "";
	
	// 성장점수
	function setScore(jo){
		var val = jo.value;
		vGradeString = val.gradeString;
		var score = 1;

		gradeIdScore = val.gradeId;		
		scoreDescription = val.description;
		scoreEatingHabits = val.eatingHabits;
		scoreExercise = val.exercise;		
				
		//console.log(vGradeString);
		switch(vGradeString){
			case "정상 A": score = 1;	break; 
			case "정상 B": score = 1;	break;
			case "저체중 A": score = 0;	break; 
			case "저체중 B": score = 0;	break; 
			case "저체중 C": score = 0;	break; 
			case "과체중 A": score = 2;	break; 
			case "과체중 B": score = 2;	break; 
			case "과체중 C": score = 2;	break; 
			case "비만 A": score = 3;	break; 
			case "비만 B": score = 3;	break; 
			case "비만 C": score = 3;	break;
			case "중도비만 A": score = 4;	break; 
			case "중도비만 B": score = 4;	break; 
			case "중도비만 C": score = 4;	break; 
			case "고도비만 A": score = 5;	break; 
			case "고도비만 B": score = 5;	break; 
			case "고도비만 C": score = 5;	break; 
		}
		// 점수
		$("#_score .balloon span").text(val.score);

	//	var score = 3;
		$("#_score .weight_bar img").removeClass('on').each(function(index){
			$(this).attr("src", "/images/inbody/point_"+index+".png");
		}).eq(score).attr("src", "/images/inbody/point_type_"+score+".png").addClass('on');

	}
// END data 바인딩 ***************************************************************************
	// 추천운동, 금연도움사이트
	function goPage(type){	
		
		var gradeId = "";
		
		switch(type){
			case "height" : gradeId = gradeIdHeight; break;
			case "weight" : gradeId = gradeIdWeight; break;
			case "bmi" : gradeId = gradeIdBmi; break;
			case "score" : gradeId = gradeIdScore; break;
		}
		//console.log(gradeId);

		if (deviceType != "1") {
			parent.setUserData('GetVideoList', '{"masterGradeId":"' + gradeId + '"}', parent.getVideoList);
		} else {
			alert(type+','+gradeId);
		}
	}

	//var currYear = 2013;
	
	function setDetail(){
		
		//DongQ
		if (deviceType != "1") {
			parent.isLocSubChart = true;
		}
		
		if (chart_index == 2) {
			
			var currYear = new Date().getFullYear();
			
			//console.log(currYear);
			setDetailYearPage (currYear);
		} else {
			setDetailPage(chart_index);
		}
	}
    
    function setInitYearDataArray () {
    	vMeYear      = new Array("0","0","0","0","0","0","0","0","0","0","0","0");
        vMYear       = new Array("0","0","0","0","0","0","0","0","0","0","0","0");
        vClassYear 	 = new Array("0","0","0","0","0","0","0","0","0","0","0","0");
        vLocalYear 	 = new Array("0","0","0","0","0","0","0","0","0","0","0","0");
        vSchoolYear  = new Array("0","0","0","0","0","0","0","0","0","0","0","0");

    	//vMeYearBmi     = new Array("-","-","-","-","-","-","-","-","-","-","-","-");
    	//vMyPercFatYear = new Array("-","-","-","-","-","-","-","-","-","-","-","-");
        //vMyMsGradeStr  = new Array("-","-","-","-","-","-","-","-","-","-","-","-");
    }
    
	//최소,최대값 구하기(3)
	function setMinMax3(a,b,c){
		var arr =[parseFloat(a), parseFloat(b), parseFloat(c)];
		vMin= arr[0];
		vMax= 0;
		//최소값
		 for(var i=0; i<arr.length; i++){
			//if(vMin > arr[i]){ 
			if(vMin > arr[i] && arr[i] > 0){ // DongQ 2014.03.07
		 		vMin = arr[i];
		 	}
		}
		//최대값
		 for(var i=0; i<arr.length; i++){
		 	if(vMax < arr[i]){
		 		vMax = arr[i];
		 	}
		}	
		vMin = parseInt(Math.floor(vMin)-20);
		if(vMin < 0) vMin = 0;
		vMax = parseInt(Math.ceil(vMax)+15);
	}

	function subDetail(jo) {
	    //window.alert('detail');
	    $("#tooltip1b2").hide();
	    var val = jo.value;
	    var len = jo.value.list.length;
	    vMax = 0;
	    vMe = new Array("0","0","0","0"); // vMe 초기화 2014.05.02
	    vM  = new Array("A","A","A","A"); // vM 초기화 2014.05.02
	    
	    // 년도 포함 yyyyMM으로 추출 후 정렬 // DongQ
	    for (var i = 0; i < len; i++) {
	        //vM[i] = (val.list[i].date).substr(5,2); // DongQ
	        vM[i] = (val.list[i].date).substr(0, 7); // DongQ 2014.04.21 현재 반영
	    }
	    vM.sort();
	    //console.log(vM);
	    
// 	    var vMacTotStr = "";
	    
// 	    for (var i = 3; i >= 4 - len; i--) {
// 	        if (vMacTotStr < vM[i].substr(5, 2)) {
// 	            vMacTotStr = vM[i];
// 	            vMax = vM[i].substr(5, 2);
// 	            year = vM[i].substr(0, 4); // DongQ 최근 측정 연도 추출
// 	        }
// 	    }
	    
	    // 기준 월 부터 3개월 전		
// 	    if (vMax > 3) {
// 	        var j = 1;
// 	        for (var i = 3; i >= 0; i--) {
// 	            month[i] = vMonth[vMax - j];
// 	            yearArr[i] = year; // DongQ
// 	            j++;
// 	        }
// 	    } else {
// 	        var j = 1;
// 	        for (var i = 3; i >= 0; i--) {
// 	            if (vMax - j < 0) {
// 	                //month[i] = vMonth[j+12];  // DongQ
// 	                month[i] = vMonth[vMax - j + 12];
// 	                yearArr[i] = year - 1; // DongQ
// 	            } else {
// 	                month[i] = vMonth[vMax - j];
// 	                yearArr[i] = year; // DongQ
// 	            }
	
// 	            j++;
// 	        }
// 	    }

        var subLoadPage = "";
        var subPlotReg = "";
        var subUnitStr = "";
        var subItemStr = "";
        var toolTip = "";
        
        if (chart_index == 0) { //신장 detail
            subLoadPage = "sub_height.html";
            subPlotReg = "#chart_height_datail";
            subUnitStr = "cm";
            subItemStr = "신장";
            toolTip = "#tooltip1b2";
        } else if (chart_index == 1) { //체중 detail
            subLoadPage = "sub_weight.html";
            subPlotReg = "#chart_weight_datail";
            subUnitStr = "kg";
            subItemStr = "체중";
            toolTip = "#tooltip1b3";
        }
        
        $(subPlotReg).empty();
        $("#dialog").load(subLoadPage, function () {
            $('#dialog').simpledialog2();
            $(".ui-overlay-shadow").css({
                "height": "620px",
                "top": "0"
            });

            for (var i = 0; i < len; i++) {  
            	if (vM[j] != "A") {
                    for (var j = 0; j < 4; j++) {          	
	                    //console.log("######## i : "+ i + " / j : " + j +" val : [" + (val.list[i].date).substr(0, 7) + "] / vM : [" +vM[j] +  "] / " +  val.list[i].value);
	                    if ((val.list[i].date).substr(0, 7) != vM[j]) {
	                        vMe[j] = "0";
	                        vClass[j] = "0";
	                        vSchool[j] = "0";
	                        vLocal[j] = "0";
	                    } else {
	                        vMe[j] = val.list[i].value == "undefined" ? "0" : val.list[i].value;
	                        vClass[j] = val.list[i].averageOfClass == "undefined" ? "0" : val.list[i].averageOfClass;
	                        vSchool[j] = val.list[i].averageOfSchool == "undefined" ? "0" : val.list[i].averageOfSchool;
	                        vLocal[j] = val.list[i].averageOfLocal == "undefined" ? "0" : val.list[i].averageOfLocal;
	                        
	                        break;
	                    }
	                }
            	}
                
            }

            for (var j = 0; j < 4; j++) { 
                if (vM[j] == "A") {
                	vM[j] = " ";
                } else {
                	vM[j] = vM[j].substr(0, 4) + "." + vM[j].substr(5, 2);
                }
            }
            
            //console.log (vMe) ;
//             if (len > 1) {
//                 //	console.log("multi");
//                 var i = 0;
//                 for (var j = 3; j >= 0; j--) {
//                     if (i < len) {	                    
//                         if ((val.list[i].date).substr(5, 2) != month[j]) {
//                             vMe[j] = "0";
//                             vClass[j] = "0";
//                             vSchool[j] = "0";
//                             vLocal[j] = "0";
//                         } else {
//                             vMe[j] = val.list[i].value == "undefined" ? "0" : val.list[i].value;
//                             vClass[j] = val.list[i].averageOfClass == "undefined" ? "0" : val.list[i].averageOfClass;
//                             vSchool[j] = val.list[i].averageOfSchool == "undefined" ? "0" : val.list[i].averageOfSchool;
//                             vLocal[j] = val.list[i].averageOfLocal == "undefined" ? "0" : val.list[i].averageOfLocal;
//                         }
//                         i++;
//                     }
//                 }
//             } else {
//                 //	console.log("ONE");
//                 vMe[3] = val.list[0].value;
//                 vClass[3] = val.list[0].averageOfClass;
//                 vSchool[3] = val.list[0].averageOfSchool;
//                 vLocal[3] = val.list[0].averageOfLocal;
//             }
            
            
			//학교
            var schoolFirstIdx = 0;
            var schoolLastIdx = 1;
            var chkValue = false;
            for (var i = (vSchool.length-1); 0 <= i; i--) {
            	if (vSchool[i] > 0 && vSchool[i] != 'NaN') {
            		if (chkValue == false) {
                    	schoolLastIdx = i;
                        chkValue = true;
                    } else {
                    	schoolFirstIdx = i;
                    	break;
                    }
                }
            }
            
            if (schoolLastIdx < schoolFirstIdx) {
                var tempIdx = 0;
                tempIdx = schoolFirstIdx;
                schoolFirstIdx = schoolLastIdx;
                schoolLastIdx = tempIdx;
            }
            
            //지역
            var localFirstIdx = 0;
            var localLastIdx = 1;
            chkValue = false;
           	for (var i = (vLocal.length-1); 0 <= i; i--) {    
           		if (vLocal[i] > 0 && vLocal[i] != 'NaN') {
            		if (chkValue == false) {
                    	localLastIdx = i;
                        chkValue = true;
                    } else {
                    	localFirstIdx = i;
                    	break;
                    }
                }
            }
            
            if (localLastIdx < localFirstIdx) {
                var tempIdx = 0;
                tempIdx = localFirstIdx;
                localFirstIdx = localLastIdx;
                localLastIdx = tempIdx;
            }
            
            //나
            var meFirstIdx = 0;
            var meLastIdx = 1;
            chkValue = false;
            for (var i = (vMe.length-1); 0 <= i; i--) {
            	if (vMe[i] > 0 && vMe[i] != 'NaN') {
            		if (chkValue == false) {
                    	meLastIdx = i;
                        chkValue = true;
                    } else {
                    	meFirstIdx = i;
                    	break;
                    }
                }
            }
            
            if (meLastIdx < meFirstIdx) {
                var tempIdx = 0;
                tempIdx = meFirstIdx;
                meFirstIdx = meLastIdx;
                meLastIdx = tempIdx;
            }
            
            //$("#chart_datail_info").html('이번 달 ' + subItemStr + ' 성장 학교평균 : ' + (vSchool[lastIdx] - vSchool[lastIdx-1]).toFixed(1) + subUnitStr +'<BR>광명평균 : ' + (vLocal[lastIdx] - vLocal[lastIdx-1]).toFixed(1) + subUnitStr + '<BR>나 : ' + (vMe[lastIdx] - vMe[lastIdx-1]).toFixed(1) + subUnitStr);
            $("#chart_datail_info").html('이번 달 ' + subItemStr + ' 성장 학교평균 : ' +  (vSchool[schoolFirstIdx]>0 ? (vSchool[schoolLastIdx] - vSchool[schoolFirstIdx]).toFixed(1) : 0) + subUnitStr +'<BR>광명평균 : ' +  (vLocal[localFirstIdx] > 0 ? (vLocal[localLastIdx] - vLocal[localFirstIdx]).toFixed(1) : 0) + subUnitStr + '<BR>나 : ' + (vMe[meFirstIdx] > 0 ? (vMe[meLastIdx] - vMe[meFirstIdx]).toFixed(1) : 0) + subUnitStr);
            
            $('#sub_height table td a').click(function () {
                var opstionIdx = document.getElementById('selYear');
                opstionIdx.options[0].selected = true;
                $('.ui-btn-inner .ui-btn-text span').text('연도선택');
            });
            var data1 = [
                [1, vMe[0]],
                [2, vMe[1]],
                [3, vMe[2]],
                [4, vMe[3]]
            ];
            //var data2 = [[1, vClass[0]],[2, vClass[1]],[3, vClass[2]],[4, vClass[3]]];  // DongQ 주석 2014.03.06 불용
            //var data3 = [[1, vSchool[0]],[2, vSchool[1]],[3, vSchool[2]],[4, vSchool[3]]];  // DongQ 주석 2014.03.06 불용
            var data4 = [
                [5, val.standardMin]
            ];

            //var data = [data4,data1,data2,data3]; // DongQ 2014.03.07 : Display My, Class, School, Standard Data on Detail Page : org
            var data = [data4, data1]; // DongQ 2014.03.07 : Display Only My Data on Detail Page : new App. prop.

	    	vMe.sort(); // DongQ 2014.04.21 : 그래프 표출 건수 조정에 의한 수정 - 그래프 최대값 추출을 위해.
	    	
            //	console.log(vMe[3]);
            //setMinMax3 (vMe[3],vClass[3],vSchool[3]);   // DongQ 2014.03.07  
            setMinMax3(vMe[3], val.standardMin, 0); // DongQ 2014.03.07 : Display Only My Data on Detail Page : new App. prop.     	
            //	console.log(vMe[3]+","+vClass[3]+","+vSchool[3]);     	

            $(subPlotReg).jqplot(data, new chart_option2({
                term: 500,
                yaxis: {
                    min: vMin,
                    max: vMax
                }
            }));

//			$("#chart_height_datail .jqplot-point-label").hide();
            $(toolTip).css("color", "#afcc12");
            $(toolTip).html("<span> 표준:" + data4[0][1] + subUnitStr + "</span>");
            $(toolTip).show();

//             $(subPlotReg).bind('jqplotDataHighlight', function (ev, seriesIndex, pointIndex, data) {
//                 if (seriesIndex != 0) {
                    $(subPlotReg + " .jqplot-point-label").css({
                        "font-size": "12px", "color": "#fc7736"
                    }).show();//.hide();

//                     var colors = ["#fc7736", "#3fc6f3", "#febd01", "#afcc12"];	
//                     //$("#chart_height_datail .jqplot-series-"+seriesIndex+".jqplot-point-"+pointIndex+"").css("color", colors[seriesIndex]).show(); DongQ
//                     $("#chart_height_datail .jqplot-series-" + seriesIndex + ".jqplot-point-" + pointIndex + "").css("color", "#fc7736").show();
//                 }	
//             });	
        });
	
	}
	
	function subDetailYear(jo) {
	    
	    if (jo.value == null) {
	    	if (chart_index == 0 || chart_index == 1) {	    	
	    		//alert("선택하신 해에 측정한 기록이 없습니다.");
	    		info(10);
	    		
                var opstionIdx = document.getElementById('selYear');
                //opstionIdx.options[opstionIdx.options.selectedIndex].selected = false;
                //opstionIdx.options[selYearOrgIndex].selected = true;
                //opstionIdx.options.selectedIndex = selYearOrgIndex;
                opstionIdx.options[0].selected = true;
                
	    		return;
	    	} else { 	
	    		//alert("올해에 측정한 기록이 없습니다.");
	    		info(11);

	    		//DongQ
	    		if (deviceType != "1") {
	    			parent.isLocSubChart = false;
	    		}
	    		return;
	    	}
	    } else {
	    	
	    	if (chart_index != 2) {
	    		selYearOrgIndex = document.getElementById('selYear').options.selectedIndex;
	    	}
	    }
	    
	    
	    //window.alert('detail');
	    $("#tooltip1b2").hide();
	    var val = jo.value;
	    var len = jo.value.list.length;
	    vMax = 0;
	    var vMaxValYear = 0.0;
	    var tmpIsExistData = true;

	    for (var i = 0; i < len; i++) {
	        if (vMax < (val.list[i].date).substr(5, 2)) {
	            vMax = (val.list[i].date).substr(5, 2);
	        }

	        if (vMaxValYear < parseFloat(val.list[i].value)) {
	            vMaxValYear = parseFloat(val.list[i].value);
	        }
	    }

	    // 년도 포함 yyyyMM으로 추출 후 정렬 // DongQ
	    for (var i = 0; i < len; i++) {
	        //vM[i] = (val.list[i].date).substr(5,2); // DongQ
	        vMYear[i] = (val.list[i].date).substr(0, 7);
	    }
	    vMYear.sort();

        var subLoadPage = "";
        var subPlotReg = "";
        var subUnitStr = "";
        var subItemStr = "";
        if (chart_index == 0) { //신장 detail
            subLoadPage = "sub_height.html";
            subPlotReg = "#chart_height_datail";
            subUnitStr = "cm";
            subItemStr = "신장";
            toolTip = "#tooltip1b2";
        } else if (chart_index == 1) { //체중 detail
            subLoadPage = "sub_weight.html";
            subPlotReg = "#chart_weight_datail";
            subUnitStr = "kg";
            subItemStr = "체중";
            toolTip = "#tooltip1b3";
        } else if (chart_index == 2) { //BMI detail
            subLoadPage = "sub_bmi.html";
            subPlotReg = "#chart_weight_datail";
            subUnitStr = "kg";
            subItemStr = "체중";
            toolTip = "#tooltip1b3";
        }


        if (chart_index == 0 || chart_index == 1) {

            $(subPlotReg).empty();
            $("#dialog").load(subLoadPage, function () {
                $('#dialog').simpledialog2();
                $(".ui-overlay-shadow").css({
                    "height": "620px",
                    "top": "0"
                });
                
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        for (var j = 11; j >= 0; j--) {

                            if ((val.list[i].date).substr(5, 2) == vMonth[j]) {
                                vMeYear[j] = val.list[i].value == "undefined" ? "0" : val.list[i].value;
                                vClassYear[j] = val.list[i].averageOfClass == "undefined" ? "0" : val.list[i].averageOfClass;
                                vSchoolYear[j] = val.list[i].averageOfSchool == "undefined" ? "0" : val.list[i].averageOfSchool;
                                vLocalYear[j] = val.list[i].averageOfLocal == "undefined" ? "0" : val.list[i].averageOfLocal;
                                break;
                            }
                        }
                    }
                } else {

                    for (var j = 11; j >= 0; j--) {
                        vMeYear[j] = "0";
                        vClassYear[j] = "0";
                        vSchoolYear[j] = "0";
                        vLocalYear[j] = "0";
                    }
                    tmpIsExistData = false;
                }
                
                //학교
                var schoolFirstIdx = 0;
                var schoolLastIdx = 1;
                var chkValue = false;
                for (var i = 0; i < vSchoolYear.length; i++) {
                    if (vSchoolYear[i] > 0 && vSchoolYear[i] != 'NaN') {
                        if (chkValue == false) {
                        	schoolFirstIdx = i;
                            chkValue = true;
                        } else {
                        	schoolLastIdx = i;
                        }
                    }
                }
                
                if (schoolLastIdx < schoolFirstIdx) {
                    var tempIdx = 0;
                    tempIdx = schoolFirstIdx;
                    schoolFirstIdx = schoolLastIdx;
                    schoolLastIdx = tempIdx;
                }
                
                //지역
                var localFirstIdx = 0;
                var localLastIdx = 1;
                chkValue = false;
                for (var i = 0; i < vLocalYear.length; i++) {
                	if (vLocalYear[i] > 0 && vLocalYear[i] != 'NaN') {
                        if (chkValue == false) {
                        	localFirstIdx = i;
                            chkValue = true;
                        } else {
                        	localLastIdx = i;
                        }
                    }
                }
                
                if (localLastIdx < localFirstIdx) {
                    var tempIdx = 0;
                    tempIdx = localFirstIdx;
                    localFirstIdx = localLastIdx;
                    localLastIdx = tempIdx;
                }
                
                //나
                var meFirstIdx = 0;
                var meLastIdx = 1;
                chkValue = false;
                for (var i = 0; i < vMeYear.length; i++) {
                	if (vMeYear[i] > 0 && vMeYear[i] != 'NaN') {
                        if (chkValue == false) {
                        	meFirstIdx = i;
                            chkValue = true;
                        } else {
                        	meLastIdx = i;
                        }
                    }
                }
                
                if (meLastIdx < meFirstIdx) {
                    var tempIdx = 0;
                    tempIdx = meFirstIdx;
                    meFirstIdx = meLastIdx;
                    meLastIdx = tempIdx;
                }
                
                $("#chart_datail_info").html('올해 ' + subItemStr + ' 성장 학교평균 : ' + (vSchoolYear[schoolFirstIdx]>0 ? (vSchoolYear[schoolLastIdx] - vSchoolYear[schoolFirstIdx]).toFixed(1) : 0) + subUnitStr +'<BR>광명평균 : ' + (vLocalYear[localFirstIdx]>0 ? (vLocalYear[localLastIdx] - vLocalYear[localFirstIdx]).toFixed(1) : 0) + subUnitStr + '<BR>나 : ' + (vMeYear[meFirstIdx]>0 ? (vMeYear[meLastIdx] - vMeYear[meFirstIdx]).toFixed(1) : 0) + subUnitStr);

                var data1 = [
                    [1, vMeYear[0]],
                    [2, vMeYear[1]],
                    [3, vMeYear[2]],
                    [4, vMeYear[3]],
                    [5, vMeYear[4]],
                    [6, vMeYear[5]],
                    [7, vMeYear[6]],
                    [8, vMeYear[7]],
                    [9, vMeYear[8]],
                    [10, vMeYear[9]],
                    [11, vMeYear[10]],
                    [12, vMeYear[11]]
                ];
                var data4 = [
                    [13, val.standardMin]
                ];

                //var data = [data4,data1,data2,data3]; // DongQ 2014.03.07 : Display My, Class, School, Standard Data on Detail Page : org
                var data = [data4, data1]; // DongQ 2014.03.07 : Display Only My Data on Detail Page : new App. prop.

                //	console.log(vMe[3]);
                //setMinMax3 (vMe[3],vClass[3],vSchool[3]);   // DongQ 2014.03.07    
                setMinMax3(vMaxValYear, val.standardMin, 0); // DongQ 2014.03.07 : Display Only My Data on Detail Page : new App. prop.     	
                //	console.log(vMe[3]+","+vClass[3]+","+vSchool[3]);     	

                $(subPlotReg).jqplot(data, new chart_option4({
                    term: 500,
                    yaxis: {
                        min: vMin,
                        max: vMax
                    }
                }));

//    			$("#chart_height_datail .jqplot-point-label").hide();
                $(toolTip).css("color", "#afcc12");
                $(toolTip).html("<span> 표준:" + data4[0][1] + subUnitStr + "</span>");
                $(toolTip).show();
                
//                 $(subPlotReg).bind('jqplotDataHighlight', function (ev, seriesIndex, pointIndex, data) {
//                     if (seriesIndex != 0) {
                        $(subPlotReg + " .jqplot-point-label").css({
                            "font-size": "10px", "color": "#fc7736"
                        }).show();//.hide();

//                         var colors = ["#fc7736", "#3fc6f3", "#febd01", "#afcc12"];	
//                         //$("#chart_height_datail .jqplot-series-"+seriesIndex+".jqplot-point-"+pointIndex+"").css("color", colors[seriesIndex]).show(); DongQ
//                         $("#chart_height_datail .jqplot-series-" + seriesIndex + ".jqplot-point-" + pointIndex + "").css("color", "#fc7736").show();
//                     }	
//                 });	
            });

    	    if (!tmpIsExistData) {
    	        //alert("선택하신 해에 측정한 기록이 없습니다.");
    	    	info(10);
    	    }
    	    
        } else {

            $(subPlotReg).empty();
            $("#dialog").load(subLoadPage, function () {
                $('#dialog').simpledialog2();
                $(".ui-overlay-shadow").css({
                    "height": "620px",
                    "top": "0"
                });
                
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        for (var j = 11; j >= 0; j--) {
                        
                            if ((val.list[i].date).substr(5, 2) == vMonth[j]) {
                            	vMeYearBmi[j] = val.list[i].value == "undefined" ? "0" : val.list[i].value;
                                vMyPercFatYear[j] = val.list[i].percentageOfBodyFat == "undefined" ? "0" : val.list[i].percentageOfBodyFat;
                                vMyMsGradeStr[j] = val.list[i].msGradeString == "undefined" ? "0" : val.list[i].msGradeString;
                                
                                break;
                            }
                        }
                    }
                } else {

                    for (var j = 11; j >= 0; j--) {
                    	vMeYearBmi[j] = "-";
                        vMyPercFatYear[j] = "-";
                        vMyMsGradeStr[j] = "-";
                    }
                    tmpIsExistData = false;
                }	
                

    			var vFontColor = "gray";
    			var pasteVal = "";
    			

    			pasteVal += "<table id='bmi_table' style='margin-top:0.1em;'>";      
    			pasteVal += "<colgroup>";
    			pasteVal += "<col id='bmi_col_first' width='20%' />";
    			pasteVal += "<col id='bmi_col_second' width='40%' />";
    			pasteVal += "<col id='bmi_col_third' width='40%' />";
    			pasteVal += "</colgroup>";
    			pasteVal += "<tbody>";
    			
                for (var i = 0; i < vMeYearBmi.length; i++) {

            		switch(vMyMsGradeStr[i]) {
            			case "정상 A": 		vFontColor="#afcc12";	break; 
            			case "정상 B": 		vFontColor="#6acc12";	break; 
            			case "저체중 A":	vFontColor="#3fc6f3";	break; 
            			case "저체중 B":	vFontColor="#3fa0f3";	break; 
            			case "저체중 C":	vFontColor="#3f6ef3";	break; 
            			case "과체중 A":	vFontColor="#febd01";	break; 
            			case "과체중 B":	vFontColor="#fea801";	break; 
            			case "비만 A": 		vFontColor="#fc7736";	break; 
            			case "비만 B": 		vFontColor="#ff5d15";	break; 
            			case "비만 C": 		vFontColor="#ff4e00";	break; 
            			case "중도비만 A": 	vFontColor="#ff6f84";	break; 
            			case "중도비만 B": 	vFontColor="#ff5c8b";	break; 
            			case "중도비만 C": 	vFontColor="#f64a8a";	break; 
            			case "고도비만 A": 	vFontColor="#eb2b2a";	break; 
            			case "고도비만 B": 	vFontColor="#d30000";	break; 
            			case "고도비만 C": 	vFontColor="#bf0000";	break; 
            			default: vFontColor = "gray";	break; 
            		}
        			
        			pasteVal += "<tr class='class_ranking_list'>";
        			pasteVal += "<td style='background:#e7e2de;'>" + vMonth[i] + "</td>";
        			pasteVal += "<td style='background:beige;'>  <font color='" + vFontColor + "'>" + vMeYearBmi[i] +       "</font></td>";
        			pasteVal += "<td style='background:#e7e2de;'><font color='" + vFontColor + "'>" + vMyPercFatYear[i] + "</font></td>";
        			pasteVal += "</tr>";
                }

    			pasteVal += "</tbody>";
    			pasteVal += "</table>";

    			
    			$("#bmi_detail_list").html(pasteVal);
    			
    			//console.log(deviceType);
    			
    			//pc버전....스크롤이 생길경우 th영역 width값 변경
    			if(deviceType == 4){
    				if($('#bmi_table').height() > 422){
        				$('#bmi_table #bmi_col_first').css('width','21%');
        				$('#bmi_table #bmi_col_second').css('width','42%');
        			}	
    			}
            });
            
        }

	}

	function smoke_sub(){

		if (deviceType != "1") {
			parent.isLocSubChart = true;
		}
		
		//window.alert('detail');
		// $.mobile.changePage("smoke_detail.html", {transition: "slide"});
		$("#dialog").load("smoke_detail.html", function(){
      		$('#dialog').simpledialog2();
      		$(".ui-overlay-shadow").css({"height":"620px", "top":"0"});
		});		
	}

	function score_sub(){
		//window.alert('detail');
		$("#dialog").load("score_detail.html", function(){
      		$('#dialog').simpledialog2();
      		$(".ui-overlay-shadow").css({"height":"620px", "top":"0"});
      		$("#_score_sub header").text(vGradeString);
      		$("#score_Description").text(scoreDescription);
      		$("#score_EatingHabits").text(scoreEatingHabits);
      		$("#score_Exercise").text(scoreExercise);
		});

		// $("#popup").load("info.html #_bmi_info", function(){
  //     		$('#popup').simpledialog2();
		// });

	}
	function page_close(){
		$('#dialog').simpledialog2('close');
	}

	function setPos(){
	}
</script>
 </div>


<div id="popup" style="display:none" data-options='{"mode":"blank","headerText":false,"headerClose":false,"blankContent":true,"fullScreen": false,"fullScreenForce": false}'><p class="pop_title"></p><p class="pop_comment"></p></div>


<div id="dialog" style="display:none" data-options='{"mode":"blank","headerText":false,"headerClose":false,"blankContent":true,"fullScreen": true,"fullScreenForce": true,"animate":false}'></div>


</body>

<%
	}
%>
</html>