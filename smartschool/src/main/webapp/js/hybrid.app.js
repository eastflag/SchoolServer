var app = angular.module('hybrid', ['ngRoute', 'ngCookies', 'ngFileUpload', 'ngSanitize','ngAnimate','ngTouch']);

app.run(['$rootScope', function($rootScope) {
	$rootScope.rootPath = "/hybrid/index.html";
	
	//login user info
	$rootScope.home_id = null;
	$rootScope.member_id = null;
	$rootScope.mdn = null;
	$rootScope.is_parent = null;
	
	//current student info
	$rootScope.student_id = null;
	$rootScope.student_name = null;
}]);

app.config( ['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
		.when('/family', {templateUrl: '/hybrid/templates/family.html', controller:'FamilyCtrl'})
		.when('/student', {templateUrl: '/hybrid/templates/student.html', controller:'StudentCtrl'})
	/*
		.when('/index.html', {templateUrl: '/SmartCare/in_app/index.html', controller:'FamilyCtrl'})
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

app.controller('MainCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'Upload', 'MainSvc', function($scope, $rootScope, $cookies, $window, $location, Upload, MainSvc){
	//기본정보(로그인 정보)
	$scope.home_id = null;
	$scope.member_id = null;
	$scope.mdn = null;
	$scope.is_parent = null;
	
	//학생정보
	$scope.student_id = null;
	$scope.student_name = null;
	
	$scope.badyClass = null;		//body bg-color class
	
	$scope.header_title = null;		//header title text
	$scope.backBtnSttus = true;
	
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
	
	//로그인
	$scope.v_home_id = null;
	$scope.v_mdn = null;
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
						var family_list = response.data;
						
						//로그인 사용자 설정
						for(var i=0; i<family_list.length; i++){
							if($scope.v_mdn == family_list[i].mdn){
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
							$location.path('student');
						}else{
							$location.path('family');
						}
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
		$cookies.remove("user_info",{'path': '/hybrid'});
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
	
	$scope.new_home_id = null;
	$scope.change_home_display = 'none';
	
	$scope.editHomeId = function(){
		$scope.toggleSetting();
		$scope.change_home_display = 'block';
	}
	
	//헤더 타이틀 설정
	$scope.setHeaderTitle = function(title){
		$scope.header_title = title;
	}
	//뒤로가기버튼 상태
	$scope.setBackBtnStatus = function(status){
		$scope.backBtnSttus = status;
	}
	
	//목록 높이값 설정
	$scope.getListWrapperHeight = function(target,diff){
		console.log($window.innerHeight);
		$(target).height($window.innerHeight - diff);
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
	
	$scope.setBodyClass = function(){
		switch($location.path()){
		case '/dining': case '/training':
			break;
		default:
			$scope.badyClass = null;
		}
	}
	
	$scope.init = function(){
		$scope.setBodyClass();
		var path = $location.path();
		if(path!=='' && !$scope.loggedIn()){
			$window.location.href = '/hybrid/index.html';
		}
		
	}
	$scope.init();
}]);


app.controller('FamilyCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'Upload', 'FamilySvc', function($scope, $rootScope, $cookies, $window, $location, Upload, FamilySvc){
	$scope.setHeaderTitle($scope.home_id);		//header title text
	$scope.setBackBtnStatus(false);
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
	
	$scope.family_edit_mode = null;
	$scope.family_mode_text = '';
	$scope.family_mode_text2 = '';
	$scope.family_relation_text = '';
	
	$scope.clear = function(){
		$scope.profile = null;
		
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
		
		commonLayerClose('common_layer');
	}
	
	$scope.getFamilyList = function(){
		$scope.clear();
		$scope.getListWrapperHeight('#family_list_wrapper',200);
		FamilySvc.getFamilyList({home_id:$scope.home_id})
			.success(function(response){
				if(response.result==0){
					$scope.family_list = response.data;
				}
			})
			.error(function(response, status) {
				if (status >= 400) {
					$cookies.remove("member_info",{'path': '/'});
				} else {
					$window.alert("error : " + response.message);
				}
			});
	};
	
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
		commonLayerOpen('common_layer');
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
		$scope.profile = member.photo;
		
		$scope.family_edit_mode = 'edit';
		$scope.family_mode_text = '가족 구성원 수정';
		if($scope.v_is_parent == 1){
			$scope.family_mode_text2 = '부모정보 수정';
		}else{
			$scope.family_mode_text2 = '학생정보 수정';
		}
		commonLayerOpen('common_layer');
	};
	
	//프로필사진 변수
	$scope.profile = null;
	$scope.setProfile = function(file) {
		if(file  && file.$error && 
			(file.$errorParam.indexOf('.png') > -1 || file.$errorParam.indexOf('.jpg') > -1 || file.$errorParam.indexOf('.gif') > -1)
		){
			$window.alert('이미지파일만 등록가능합니다.');
		}else{
			$scope.profile = file;
			$scope.profile_text = file.name;
		}
	}
	
	$scope.removeProfile = function(){
		console.log('member_id => '+$scope.v_member_id);
		FamilySvc.removePhoto({member_id:$scope.v_member_id})
			.success(function(response){
				if(response.result==0){
					$window.alert('프로필 사진이 삭제되었습니다.');
					$scope.profile = null;
				}
			})
			.error(function(response, state){
				$window.alert("error : " + response.message);
			});
	}

	$scope.family_list_status = true;		//가족목록 노출 상태
	$scope.search_school_status = false;	//학교검색 노출 상태
	$scope.openSearchSchool = function(){
		$scope.family_list_status = false;
		$scope.search_school_status = true;
		$scope.getListWrapperHeight('#school_list_wrapper',100);
	};
	$scope.closeSearchSchool = function(){
		$scope.family_list_status = true;
		$scope.search_school_status = false;
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
					}
				})
				.error(function(data, status) {
					$window.alert("error : " + data.message);
				});
		}
	};
	$scope.setSchool = function(school){
		$scope.v_school_id = school.school_id;
		$scope.v_school_name = school.school_name;
		$scope.family_list_status = true;
		$scope.search_school_status = false;
		$scope.search_text = null;
		$scope.school_list = [];
	};
	
	//가족구성원 추가
	$scope.addMember = function(){
		if($scope.v_mdn==null){
			$window.alert('휴대전화번호을 입력하세요.');
			return false;
		}
		else if($scope.v_name==null){
			$window.alert('이름을 입력하세요.');
			return false;
		}
		else if($scope.v_relation==null){
			$window.alert('관계를 입력하세요.');
			return false;
		}
		else if($scope.v_is_parent==0){
			if($scope.v_birth_date==null){
				$window.alert('생년월일을 입력하세요.');
				return false;
			}else if($scope.v_school_id==null || $scope.v_school_name==null){
				$window.alert('학교명을 입력하세요.');
				return false;
			}else if($scope.v_school_grade==null){
				$window.alert('학년을 입력하세요.');
				return false;
			}else if($scope.v_school_class == null){
				$window.alert('반을 입력하세요.');
				return false;
			}else if($scope.v_sex == null || $scope.v_sex == ''){
				$window.alert('성별을 선택하세요.');
				return false;
			}
		}
		
		var data = null;
		if($scope.v_is_parent==1){
			data = {
				home_id:$scope.home_id, mdn:$scope.v_mdn, name:$scope.v_name,
				relation:$scope.v_relation, is_parent:$scope.v_is_parent
			};
		}else{
			data = {
				home_id:$scope.home_id, mdn:$scope.v_mdn, name:$scope.v_name, relation:$scope.v_relation,
				is_parent:$scope.v_is_parent, sex:$scope.v_sex, birth_date:$scope.v_birth_date,
				school_id:$scope.v_school_id, school_grade:$scope.v_school_grade, school_class:$scope.v_school_class
			};
		}
		
		$scope.upload = Upload.upload({
			url: '/home/api/addMember',
			method: 'POST',
			file:$scope.profile,
			data : JSON.stringify(data),
			fileFormDataName : 'profile'
		}).success(function(response) {
			if(response.result==0){
				$window.alert('가족구성원이 추가되었습니다.');
				$window.location.reload();
			}else{
				$window.alert(response.msg);
			}
			$scope.profile = null;
		}).error(function(data, status) {
			$window.alert("error : " + data.message);
		});
	};
	
	//가족구성원 정보수정
	$scope.modMember = function(){
		if($scope.v_mdn==null){
			$window.alert('휴대전화번호을 입력하세요.');
			return false;
		}
		else if($scope.v_name==null){
			$window.alert('이름을 입력하세요.');
			return false;
		}
		else if($scope.v_relation==null){
			$window.alert('관계를 입력하세요.');
			return false;
		}
		else if($scope.v_is_parent==0){
			if($scope.v_birth_date==null){
				$window.alert('생년월일을 입력하세요.');
				return false;
			}else if($scope.v_school_id==null || $scope.v_school_name==null){
				$window.alert('학교명을 입력하세요.');
				return false;
			}else if($scope.v_school_grade==null){
				$window.alert('학년을 입력하세요.');
				return false;
			}else if($scope.v_school_class == null){
				$window.alert('반을 입력하세요.');
				return false;
			}else if($scope.v_sex == null || $scope.v_sex == ''){
				$window.alert('성별을 선택하세요.');
				return false;
			}
		}
		
		var data = null;
		if($scope.v_is_parent==1){
			data = {
				home_id:$scope.home_id, member_id:$scope.v_member_id, mdn:$scope.v_mdn,
				name:$scope.v_name, relation:$scope.v_relation, is_parent:$scope.v_is_parent
			};
		}else{
			data = {
				home_id:$scope.home_id, member_id:$scope.v_member_id, mdn:$scope.v_mdn, name:$scope.v_name,
				relation:$scope.v_relation, is_parent:$scope.v_is_parent, sex:$scope.v_sex, birth_date:$scope.v_birth_date,
				school_id:$scope.v_school_id, school_grade:$scope.v_school_grade, school_class:$scope.v_school_class
			};
		}
		
		$scope.upload = Upload.upload({
			url: '/home/api/modMember',
			method: 'POST',
			file:$scope.profile,
			data : JSON.stringify(data),
			fileFormDataName : 'profile'
		}).success(function(response) {
			if(response.result==0){
				$window.alert('가족구성원 정보가 수정되었습니다.');
				$window.location.reload();
			}else{
				$window.alert('가족구성원 정보수정 실패!\n잠시 후 다시 시도하세요.');
			}
			$scope.profile = null;
		}).error(function(data, status) {
			$window.alert("error : " + data.message);
		});
	};
	
	//가족구성원 삭제
	$scope.removeMember = function(member){
		if(confirm('해당 가족구성원을 삭제하시겠습니까?')){
			FamilySvc.removeMember({member_id:member.member_id})
				.success(function(response) {
					if(response.result==0){
						$window.alert('가족구성원이 삭제되었습니다.');
						$window.location.reload();
					}else{
						$window.alert('가족구성원 삭제실패!\n잠시 수 다시 시도하세요.');
					}
				})
				.error(function(response, state) {
					$window.alert("error : " + response.message);
				});
		}else{
			return false;
		}
	};
	
	$scope.init();
	$scope.getFamilyList();
}]);