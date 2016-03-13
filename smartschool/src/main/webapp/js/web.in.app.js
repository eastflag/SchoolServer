var app = angular.module('home', ['ngRoute', 'ngCookies', 'ngFileUpload', 'ngSanitize','ngScrollbars','ngAnimate','ngTouch','ngImgCrop']);
app.factory('highlighter', function () {
	return new Scrollbars.Highlighter();
})

app.run(['$rootScope', function($rootScope) {
	$rootScope.rootPath = "/";
	
	$rootScope.home_id = null;
	$rootScope.member_id = null;
	$rootScope.name = null;
	$rootScope.mdn = null;
	$rootScope.email = null;
	$rootScope.is_parent = null;
}]);

app.config( ['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
		.when('/index.html', {templateUrl: '/SmartCare/in_app/index.html', controller:'FamilyCtrl'})
		.when('/login.html', {templateUrl: '/SmartCare/in_app/login.html', controller:'LoginCtrl'})
		.when('/join.html', {templateUrl: '/SmartCare/in_app/join.html', controller:'JoinCtrl'})
		.when('/main.html', {templateUrl: '/SmartCare/in_app/main.html', controller:'StudentCtrl'})
		.when('/height.html', {templateUrl: '/SmartCare/in_app/height.html', controller:'GrowthCtrl'})
		.when('/height/history.html', {templateUrl: '/SmartCare/in_app/height_history.html', controller:'GrowthCtrl'})
		.when('/total.html', {templateUrl: '/SmartCare/in_app/total.html', controller:'StudentCtrl'})
		.when('/dining.html', {templateUrl: '/SmartCare/in_app/dining.html', controller:'SchoolCtrl'})
		.when('/training.html', {templateUrl: '/SmartCare/in_app/training.html', controller:'TrainingCtrl'})
		.when('/weight.html', {templateUrl: '/SmartCare/in_app/weight.html', controller:'GrowthCtrl'})
		.when('/weight/history.html', {templateUrl: '/SmartCare/in_app/weight_history.html', controller:'GrowthCtrl'})
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
		.when('/assistance.html', {templateUrl: '/SmartCare/in_app/assistance.html', controller:'StudentCtrl'})
		.when('/activity.html', {templateUrl: '/SmartCare/in_app/activity.html', controller:'ActivityCtrl'})
		.when('/magazine.html', {templateUrl: '/SmartCare/in_app/magazine.html', controller:'MagazineCtrl'})
		.when('/magazine/view.html', {templateUrl: '/SmartCare/in_app/magazine_view.html', controller:'MagazineCtrl'})
		.when('/challenge.html', {templateUrl: '/SmartCare/in_app/challenge.html', controller:'ChallengeCtrl'})
		.when('/school/message.html', {templateUrl: '/SmartCare/in_app/school_message.html', controller:'SchoolCtrl'})
		.when('/school/schedule.html', {templateUrl: '/SmartCare/in_app/school_schedule.html', controller:'SchoolCtrl'})
		.when('/school/noti.html', {templateUrl: '/SmartCare/in_app/school_noti.html', controller:'SchoolCtrl'})
		.when('/noti.html', {templateUrl: '/SmartCare/in_app/noti.html', controller:'NotiCtrl'})
		.when('/qna/list.html', {templateUrl: '/SmartCare/in_app/qna.html', controller:'QnaCtrl'})
		.when('/qna/write.html', {templateUrl: '/SmartCare/in_app/qna.html', controller:'QnaCtrl'})
		.when('/app/info.html', {templateUrl: '/SmartCare/in_app/app_info.html'})
		
	$locationProvider.html5Mode(false);
	$locationProvider.hashPrefix('!');

	//$httpProvider.defaults.headers.post['X-Auth'] = "";
}]);

app.service('AuraSvc', function($http) {
	this.modHomeId = function(data){
		console.log('----------------- 가족명변경 --------------------');
		return $http.post('/api/modifyHome', data);
	};
});

app.service('LoginSvc', function($http) {
	this.login = function(data){
		console.log('----------------- 로그인 --------------------');
		return $http.post('/web/api/login', data);
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

app.controller('AuraCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'highlighter', 'Upload', 'AuraSvc', function($scope, $rootScope, $cookies, $window, $location, highlighter, Upload, AuraSvc){
	$scope.home_id = null;
	$scope.member_id = null;
	$scope.name = null;
	$scope.mdn = null;
	$scope.email = null;
	
	//로그인상태체크
	$scope.loggedIn = function() {
		var member_info = $cookies.getObject("member_info");
		if (member_info != null && member_info != undefined) {
			$scope.home_id = member_info.home_id;
			$scope.member_id = member_info.member_id;
			$scope.name = member_info.name;
			$scope.mdn = member_info.mdn;
			$scope.email = member_info.email;
			$scope.is_parent = member_info.is_parent;
			
			$rootScope.home_id = $scope.home_id;
			$rootScope.member_id = $scope.member_id;
			$rootScope.name = $scope.name;
			$rootScope.mdn = $scope.mdn;
			$rootScope.email = $scope.email;
			$rootScope.is_parent = $scope.is_parent;
			
			var loadDt = new Date();
			var expires = new Date(Date.parse(loadDt) + 1000 * 60*30);  //30분후
			var member_info = {home_id:$scope.home_id, member_id:$scope.member_id, name:$scope.name, is_parent:$scope.is_parent, mdn:$scope.mdn, email:$scope.email};
			$cookies.putObject("member_info", member_info,{'path': '/', 'expires':expires});
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
		$cookies.remove("member_info",{'path': '/'});
		$scope.clearStudent();
		
		$scope.home_id = null;
		$scope.member_id = null;
		$scope.name = null;
		$scope.mdn = null;
		$scope.email = null;
		$scope.is_parent = null;
		
		$location.path('/login.html');
	}
	
	$scope.new_home_id = null;
	
	$scope.editHomeId = function(){
		gnbHide();
		commonLayerOpen('family_modify');
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
						var member_info = $cookies.getObject("member_info");
						$cookies.remove("member_info",{'path': '/'});
						
						$scope.home_id = $scope.new_home_id;
						$scope.member_id = member_info.member_id;
						$scope.name = member_info.name;
						$scope.mdn = member_info.mdn;
						$scope.email = member_info.email;
						$scope.is_parent = member_info.is_parent;
						
						$rootScope.home_id = $scope.home_id;
						$rootScope.member_id = $scope.member_id;
						$rootScope.name = $scope.name;
						$rootScope.mdn = $scope.mdn;
						$rootScope.email = $scope.email;
						$rootScope.is_parent = $scope.is_parent;
						
						var loadDt = new Date();
						var expires = new Date(Date.parse(loadDt) + 1000 * 60*30);  //30분후
						var member_info = {home_id:$scope.home_id, member_id:$scope.member_id, name:$scope.name, is_parent:$scope.is_parent, mdn:$scope.mdn, email:$scope.email};
						$cookies.putObject("member_info", member_info,{'path': '/', 'expires':expires});
						
						$scope.new_home_id = null;
						gnbHide();
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
	
	$scope.init = function(){
		var path = $location.path();
		if(path==''){
			$location.path('/index.html');
		}
		if(!$scope.loggedIn()){
			switch(path){
			case '/login.html':
				break;
			case '/join.html':
				break;
			default:
				$location.path('/index.html');
				break;
			}
		}
	}
	$scope.init();
	
	console.log('------------------ AuraCtrl ------------------');
}]);

app.controller('JoinCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'Upload', function($scope, $rootScope, $cookies, $window, $location, Upload){
	//회원가입 변수
	$scope.v_home_id=null;
	$scope.v_name=null;
	$scope.v_relation=null;
	$scope.agree1 = false;
	$scope.agree2 = false;
	$scope.agree3 = false;
	
	//프로필사진 변수
	$scope.profile = null;
	$scope.cropped_profile = null;
	$scope.saved_profile = null;
	
	$scope.crop_state = false;
	$scope.crop_init = function(){
		$scope.clearProfile();

		var handleFileSelect=function(evt) {
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
				$window.alert('이미지 파일만 등록가능합니다.');
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
	}
	
	//회원가입
	$scope.join = function(){
		if($scope.v_home_id==null){
			$window.alert('가족명을 입력하세요.');
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
		else if($scope.agree1==false || $scope.agree2==false || $scope.agree3==false){
			$window.alert('모든 약관에 동의하셔야 합니다.');
			return false;
		}
		else{
			var param = {home_id:$scope.v_home_id,name:$scope.v_name,relation:$scope.v_relation,is_parent:1, os_type:2, gcm_id:null};
			var data = null;
			if($scope.crop_state){
				data = {profile:Upload.dataUrltoBlob($scope.saved_profile), data:JSON.stringify(param)};
			}else{
				data = {profile:null, data:JSON.stringify(param)};
			}
			
			$scope.upload = $Upload.upload({
				url: '/web/api/signUpWeb',
				data : data
			}).success(function(response, status, headers, config) {
				if(response.result==0){
					$scope.clearProfile();
					$window.alert('회원가입 완료!\n가입하신 가족명, 이름으로 로그인하시기 바랍니다.');
					$location.path('/login.html');
				}else{
					$window.alert(response.msg);
				}
			})
			.error(function(data, status) {
				$scope.clearProfile();
				$window.alert("error : " + data.message);
			});
		}
	}
	
	$scope.checkAll = function(){
		if($('#check_all').prop('checked')==false){
			$scope.agree1 = false;
			$scope.agree2 = false;
			$scope.agree3 = false;
		}else{
			$scope.agree1 = true;
			$scope.agree2 = true;
			$scope.agree3 = true;
		}
	}
	
	$scope.crop_init();
	
	console.log('------------------ JoinCtrl ------------------');
}]);

app.controller('LoginCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'FamilySvc','LoginSvc', function($scope, $rootScope, $cookies, $window, $location, FamilySvc, LoginSvc){
	$scope.v_home_id = null;
	$scope.v_name = null;
	//로그인
	$scope.login = function(){
		if($scope.v_home_id==null || $scope.v_home_id == '') {
			$window.alert("가족명을 입력하세요.");
			return false;
		}
		else if($scope.v_name==null || $scope.v_name == ''){
			$window.alert("이름을 입력하세요.");
			return false;
		}
		else{
			var param = {home_id:$scope.v_home_id, name:$scope.v_name, os_type:2, gcm_id:null}
			LoginSvc.login(param)
				.success(function(response){
					if(response.result == 0) {
						$scope.home_id = response.data.home_id;
						$scope.member_id = response.data.member_id;
						$scope.name = response.data.name;
						$scope.mdn = response.data.mdn;
						$scope.email = response.data.email;
						$scope.is_parent = response.data.is_parent;
						
						$rootScope.home_id = $scope.home_id;
						$rootScope.member_id = $scope.member_id;
						$rootScope.name = $scope.name;
						$rootScope.mdn = $scope.mdn;
						$rootScope.email = $scope.email;
						$rootScope.is_parent = $scope.is_parent;
						
						var loadDt = new Date();
						var expires = new Date(Date.parse(loadDt) + 1000 * 60*30);  //30분후
						var member_info = {home_id:response.data.home_id, member_id:response.data.member_id,name:response.data.name, is_parent:response.data.is_parent, mdn:response.data.mdn, email:response.data.email};
						$cookies.putObject("member_info", member_info,{'path': '/', 'expires':expires});
						
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
					} else {
						$window.alert(response.msg);
					}
				})
				.error(function(response, state){
					$window.alert("error : " + response.message);
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
	
	console.log('------------------ LoginCtrl ------------------');
}]);

app.controller('FamilyCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'highlighter', 'Upload', 'FamilySvc', function($scope, $rootScope, $cookies, $window, $location, highlighter, Upload, FamilySvc){
	$scope.member_list = [];		//가족구성원 목록
	
	$scope.family_list_status = true;		//가족목록 노출 상태
	$scope.search_school_status = false;	//학교검색 노출 상태
	
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
		$scope.clearProfile();

		var handleFileSelect=function(evt) {
			$scope.profile = null;
			$scope.cropped_profile = null;
			$scope.saved_profile = null;
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
				$window.alert('jpg이미지만 등록가능합니다.');
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
				$window.alert("error : " + response.message);
			});
	}
	
	$scope.getFamilyList = function(){
		$scope.clear();
		$scope.member_list = [];
		
		FamilySvc.getFamilyList({home_id:$scope.home_id})
			.success(function(response){
				if(response.result==0){
					$scope.member_list = response.data;
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
		$scope.crop_state = false;
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
		$scope.crop_state = false;
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
	
	$scope.openSearchSchool = function(){
		$scope.family_list_status = false;
		$scope.search_school_status = true;
	};
	$scope.closeSearchSchool = function(){
		$scope.family_list_status = true;
		$scope.search_school_status = false;
	};

	$scope.search_text = null;
	$scope.school_list = [];
	
	//학교목록 조회
	$scope.searchSchool = function(){
		console.log($scope.search_text);
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
			url: '/web/api/addMember',
			data : {profile:Upload.dataUrltoBlob($scope.saved_profile), data:JSON.stringify(data)}
		}).success(function(response) {
			if(response.result==0){
				$window.alert('가족구성원이 추가되었습니다.');
				$scope.getFamilyList();
			}else{
				$window.alert(response.msg);
			}
			$scope.profile = null;
			$scope.cropped_profile = null;
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
			url: '/web/api/modMember',
			data : {profile:Upload.dataUrltoBlob($scope.saved_profile), data:JSON.stringify(data)}
		}).success(function(response) {
			if(response.result==0){
				$window.alert('가족구성원 정보가 수정되었습니다.');
				$scope.getFamilyList();
			}else{
				$window.alert('가족구성원 정보수정 실패!\n잠시 후 다시 시도하세요.');
			}
			$scope.profile = null;
			$scope.cropped_profile = null;
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
	
	
	if($scope.loggedIn()){
		if($scope.is_parent == 0){
			$location.path('/main.html');
		}else{
			$scope.clearStudent();
			$scope.getFamilyList();
			$scope.crop_init();
		}
	}else{
		setTimeout(function(){
			$('.pannel').fadeIn('slow').delay( 3000 ).fadeOut('slow');
		},3000);
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

	//금연도움사이트 레이어 토글
	$scope.no_smoking_layer = false;
	
	//유/무료확인
	$scope.alertPayment = function(){
		$window.alert('통합서비스 신청시 이용가능합니다.\n고객센터로 문의하시기 바랍니다.\nTel : 1544-1284');
	}
	$scope.checkMeasure = function(url){
		console.log('pay_date => '+ $scope.pay_date);
		if($scope.pay_date == null){
			$window.alert('통합서비스 신청시 이용가능합니다.\n고객센터로 문의하시기 바랍니다.\nTel : 1544-1284');
		} else{
			if(!$scope.recode_status){
				$window.alert('건강정보 측정 기록이 없습니다.\n 측정 후 이용 바랍니다.');
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
					case '/total.html': case '/obesity.html':
						$scope.setBmiString();
						break;
					case '/muscle.html':
						$scope.setMuscleString();
						break;
					}
				}
			})
			.error(function(response, state) {
				$window.alert("error : " + response.message);
			});
	}
	
	$scope.init();
	$scope.getStudent();
	$scope.getMeasureSummary();
	
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
		GrowthSvc.getMeasureHistoryCount({member_id:$scope.student_id,search_year:$scope.measure_year})
			.success(function(response){
				$scope.history_count = response.data;
			})
			.error(function(response, state) {
				$window.alert("error : " + response.message);
			});
	}
	
	$scope.getGrowth = function(){
		var data = {member_id:$scope.student_id};
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
					$window.alert("error : " + response.message);
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
					$window.alert("error : " + response.message);
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
		var data = {member_id:$scope.student_id, search_year:$scope.measure_year};
		
		if($scope.section=='height'){
			GrowthSvc.getHeightHistoryList(data)
				.success(function(response){
					if(response.result==0){
						$scope.setGrowthInfo(response.data);
					}
				})
				.error(function(response, state) {
					$window.alert("error : " + response.message);
				});
		}else if($scope.section=='weight'){
			GrowthSvc.getWeightHistoryList(data)
				.success(function(response){
					if(response.result==0){
						$scope.setGrowthInfo(response.data);
					}
				})
				.error(function(response, state) {
					$window.alert("error : " + response.message);
				});
		}
	}
	
	$scope.convertRound = function(data){
		return Math.round(data*10)/10;
	}
	
	$scope.init();
	$scope.getStudent();
	
	switch($location.path()){
	case '/height.html':
		$scope.section='height';
		$scope.getGrowth();
		break;
	case '/height/history.html':
		$scope.section='height';
		$scope.getMeasureHistoryList();
		break;
	case '/weight.html':
		$scope.section='weight';
		$scope.getGrowth();
		break;
	case '/weight/history.html':
		$scope.section='weight';
		$scope.getMeasureHistoryList();
		break;
	}
	
	console.log('------------------ StudentCtrl ------------------');
}]);

app.controller('SchoolCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'SchoolSvc', function($scope, $rootScope, $cookies, $window, $location, SchoolSvc){
	$scope.yyyy = null;
	$scope.MM = null;
	
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
				}
			})
			.error(function(data, status) {
				alert("error : " + data.message);
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
	$scope.category = null;
	$scope.getSchoolNotiList = function(){
		SchoolSvc.getSchoolNotiList({school_id:$scope.student_school_id, category:$scope.category,member_id:$scope.student_id})
			.success(function(response){
				if(response.result==0){
					$scope.noti_list = [];
					$scope.noti_list = response.data;
				}
			})
			.error(function(data, status) {
				alert("error : " + data.message);
			});
	};
	
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
			alert("error : " + data.message);
		});
	};
	
	$scope.toggleScheduleType = function(){
		$scope.schedule_mode = $scope.schedule_mode == 'list'?'calendar':'list';
	}
	
	$scope.prevMMSchedule = function(){
		$scope.noti_list = [];
		$scope.MM  = $scope.MM - 1;
		if($scope.MM==0){
			$scope.yyyy = $scope.yyyy - 1;
			$scope.MM = 12;
		}
		$scope.getSchoolScheduleList();
	}
	
	$scope.nextMMSchedule = function(){
		$scope.noti_list = [];
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
	
	$scope.clipping = function(noti){
		SchoolSvc.addNotiBookmark({noti_seq:noti.noti_seq, member_id:$scope.student_id})
			.success(function(response){
				if(response.result==0){
					$window.alert('게시물이 스크랩되었습니다.');
					$scope.getSchoolNotiList();
				}
			})
			.error(function(data, status) {
				alert("error : " + data.message);
			});
	}
	
	$scope.init();
	$scope.getStudent();
	switch($location.path()){
		case '/dining.html':
			$scope.setYearMonth();
			$scope.getSchoolMenuList();
			break;
		case '/school/schedule.html':
			$scope.setYearMonth();
			$scope.getSchoolScheduleList();
			break;
		case '/school/message.html':
			$scope.category = 1;
			$scope.getSchoolNotiList();
			break;
		case '/school/noti.html':
			$scope.category = 2;
			$scope.getSchoolNotiList();
			break;
	}
	console.log('------------------ SchoolCtrl ------------------');
}]);

app.controller('TrainingCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'TrainingSvc', function($scope, $rootScope, $cookies, $window, $location, TrainingSvc){
	$scope.training_list = [];
	$scope.getTrainingList = function(){
		if($location.search().p==null || $location.search().p==''){
			console.log('school gubun2 => '+$scope.school_gubun2);
			var gubun = $scope.school_gubun2 =='초등학교'?$scope.school_gubun2:'중학교';
			TrainingSvc.getVideoListByInfoType({infoType:gubun})
				.success(function(response){
					$scope.training_list = response.data;
				})
				.error(function(response, state) {
					$window.alert("error : " + response.message);
				});
		}else{
			console.log('masterGradeId => '+$location.search().p);
			TrainingSvc.getVideoListByMasterGradeId({masterGradeId:$location.search().p})
				.success(function(response){
					$scope.training_list = response.data;
				})
				.error(function(response, state) {
					$window.alert("error : " + response.message);
				});
		}
	}

	$scope.viewTraining = function(training){
		console.log(training.videoUrl);
	}
	
	$scope.init();
	$scope.getStudent();
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
			$scope.schoolChange = 'up';
		}else if($scope.rankOfSchool > $scope.beforeRankOfSchool){
			$scope.schoolChange = 'down';
		}
		
		$scope.nameOfLocal = data.nameOfLocal;
		$scope.totalOfLocal = data.totalOfLocal;
		$scope.rankOfLocal = (data.rankOfLocal/data.totalOfLocal*100).toFixed(2);
		$scope.beforeRankOfLocal = (data.beforeRankOfLocal / data.totalOfLocal * 100).toFixed(2);
		if($scope.rankOfLocal == $scope.beforeRankOfLocal){
			$scope.localChange = '';
		}else if($scope.rankOfLocal < $scope.beforeRankOfLocal){
			$scope.localChange = 'up';
		}else if($scope.rankOfLocal > $scope.beforeRankOfLocal){
			$scope.localChange = 'down';
		}
		$scope.diffRankOfLocal = Math.abs(($scope.rankOfLocal - $scope.beforeRankOfLocal).toFixed(2));

		$scope.totalOfNation = data.totalOfNation;
		$scope.rankOfNation = (data.rankOfNation/data.totalOfNation*100).toFixed(2);
		$scope.beforeRankOfNation = (data.beforeRankOfNation / data.totalOfNation*100).toFixed(2);
		if($scope.rankOfNation == $scope.beforeRankOfNation){
			$scope.nationChange = '';
		}else if($scope.rankOfNation < $scope.beforeRankOfNation){
			$scope.nationChange = 'up';
		}else if($scope.rankOfNation > $scope.beforeRankOfNation){
			$scope.nationChange = 'down';
		}
		$scope.diffRankOfNation = Math.abs(($scope.rankOfNation - $scope.beforeRankOfNation).toFixed(2));
	}
	
	$scope.getRankingHeight = function(){
		RankingSvc.getRankingHeight({member_id:$scope.student_id})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingData(response.data);
				}
			})
			.error(function(response, state) {
				$window.alert("error : " + response.message);
			});
	}
	$scope.getRankingWeight = function(){
		RankingSvc.getRankingWeight({member_id:$scope.student_id})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingData(response.data);
				}
			})
			.error(function(response, state) {
				$window.alert("error : " + response.message);
			});
	}
	$scope.getRankingBmi = function(){
		RankingSvc.getRankingBmi({member_id:$scope.student_id})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingData(response.data);
				}
			})
			.error(function(response, state) {
				$window.alert("error : " + response.message);
			});
	}
	$scope.getRankingMuscle = function(){
		RankingSvc.getRankingMuscle({member_id:$scope.student_id})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingData(response.data);
				}
			})
			.error(function(response, state) {
				$window.alert("error : " + response.message);
			});
	}
	$scope.getRankingFat = function(){
		RankingSvc.getRankingFat({member_id:$scope.student_id})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingData(response.data);
				}
			})
			.error(function(response, state) {
				$window.alert("error : " + response.message);
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
		RankingSvc.getRankingHeightList({member_id:$scope.student_id,search_key:$scope.list_tab})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingListData(response.data);
				}
			})
			.error(function(response, state) {
				$window.alert("error : " + response.message);
			});
	};
	$scope.getRankingWeightList = function(){
		RankingSvc.getRankingWeightList({member_id:$scope.student_id,search_key:$scope.list_tab})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingListData(response.data);
				}
			})
			.error(function(response, state) {
				$window.alert("error : " + response.message);
			});
	};
	$scope.getRankingBmiList = function(){
		RankingSvc.getRankingBmiList({member_id:$scope.student_id,search_key:$scope.list_tab})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingListData(response.data);
				}
			})
			.error(function(response, state) {
				$window.alert("error : " + response.message);
			});
	};
	$scope.getRankingMuscleList = function(){
		RankingSvc.getRankingMuscleList({member_id:$scope.student_id,search_key:$scope.list_tab})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingListData(response.data);
				}
			})
			.error(function(response, state) {
				$window.alert("error : " + response.message);
			});
	};
	$scope.getRankingFatList = function(){
		RankingSvc.getRankingFatList({member_id:$scope.student_id,search_key:$scope.list_tab})
			.success(function(response){
				if(response.result==0){
					$scope.setRankingListData(response.data);
				}
			})
			.error(function(response, state) {
				$window.alert("error : " + response.message);
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
		return Math.abs((value - before).toFixed(1));
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
		console.log('beforeRank =>' +beforeRank);
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
		
		switch($location.path()){
		case '/ranking/height.html':case '/ranking/height/detail.html':
			$scope.ranking_title = '신장';
			$scope.ranking_unit = 'cm';
			$scope.getRankingHeight();
			$scope.tab_index = 0;
			$scope.detail_url = '#!/ranking/height/detail.html';
			$scope.list_url = '#!/ranking/height/list.html';
			break;
		case '/ranking/weight.html':case '/ranking/weight/detail.html':
			$scope.ranking_title = '체중';
			$scope.ranking_unit = 'kg';
			$scope.getRankingWeight();
			$scope.tab_index = 1;
			$scope.detail_url = '#!/ranking/weight/detail.html';
			$scope.list_url = '#!/ranking/weight/list.html';
			break;
		case '/ranking/bmi.html':case '/ranking/bmi/detail.html':
			$scope.ranking_title = 'BMI';
			$scope.ranking_unit = null;
			$scope.getRankingBmi();
			$scope.tab_index = 2;
			$scope.detail_url = '#!/ranking/bmi/detail.html';
			$scope.list_url = '#!/ranking/bmi/list.html';
			break;
		case '/ranking/muscle.html':case '/ranking/muscle/detail.html':
			$scope.ranking_title = '근육량';
			$scope.ranking_unit = null;
			$scope.getRankingMuscle();
			$scope.tab_index = 3;
			$scope.detail_url = '#!/ranking/muscle/detail.html';
			$scope.list_url = '#!/ranking/muscle/list.html';
			break;
		case '/ranking/fat.html':case '/ranking/fat/detail.html':
			$scope.ranking_title = '체지방율';
			$scope.ranking_unit = '%';
			$scope.getRankingFat();
			$scope.tab_index = 4;
			$scope.detail_url = '#!/ranking/fat/detail.html';
			$scope.list_url = '#!/ranking/fat/list.html';
			break;
		case '/ranking/height/list.html':
			$scope.ranking_title = '신장';
			$scope.ranking_unit = 'cm';
			$scope.tab_index = 0;
			$scope.getRankingHeightList();
			$scope.list_url = '#!/ranking/height/list.html';
			$scope.list_title = '신장';
			break;
		case '/ranking/weight/list.html':
			$scope.ranking_title = '체중';
			$scope.ranking_unit = 'kg';
			$scope.tab_index = 1;
			$scope.getRankingWeightList();
			$scope.list_url = '#!/ranking/weight/list.html';
			$scope.list_title = '체중';
			break;
		case '/ranking/bmi/list.html':
			$scope.ranking_title = 'BMI';
			$scope.ranking_unit = null;
			$scope.tab_index = 2;
			$scope.getRankingBmiList();
			$scope.list_url = '#!/ranking/bmi/list.html';
			$scope.list_title = 'BMI';
			break;
		case '/ranking/muscle/list.html':
			$scope.ranking_title = '근육량';
			$scope.ranking_unit = null;
			$scope.tab_index = 3;
			$scope.getRankingMuscleList();
			$scope.list_url = '#!/ranking/muscle/list.html';
			$scope.list_title = '근육량';
			break;
		case '/ranking/fat/list.html':
			$scope.ranking_title = '체지방율';
			$scope.ranking_unit = '%';
			$scope.tab_index = 4;
			$scope.getRankingFatList();
			$scope.list_url = '#!/ranking/fat/list.html';
			$scope.list_title = '체지방률';
			break;
		}
		
		console.log('$scope.list_tab => '+$scope.list_tab);
	}
	
	$scope.init();
	$scope.getStudent();
	$scope.init_rank();
	
	console.log('------------------ RankingCtrl ------------------');
}]);

app.controller('ActivityCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'ActivitySvc', function($scope, $rootScope, $cookies, $window, $location, ActivitySvc){
	$scope.activity_list = [];
	$scope.getActivityList = function(){
		ActivitySvc.getActivityList({member_id:$scope.student_id})
			.success(function(response){
				var tmp_list = response.data;
				console.log('data length : '+tmp_list.length);
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
				}
			})
			.error(function(data, status) {
				alert("error : " + data.message);
			});
	}
	
	$scope.init();
	$scope.getStudent();
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
					
					$scope.setRecentlyMagazine(response.data[0]);
				}
			})
			.error(function(response, state) {
				$window.alert("error : " + response.message);
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
						{image: magazine.img_1==''?'':path+magazine.img_1},
						{image: magazine.img_2==''?'':path+magazine.img_2},
						{image: magazine.img_3==''?'':path+magazine.img_3},
						{image: magazine.img_4==''?'':path+magazine.img_4},
						{image: magazine.img_5==''?'':path+magazine.img_5},
						{image: magazine.img_6==''?'':path+magazine.img_6},
						{image: magazine.img_7==''?'':path+magazine.img_7},
						{image: magazine.img_8==''?'':path+magazine.img_8},
						{image: magazine.img_9==''?'':path+magazine.img_9},
						{image: magazine.img_10==''?'':path+magazine.img_10}
					];
					setSwiper();
				}
			})
			.error(function(response, state) {
				$window.alert("error : " + response.message);
			});
			
	}
	
	$scope.init();
	
	switch($location.path()){
	case '/magazine.html':
		$scope.getMagazineList();
		break;
	case '/magazine/view.html':
		$scope.getMagazineView($location.search().p);
		break;
	}
	
	console.log('------------------ MagazineCtrl ------------------');
}])

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
	$scope.challenge_mode = 'list';
	
	$scope.getChallengeList = function(){
		$scope.clearChallenge();
		ChallengeSvc.getChallengeList()
			.success(function(response){
				if(response.result == 0) {
					$scope.challenge_list = response.data;
				}
			})
			.error(function(response, state) {
				$window.alert("error : " + response.message);
			});
	}
	
	$scope.clearChallenge = function(){
		$scope.challenge_mode = 'list';
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
			{code:5, name:null}
		];
	}
	
	//첨부이미지 체크
	$scope.uploadFiles = function(file,idx) {
		console.log('file selected');
		if(file && file.$error && file.$errorParam.indexOf('.jpg') > -1){
			$window.alert('jpg파일만 등록가능합니다.');
		} else if(file && file.size <10 || file.size > 1000*1000*10){
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
			$window.alert('제목을 입력하세요.');
			return;
		}
		else if ($scope.challenge.content == null) {
			$window.alert('내용을 입력하세요.');
			return;
		}
		else if ($scope.f.length == 0) {
			$window.alert('하나 이상의 사진을 등록하세요.');
			return;
		}
		else if (!$scope.checkImgName()){
			$window.alert('중복된 이름의 사진이 있습니다.');
			return;
		}
		else {
			var challenge = {home_id: $scope.home_id,member_id: $scope.member_id,title: $scope.challenge.title,content: $scope.challenge.content,files: $scope.f}
			
			$scope.upload = Upload.upload({
				url: '/api/addChallenge',
				data : challenge
			}).success(function(response) {
				console.log('response: ',  response);
				if(response.result == 0) {
					$window.alert('도전건강! 응모하기가 완료되었습니다.');
					$scope.getChallengeList();
				} else {
					$window.alert(response.msg);
				}
			})
			.error(function(data, status) {
				alert("error : " + data.message);
			});
		}
	}
	
	$scope.init();
	$scope.getStudent();
	$scope.getChallengeList();
	console.log('------------------ ChallengeCtrl ------------------');
}]);

app.controller('NotiCtrl',['$scope', '$window', '$location', 'NotiSvc', function($scope, $window, $location, NotiSvc){
	$scope.noti_list = [];
	
	$scope.getNotiList = function(){
		NotiSvc.getNotiList()
			.success(function(response){
				if(response.result==0){
					$scope.noti_list = response.data;
				}
			})
			.error(function(data, status) {
				alert("error : " + data.message);
			});
	};
	
	$scope.viewNotice = function(idx){
		console.log('index => '+idx);
		$('.news_wrap li').each(function(i){
			if(i!=idx){
				$('.news_wrap li').eq(i).removeClass('curr');
			}
		});
		$('.news_wrap li').eq(idx).toggleClass('curr');
	}
	
	$scope.init();
	$scope.getStudent();
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
				}
			})
			.error(function(data, status) {
				alert("error : " + data.message);
			});
	};
	
	$scope.viewQna = function(idx){
		console.log('index => '+idx);
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
		console.log({member_id:$scope.student_id,board_type:1, title:$scope.title, content:$scope.content});
		if($scope.title == null){
			$window.alert('제목을 입력하세요.');
			return false;
		}
		else if($scope.content == null){
			$window.alert('문의 내용을 입력해주세요.');
			return false;
		}
		else{
			QnaSvc.addQna({member_id:$scope.student_id,board_type:1, title:$scope.title, content:$scope.content})
				.success(function(response){
					if(response.result==0){
						$window.alert('문의내용이 등록되었습니다.');
						$location.path('/qna/list.html');
					}else{
						$window.alert('문의내용 등록이 실패하였습니다.\n 잠시 후 다시 시도하세요.');
					}
				})
				.error(function(data, status) {
					alert("error : " + data.message);
				});
				
		}
	}
	
	$scope.init();
	$scope.getStudent();
	switch($location.path()){
	case '/qna/list.html':
		$scope.getQnaList();
		$scope.qna_mode = 'list';
		break;
	case '/qna/write.html':
		$scope.qna_mode = 'write';
		break;
	}
	
	console.log('------------------ QnaCtrl ------------------');
}]);

app.animation('.slide-animation', function () {
	return {
		beforeAddClass: function (element, className, done) {
			var scope = element.scope();
			if (className == 'ng-hide') {
				var finishPoint = element.parent().width();
				if(scope.direction !== 'right') {
					finishPoint = -finishPoint;
				}
				TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
			}
			else {
				done();
			}
		},
		removeClass: function (element, className, done) {
			var scope = element.scope();
			
			if (className == 'ng-hide') {
				element.removeClass('ng-hide');
				var startPoint = element.parent().width();
				if(scope.direction === 'right') {
					startPoint = -startPoint;
				}
	
				TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
				}
			else {
				done();
			}
		}
	};
});