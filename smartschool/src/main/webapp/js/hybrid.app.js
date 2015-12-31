var app = angular.module('hybrid', ['ngRoute', 'ngCookies', 'ngFileUpload', 'ngSanitize','ngScrollbars','ngAnimate','ngTouch']);
app.factory('highlighter', function () {
	return new Scrollbars.Highlighter();
})

app.run(['$rootScope', function($rootScope) {
	$rootScope.rootPath = "/hybrid/index.html";
	
	//login user info
	$rootScope.home_id = null;
	$rootScope.member_id = null;
	$rootScope.mdn = null;
	$rootScope.is_parent = null;
	
	//current student info
	$scope.student_id = null;
	$scope.student_name = null;
}]);

app.config( ['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
	/*
		.when('/index.html', {templateUrl: '/SmartCare/in_app/index.html', controller:'FamilyCtrl'})
		.when('/login.html', {templateUrl: '/SmartCare/in_app/login.html', controller:'LoginCtrl'})
		.when('/join.html', {templateUrl: '/SmartCare/in_app/join.html', controller:'JoinCtrl'})
		.when('/main.html', {templateUrl: '/SmartCare/in_app/main.html', controller:'StudentCtrl'})
		.when('/height.html', {templateUrl: '/SmartCare/in_app/height.html', controller:'GrowthCtrl'})
		.when('/total.html', {templateUrl: '/SmartCare/in_app/total.html', controller:'StudentCtrl'})
		.when('/dining.html', {templateUrl: '/SmartCare/in_app/dining.html', controller:'SchoolCtrl'})
		.when('/training.html', {templateUrl: '/SmartCare/in_app/training.html', controller:'TrainingCtrl'})
		.when('/weight.html', {templateUrl: '/SmartCare/in_app/weight.html', controller:'GrowthCtrl'})
		.when('/muscle.html', {templateUrl: '/SmartCare/in_app/muscle.html', controller:'StudentCtrl'})
		.when('/ranking/height.html', {templateUrl: '/SmartCare/in_app/ranking_main.html', controller:'RankingCtrl'})
		.when('/ranking/weight.html', {templateUrl: '/SmartCare/in_app/ranking_main.html', controller:'RankingCtrl'})
		.when('/ranking/bmi.html', {templateUrl: '/SmartCare/in_app/ranking_main.html', controller:'RankingCtrl'})
		.when('/ranking/muscle.html', {templateUrl: '/SmartCare/in_app/ranking_main.html', controller:'RankingCtrl'})
		.when('/ranking/fat.html', {templateUrl: '/SmartCare/in_app/ranking_main.html', controller:'RankingCtrl'})
		.when('/ranking/height/detail.html', {templateUrl: '/SmartCare/in_app/ranking_detail.html', controller:'RankingCtrl'})
		.when('/ranking/weight/detail.html', {templateUrl: '/SmartCare/in_app/ranking_detail.html', controller:'RankingCtrl'})
		.when('/ranking/bmi/detail.html', {templateUrl: '/SmartCare/in_app/ranking_detail.html', controller:'RankingCtrl'})
		.when('/ranking/muscle/detail.html', {templateUrl: '/SmartCare/in_app/ranking_detail.html', controller:'RankingCtrl'})
		.when('/ranking/fat/detail.html', {templateUrl: '/SmartCare/in_app/ranking_detail.html', controller:'RankingCtrl'})
		.when('/ranking/height/list.html', {templateUrl: '/SmartCare/in_app/ranking_list.html', controller:'RankingCtrl'})
		.when('/ranking/weight/list.html', {templateUrl: '/SmartCare/in_app/ranking_list.html', controller:'RankingCtrl'})
		.when('/ranking/bmi/list.html', {templateUrl: '/SmartCare/in_app/ranking_list.html', controller:'RankingCtrl'})
		.when('/ranking/muscle/list.html', {templateUrl: '/SmartCare/in_app/ranking_list.html', controller:'RankingCtrl'})
		.when('/ranking/fat/list.html', {templateUrl: '/SmartCare/in_app/ranking_list.html', controller:'RankingCtrl'})
		.when('/obesity.html', {templateUrl: '/SmartCare/in_app/obesity.html', controller:'StudentCtrl'})
		.when('/smoking.html', {templateUrl: '/SmartCare/in_app/smoking.html', controller:'StudentCtrl'})
		.when('/activity.html', {templateUrl: '/SmartCare/in_app/activity.html', controller:'ActivityCtrl'})
		.when('/magazine.html', {templateUrl: '/SmartCare/in_app/magazine.html', controller:'MagazineCtrl'})
		.when('/challenge.html', {templateUrl: '/SmartCare/in_app/challenge.html', controller:'ChallengeCtrl'})
		.when('/school/message.html', {templateUrl: '/SmartCare/in_app/school_message.html', controller:'SchoolCtrl'})
		.when('/school/schedule.html', {templateUrl: '/SmartCare/in_app/school_schedule.html', controller:'SchoolCtrl'})
		.when('/school/noti.html', {templateUrl: '/SmartCare/in_app/school_noti.html', controller:'SchoolCtrl'})
		.when('/noti.html', {templateUrl: '/SmartCare/in_app/noti.html', controller:'NotiCtrl'})
		.when('/qna/list.html', {templateUrl: '/SmartCare/in_app/qna.html', controller:'QnaCtrl'})
		.when('/qna/write.html', {templateUrl: '/SmartCare/in_app/qna.html', controller:'QnaCtrl'})
		.when('/app/info.html', {templateUrl: '/SmartCare/in_app/app_info.html'})
	*/
	$locationProvider.html5Mode(false);
	$locationProvider.hashPrefix('!');

	//$httpProvider.defaults.headers.post['X-Auth'] = "";
}]);

app.service('MainSvc', function($http) {
	this.modHomeId = function(data){
		console.log('----------------- 가족명변경 --------------------');
		return $http.post('/api/modifyHome', data);
	};
	this.login = function(data){
		console.log('----------------- 로그인 --------------------');
		return $http.post('/api/signInOfMobile', data);
	};
});

app.service('FamilySvc', function($http) {
	this.getFamilyList = function(data){
		console.log('----------------- 가족구성원 목록 가져오기 --------------------');
		return $http.post('/api/getMemberList',data);
	};
	this.removeMember = function(data){
		console.log('----------------- 가족구성원 삭제 --------------------');
		return $http.post('/api/removeMember',data);
	};
	this.getSchoolList = function(data){
		console.log('----------------- 학교목록 가져오기 --------------------');
		return $http.post('/api/getSchoolList', data);
	};
});

app.service('StudentSvc', function($http) {
	this.getMeasureSummary = function(data){
		console.log('----------------- 학생정보 가져오기 --------------------');
		return $http.post('/api/getMeasureSummary',data);
	};
});

app.service('GrowthSvc', function($http) {
	this.getMeasureHistoryCount = function(data){
		console.log('----------------- 신체측정 히스토리 조회 --------------------');
		return $http.post('/api/getMeasureHistoryCount',data);
	};
	this.getHeightHistoryList = function(data){
		console.log('----------------- 신체측정(키)이력 조회 --------------------');
		return $http.post('/api/getHeightHistoryList',data);
	};
	this.getWeightHistoryList = function(data){
		console.log('----------------- 신체측정(체중)이력 조회 --------------------');
		return $http.post('/api/getWeightHistoryList',data);
	};
	this.getHeight = function(data){
		console.log('----------------- 성장발달 --------------------');
		return $http.post('/api/getHeight',data);
	};
	this.getWeight = function(data){
		console.log('----------------- 체중변화 가져오기 --------------------');
		return $http.post('/api/getWeight',data);
	};
});

app.service('SchoolSvc', function($http) {
	this.getSchoolMenuList = function(data){
		console.log('----------------- 식단정보 가져오기 --------------------');
		return $http.post('/api/getSchoolMenuList',data);
	};
	this.getSchoolNotiList = function(data){
		console.log('----------------- 학교정보알리미(가정통신문) 가져오기 --------------------');
		return $http.post('/api/getSchoolNotiListByMember',data);
	};
	this.getSchoolScheduleList = function(data){
		console.log('----------------- 학교정보알리미(학사일정) 가져오기 --------------------');
		return $http.post('/api/getSchoolScheduleList',data);
	};
	this.addNotiBookmark = function(data){
		console.log('----------------- 스크랩하기--------------------');
		return $http.post('/api/addNotiBookmark',data);
	};
});

app.service('TrainingSvc', function($http) {
	this.getVideoListByInfoType = function(data){
		console.log('----------------- 비디오리스트(초등학교, 중학교) 가져오기 --------------------');
		return $http.post('/api/getVideoListByInfoType',data);
	};
	this.getVideoListByMasterGradeId = function(data){
		console.log('----------------- 비디오리스트(키, 몸무게, BMI) 가져오기 --------------------');
		return $http.post('/api/getVideoListByMasterGradeId',data);
	};
});

app.service('RankingSvc', function($http) {
	this.getRankingHeight = function(data){
		console.log('----------------- 건강랭킹[신장] --------------------');
		return $http.post('/api/getRankingHeight',data);
	};
	this.getRankingWeight = function(data){
		console.log('----------------- 건강랭킹[체중] --------------------');
		return $http.post('/api/getRankingWeight',data);
	};
	this.getRankingBmi = function(data){
		console.log('----------------- 건강랭킹[bmi] --------------------');
		return $http.post('/api/getRankingBmi',data);
	};
	this.getRankingMuscle = function(data){
		console.log('----------------- 건강랭킹[근육량] --------------------');
		return $http.post('/api/getRankingMuscle',data);
	};
	this.getRankingFat = function(data){
		console.log('----------------- 건강랭킹[체지방] --------------------');
		return $http.post('/api/getRankingFat',data);
	};
	this.getRankingHeightList = function(data){
		console.log('----------------- 건강랭킹[신장] 목록 --------------------');
		return $http.post('/api/getRankingHeightList',data);
	};
	this.getRankingWeightList = function(data){
		console.log('----------------- 건강랭킹[체중] 목록 --------------------');
		return $http.post('/api/getRankingWeightList',data);
	};
	this.getRankingBmiList = function(data){
		console.log('----------------- 건강랭킹[BMI] 목록 --------------------');
		return $http.post('/api/getRankingBmiList',data);
	};
	this.getRankingMuscleList = function(data){
		console.log('----------------- 건강랭킹[근육량] 목록 --------------------');
		return $http.post('/api/getRankingMuscleList',data);
	};
	this.getRankingFatList = function(data){
		console.log('----------------- 건강랭킹[체지방] 목록 --------------------');
		return $http.post('/api/getRankingFatList',data);
	};
});

app.service('ActivitySvc', function($http) {
	this.getActivityList = function(data){
		console.log('----------------- 나의활동량 목록 가져오기  --------------------');
		return $http.post('/api/getActivityList',data);
	};
});

app.service('MagazineSvc', function($http) {
	this.getMagazineList = function(data){
		console.log('----------------- 건강매거진 목록 가져오기 --------------------');
		return $http.post('/api/getMagazineList',data);
	};
});

app.service('ChallengeSvc', function($http) {
	this.getChallengeList = function(data){
		console.log('----------------- 도전!건강! 목록 가져오기  --------------------');
		return $http.post('/api/getChallengeTop5List',data);
	};
});

app.service('NotiSvc', function($http) {
	this.getNotiList = function(){
		console.log('----------------- 공지사항 가져오기  --------------------');
		return $http.post('/api/getNotiList');
	};
});

app.service('QnaSvc', function($http) {
	this.getQnaList = function(data){
		console.log('----------------- 문의하기 가져오기  --------------------');
		return $http.post('/api/getBoardList',data);
	};
	this.addQna = function(data){
		console.log('----------------- 문의하기 등록  --------------------');
		return $http.post('/api/addBoard',data);
	};
});

app.controller('MainCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'highlighter', 'Upload', 'MainSvc', function($scope, $rootScope, $cookies, $window, $location, highlighter, Upload, MainSvc){
	//기본정보(쿠기에 담기는 정보)
	$scope.home_id = null;
	$scope.member_id = null;
	$scope.mdn = null;
	$scope.is_parent = null;
	
	$scope.badyClass = null;		//body bg-color class
	
	$scope.header_title = null;
	
	//로그인 상태체크
	$scope.loggedIn = function() {
		var hyrid_info = $cookies.getObject("hyrid_info");
		if (hyrid_info != null && hyrid_info != undefined) {
			$scope.home_id = hyrid_info.home_id;
			$scope.member_id = hyrid_info.member_id;
			$scope.mdn = hyrid_info.mdn;
			$scope.is_parent = hyrid_info.is_parent;
			
			$rootScope.home_id = $scope.home_id;
			$rootScope.member_id = $scope.member_id;
			$rootScope.mdn = $scope.mdn;
			$rootScope.is_parent = $scope.is_parent;
			
			var hyrid_info = {home_id:$scope.home_id, member_id:$scope.member_id, mdn:$scope.mdn, is_parent:$scope.is_parent};
			$cookies.putObject("hyrid_info", hyrid_info,{'path': '/hybrid'});
			console.log('로그인 상태 => '+true);
			return true;
		}else{
			console.log('로그인 상태 => '+false);
			return false;
		}
	}
	
	//로그인
	$scope.v_home_id = null;
	$scope.v_mdn = null;
	$scope.family_list = [];
	
	$scope.login = function(){
		if($scope.v_home_id == null || $scope.v_home_id == '') {
			$window.alert("가족명을 입력하세요.");
			return false;
		}
		else if($scope.v_mdn == null || $scope.v_mdn == ''){
			$window.alert("이름을 입력하세요.");
			return false;
		}
		else{
			MainSvc.login({home_id:$scope.v_home_id, mdn:$scope.v_mdn})
				.success(function(response){
					if(response.result == 0) {
						console.log(response.data);
						/*
						var hyrid_info = {home_id:$scope.home_id, member_id:$scope.member_id, is_parent:$scope.is_parent, mdn:$scope.mdn};
						$cookies.putObject("hyrid_info", member_info,{'path': '/', 'expires':expires});
						
						if($scope.is_parent==0){
							console.log('자녀일 경우');
							FamilySvc.getFamilyList({home_id:$scope.home_id})
								.success(function(response){
									var data = response.data;
									for(var i=0;i<data.length;i++){
										console.log('index => '+i);
										if(data[i].is_parent==0 && data[i].name == $scope.v_name){
											$scope.setStudent(data[i]);
											$location.path('/main.html');
											break;
										}
									}
								})
								.error(function(response, state){
									$window.alert("error : " + response.message);
								});
						}else{
							$location.path('/index.html');
						}
						*/
					} else {
						$window.alert(response.msg);
					}
				})
				.error(function(response, state){
					$window.alert("error : " + response.message);
				});
		}
	};
	
	//로그아웃
	$scope.logout = function() {
		console.log('----------------- 로그아웃 --------------------');
		$cookies.remove("hyrid_info",{'path': '/hybrid'});
		$scope.clearStudent();
		
		$scope.home_id = null;
		$scope.member_id = null;
		$scope.mdn = null;
		$scope.is_parent = null;
		
		$window.location.href = '/hybrid/index.html';
	}
	
	$scope.layer_yn = false;		//layer on/off 설정
	$scope.menu_yn = true;		//메뉴버튼 노출여부설정
	
	//이전페이지 이동
	$scope.historyBack = function(){
		if($scope.layer_yn){
			console.log('레이어 클로즈');
		}else{
			console.log('history back');
		}
	}
	
	//메뉴
	$scope.setting_display = 'none';
	$scope.toggleSetting = function(){
		$scope.setting_display = $scope.setting_display == 'none'?'block':'none';
	}
	
	$scope.new_home_id = null;
	$scope.change_home_display = 'none';
	
	$scope.editHomeId = function(){
		$scope.toggleSetting();
		$scope.change_home_display = 'block';
	}
	
	//가족명 변경
	$scope.modHomeId = function(){
		if($scope.new_home_id == null){
			$window.alert('가족명을 입력하세요.');
			return false;
		}else{
			MainSvc.modHomeId({home_id:$scope.home_id,new_home_id:$scope.new_home_id})
				.success(function(response){
					if(response.result==0){
						$window.alert('가족명이 변경되었습니다.');
						//쿠키값 갱신
						var hyrid_info = $cookies.getObject("hyrid_info");
						$cookies.remove("hyrid_info",{'path': '/hybrid'});
						
						$scope.home_id = $scope.new_home_id;
						$scope.member_id = hyrid_info.member_id;
						$scope.name = hyrid_info.name;
						$scope.mdn = hyrid_info.mdn;
						$scope.email = hyrid_info.email;
						$scope.is_parent = hyrid_info.is_parent;
						
						$rootScope.home_id = $scope.home_id;
						$rootScope.member_id = $scope.member_id;
						$rootScope.name = $scope.name;
						$rootScope.mdn = $scope.mdn;
						$rootScope.email = $scope.email;
						$rootScope.is_parent = $scope.is_parent;
						
						var loadDt = new Date();
						var expires = new Date(Date.parse(loadDt) + 1000 * 60*30);  //30분후
						var hyrid_info = {home_id:$scope.home_id, member_id:$scope.member_id, name:$scope.name, is_parent:$scope.is_parent, mdn:$scope.mdn, email:$scope.email};
						$cookies.putObject("hyrid_info", hyrid_info, {'path': '/hybrid', 'expires':expires});
						
						$scope.new_home_id = null;
						$scope.change_home_display = 'none';
					}
				})
				.error(function(data, status) {
					$window.alert("error : " + data.message);
				});
		}
	}
	
	$scope.movePrevUrl = function(){
		window.history.back();
	}

	//학생정보변수
	$scope.student_id = null;
	$scope.student_name = null;
	$scope.student_school_id = null;
	$scope.school_gubun2 = null;
	$scope.pay_date = null;
	
	//학생 메인으로 이동 시, 학생정보 쿠키생성
	$scope.setStudent = function(student){
		$scope.student_id = student.member_id;
		$scope.student_name = student.name;
		$scope.student_school_id = student.school_id;
		$scope.student_school_name = student.school_name;
		$scope.school_gubun2 = student.gubun2;
		$scope.pay_date = student.pay_date;
		
		var student_info = {
			member_id:student.member_id,
			name:student.name,
			school_id:student.school_id,
			school_name:student.school_name,
			gubun2:student.gubun2,
			pay_date:student.pay_date
		};
		
		$cookies.putObject('student_info', student_info,{'path': '/'});
	}
	//가족목록으로 이동 시, 설정된 학생정보 쿠키삭제
	$scope.clearStudent = function(){
		$cookies.remove('student_info',{'path': '/'});
		
		$scope.student_id = null;
		$scope.student_name = null;
		$scope.student_school_id = null;
		$scope.student_school_name = null;
		$scope.school_gubun2 = null;
		$scope.pay_date = null;
	}
	//학생정보획득(쿠키)
	$scope.getStudent = function(){
		var student_info = $cookies.getObject("student_info");
		if(typeof student_info == 'undefined'){
			$window.location.href="#!/index.html";
			return false;
		}
		$scope.student_id = student_info.member_id;
		$scope.student_name = student_info.name;
		$scope.student_school_id = student_info.school_id;
		$scope.student_school_name = student_info.school_name;
		$scope.school_gubun2 = student_info.gubun2;
		$scope.pay_date = student_info.pay_date;
	}
	
	$scope.yyyyMMdd = function(date) {
		if(date == null || date ==''){
			return '';
		}
		var tmp = date.substring(0,10);
		var d = tmp.split("-");
		return d[0]+"."+d[1]+"."+d[2];
	};
	
	//setting scrollbar
	$scope.config = {
		autoHideScrollbar: false,
		theme: 'minimal-dark',
		advanced:{
			updateOnContentResize: true
		},
		scrollInertia: 0
	}
	highlighter.highlight();
	
	$scope.setBodyClass = function(){
		console.log('path => '+$location.path());
		switch($location.path()){
		case 'dining': case 'training':
			break;
		default:
			$scope.badyClass = null;
		}
	}
	
	$scope.init = function(){
		var path = $location.path();
		
		$scope.setBodyClass();
	}
	$scope.init();
}]);
