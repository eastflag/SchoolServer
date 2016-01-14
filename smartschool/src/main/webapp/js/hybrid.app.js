var app = angular.module('hybrid', ['ngRoute', 'ngCookies', 'ngFileUpload', 'ngSanitize','ngScrollbars','ngAnimate','ngTouch', 'ngImgCrop']);

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
}]);

app.config( ['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
		.when('/login', {templateUrl: '/hybrid/templates/login.html', controller:'LoginCtrl'})
		.when('/family', {templateUrl: '/hybrid/templates/family.html', controller:'FamilyCtrl'})
		.when('/student', {templateUrl: '/hybrid/templates/student.html', controller:'StudentCtrl'})
		.when('/join', {templateUrl: '/hybrid/templates/join.html', controller:'JoinCtrl'})
		.when('/height', {templateUrl: '/hybrid/templates/height.html', controller:'GrowthCtrl'})
		.when('/heightHistory', {templateUrl: '/hybrid/templates/height_history.html', controller:'GrowthCtrl'})
		.when('/total', {templateUrl: '/hybrid/templates/total.html', controller:'StudentCtrl'})
		.when('/dining', {templateUrl: '/hybrid/templates/dining.html', controller:'SchoolCtrl'})
		.when('/training', {templateUrl: '/hybrid/templates/training.html', controller:'TrainingCtrl'})
		.when('/weight', {templateUrl: '/hybrid/templates/weight.html', controller:'GrowthCtrl'})
		.when('/weightHistory', {templateUrl: '/hybrid/templates/weight_history.html', controller:'GrowthCtrl'})
		.when('/muscle', {templateUrl: '/hybrid/templates/muscle.html', controller:'StudentCtrl'})
		.when('/rankingHeight', {templateUrl: '/hybrid/templates/ranking_main.html', controller:'RankingCtrl'})
		.when('/rankingWeight', {templateUrl: '/hybrid/templates/ranking_main.html', controller:'RankingCtrl'})
		.when('/rankingBmi', {templateUrl: '/hybrid/templates/ranking_main.html', controller:'RankingCtrl'})
		.when('/rankingMuscle', {templateUrl: '/hybrid/templates/ranking_main.html', controller:'RankingCtrl'})
		.when('/rankingFat', {templateUrl: '/hybrid/templates/ranking_main.html', controller:'RankingCtrl'})
		.when('/rankingHeightDetail', {templateUrl: '/hybrid/templates/ranking_detail.html', controller:'RankingCtrl'})
		.when('/rankingWeightDetail', {templateUrl: '/hybrid/templates/ranking_detail.html', controller:'RankingCtrl'})
		.when('/rankingBmiDetail', {templateUrl: '/hybrid/templates/ranking_detail.html', controller:'RankingCtrl'})
		.when('/rankingMuscleDetail', {templateUrl: '/hybrid/templates/ranking_detail.html', controller:'RankingCtrl'})
		.when('/rankingFatDetail', {templateUrl: '/hybrid/templates/ranking_detail.html', controller:'RankingCtrl'})
		.when('/rankingHeightList', {templateUrl: '/hybrid/templates/ranking_list.html', controller:'RankingCtrl'})
		.when('/rankingWeightList', {templateUrl: '/hybrid/templates/ranking_list.html', controller:'RankingCtrl'})
		.when('/rankingBmiList', {templateUrl: '/hybrid/templates/ranking_list.html', controller:'RankingCtrl'})
		.when('/rankingMuscleList', {templateUrl: '/hybrid/templates/ranking_list.html', controller:'RankingCtrl'})
		.when('/rankingFatList', {templateUrl: '/hybrid/templates/ranking_list.html', controller:'RankingCtrl'})
		.when('/obesity', {templateUrl: '/hybrid/templates/obesity.html', controller:'StudentCtrl'})
		.when('/smoking', {templateUrl: '/hybrid/templates/smoking.html', controller:'StudentCtrl'})
		.when('/assistance', {templateUrl: '/hybrid/templates/assistance.html', controller:'StudentCtrl'})
		.when('/activity', {templateUrl: '/hybrid/templates/activity.html', controller:'ActivityCtrl'})
		.when('/magazine', {templateUrl: '/hybrid/templates/magazine.html', controller:'MagazineCtrl'})
		.when('/magazine_view', {templateUrl: '/hybrid/templates/magazine_view.html', controller:'MagazineCtrl'})
		.when('/schoolMessage', {templateUrl: '/hybrid/templates/school_message.html', controller:'SchoolCtrl'})
		.when('/schoolSchedule', {templateUrl: '/hybrid/templates/school_schedule.html', controller:'SchoolCtrl'})
		.when('/schoolNoti', {templateUrl: '/hybrid/templates/school_noti.html', controller:'SchoolCtrl'})
		.when('/challenge', {templateUrl: '/hybrid/templates/challenge.html', controller:'ChallengeCtrl'})
		.when('/challengeApply', {templateUrl: '/hybrid/templates/challenge_apply.html', controller:'ChallengeCtrl'})
		.when('/consult', {templateUrl: '/hybrid/templates/consult.html', controller:'ConsultCtrl'})
		.when('/safeGuard', {templateUrl: '/hybrid/templates/safe_guard.html', controller:'SafeGuardCtrl'})
		.when('/consultChat', {templateUrl: '/hybrid/templates/consult_chat.html', controller:'ConsultCtrl'})
		.when('/noti', {templateUrl: '/hybrid/templates/noti.html', controller:'NotiCtrl'})
		.when('/qna', {templateUrl: '/hybrid/templates/qna.html', controller:'QnaCtrl'})
		.when('/inquiry', {templateUrl: '/hybrid/templates/inquiry.html', controller:'QnaCtrl'})
		.when('/info', {templateUrl: '/hybrid/templates/info.html', controller:'OsInfoCtrl'})
		
	$locationProvider.html5Mode(false);
	$locationProvider.hashPrefix('!');
}]);

app.service('MainSvc', function($http) {
	this.modHomeId = function(data){
		console.log('----------------- 가족명변경 --------------------');
		return $http.post('/api/modifyHome', data);
	};
});

app.service('LoginSvc', function($http) {
	this.login = function(data){
		console.log('----------------- 로그인 --------------------');
		return $http.post('/api/signInOfMobile', data);
	};
	this.requestSmsCertifyKey = function(data){
		console.log('----------------- 인증번호요청 --------------------');
		return $http.post('/web/api/getSmsCertifyKey', data);
	};
	this.confirmCertify = function(data){
		console.log('----------------- 인증번호요청 --------------------');
		return $http.post('/web/api/confirmCertify', data);
	};
});

app.service('JoinSvc', function($http) {
	this.join = function(data){
		console.log('----------------- 회원가입(모바일) --------------------');
		return $http.post('/api/signUp', data);
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
	this.removeProfile = function(data){
		console.log('----------------- 프로필사진 삭제 --------------------');
		return $http.post('/api/removeProfile', data);
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
	this.getMagazineView = function(data){
		console.log('----------------- 건강매거진 상세 --------------------');
		return $http.post('/api/getMagazine',data);
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

app.service('OsInfoSvc', function($http) {
	this.getOsInfo = function(data){
		console.log('----------------- 앱 OS정보 가져오기  --------------------');
		return $http.post('/api/getOsInfo',data);
	};
});

app.service('ConsultSvc', function($http) {
	this.addConsult = function(data){
		console.log('----------------- 상담등록  --------------------');
		return $http.post('/api/addConsult',data);
	};
	this.getConsultList = function(data){
		console.log('----------------- 상담목록 가져오기  --------------------');
		return $http.post('/api/getConsultList',data);
	};
	this.getConsultHistory = function(data){
		console.log('----------------- 상담이력 가져오기  --------------------');
		return $http.post('/api/getConsultHistory',data);
	};
});

app.service('SafeGuardSvc', function($http) {
	this.getLastLocation = function(data){
		console.log('----------------- 자녀위치정보 가져오기  --------------------');
		return $http.post('/api/getLastLocation',data);
	};
	this.addLocation = function(data){
		console.log('----------------- 자녀위치 전송  --------------------');
		return $http.post('/api/addLocation',data);
	};
});

app.controller('MainCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'highlighter', 'Upload', 'MainSvc', function($scope, $rootScope, $cookies, $window, $location, highlighter, Upload, MainSvc){
	//기본정보(로그인 정보)
	$scope.home_id = null;
	$scope.member_id = null;
	$scope.mdn = null;
	$scope.is_parent = null;
	
	//학생정보
	$scope.student_id = null;
	$scope.student_name = null;
	
	//로그인 상태체크
	$scope.loggedIn = function() {
		var user_info = $cookies.getObject("user_info");
		if (user_info != null && user_info != undefined) {
			$scope.home_id = user_info.home_id;
			$scope.member_id = user_info.member_id;
			$scope.mdn = user_info.mdn;
			$scope.is_parent = user_info.is_parent;
			
			$rootScope.home_id = $scope.home_id;
			$rootScope.member_id = $scope.member_id;
			$rootScope.mdn = $scope.mdn;
			$rootScope.is_parent = $scope.is_parent;
			console.log('로그인 상태 => '+true);
			return true;
		}else{
			console.log('로그인 상태 => '+false);
			return false;
		}
	}
	
	//로그아웃
	$scope.logout = function() {
		console.log('----------------- 로그아웃 --------------------');
		gnbHide();
		$cookies.remove("user_info",{'path': '/hybrid'});
		$scope.clearStudent();
		
		$scope.home_id = null;
		$scope.member_id = null;
		$scope.mdn = null;
		$scope.is_parent = null;
		
		$location.path('login');
	}
	
	//이전페이지 이동
	$scope.historyBack = function(){
		window.history.back();
	}
	
	//목록박스 너비,높이 설정
	$scope.setWrappeDimension = function(target, h){
		$(target).height($window.innerHeight - h);
		setTimeout(function(){
			$(target).find('.list').width($(target).width());
		},500);
	}
	
	//가족명 변경
	$scope.new_home_id = null;
	$scope.modHomeId = function(){
		if($scope.new_home_id == null){
			UTIL.alert('가족명을 입력하세요.');
			return false;
		}else{
			MainSvc.modHomeId({home_id:$scope.home_id,new_home_id:$scope.new_home_id})
				.success(function(response){
					if(response.result==0){
						UTIL.alert('가족명이 변경되었습니다.');
						//쿠키값 갱신
						var user_info = $cookies.getObject("user_info");
						$cookies.remove("user_info",{'path': '/hybrid'});
						
						$scope.home_id = $scope.new_home_id;
						$scope.member_id = user_info.member_id;
						$scope.mdn = user_info.mdn;
						$scope.is_parent = user_info.is_parent;
						
						$rootScope.home_id = $scope.home_id;
						$rootScope.member_id = $scope.member_id;
						$rootScope.mdn = $scope.mdn;
						$rootScope.is_parent = $scope.is_parent;
						
						var user_info = {home_id:$scope.home_id, member_id:$scope.member_id, mdn:$scope.mdn, is_parent:$scope.is_parent};
						$cookies.putObject("user_info", user_info,{'path': '/hybrid'});
						
						$scope.new_home_id = null;
						commonLayerClose('family_modify');
					}
				})
				.error(function(data, status) {
					UTIL.alert("error : " + data.message);
				});
		}
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
		
		$cookies.putObject('student_info', student_info,{'path': '/hybrid'});
		$location.path('/student');
	}
	
	//가족목록으로 이동 시, 설정된 학생정보 쿠키삭제
	$scope.clearStudent = function(){
		$cookies.remove('student_info',{'path': '/hybrid'});
		
		$scope.student_id = null;
		$scope.student_name = null;
		$scope.student_school_id = null;
		$scope.student_school_name = null;
		$scope.school_gubun2 = null;
		$scope.pay_date = null;
	}
	
	//학생정보 얻기
	$scope.getStudent = function(){
		var student_info = $cookies.getObject("student_info");
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
	
	//회원가입 시, 저장한 가입정보 유무 판단. 
	$scope.getParentJoinData = function(){
		var parent_join_info = $cookies.getObject('parent_join_info');
		if (parent_join_info != null && typeof parent_join_date != undefined) {
			return true;
		}else{
			return false;
		}
	}
	
	//회원가입 시, 저장한 부모가입정보 삭제. 
	$scope.deleteParentJoinData = function(){
		$cookies.remove('parent_join_info',{'path': '/hybrid'});
	}

	//유/무료확인
	$scope.alertPayment = function(){
		UTIL.alert('통합서비스 신청시 이용가능합니다.\n고객센터로 문의하시기 바랍니다.\nTel : 1544-1284');
	}
	
	//setting scrollbar
	$scope.config = {
		autoHideScrollbar: false,
		theme: 'minimal-dark',
		advanced:{
			updateOnContentResize: true
		},
		scrollInertia: 0,
		axis : 'y'
	}
	highlighter.highlight();
	
	$scope.badyClass = null;
	$scope.menu_yn = true;
	$scope.header_title = null;
	$scope.backBtnSttus = true;
	
	$scope.init = function(bgClass,title,menu,btnBack){
		var path = $location.path();
		if($scope.loggedIn()){
			if(path == '' || path =='/join' || path == '/login'){
				if($scope.is_parent==1){
					$location.path('family');
				} else if($scope.is_parent==0){
					$location.path('student');
				}
			}
			
		}else{
			switch(path){
			case '/join':
				$location.path('join');
				break;
			default:
				$location.path('login');
			}
		}
		
		$scope.menu_yn = menu;
		$scope.header_title = title;
		$scope.backBtnSttus = btnBack;
		$scope.badyClass = bgClass;
	}
	
	$scope.init(null,$scope.home_id,true,true);
	$scope.setWrappeDimension('#loadWrapper', 0);
}]);

app.controller('LoginCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'LoginSvc', function($scope, $rootScope, $cookies, $window, $location, LoginSvc){
	//로그인
	$scope.v_home_id = null;
	$scope.v_mdn = null;
	$scope.login = function(){
		if($scope.v_home_id == null || $scope.v_home_id == '') {
			UTIL.alert("가족명을 입력하세요.");
			return false;
		}
		else if($scope.v_mdn == null || $scope.v_mdn == ''){
			UTIL.alert("전화번호를 입력하세요.");
			return false;
		}
		else{
			LoginSvc.login({home_id:$scope.v_home_id, mdn:$scope.v_mdn})
				.success(function(response){
					if(response.result == 0) {
						var family_list = response.data;
						
						//로그인 사용자 설정
						var student_idx = 0;
						for(var i=0; i<family_list.length; i++){
							if($scope.v_mdn == family_list[i].mdn){
								student_idx = i;
								$scope.home_id = family_list[i].home_id;
								$scope.member_id = family_list[i].member_id;
								$scope.mdn = family_list[i].mdn;
								$scope.is_parent = family_list[i].is_parent;
								
								$rootScope.home_id = $scope.home_id;
								$rootScope.member_id = $scope.member_id;
								$rootScope.mdn = $scope.mdn;
								$rootScope.is_parent = $scope.is_parent;
								
								var user_info = {home_id:$scope.home_id, member_id:$scope.member_id, mdn:$scope.mdn, is_parent:$scope.is_parent};
								$cookies.putObject("user_info", user_info,{'path': '/hybrid'});
								break;
							}
						}
						if($scope.is_parent==0){
							$scope.setStudent(family_list[student_idx]);
							$location.path('student');
						}else{
							$location.path('family');
						}
					} else {
						UTIL.alert(response.msg);
					}
				})
				.error(function(response, state){
					UTIL.alert("error : " + response.message);
				});
		}
	};
	
	$scope.phone = null;
	$scope.certifyKey = null;
	$scope.certify_statue = false;
	
	$scope.clearLayer = function(){
		$scope.phone = null;
		$scope.certifyKey = null;
		$scope.certify_statue = false;
		
		commonLayerClose('find_family');
	}
	
	$scope.checkStatus = function(){
		if($scope.phone==null || $scope.phone=='' || $scope.phone.lenght < 4){
			$scope.certify_statue = false;
		}
	}
	
	$scope.getCertifyNumber = function(){
		if($scope.certify_statue){
			$window.alert('인증번호 요청중입니다.');
			return false;
		}
		if($scope.phone==null || $scope.phone ==''){
			$window.alert('전화번호를 입력하세요.');
			return false;
		}else{
			LoginSvc.requestSmsCertifyKey({mdn:$scope.phone})
				.success(function(response){
					if(response.result!=0){
						$window.alert('등록된 회원이 아닙니다.');
					}else{
						$scope.certify_statue = true;
					}
				})
				.error(function(response, state){
					$window.alert("error : " + response.message);
				});
		}
	}
	
	$scope.confirmCertify = function(){
		if(!$scope.certify_statue){
			$window.alert('인증번호 요청을 먼저 진행하세요.');
			return false;
		} else if ($scope.certifyKey==null || $scope.certifyKey==''){
			$window.alert('인증번호를 입력하세요.');
			return false;
		}else{
			$scope.certify_statue = false;
			LoginSvc.confirmCertify({certifyKey:$scope.certifyKey})
				.success(function(response){
					if(response.result==0){
						commonLayerClose('find_family');
						$scope.clearLayer();
						$scope.v_home_id = response.data.home_id;
					}
				})
				.error(function(response, state){
					$scope.certify_statue = false;
					$window.alert("error : " + response.message);
				});
		}
		
	}
	
	$scope.init(null,null,false,false);
	$scope.setWrappeDimension('#login_wrap',0);
	console.log('------------------ LoginCtrl ------------------');
}]);

app.controller('JoinCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'Upload', 'LoginSvc', 'JoinSvc', function($scope, $rootScope, $cookies, $window, $location, Upload, LoginSvc, JoinSvc){
	//회원가입변수
	$scope.v_home_id=null;
	$scope.v_name=null;
	$scope.v_mdn=null;
	$scope.v_relation=null;
	
	$scope.agree1 = false;
	$scope.agree2 = false;
	$scope.agree3 = false;
	$scope.check_all = false;
	
	//프로필사진 변수
	$scope.profile = null;
	$scope.cropped_profile = null;
	$scope.saved_profile = null;
	$scope.crop_state = false;
	
	$scope.crop_init = function(){
		var handleFileSelect=function(evt) {
			$scope.profile = null;
			$scope.cropped_profile = null;
			$scope.saved_profile = null;
			$scope.crop_state = true;
			commonLayerOpen('profile-crop-area');
			
			var file=evt.currentTarget.files[0];
			
			if(file.name.indexOf('.jpg') > -1 || file.name.indexOf('.png') > -1 || file.name.indexOf('.gif') > -1){
				var reader = new FileReader();
				reader.onload = function (evt) {
					$scope.$apply(function($scope){
						$scope.profile=evt.target.result;
					});
				};
				reader.readAsDataURL(file);
			}else{
				UTIL.alert('이미지 파일만 등록가능합니다.');
			}
			
		};
		angular.element(document.querySelector('#add_photo')).on('change',handleFileSelect);
	}
	
	$scope.clearCrop = function(){
		$scope.saved_profile = $scope.cropped_profile;
		commonLayerClose('profile-crop-area');
	}
	
	$scope.clearProfile = function(){
		$scope.profile = null;
		$scope.cropped_profile = null;
		$scope.crop_state = false;
		$scope.saved_profile = null;
		angular.element(document.querySelector('#add_photo')).val(null);
	}
	
	//회원가입
	$scope.join = function(){
		if($scope.v_home_id==null){
			UTIL.alert('가족명을 입력하세요.');
			return false;
		}
		else if($scope.v_name==null){
			UTIL.alert('이름을 입력하세요.');
			return false;
		}
		else if($scope.v_mdn==null){
			UTIL.alert('전화번호를 입력하세요.');
			return false;
		}
		else if($scope.v_relation==null){
			UTIL.alert('관계를 입력하세요.');
			return false;
		}
		else if($scope.agree1==false || $scope.agree2==false || $scope.agree3==false){
			UTIL.alert('모든 약관에 동의하셔야 합니다.');
			return false;
		}
		else{
			var param = {home_id:$scope.v_home_id, name:$scope.v_name, mdn:$scope.v_mdn, relation:$scope.v_relation, is_parent:1};
			var data = null;
			if($scope.crop_state){
				data = {profile:Upload.dataUrltoBlob($scope.saved_profile), data:JSON.stringify(param)};
			}else{
				data = {profile:null, data:JSON.stringify(param)};
			}
			
			$scope.upload = Upload.upload({
				url: '/web/api/signUpWeb',
				data : data
			})
			.success(function(response, status, headers, config) {
				$scope.clearProfile();
				if(response.result==0){
					/* 회원가입 완료 후 로그인 처리 */
					LoginSvc.login({home_id:$scope.v_home_id, mdn:$scope.v_mdn})
						.success(function(response){
							if(response.result == 0) {
								var family_list = response.data;
								
								//로그인 사용자 설정
								$scope.home_id = family_list[0].home_id;
								$scope.member_id = family_list[0].member_id;
								$scope.mdn = family_list[0].mdn;
								$scope.is_parent = family_list[0].is_parent;
								
								var user_info = {home_id:$scope.home_id, member_id:$scope.member_id, mdn:$scope.mdn, is_parent:$scope.is_parent};
								$cookies.putObject("user_info", user_info,{'path': '/hybrid'});
								$cookies.putObject('parent_join_info', {join_date:new Date()},{'path': '/hybrid'});
								$location.path('family');
							}
						})
						.error(function(response, state){
							UTIL.alert("error : " + response.message);
						});
				}else{
					$scope.clearProfile();
				}
			})
			.error(function(data, status) {
				$scope.clearProfile();
				UTIL.alert("error : " + data.message);
			});
		}
	}
	$scope.checkAgree = function(){
		if($scope.agree1 && $scope.agree2 && $scope.agree3){
			$scope.check_all=true;
		}else{
			$scope.check_all=false;
		}
	}
	$scope.checkAll = function(){
		if($scope.check_all==false){
			$scope.agree1 = false;
			$scope.agree2 = false;
			$scope.agree3 = false;
		}else{
			$scope.agree1 = true;
			$scope.agree2 = true;
			$scope.agree3 = true;
		}
	}
	
	$scope.init(null,null,false,false);
	$scope.setWrappeDimension('#join_wrap',65);
	$scope.crop_init();
	
	console.log('------------------ JoinCtrl ------------------');
}]);

app.controller('FamilyCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'Upload', 'FamilySvc', function($scope, $rootScope, $cookies, $window, $location, Upload, FamilySvc){
	$scope.add_complete_yn = false;		//구성원 추가 후, 추가완료 레이어 노출여부 설정
	
	$scope.family_list = [];
	
	//가족구성원 등록/수정 변수
	$scope.v_is_parent = null;
	$scope.v_member_id = null;
	$scope.v_mdn = null;
	$scope.v_name = null;
	$scope.v_relation = null;
	$scope.v_birth_date = null;
	$scope.v_school_id = null;
	$scope.v_school_name = null;
	$scope.v_school_grade = null;
	$scope.v_school_class = null;
	$scope.v_sex = null;
	$scope.v_photo = null;
	
	$scope.family_edit_mode = null;
	$scope.family_mode_text = '';
	$scope.family_mode_text2 = '';
	$scope.family_relation_text = '';

	//프로필사진 변수
	$scope.profile = null;
	$scope.cropped_profile = null;
	$scope.saved_profile = null;
	$scope.crop_state = false;
	
	$scope.crop_init = function(){
		$scope.profile = null;
		$scope.cropped_profile = null;
		
		var handleFileSelect=function(evt) {
			$scope.crop_state = true;
			commonLayerClose('family_add01');
			commonLayerOpen('profile-crop-area');
			
			var file=evt.currentTarget.files[0];
			
			if(file.name.indexOf('.jpg') > -1 || file.name.indexOf('.png') > -1 || file.name.indexOf('.gif') > -1){
				var reader = new FileReader();
				reader.onload = function (evt) {
					$scope.$apply(function($scope){
						$scope.profile=evt.target.result;
					});
				};
				reader.readAsDataURL(file);
			}else{
				UTIL.alert('이미지 파일만 등록가능합니다.');
			}
			
		};
		angular.element(document.querySelector('#add_photo')).on('change',handleFileSelect);
	}
	
	$scope.clearCrop = function(){
		$scope.saved_profile = $scope.cropped_profile;
		commonLayerClose('profile-crop-area');
		commonLayerOpen('family_add01');
	}
	
	$scope.clearProfile = function(){
		$scope.profile = null;
		$scope.cropped_profile = null;
		$scope.saved_profile = null;
		$scope.crop_state = false;
		angular.element(document.querySelector('#add_photo')).val(null);
	}
	
	$scope.removeProfile = function(){
		FamilySvc.removeProfile({member_id:$scope.v_member_id})
			.success(function(response){
				if(response.result==0){
					$scope.v_photo = null;
				}
			})
			.error(function(response, state){
				UTIL.alert("error : " + response.message);
			});
	}
	
	$scope.getFamilyList = function(){
		$scope.clear();
		$scope.clearStudent();
		$scope.family_list = [];
		FamilySvc.getFamilyList({home_id:$scope.home_id})
			.success(function(response){
				if(response.result==0){
					$scope.family_list = response.data;
					
					$scope.setWrappeDimension('#family_list_wrapper', 200);
				}
			})
			.error(function(response, status) {
				UTIL.alert("error : " + response.message);
			});
	};
	
	$scope.clear = function(){
		$scope.clearProfile();
		
		$scope.family_edit_mode = null;
		$scope.family_mode_text = '';
		$scope.family_mode_text2 = '';
		$scope.family_relation_text = '';

		$scope.v_is_parent = null;
		$scope.v_member_id = null;
		$scope.v_mdn = null;
		$scope.v_name = null;
		$scope.v_relation = null;
		$scope.v_birth_date = null;
		$scope.v_school_id = null;
		$scope.v_school_name = null;
		$scope.v_school_grade = null;
		$scope.v_school_class = null;
		$scope.v_sex = null;
		$scope.v_photo = null;
		
		commonLayerClose('family_add01');
	}
	
	$scope.addFamily = function(is_parent){
		$scope.v_is_parent = is_parent;
		$scope.family_edit_mode = 'add';
		$scope.family_mode_text = '가족 구성원 추가';
		if($scope.v_is_parent == 1){
			$scope.family_mode_text2 = '부모정보 등록';
			$scope.family_relation_text = '관계, 예)엄마, 아빠';
		}else{
			$scope.family_mode_text2 = '학생정보 등록';
			$scope.family_relation_text = '관계, 예)아들, 딸';
		}
		commonLayerOpen('family_add01');
	}
	
	//가족구성원 수정화면 값설정
	$scope.modFamily = function(member){
		$scope.v_is_parent = member.is_parent;
		$scope.v_member_id = member.member_id;
		$scope.v_mdn = member.mdn;
		$scope.v_name = member.name;
		$scope.v_relation = member.relation;
		$scope.v_birth_date = member.birth_date;
		$scope.v_school_id = member.school_id;
		$scope.v_school_name = member.school_name;
		$scope.v_school_grade = member.school_grade;
		$scope.v_school_class = member.school_class;
		$scope.v_sex = member.sex;
		$scope.v_photo = member.photo;
		
		$scope.family_edit_mode = 'edit';
		$scope.family_mode_text = '가족 구성원 수정';
		if($scope.v_is_parent == 1){
			$scope.family_mode_text2 = '부모정보 수정';
		}else{
			$scope.family_mode_text2 = '학생정보 수정';
		}
		commonLayerOpen('family_add01');
	};

	$scope.search_school_status = false;	//학교검색 노출 상태
	$scope.openSearchSchool = function(){
		$scope.search_school_status = true;
		commonLayerClose('family_add01');
	};
	$scope.closeSearchSchool = function(){
		$scope.search_school_status = false;
		commonLayerOpen('family_add01');
	};
	
	$scope.search_text = null;
	$scope.school_list = [];
	
	//학교목록 조회
	$scope.searchSchool = function(){
		if($scope.search_text != null){
			FamilySvc.getSchoolList({school_name:$scope.search_text})
				.success(function(response){
					$scope.school_list = [];
					if(response.result == 0){
						$scope.school_list = response.data;
						
						$scope.setWrappeDimension('#school_list_wrapper', 100);
					}
				})
				.error(function(data, status) {
					UTIL.alert("error : " + data.message);
				});
		}
	};
	$scope.setSchool = function(school){
		commonLayerOpen('family_add01');
		$scope.v_school_id = school.school_id;
		$scope.v_school_name = school.school_name;
		$scope.search_school_status = false;
		$scope.search_text = null;
		$scope.school_list = [];
	};
	
	//가족구성원 추가
	$scope.addMember = function(){
		if($scope.v_mdn==null){
			UTIL.alert('휴대전화번호을 입력하세요.');
			return false;
		}
		else if($scope.v_name==null){
			UTIL.alert('이름을 입력하세요.');
			return false;
		}
		else if($scope.v_relation==null){
			UTIL.alert('관계를 입력하세요.');
			return false;
		}
		else if($scope.v_is_parent==0){
			if($scope.v_birth_date==null){
				UTIL.alert('생년월일을 입력하세요.');
				return false;
			}else if($scope.v_school_id==null || $scope.v_school_name==null){
				UTIL.alert('학교명을 입력하세요.');
				return false;
			}else if($scope.v_school_grade==null){
				UTIL.alert('학년을 입력하세요.');
				return false;
			}else if($scope.v_school_class == null){
				UTIL.alert('반을 입력하세요.');
				return false;
			}else if($scope.v_sex == null || $scope.v_sex == ''){
				UTIL.alert('성별을 선택하세요.');
				return false;
			}
		}
		else{
			var data = null;
			var param = null;
			if($scope.v_is_parent==1){
				param = {
					home_id:$scope.home_id, mdn:$scope.v_mdn, name:$scope.v_name,
					relation:$scope.v_relation, is_parent:$scope.v_is_parent
				};
			}else{
				param = {
					home_id:$scope.home_id, mdn:$scope.v_mdn, name:$scope.v_name, relation:$scope.v_relation,
					is_parent:$scope.v_is_parent, sex:$scope.v_sex, birth_date:$scope.v_birth_date,
					school_id:$scope.v_school_id, school_grade:$scope.v_school_grade, school_class:$scope.v_school_class
				};
			}
			if($scope.crop_state){
				data = {profile:Upload.dataUrltoBlob($scope.saved_profile), data:JSON.stringify(param)};
			}else{
				data = {profile:null,data:JSON.stringify(param)};
			}
			
			$scope.upload = Upload.upload({
				url: '/web/api/addMember',
				data : data
			}).success(function(response) {
				if(response.result==0){
					if(!$scope.getAddCompleteYn()){
						$scope.clear();
						commonLayerOpen('add_member_complete');
					}else{
						$scope.getFamilyList();
					}
				}else{
					UTIL.alert(response.msg);
				}
			}).error(function(data, status) {
				UTIL.alert("error : " + data.message);
			});
		}
	};
	
	//가족구성원 정보수정
	$scope.modMember = function(){
		if($scope.v_mdn==null){
			UTIL.alert('휴대전화번호을 입력하세요.');
			return false;
		}
		else if($scope.v_name==null){
			UTIL.alert('이름을 입력하세요.');
			return false;
		}
		else if($scope.v_relation==null){
			UTIL.alert('관계를 입력하세요.');
			return false;
		}
		else if($scope.v_is_parent==0){
			if($scope.v_birth_date==null){
				UTIL.alert('생년월일을 입력하세요.');
				return false;
			}else if($scope.v_school_id==null || $scope.v_school_name==null){
				UTIL.alert('학교명을 입력하세요.');
				return false;
			}else if($scope.v_school_grade==null){
				UTIL.alert('학년을 입력하세요.');
				return false;
			}else if($scope.v_school_class == null){
				UTIL.alert('반을 입력하세요.');
				return false;
			}else if($scope.v_sex == null || $scope.v_sex == ''){
				UTIL.alert('성별을 선택하세요.');
				return false;
			}
		}
		var data = null;
		var param = null;
		if($scope.v_is_parent==1){
			param = {
				home_id:$scope.home_id, member_id:$scope.v_member_id, mdn:$scope.v_mdn,
				name:$scope.v_name, relation:$scope.v_relation, is_parent:$scope.v_is_parent
			};
		}else{
			param = {
				home_id:$scope.home_id, member_id:$scope.v_member_id, mdn:$scope.v_mdn, name:$scope.v_name,
				relation:$scope.v_relation, is_parent:$scope.v_is_parent, sex:$scope.v_sex, birth_date:$scope.v_birth_date,
				school_id:$scope.v_school_id, school_grade:$scope.v_school_grade, school_class:$scope.v_school_class
			};
		}
		if($scope.crop_state){
			data = {profile:Upload.dataUrltoBlob($scope.saved_profile), data:JSON.stringify(param)};
		}else{
			data = {profile:null,data:JSON.stringify(param)};
		}
		
		$scope.upload = Upload.upload({
			url: '/web/api/modMember',
			data : data
		}).success(function(response) {
			if(response.result==0){
				UTIL.alert('가족구성원 정보가 수정되었습니다.');
				$scope.getFamilyList();
			}else{
				UTIL.alert('가족구성원 정보수정 실패!\n잠시 후 다시 시도하세요.');
			}
		}).error(function(data, status) {
			UTIL.alert("error : " + data.message);
		});
	};
	
	//가족구성원 삭제
	$scope.removeMember = function(member){
		if(confirm('해당 가족구성원을 삭제하시겠습니까?')){
			FamilySvc.removeMember({member_id:member.member_id})
				.success(function(response) {
					if(response.result==0){
						UTIL.alert('가족구성원이 삭제되었습니다.');
						$scope.getFamilyList();
					}else{
						UTIL.alert('가족구성원 삭제실패!\n잠시 수 다시 시도하세요.');
					}
				})
				.error(function(response, state) {
					UTIL.alert("error : " + response.message);
				});
		}else{
			return false;
		}
	};
	
	$scope.setAddCompleteYn = function(){
		$cookies.put("add_complete_yn", 'Y',{'path': '/hybrid'});
	}
	
	//구성원 추가 후, 레이어 노출여부 설정값 가져오기
	$scope.getAddCompleteYn = function(){
		var add_complete_yn = $cookies.get("add_complete_yn");
		if(typeof add_complete_yn == 'undefiend'){
			$scope.add_complete_yn = false;
		}else{
			$scope.add_complete_yn = true;
		}
	}
	
	$scope.confirmAddMember = function(){
		commonLayerClose('add_member_complete');
		if($scope.add_complete_yn==true){
			$scope.setAddCompleteYn();
		}
		$window.location.reload();
	}
	
	//부모 회원가입 레이어 확인 버튼 : 부모의 회원가입정보를 삭제 및 구성원 추가 레이어 노출 
	$scope.joinCompleteAddMember = function(){
		commonLayerClose('join_complete');
		$scope.deleteParentJoinData();
		$scope.addFamily(1);
	}
	
	if($scope.loggedIn()){
		$scope.init(null,$scope.home_id,true,false);
		$scope.getFamilyList();
		$scope.crop_init();
		//부모회원 가입정보 확인. 가입정보 없을 경우 부모회원가입완료 레이어를 띄우지 않는다.
		if($scope.getParentJoinData()){
			commonLayerOpen('join_complete');
		};
	}
	
	console.log('------------------ FamilyCtrl ------------------');
}]);

app.controller('StudentCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'StudentSvc', function($scope, $rootScope, $cookies, $window, $location, StudentSvc){
	$scope.school_grade_id = null;
	$scope.height = null;
	$scope.heightStatus = null;
	$scope.heightGradeId = null;
	$scope.weight = null;
	$scope.weightStatus = null;
	$scope.weightGradeId = null;
	$scope.weight_control = null;
	$scope.fat = null;
	$scope.fat_control = null;
	$scope.muscle = null;
	$scope.muscle_control = null;
	$scope.waist = null;
	$scope.skeletal = null;
	$scope.bmi = null;
	$scope.bmiStatus = null;
	$scope.bmiGradeId = null;
	$scope.ppm = null;
	$scope.cohd = null;
	$scope.smokeStatus = null;
	$scope.growthGrade = null;
	$scope.recode_status = false;
	
	$scope.muscle_string = null;
	$scope.bmi_step = null;
	$scope.bmi_string = null;
	
	$scope.checkMeasure = function(url){
		if($scope.pay_date == null){
			UTIL.alert('통합서비스 신청시 이용가능합니다.\n고객센터로 문의하시기 바랍니다.\nTel : 1544-1284');
		} else{
			if(!$scope.recode_status){
				UTIL.alert('건강정보 측정 기록이 없습니다.\n 측정 후 이용 바랍니다.');
			}
			$location.path(url);
		}
	}
	//비만도 단계설정
	$scope.setBmiString = function(){
		switch($scope.bmiStatus){
		case '고도비만 A':
			$scope.bmi_string = '고도비만 관리';
			$scope.bmi_step = 6;
			break;
		case '고도비만 B':
			$scope.bmi_string = '고도비만 경고';
			$scope.bmi_step = 6;
			break;
		case '고도비만 C':
			$scope.bmi_string = '고도비만 위험';
			$scope.bmi_step = 6;
			break;
		case '중도비만 A':
			$scope.bmi_string = '중도비만관리';
			$scope.bmi_step = 5;
			break;
		case '중도비만 B':
			$scope.bmi_string = '중도비만 경고';
			$scope.bmi_step = 5;
			break;
		case '중도비만 C':
			$scope.bmi_string = '중도비만 위험';
			$scope.bmi_step = 5;
			break;
		case '비만 A':
			$scope.bmi_string = '비만 관리';
			$scope.bmi_step = 4;
			break;
		case '비만 B':
			$scope.bmi_string = '비만 경고';
			$scope.bmi_step = 4;
			break;
		case '비만 C':
			$scope.bmi_string = '비만 위험';
			$scope.bmi_step = 4;
			break;
		case '과체중 A':
			$scope.bmi_string = '과체중 경고';
			$scope.bmi_step = 3;
			break;
		case '과체중 B':
			$scope.bmi_string = '과체중 위험';
			$scope.bmi_step = 3;
			break;
		case '정상 A':
			$scope.bmi_string = '정상 보통';
			$scope.bmi_step = 2;
			break;
		case '정상 B':
			$scope.bmi_string = '정상 관리';
			$scope.bmi_step = 2;
			break;
		case '저체중 A':
			$scope.bmi_string = '저체중 노력';
			$scope.bmi_step = 1;
			break;
		case '저체중 B':
			$scope.bmi_string = '저체중 경고';
			$scope.bmi_step = 1;
			break;
		case '저체중 C':
			$scope.bmi_string = '저체중 위험';
			$scope.bmi_step = 1;
			break;
		}
	}
	
	//근육량 비율 계산
	$scope.setMuscleString = function(){
		if($scope.weightStatus == '표준 이하'){
			$scope.muscle_string = '부족';
		}else if($scope.$scope == '표준 이상'){
			$scope.muscle_string = '많음';
		}else{
			$scope.muscle_string = '정상';
		}
	}
	
	//학생의요약정보 가져오기
	$scope.getMeasureSummary = function(){
		StudentSvc.getMeasureSummary({member_id:$scope.student_id})
			.success(function(response){
				if(response.result==0){
					$scope.school_id = response.data.school_id;
					$scope.school_grade_id = response.data.school_grade_id;
					$scope.sex = response.data.sex;
					$scope.height = response.data.height;
					$scope.heightStatus = response.data.heightStatus;
					$scope.heightGradeId = response.data.heightGradeId;
					$scope.weight = response.data.weight;
					$scope.weightStatus = response.data.weightStatus;
					$scope.weightGradeId = response.data.weightGradeId;
					$scope.weight_control = response.data.weight_control;
					$scope.fat = response.data.fat;
					$scope.fat_control = response.data.fat_control;
					$scope.muscle = response.data.muscle;
					$scope.muscle_control = response.data.muscle_control;
					$scope.waist = response.data.waist;
					$scope.skeletal = response.data.skeletal;
					$scope.bmi = response.data.bmi;
					$scope.bmiStatus = response.data.bmiStatus;
					$scope.bmiGradeId = response.data.bmiGradeId;
					$scope.ppm = response.data.ppm;
					$scope.cohd = response.data.cohd;
					$scope.smokeStatus = response.data.smokeStatus;
					$scope.growthGrade = response.data.growthGrade;
					
					$scope.recode_status = true;
					
					switch($location.path()){
					case '/total': case '/obesity':
						$scope.setBmiString();
						break;
					case '/muscle':
						$scope.setMuscleString();
						break;
					}
				}
			})
			.error(function(response, state) {
				UTIL.alert("error : " + response.message);
			});
	}

	$scope.getStudent();
	$scope.getMeasureSummary();
	switch($location.path()){
	case '/student':
		$scope.setWrappeDimension('#student_main_wrap',0);
		if($scope.is_parent==1){
			$scope.init('body_gray',$scope.student_name,true,true);
		}else{
			$scope.init('body_gray',$scope.student_name,true,false);
		}
		break;
	case '/total': case '/obesity': case '/muscle':
		$scope.init(null,$scope.student_name,true,true);
		break;
	case '/smoking':
		$scope.init(null,'흡연지수',true,true);
		break;
	case '/assistance':
		$scope.init(null,'금연 도움 사이트',false,true);
		break;
	}
	
	console.log('------------------ StudentCtrl ------------------');
}]);

app.controller('GrowthCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'GrowthSvc', function($scope, $rootScope, $cookies, $window, $location, GrowthSvc){
	$scope.section = null;
	$scope.history_count = 0;
	
	$scope.growth_info = {
		value: null,
		beforeValue: null,
		gradeId: null,
		gradeString: null,
		measure_date: null,
		averageOfSchool: null,
		averageOfLocal: null,
		averageOfNation: null,
		averageOfStandard: null,
		rank: null,
		total: null,
		beforeRank: null,
		beforeTotal: null
	};
	$scope.measure_year = null;
	
	$scope.clear = function(){
		$scope.list = null;
		$scope.growth = null;
		$scope.averageOfLocal = null;
		$scope.avgOfNation = null;
	}
	
	$scope.setGrowthData = function(data){
		$scope.growth_info = {
			value: data.value,
			beforeValue:data.beforeValue,
			gradeId: data.gradeId,
			gradeString: data.gradeString,
			measure_date: data.measure_date,
			averageOfSchool: data.averageOfSchool,
			averageOfLocal: data.averageOfLocal,
			averageOfNation: data.averageOfNation,
			averageOfStandard: data.averageOfStandard,
			rank: data.rank,
			total: data.total,
			beforeRank: data.beforeRank,
			beforeTotal: data.beforeTotal
		};
		$scope.measure_year = $scope.growth_info.measure_date.substring(0,4);
		$scope.getMeasureHistoryCount();
	}
	
	$scope.getMeasureHistoryCount = function(){
		GrowthSvc.getMeasureHistoryCount({member_id:$scope.student_id, search_year:$scope.measure_year})
			.success(function(response){
				$scope.history_count = response.data;
			})
			.error(function(response, state) {
				UTIL.alert("error : " + response.message);
			});
	}
	
	$scope.getGrowth = function(section){
		var data = {member_id:$scope.studnet_id};
		if($scope.section=='height'){
			GrowthSvc.getHeight(data)
				.success(function(response){
					if(response.result == 0){
						$scope.setGrowthData(response.data);
						setTimeout(function(){
							var k = $('.chart > div').length;
							for(var i = 0; i < k; i++){
								var data = $('.chart > div').eq(i).children('span').children('em').html();
								var transData = data-100 + '%';
								$('.chart > div').eq(i).children('span').animate({'height':transData}, 500);
							}
						}, 500);
					}
				})
				.error(function(response, state) {
					UTIL.alert("error : " + response.message);
				});
		} else if($scope.section=='weight'){
			GrowthSvc.getWeight(data)
				.success(function(response){
					if(response.result == 0){
						$scope.setGrowthData(response.data);
						
						setTimeout(function(){
							var k = $('.chart > div').length;
							for(var i = 0; i < k; i++){
								var data = $('.chart > div').eq(i).children('span').children('em').html();
								var transData = ((data/100) * 100) - 20 + '%';
								$('.chart > div').eq(i).children('span').animate({'height':transData}, 300);
							}
						}, 500);
					}
				})
				.error(function(response, state) {
					UTIL.alert("error : " + response.message);
				});
		}
	}
	
	$scope.setGrowthInfo = function(info){
		$scope.list = info.list;
		$scope.growth = info.growth;
		$scope.avgOfStandard = info.avgOfStandard;
		$scope.averageOfLocal = info.avgOfLocal;
		$scope.avgOfNation = info.avgOfNation;
		
		animateGrowthDetail($scope.section);
	}
	$scope.getMeasureHistoryList = function(){
		$scope.clear();
		$scope.measure_year = $location.search().y;
		var data = {member_id:$scope.studnet_id, search_year:$scope.measure_year};
		
		if($scope.section=='height'){
			GrowthSvc.getHeightHistoryList(data)
				.success(function(response){
					if(response.result==0){
						$scope.setGrowthInfo(response.data);
					}
				})
				.error(function(response, state) {
					UTIL.alert("error : " + response.message);
				});
		}else if($scope.section=='weight'){
			GrowthSvc.getWeightHistoryList(data)
				.success(function(response){
					if(response.result==0){
						$scope.setGrowthInfo(response.data);
					}
				})
				.error(function(response, state) {
					UTIL.alert("error : " + response.message);
				});
		}
	}
	
	$scope.changeYear = function(){
		
	}
	
	$scope.convertRound = function(data){
		return Math.round(data*10)/10;
	}

	$scope.getStudent();
	var path = $location.path();
	if(path=='/height' || path=='/heightHistory'){
		$scope.section='height';
		$scope.init(null,'성장발달',true,true);
	} else if(path=='/weight' || path=='/weightHistory'){
		$scope.section='weight';
		$scope.init(null,'체중변화',true,true);
	}
	if(path=='/height' || path=='/weight'){
		$scope.getGrowth();
	} else if(path=='/heightHistory' || path=='/weightHistory'){
		$scope.getMeasureHistoryList();
	}
	
	console.log('------------------ GrowthCtrl ------------------');
}]);

app.controller('SchoolCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'SchoolSvc', function($scope, $rootScope, $cookies, $window, $location, SchoolSvc){
	$scope.yyyy = null;
	$scope.MM = null;
	
	$scope.category = 1;
	
	$scope.setYearMonth = function(){
		var date = new Date();
		$scope.yyyy = date.getFullYear();
		$scope.MM = date.getMonth()+1;
	}
	
	$scope.menu_list = [];
	$scope.getSchoolMenuList = function(){
		SchoolSvc.getSchoolMenuList({school_id:$scope.student_school_id, search_year:$scope.yyyy, search_month:$scope.MM})
			.success(function(response){
				if(response.result==0){
					$scope.menu_list = response.data;
					
					$scope.setWrappeDimension('#school_menu_lsit', 240);
				}
			})
			.error(function(data, status) {
				UTIL.alert("error : " + data.message);
			});
	}
	
	$scope.prevMonth = function(){
		$scope.MM  = $scope.MM - 1;
		if($scope.MM==0){
			$scope.yyyy = $scope.yyyy - 1;
			$scope.MM = 12;
		}
		$scope.getSchoolMenuList();
	}
	$scope.nextMonth = function(){
		$scope.MM  = $scope.MM + 1;
		if($scope.MM==13){
			$scope.yyyy = $scope.yyyy + 1;
			$scope.MM = 1;
		}
		$scope.getSchoolMenuList();
	}
	
	$scope.noti_list = [];
	$scope.getSchoolNotiList = function(){
		SchoolSvc.getSchoolNotiList({school_id:$scope.student_school_id, category:$scope.category,member_id:$scope.student_id})
			.success(function(response){
				if(response.result==0){
					$scope.noti_list = response.data;
					$scope.setWrappeDimension('#school_info_wrap', 107);
				}
			})
			.error(function(data, status) {
				UTIL.alert("error : " + data.message);
			});
	};
	
	$scope.sendLink = function(noti){
		var message = noti.title+'\n\n'+noti.content;
		console.log(message);
		Kakao.init('ab23989bb865cbdfde2474688e36488f');
		
		Kakao.Link.sendTalkLink({
			label: message
		});
	}
	
	$scope.schedule_mode = 'calendar';
	$scope.schedule_calendar = [];
	$scope.schedule_list = [];
	$scope.setScheduleData = function(list){
		$scope.schedule_calendar = [];
		$scope.schedule_list = list;
		
		var week = 0;
		var add_count = 0;
		var count = 0;
		var first_index = (new Date($scope.yyyy,$scope.MM -1,1)).getDay();
		var last_index = (new Date($scope.yyyy,$scope.MM, 0)).getDay();
		var lastDate = (new Date($scope.yyyy,$scope.MM, 0)).getDate();
		var beforeDate = (new Date($scope.yyyy,$scope.MM -1 , 0)).getDate();
		var total_count = first_index + lastDate + 6 -last_index;
		
		$scope.schedule_calendar[week] = [];
		if(first_index > 0){
			for(var i=0; i<first_index; i++){
				$scope.schedule_calendar[week][count++] = {'type':'other', 'date':(beforeDate - first_index +i+1), 'schedule':''};
				add_count++;
			}
		}
		for(var i=0; i<lastDate; i++){
			if(typeof list[i] == 'undefined'){
				$scope.schedule_calendar[week][count++] = {'type':'', 'date':(i+1), 'schedule':''};
			}else{
				$scope.schedule_calendar[week][count++] = {'type':'', 'date':(i+1), 'schedule':$scope.schedule_list[i].schedule.replace('토요휴업일','토요<br />휴업일')};
			}
			add_count++;
			if(count>0 && count%7==0){
				count=0;
				week++;
				$scope.schedule_calendar[week] = [];
			}
		}
		if(last_index<6){
			for(var i=1; i<(7-last_index); i++){
				$scope.schedule_calendar[week][count++] = {'type':'other', 'date':i, 'schedule':''};
				add_count++;
			}
		}
	}
	$scope.getSchoolScheduleList = function(){
		SchoolSvc.getSchoolScheduleList({school_id:$scope.student_school_id, search_year:$scope.yyyy, search_month:$scope.MM})
			.success(function(response){
				if(response.result==0){
					$scope.setScheduleData(response.data);
				}
			})
			.error(function(data, status) {
				UTIL.alert("error : " + data.message);
			});
	};
	
	$scope.toggleScheduleType = function(){
		$scope.schedule_mode = $scope.schedule_mode == 'list'?'calendar':'list';
		if($scope.schedule_mode=='list'){
			$scope.setWrappeDimension('#schedule_list_area', 175);
		}
	}
	
	$scope.prevMMSchedule = function(){
		$scope.MM  = $scope.MM - 1;
		if($scope.MM==0){
			$scope.yyyy = $scope.yyyy - 1;
			$scope.MM = 12;
		}
		$scope.getSchoolScheduleList();
	}
	
	$scope.nextMMSchedule = function(){
		$scope.MM  = $scope.MM + 1;
		if($scope.MM==13){
			$scope.yyyy = $scope.yyyy + 1;
			$scope.MM = 1;
		}
		$scope.getSchoolScheduleList();
	}
	
	$scope.getDayOfWeek = function(idx){
		return idx==0?'left':idx==6?'right':'';
	}
	
	$scope.replaceMenuString = function(str){
		var tmp = str.replace(/k/gi,'');
		tmp = tmp.split(/\n/gi);
		var t = '&nbsp;&middot;&nbsp;'+tmp.join('<br />&nbsp;&middot;&nbsp;');
		return t;
	}
	
	$scope.convertDate = function(date){
		var yyyy = date.substring(0,4);
		var mm = date.substring(5,7);
		var dd = date.substring(8,10);
		return yyyy+'년'+mm+'월'+dd+'일';
	}
	
	$scope.getDownloadUrl = function(filename){
		return "https://aurasystem.kr:9000/upload/"+encodeURI(filename);
	}
	
	$scope.noti_id = null;
	$scope.setNotiId = function(noti_id){
		if($scope.noti_id==null){
			$scope.noti_id = noti_id;
		}else{
			$scope.noti_id = null;
		}
	}
	
	$scope.clipping = function(noti){
		if($scope.noti_id!=null){
			SchoolSvc.addNotiBookmark({noti_seq:$scope.noti_id, member_id:$scope.student_id})
				.success(function(response){
					if(response.result==0){
						UTIL.alert('게시물이 스크랩되었습니다.');
						$scope.getSchoolNotiList();
					}
				})
				.error(function(data, status) {
					UTIL.alert("error : " + data.message);
				});
		} else {
			UTIL.alert('게시물을 선택하세요.');
		}
	}

	$scope.getStudent();
	var path = $location.path();
	if(path=='/dining'){
			$scope.init('body_gray','식단/영양',true,true);
			$scope.setYearMonth();
			$scope.getSchoolMenuList();
	} else {
		$scope.init('body_gray','학교정보알리미',true,true);
		switch(path){
		case '/schoolSchedule':
			$scope.setYearMonth();
			$scope.getSchoolScheduleList();
			break;
		case '/schoolMessage':
			$scope.category = 1;
			$scope.getSchoolNotiList();
			break;
		case '/schoolNoti':
			$scope.category = 2;
			$scope.getSchoolNotiList();
			break;
		}
	}
	console.log('------------------ SchoolCtrl ------------------');
}]);

app.controller('TrainingCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'TrainingSvc', function($scope, $rootScope, $cookies, $window, $location, TrainingSvc){
	$scope.training_list = [];
	$scope.getTrainingList = function(){
		if($location.search().p==null || $location.search().p==''){
			var gubun = $scope.school_gubun2 =='초등학교'?$scope.school_gubun2:'중학교';
			TrainingSvc.getVideoListByInfoType({infoType:gubun})
				.success(function(response){
					$scope.training_list = response.data;
					
					$scope.setWrappeDimension('#pesonal_sports_wrap', 73);
				})
				.error(function(response, state) {
					UTIL.alert("error : " + response.message);
				});
		}else{
			TrainingSvc.getVideoListByMasterGradeId({masterGradeId:$location.search().p})
				.success(function(response){
					$scope.training_list = response.data;
					
					$scope.setWrappeDimension('#pesonal_sports_wrap', 73);
				})
				.error(function(response, state) {
					UTIL.alert("error : " + response.message);
				});
		}
	}

	$scope.viewTraining = function(training){
		console.log(training.videoUrl);
	}
	
	$scope.getStudent();
	$scope.init('body_gray',$scope.student_name,true,true);
	$scope.getTrainingList();
	
	console.log('------------------ TrainingCtrl ------------------');
}]);

app.controller('RankingCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'RankingSvc', function($scope, $rootScope, $cookies, $window, $location, RankingSvc){
	$scope.ranking_title = null;
	$scope.ranking_unit = null;
	
	$scope.tab_index = 0;
	$scope.detail_url = null;
	$scope.list_title = null;
	$scope.list_tab = null;
	$scope.list_url = null;
	
	$scope.measureDate = null;
	$scope.value = null;
	$scope.beforeValue = null;
	$scope.school_grade = null;
	$scope.nameOfSchool = null;
	
	$scope.totalOfSchool = null;
	$scope.rankOfSchool = null;
	$scope.beforeRankOfSchool = null;
	$scope.schoolChange = null;
	
	$scope.nameOfLocal = null;
	$scope.totalOfLocal = null;
	$scope.rankOfLocal = null;
	$scope.beforeRankOfLocal = null;
	$scope.localChange = null;
	$scope.diffRankOfLocal = 0;

	$scope.totalOfNation = null;
	$scope.rankOfNation = null;
	$scope.beforeRankOfNation = null;
	$scope.nationChange = null;
	$scope.diffRankOfNation = 0;
	
	$scope.setRankingData = function(data){
		$scope.measureDate = data.measureDate.substring(0,7);
		$scope.value = data.value;
		$scope.beforeValue = data.beforeValue;
		
		$scope.school_grade = data.school_grade;
		$scope.nameOfSchool = data.nameOfSchool;
		
		$scope.totalOfSchool = data.totalOfSchool;
		$scope.rankOfSchool = data.rankOfSchool;
		$scope.beforeRankOfSchool = data.beforeRankOfSchool;
		if($scope.rankOfSchool == $scope.beforeRankOfSchool){
			$scope.schoolChange = '';
		}else if($scope.rankOfSchool < $scope.beforeRankOfSchool){
			$scope.schoolChange = 'font_red';
		}else if($scope.rankOfSchool > $scope.beforeRankOfSchool){
			$scope.schoolChange = 'font_blue';
		}
		
		$scope.nameOfLocal = data.nameOfLocal;
		$scope.totalOfLocal = data.totalOfLocal;
		$scope.rankOfLocal = (data.rankOfLocal/data.totalOfLocal*100).toFixed(2);
		$scope.beforeRankOfLocal = (data.beforeRankOfLocal / data.totalOfLocal * 100).toFixed(2);
		if($scope.rankOfLocal == $scope.beforeRankOfLocal){
			$scope.localChange = '';
		}else if($scope.rankOfLocal < $scope.beforeRankOfLocal){
			$scope.localChange = 'font_red';
		}else if($scope.rankOfLocal > $scope.beforeRankOfLocal){
			$scope.localChange = 'font_blue';
		}
		$scope.diffRankOfLocal = Math.abs(($scope.rankOfLocal - $scope.beforeRankOfLocal).toFixed(2));

		$scope.totalOfNation = data.totalOfNation;
		$scope.rankOfNation = (data.rankOfNation/data.totalOfNation*100).toFixed(2);
		$scope.beforeRankOfNation = (data.beforeRankOfNation / data.totalOfNation*100).toFixed(2);
		if($scope.rankOfNation == $scope.beforeRankOfNation){
			$scope.nationChange = '';
		}else if($scope.rankOfNation < $scope.beforeRankOfNation){
			$scope.nationChange = 'font_red';
		}else if($scope.rankOfNation > $scope.beforeRankOfNation){
			$scope.nationChange = 'font_blue';
		}
		$scope.diffRankOfNation = Math.abs(($scope.rankOfNation - $scope.beforeRankOfNation).toFixed(2));
	}
	
	$scope.getRankingHeight = function(){
		RankingSvc.getRankingHeight({member_id:$scope.studnet_id})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingData(response.data);
				}
			})
			.error(function(response, state) {
				UTIL.alert("error : " + response.message);
			});
	}
	$scope.getRankingWeight = function(){
		RankingSvc.getRankingWeight({member_id:$scope.studnet_id})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingData(response.data);
				}
			})
			.error(function(response, state) {
				UTIL.alert("error : " + response.message);
			});
	}
	$scope.getRankingBmi = function(){
		RankingSvc.getRankingBmi({member_id:$scope.studnet_id})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingData(response.data);
				}
			})
			.error(function(response, state) {
				UTIL.alert("error : " + response.message);
			});
	}
	$scope.getRankingMuscle = function(){
		RankingSvc.getRankingMuscle({member_id:$scope.studnet_id})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingData(response.data);
				}
			})
			.error(function(response, state) {
				UTIL.alert("error : " + response.message);
			});
	}
	$scope.getRankingFat = function(){
		RankingSvc.getRankingFat({member_id:$scope.studnet_id})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingData(response.data);
				}
			})
			.error(function(response, state) {
				UTIL.alert("error : " + response.message);
			});
	}
	
	//목록
	$scope.rank_info = null;
	$scope.rank_list = [];
	$scope.setRankingListData = function(data){
		$scope.rank_info = {
			name:data.name,
			measureDate:data.measureDate,
			value:data.value,
			schoolGrade:data.schoolGrade,
			schoolName:data.schoolName,
			rank:data.rank,
			beforeRank:data.beforeRank,
			total:data.total,
			rank_rate:(data.rank/data.total*100).toFixed(2)
		}
		$scope.rank_list = data.list;
	};
	$scope.getRankingHeightList = function(){
		RankingSvc.getRankingHeightList({member_id:$scope.studnet_id,search_key:$scope.list_tab})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingListData(response.data);
					$scope.setWrappeDimension('#rankingList',344);
				}
			})
			.error(function(response, state) {
				UTIL.alert("error : " + response.message);
			});
	};
	$scope.getRankingWeightList = function(){
		RankingSvc.getRankingWeightList({member_id:$scope.studnet_id,search_key:$scope.list_tab})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingListData(response.data);
					$scope.setWrappeDimension('#rankingList',364);
				}
			})
			.error(function(response, state) {
				UTIL.alert("error : " + response.message);
			});
	};
	$scope.getRankingBmiList = function(){
		RankingSvc.getRankingBmiList({member_id:$scope.studnet_id,search_key:$scope.list_tab})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingListData(response.data);
					$scope.setWrappeDimension('#rankingList',364);
				}
			})
			.error(function(response, state) {
				UTIL.alert("error : " + response.message);
			});
	};
	$scope.getRankingMuscleList = function(){
		RankingSvc.getRankingMuscleList({member_id:$scope.studnet_id,search_key:$scope.list_tab})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingListData(response.data);
					$scope.setWrappeDimension('#rankingList',364);
				}
			})
			.error(function(response, state) {
				UTIL.alert("error : " + response.message);
			});
	};
	$scope.getRankingFatList = function(){
		RankingSvc.getRankingFatList({member_id:$scope.studnet_id,search_key:$scope.list_tab})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingListData(response.data);
					$scope.setWrappeDimension('#rankingList',364);
				}
			})
			.error(function(response, state) {
				UTIL.alert("error : " + response.message);
			});
	};
	
	$scope.schoolFontColor = function(rank, beforeRank){
		if(parseInt(rank) < parseInt(beforeRank)){
			return 'font_red';
		} else if(parseInt(rank) > parseInt(beforeRank)){
			return 'font_blue';
		} else {
			return '';
		}
	}
	
	$scope.schoolValueDiff = function(value, before){
		if(value>before){
			return '+'+Math.abs((value - before).toFixed(1));
		}else if(value<before){
			return '-'+Math.abs((value - before).toFixed(1));
		}else{
			return '0';
		}
	}
	
	$scope.schoolRankDiff = function(rank, beforeRank){
		return Math.abs(rank - beforeRank);
	}
	
	$scope.fontColor = function(rank, beforeRank){
		if(rank < beforeRank){
			return 'font_red';
		} else if(rank > beforeRank){
			return 'font_red';
		} else {
			return '';
		}
	}
	
	$scope.changeRankDiff = function(rank, beforeRank, total){
		var v_rank = (rank/total*100).toFixed(2);
		var v_beforeRank = (beforeRank/total*100).toFixed(2);
		if(v_rank == v_beforeRank){
			return '-';
		} else {
			return Math.abs((v_rank - v_beforeRank).toFixed(2));
		}
	}
	
	$scope.blindeName = function(str){
		return str.substring(0,1)+'✱✱';
	}
	
	$scope.convertRound = function(data){
		return Math.round(data*10)/10;
	}
	
	$scope.changeTab = function(tab){
		$scope.list_tab = tab;
	}
	
	$scope.init_rank = function(){
		$scope.list_tab = $location.search().gubun!=''?$location.search().gubun:'school';
		var path = $location.path();
		switch(path){
		case '/rankingHeight': case '/rankingHeightDetail': case '/rankingHeightList':
			$scope.ranking_title = '신장';
			$scope.ranking_unit = 'cm';
			$scope.tab_index = 0;
			$scope.detail_url = '#!/rankingHeightDetail';
			$scope.list_url = '#!/rankingHeightList';
			$scope.list_title = '신장';
			if(path!='/rankingHeightList'){
				$scope.getRankingHeight();
			}else{
				$scope.getRankingHeightList();
			}
			break;
		case '/rankingWeight': case '/rankingWeightDetail': case '/rankingWeightList':
			$scope.ranking_title = '체중';
			$scope.ranking_unit = 'kg';
			$scope.tab_index = 1;
			$scope.detail_url = '#!/rankingWeightDetail';
			$scope.list_url = '#!/rankingWeightList';
			$scope.list_title = '체중';
			if(path!='/rankingWeightList'){
				$scope.getRankingWeight();
			}else{
				$scope.getRankingWeightList();
			}
			break;
		case '/rankingBmi': case '/rankingBmiDetail': case '/rankingBmiList':
			$scope.ranking_title = 'BMI';
			$scope.ranking_unit = null;
			$scope.tab_index = 2;
			$scope.detail_url = '#!/rankingBmiDetail';
			$scope.list_url = '#!/rankingBmiList';
			$scope.list_title = 'BMI';
			if(path!='/rankingBmiList'){
				$scope.getRankingBmi();
			}else{
				$scope.getRankingBmiList();
			}
			break;
		case '/rankingMuscle': case '/rankingMuscleDetail': case '/rankingMuscleList':
			$scope.ranking_title = '근육량';
			$scope.ranking_unit = null;
			$scope.tab_index = 3;
			$scope.detail_url = '#!/rankingMuscleDetail';
			$scope.list_url = '#!/rankingMuscleList';
			$scope.list_title = 'BMI';
			$scope.list_title = '근육량';
			if(path!='/rankingMuscleList'){
				$scope.getRankingMuscle();
			}else{
				$scope.getRankingMuscleList();
			}
			break;
		case '/rankingFat': case '/rankingFatDetail': case '/rankingFatList':
			$scope.ranking_title = '체지방율';
			$scope.ranking_unit = '%';
			$scope.tab_index = 4;
			$scope.detail_url = '#!/rankingFatDetail';
			$scope.list_url = '#!/rankingFatList';
			$scope.list_title = '체지방률';
			if(path!='/rankingFatList'){
				$scope.getRankingFat();
			}else{
				$scope.getRankingFatList();
			}
			break;
		}
		
		console.log('$scope.list_tab => '+$scope.list_tab);
	}
	$scope.getStudent();
	$scope.init('body_ranking',$scope.student_name,true,true);
	$scope.init_rank();
	
	console.log('------------------ RankingCtrl ------------------');
}]);

app.controller('ActivityCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'ActivitySvc', function($scope, $rootScope, $cookies, $window, $location, ActivitySvc){
	$scope.activity_list = [];
	$scope.getActivityList = function(){
		ActivitySvc.getActivityList({member_id:$scope.student_id})
			.success(function(response){
				var tmp_list = response.data;
				if(tmp_list.length!=0){
					var yyyy_mm = '';
					var tmp_step = 0;
					var idx = 0;
					var pre_pos = 0;
					for(var i=0; i<tmp_list.length; i++){
						if(i==0){
							yyyy_mm = tmp_list[i].activity_date.substring(0,7);
							tmp_step = tmp_list[i].step;
						}else{
							if(i==tmp_list.length-1){
								var tmp_date_list = [];
								for(var j=pre_pos, idx2=0;j<=i;j++, idx2++){
									tmp_date_list[idx2] = tmp_list[j];
								}
								tmp_step += tmp_list[i].step;
								var yyyymm = yyyy_mm.substring(0,4)+'년 '+yyyy_mm.substring(5,7)+'월';
								$scope.activity_list[idx++] = ({'yyyymm':yyyymm,'total_step':tmp_step, 'list':tmp_date_list});
							}else{
								if(yyyy_mm == tmp_list[i].activity_date.substring(0,7)){
									tmp_step += tmp_list[i].step;
								}else{
									var tmp_date_list = [];
									for(var j=pre_pos, idx2=0; j<=i; j++,idx2++){
										if(j==i){
											pre_pos = i;
										}else{
											tmp_date_list[idx2] = tmp_list[j];
										}
									}
									var yyyymm = yyyy_mm.substring(0,4)+'년 '+yyyy_mm.substring(5,7)+'월';
									$scope.activity_list[idx++] = ({'yyyymm':yyyymm,'total_step':tmp_step, 'list':tmp_date_list});
									
									yyyy_mm = tmp_list[i].activity_date.substring(0,7);
									tmp_step = tmp_list[i].step;
								}
							}
						}
					}
					$scope.setWrappeDimension('#my_active_mass_wrap',50);
				}
			})
			.error(function(data, status) {
				UTIL.alert("error : " + data.message);
			});
	}
	
	$scope.getStudent();
	$scope.init(null, '나의활동량',true,true);
	$scope.getActivityList();
	
	console.log('------------------ ActivityCtrl ------------------');
}]);

app.controller('MagazineCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'MagazineSvc', function($scope, $rootScope, $cookies, $window, $location, MagazineSvc){
	$scope.order = 'desc';
	$scope.magazine_recently = null;
	$scope.magazine_list = [];
	
	$scope.getPath = function(magazine){
		return '/upload/magazine/'+magazine.year+'/'+magazine.month+'/';
	}
	
	$scope.setRecentlyMagazine = function(magazine){
		var path = $scope.getPath(magazine);
		$scope.magazine_recently = magazine;
		$scope.magazine_recently.subTitle = '건강매거진 '+magazine.month +'월호';
		$scope.magazine_recently.images = [
			{image: magazine.img_1!=null?path+magazine.img_1:null},
			{image: magazine.img_2!=null?path+magazine.img_2:null},
			{image: magazine.img_3!=null?path+magazine.img_3:null},
			{image: magazine.img_4!=null?path+magazine.img_4:null},
			{image: magazine.img_5!=null?path+magazine.img_5:null},
			{image: magazine.img_6!=null?path+magazine.img_6:null},
			{image: magazine.img_7!=null?path+magazine.img_7:null},
			{image: magazine.img_8!=null?path+magazine.img_8:null},
			{image: magazine.img_9!=null?path+magazine.img_9:null},
			{image: magazine.img_10!=null?path+magazine.img_10:null},
		];
	}
	
	//매거진 목록 가져오기
	$scope.getMagazineList = function(){
		MagazineSvc.getMagazineList({start_index:0,page_size:0, order_key:$scope.order})
			.success(function(response){
				if(response.result==0){
					$scope.magazine_list = response.data;
					
					$scope.setRecentlyMagazine($scope.magazine_list[0]);
				}
			})
			.error(function(response, state) {
				UTIL.alert("error : " + response.message);
			});
	};
	
	$scope.orderChange = function(){
		$scope.magazine_list = [];
		$scope.getMagazineList();
	}
	
	$scope.getMagazineView = function(magazine_id){
		MagazineSvc.getMagazineView({magazine_id:magazine_id})
			.success(function(response){
				if(response.result == 0){
					var magazine = response.data;
					var path = $scope.getPath(magazine);
					
					$scope.title = magazine.title;
					$scope.subTitle = '건강매거진 '+magazine.month +'월호';
					$scope.subject = magazine.subject;
					$scope.content = magazine.content;
					$scope.images = [
						{image: magazine.img_1!=null?path+magazine.img_1:null},
						{image: magazine.img_2!=null?path+magazine.img_2:null},
						{image: magazine.img_3!=null?path+magazine.img_3:null},
						{image: magazine.img_4!=null?path+magazine.img_4:null},
						{image: magazine.img_5!=null?path+magazine.img_5:null},
						{image: magazine.img_6!=null?path+magazine.img_6:null},
						{image: magazine.img_7!=null?path+magazine.img_7:null},
						{image: magazine.img_8!=null?path+magazine.img_8:null},
						{image: magazine.img_9!=null?path+magazine.img_9:null},
						{image: magazine.img_10!=null?path+magazine.img_10:null},
					];
					setSwiper();
				}
			})
			.error(function(response, state) {
				UTIL.alert("error : " + response.message);
			});
			
	}
	
	$scope.init('body_gray', '건강매거진',true,true);
	switch($location.path()){
	case '/magazine':
		$scope.getMagazineList();
		break;
	case '/magazine_view':
		$scope.getMagazineView($location.search().p);
		break;
	}
	
	console.log('------------------ MagazineCtrl ------------------');
}]);

app.controller('ChallengeCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'Upload', 'ChallengeSvc', function($scope, $rootScope, $cookies, $window, $location, Upload, ChallengeSvc){
	$scope.challenge = {
		title:null,
		content:null
	}
	$scope.f = [];
	$scope.filenames = [
		{code:1, name:null},
		{code:2, name:null},
		{code:3, name:null},
		{code:4, name:null},
		{code:5, name:null},
	];
	$scope.challenge_list = [];
	$scope.challenge_member_id = null;
	
	$scope.getChallengeList = function(){
		ChallengeSvc.getChallengeList()
			.success(function(response){
				if(response.result == 0) {
					$scope.challenge_list = response.data;
				}
			})
			.error(function(response, state) {
				UTIL.alert("error : " + response.message);
			});
	}
	
	$scope.clearChallenge = function(){
		$scope.challenge = {
			title:null,
			content:null
		}
		$scope.f = [];
		$scope.filenames = [
			{code:1, name:null},
			{code:2, name:null},
			{code:3, name:null},
			{code:4, name:null},
			{code:5, name:null},
		];
	}
	
	//첨부이미지 체크
	$scope.uploadFiles = function(file,idx) {
		if(file  && file.$error && 
				(file.$errorParam.indexOf('.png') > -1 || file.$errorParam.indexOf('.jpg') > -1 || file.$errorParam.indexOf('.gif') > -1)
		){
			UTIL.alert('이미지 파일만 등록가능합니다.');
		} else if(file.size <10 || file.size > 1000*1000*10){
			$console.log('10MB이하의 이미지만 등록가능합니다.');
		}
		else{
			$scope.f[idx] = file;
			$scope.filenames[idx].name = file.name;
			console.log('attach file length => '+$scope.f.length);
		}
	}
	
	//도전!건강! 동일이미지명 체크
	$scope.checkImgName = function(){
		for(var i=0; i<($scope.filenames.length-1); i++){
			if($scope.filenames[i].name == null) continue;
			
			for(var j=i+1; j<$scope.filenames.length; j++){
				if($scope.filenames[j].name != null && $scope.filenames[j].name == $scope.filenames[i].name){
					return false;
				}
			}
		}
		return true;
	}
	
	//도전!!건강!! 수기응모
	$scope.addChallenge = function(){
		if ($scope.challenge.title == null) {
			UTIL.alert('제목을 입력하세요.');
			return;
		}
		else if ($scope.challenge.content == null) {
			UTIL.alert('내용을 입력하세요.');
			return;
		}
		else if ($scope.f.length == 0) {
			UTIL.alert('하나 이상의 사진을 등록하세요.');
			return;
		}
		else if (!$scope.checkImgName()){
			UTIL.alert('중복된 이름의 사진이 있습니다.');
			return;
		}
		else {
			var challenge = {
				home_id: $scope.home_id,
				member_id: $scope.member_id,
				title: $scope.challenge.title,
				content: $scope.challenge.content
			}
			
			$scope.upload = Upload.upload({
				url: '/api/addChallenge',
				data : {files:$scope.f, data:JSON.stringify(challenge)}
			}).success(function(data, status, headers, config) {
				console.log('data: ' + data + "," + data.result);
				if(data.result == 0) {
					UTIL.alert('도전건강! 응모하기가 완료되었습니다.');
					$location.path('challenge');
				} else {
					UTIL.alert(data.msg);
				}
			})
			.error(function(data, status) {
				UTIL.alert("error : " + data.message);
			});
		}
	}
	
	$scope.getStudent();
	switch($location.path()){
	case '/challenge':
		$scope.setWrappeDimension('#challenge_main_wrap',65);
		$scope.init('body_gray', '도전!!건강!!',true,true);
		$scope.getChallengeList();
		break;
	case '/challengeApply':
		$scope.setWrappeDimension('#challenge_app_wrap',0);
		$scope.init(null, '도전!!건강!!',true,true);
		break;
	}
	
	console.log('------------------ ChallengeCtrl ------------------');
}]);

app.controller('NotiCtrl',['$scope', '$window', '$location', 'NotiSvc', function($scope, $window, $location, NotiSvc){
	$scope.noti_list = [];
	
	$scope.getNotiList = function(){
		NotiSvc.getNotiList()
			.success(function(response){
				if(response.result==0){
					$scope.noti_list = response.data;
					$scope.setWrappeDimension('#news_wrap', 55);
				}
			})
			.error(function(data, status) {
				alert("error : " + data.message);
			});
	};
	
	$scope.viewNotice = function(idx){
		$('.news_wrap li').each(function(i){
			if(i!=idx){
				$('.news_wrap li').eq(i).removeClass('curr');
			}
		});
		$('.news_wrap li').eq(idx).toggleClass('curr');
	}
	
	$scope.getStudent();
	$scope.init('body_gray','공지사항',false,true);
	$scope.getNotiList();
	
	console.log('------------------ NotiCtrl ------------------');
}]);

app.controller('QnaCtrl',['$scope', '$window', '$location', 'QnaSvc', function($scope, $window, $location, QnaSvc){
	$scope.qna_list = [];
	$scope.qna_mode = 'list';
	
	$scope.title = null;
	$scope.content = null;
	
	$scope.getQnaList = function(){
		QnaSvc.getQnaList({member_id:$scope.student_id, board_type:1})
			.success(function(response){
				if(response.result==0){
					$scope.qna_list = response.data;
					$scope.setWrappeDimension('#qna_list_wrap', 130);
				}
			})
			.error(function(data, status) {
				UTIL.alert("error : " + data.message);
			});
	};
	
	$scope.viewQna = function(idx){
		$('.qna_list_wrap li').each(function(i){
			if(i!=idx){
				$('.qna_list_wrap li').eq(i).removeClass('curr');
			}
		});
		$('.qna_list_wrap li').eq(idx).toggleClass('curr');
	}
	
	$scope.yyyyMMdd = function(date) {
		if(date == null || date ==''){
			return '';
		}
		var tmp = date.substring(0,10);
		var d = tmp.split("-");
		return d[0]+"년 "+d[1]+"월 "+d[2]+"일";
	};
	
	$scope.getMode = function(){
		return $scope.qna_mode;
	}
	
	$scope.addQna = function(){
		if($scope.title == null){
			UTIL.alert('제목을 입력하세요.');
			return false;
		}
		else if($scope.content == null){
			UTIL.alert('문의 내용을 입력해주세요.');
			return false;
		}
		else{
			QnaSvc.addQna({member_id:$scope.student_id,board_type:1, title:$scope.title, content:$scope.content})
				.success(function(response){
					if(response.result==0){
						UTIL.alert('문의내용이 등록되었습니다.');
						$location.path('/qna/list.html');
					}else{
						UTIL.alert('문의내용 등록이 실패하였습니다.\n 잠시 후 다시 시도하세요.');
					}
				})
				.error(function(data, status) {
					UTIL.alert("error : " + data.message);
				});
				
		}
	}
	
	$scope.getStudent();
	$scope.init('body_gray','Q&A',false,true);
	if($location.path()=='/qna'){
		$scope.getQnaList();
	}else{
		$scope.setWrappeDimension('#qna_write_wrap',20);
	}
	
	console.log('------------------ QnaCtrl ------------------');
}]);

app.controller('OsInfoCtrl',['$scope', '$window', '$location', 'OsInfoSvc', function($scope, $window, $location, OsInfoSvc){
	$scope.current_version = '';
	$scope.latest_version = '';
	
	$scope.getOsInfo = function(){
		OsInfoSvc.getOsInfo({os_name:'ios'})
			.success(function(response){
				if(response.result==0){
					$scope.latest_version = response.data.version_name;
				}
			})
			.error(function(data, status) {
				UTIL.alert("error : " + data.message);
			});
	}
	
	$scope.getCurrentOsInfo  = function(){
		console.log()
	}
	
	$scope.init('body_gray','정보',false,true);
	$scope.getOsInfo();
	$scope.setWrappeDimension('#os_info_wrap',0);
	
	console.log('------------------ OsInfoCtrl ------------------');
}]);

app.controller('ConsultCtrl',['$scope', '$window', '$location', 'ConsultSvc', function($scope, $window, $location, ConsultSvc){
	$scope.category_list = ['성폭력','학업상담','진로상담','심리상담','성장상담','흡연상담','학교폭력','친구관계','가정폭력'];
	
	$scope.category = null;
	$scope.consult_list = [];
	$scope.chat_message = null;
	
	$scope.session_id = null;
	$scope.rate = null;
	
	$scope.getConsultList = function(){
		ConsultSvc.getConsultList({member_id:$scope.student_id,category:$scope.category})
			.success(function(response){
				if(response.result==0){
					$scope.consult_list = response.data;
					$scope.session_id = $scope.consult_list[0].session_id;
				}
			})
			.error(function(data, status) {
				UTIL.alert("error : " + data.message);
			});
	}
	
	$scope.sendMessage = function(){
		setListBox();
		return false;
		ConsultSvc.addConsult({member_id:$scope.student_id,category:$scope.category,who:0,content:$scope.chat_message})
			.success(function(response){
				if(response.result==0){
					$scope.getConsultList();
				}
			})
			.error(function(data, status) {
				UTIL.alert("error : " + data.message);
			});
	}
	
	$scope.estimation = function(){
		ConsultSvc.rateConsult({session_id:$scope.session_id,rate:$scope.rate})
			.success(function(response){
				$scope.session_id = null;
				$scope.rate = null;
				$location.path('/consult');
			})
			.error(function(data, status) {
				UTIL.alert("error : " + data.message);
			});
	}
	
	$scope.getConsultHistory = function(){
		ConsultSvc.getConsultHistory()
			.success(function(response){
				if(response.result==0){
					
				}
			})
			.error(function(data, status) {
				UTIL.alert("error : " + data.message);
			});
	}
	
	$scope.getCreated = function(date){
		if(date == null || date ==''){
			return '';
		}
		var tmp = date.substring(0,10);
		var d = tmp.split("-");
		return d[0]+"/"+d[1]+"/"+d[2];
	}
	
	$scope.getStudent();
	
	switch($location.path()){
	case '/consult':
		$scope.init('body_gray','모바일상담',true,true);
		break;
	case '/consultChat':
		$scope.setWrappeDimension('.cunsulting_room',103);
		$scope.setWrappeDimension('#cunsulting_list_wrap',121);
		$scope.category = $location.search().p;
		$scope.init(null,$scope.category_list[$scope.category-1],true,true);
		break;
	}
	
	console.log('------------------ ConsultCtrl ------------------');
}]);

app.controller('SafeGuardCtrl',['$scope', '$window', '$location','$interval', '$timeout', 'SafeGuardSvc', function($scope, $window, $location, $interval, $timeout, SafeGuardSvc){
	$scope.curr_address = null;
	$scope.created = null;
	$scope.passed_time = null;
	$scope.content = null;
	
	$scope.child_position = [];
	$scope.getLastLocation = function(){
		SafeGuardSvc.getLastLocation({member_id:$scope.student_id})
			.success(function(response){
				if(response.result==0){
					$scope.curr_lat = response.data.lat;
					$scope.curr_lng = response.data.lng;
					$scope.curr_address = response.data.address;
					$scope.created = response.data.created_date;
					
					$scope.content = $scope.curr_address==null?'':$scope.curr_address;
					$scope.passed_time = $scope.getPassedTime($scope.created);
					
					if($scope.passed_time!=null){
						$scope.content +='('+$scope.passed_time+')';
					}
					
					$scope.addMarker(new google.maps.LatLng($scope.curr_lat, $scope.curr_lng),$scope.content);
					console.log('$scope.map,',$scope.map);
				}
			})
			.error(function(data, status) {
				UTIL.alert("error : " + data.message);
			});
	}
	
	$scope.getPassedTime = function(time){
		if(time == null || time == undefined){
			return null;
		}
		var temp = time.split('.');
		var today = new Date();
		
		var h,m,s;
		
		var c_hh = today.getHours();
		var c_mm = today.getMinutes();
		var c_ss = today.getSeconds();
		
		var hh = parseInt(temp[0].substring(11,13));
		var mm = parseInt(temp[0].substring(14,16));
		var ss = parseInt(temp[0].substring(17,19));
		
		if(c_ss >= ss){
			s = c_ss-ss;
		}else{
			s = c_ss-ss+60;
			c_mm--;
		}
		if(c_mm >= mm){
			m = c_mm - mm;
		}else{
			m = c_mm - mm + 60;
			c_hh--;
		}
		if(c_hh >= hh){
			h = c_hh - hh;
		}
		
		var result = '';
		if(h>0){
			result+= h+'시간 '+m+'분 '+s+'초 전';
		}else{
			if(m>0){
				result+= m+'분 '+s+'초 전';
			}else{
				result+= s+'초 전';
			}
		}
		
		return result;
	}
	
	//기본값, 서울
	$scope.latitude = 37.561192;
	$scope.longitude = 127.030487;
	
	$scope.map = null;
	$scope.curr_lat = 0;
	$scope.curr_lng = 0;
	$scope.marker = null;
	$scope.address = null;
	
	$scope.initMap = function(){
		UTIL.getGPSData(function(data) {
			console.log(data.result);
			if (data.result == 'success') {
				var latitude = data.latitude;
				var longitude = data.longitude;
				
				if ((latitude == undefined || latitude == 0) && (longitude == undefined || longitude == 0)) {
					UTIL.alert('GPS를 활성화시켜주세요.');
				} else {
					var pos = new google.maps.LatLng(latitude, longitude);
					
					$scope.map = new google.maps.Map(document.getElementById('google-map'), {
						center: pos,
						zoom: 16,
						streetViewControl: false,
						mapTypeControl:false
					});
					$scope.addMarker(pos,null);
				}
			}
		});
		
		$timeout(function(){
			console.log('$scope.map',$scope.map);
			if($scope.map==null || typeof $scope.map == 'undefined'){
				// Try HTML5 geolocation.
				var pos;
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(position) {
						pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
						$scope.map = new google.maps.Map(document.getElementById('google-map'), {
							center: pos,
							zoom: 16,
							streetViewControl: false,
							mapTypeControl:false
						});
						$scope.addMarker(pos,null);
					}, function(){});
				} else {
					pos = new google.maps.LatLng($scope.latitude, $scope.longitude);
					$scope.map = new google.maps.Map(document.getElementById('google-map'), {
						center: pos,
						zoom: 16,
						streetViewControl: false,
						mapTypeControl: false
					});
					$scope.addMarker(pos,null);
				}
			}
		},2000);
	}
	
	$scope.addMarker = function(pos,content){
		console.log('-------------------------- Add Marker --------------------------');
		if ($scope.marker != null) {
			$scope.marker.setMap(null);
		}
		
		$scope.marker = new google.maps.Marker({
			position: pos,
			map: $scope.map,
			draggable: false
		});
		
		if(content!=null){
			var infowindow = new google.maps.InfoWindow({
				content: content
			});
			infowindow.open($scope.map,$scope.marker);
		}
	}
	
	$scope.moveMaker = function(pos){
		console.log('-------------------------- Move Marker --------------------------');
		if($scope.marker!=null){
			$scope.marker.setPosition(pos);
		} else {
			$scope.addMarker(pos, null);
		}
	}
	
	$scope.getAddress = function(){
		if($scope.map!=null && typeof $scope.map.getCenter() != 'undefined'){
			var lat = $scope.map.getCenter().lat();
			var lng = $scope.map.getCenter().lng();
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({'latLng' : new google.maps.LatLng(lat,lng)}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[1]) {
						$scope.address = results[1].formatted_address.replace('대한민국 ','');
					}
				}
			});
		}else{
			$scope.address = null;
		}
	}
	
	$scope.interval;
	$scope.setCurrentPosition = function(){
		var gps_statue = false;
		if($location.path()=='/safeGuard'){
			UTIL.getGPSData(function(data) {
				console.log(data.result);
				if (data.result == 'success') {
					if ((data.latitude == undefined || data.latitude == 0) && (data.longitude == undefined || data.longitude == 0)) {
						gps_statue = false;
					}else{
						var pos = {
							lat: data.latitude,
							lng: data.longitude
						};
						$scope.map.setCenter(pos);
						$scope.moveMaker(pos);
						gps_statue = true;
					}
				}
			});
			$timeout(function(){
				if (navigator.geolocation && !gps_statue) {
					navigator.geolocation.getCurrentPosition(function(position) {
						var pos = {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						};
						$scope.map.setCenter(pos);
						$scope.moveMaker(pos);
						gps_statue = false;
					}, function() {
					
					});
				}
			},1000);
		}else{
			$interval.cancel($scope.interval);
		}
	}
	
	$scope.interval2;
	$scope.sendLocation = function(){
		if($location.path()=='/safeGuard'){
			$scope.getAddress();
			$timeout(function(){
				console.log('$scope.address,',$scope.address);
				SafeGuardSvc.addLocation({member_id:$scope.student_id,lat:$scope.map.getCenter().lat(),lng:$scope.map.getCenter().lng(),address:$scope.address})
					.success(function(response){
						if(response.result==0){
							UTIL.alert('위치전송이 완료되었습니다.');
						}
					})
					.error(function(data, status) {
						UTIL.alert("error : " + data.message);
					});
			},2000);
		}else{
			$interval.cancel($scope.interval2);
		}
	}
	
	$scope.getStudent();
	$scope.setWrappeDimension('#google-map-wrap',50);
	$scope.initMap();
	$scope.init(null,'안전지킴이',true,true);
	if($scope.is_parent==1){
		$scope.getLastLocation();
	} else {
		$timeout(function(){
			$scope.sendLocation();		//안전지킴이 진입시 첫 위치 전송
			//3초 주기로 현재위치 갱신
			$scope.interval = $interval(function(){
				$scope.setCurrentPosition();
			},3000);
			
			
			//10분 주기로 전송
			$scope.interval2 = $interval(function(){
				$scope.sendLocation();
			},1000*60*10);
		},5000);
	}
	console.log('------------------ ConsultCtrl ------------------');
}]);