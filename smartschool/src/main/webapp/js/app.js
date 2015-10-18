var app = angular.module('home', ['ngRoute', 'ngCookies','ngSanitize']);

app.run(['$rootScope', function($rootScope) {
	$rootScope.auth_token = null;
	$rootScope.rootPath = "/";
	
	$rootScope.member_id = null
	$rootScope.name = null
	$rootScope.mdn = null
}]);

app.config( ['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
	/*
	$routeProvider
		.when('/login', {templateUrl: '/home/templates/login.html', controller:'IndexCtrl'})
		.when('/notice', {templateUrl: '/home/templates/notice.html', controller:'NotiCtrl'})
		.when('/request', {templateUrl: '/home/templates/request.html', controller:'ReqCtrl'})
		.when('/introduce', {templateUrl: '/home/templates/introduce.html', controller:'QnACtrl'})
		.when('/inquiry', {templateUrl: '/home/templates/inquiry.html', controller:'QnACtrl'})
	*/
	$locationProvider.html5Mode(true);
	//$locationProvider.hashPrefix('!');

	$httpProvider.defaults.headers.post['X-Auth'] = "";
}]);

app.service('HomeSvc', function($http) {
	this.requestCertification = function(data) {
		console.log('----------------- 인증번호 요청 --------------------');
		return $http.post('home/api/getSmsCertifyKey', data);
	};
	this.login = function(data){
		console.log('----------------- 로그인 --------------------');
		return $http.post('home/api/login', data);
	};
	this.getNotiList = function(data) {
		console.log('----------------- 공지사항 목록 --------------------');
		return $http.post('home/api/getNotiList', data);
	};
	this.getPressList = function(data){
		console.log('-----------------언론자료 목록 --------------------');
		return $http.post('home/api/getPressList', data);
	}
	this.getMemberInfo = function(data){
		return $http.post('home/api/getMemberInfo', data);
	};
	this.requestQnA = function(data) {
		return $http.post('home/api/requestQnA', data);
	};
});

app.controller('HomeCtrl', ['$scope', '$http', '$rootScope', '$cookieStore', '$window', '$location', '$filter', '$sce', 'HomeSvc', function ($scope, $http, $rootScope, $cookieStore, $window, $location, $filter, $sce, HomeSvc) {
	$scope.token = null;
	$scope.error = null;
	
	$scope.path = null;
	
	$scope.member_id = null;
	$scope.name = null;
	$scope.mdn = null;
	$scope.email = null;
	$scope.certifyKey = null;
	
	$scope.request = false;
	
	//인증번호요청
	$scope.requestCertification = function(){
		if($scope.request){
			$window.alert('이미 인증번호요청을 하셨습니다.\n잠시후에 다시 시도하세요.');
			return;
		}else{
			if($scope.mdn=='' || $scope.mdn == null){
				$window.alert('핸드폰번호를 입력해주세요.');
				return;
			}
			else if(!isInteger($scope.mdn)){
				$window.alert("숫자만 입력하세요.");
				return;
			}
			else{
				var data = {"mdn": $scope.mdn};
				HomeSvc.requestCertification(data)
					.success(function(response) {
						if(response.result == 0){
							if(response.msg == 'success' || response.msg == 'Test Success!'){
								$window.alert("인증번호가 발송되었습니다.");
								$scope.request = true;
								$("#_txt_phone").prop("readonly",true);
								$("#_txt_certifyKey").prop("disabled",false);
								$("#_btn_login").removeAttr('style');
							}else{
								$window.alert("오류가 발생하였습니다.\n잠시후에 다시 시도하세요.");
							}
						} else if(response.result == 100){
							$window.alert('등록되지 않은 전화번호입니다.\n\n서비스를 이용하시려면\n고객센터 1544-1284로 연락바랍니다.');
						}
					})
					.error(function(response, state) {
						console.log(response.message);
						$window.alert("오류가 발생하였습니다.\n잠시후에 다시 시도하세요.");
					});
			}
		}
	}
	
	//로그인
	$scope.login = function(){
		if(!$scope.request) {
			$window.alert("인증번호요청을 진행하셔야 합니다.");
			return false;
		}
		else if($scope.mdn=='' || $scope.mdn == null) {
			$window.alert('핸드폰번호를 입력해주세요.');
			return;
		}
		else if(!isInteger($scope.mdn)) {
			$window.alert("숫자만 입력하세요.");
			return;
		}
		else if($scope.certifyKey == '' || $scope.certifyKey == null) {
			$window.alert("인증번호를 입력하세요.");
			return;
		}
		else if(!isInteger($scope.certifyKey)) {
			$window.alert("숫자만 입력하세요.");
			return;
		}
		else{
			$scope.error = null;
			HomeSvc.login({mdn:$scope.mdn, certifyKey:$scope.certifyKey})
				.success(function(response){
					if(response.result == 0) {
						$scope.mdn = null;
						$scope.certifyKey = null;
	
						$scope.token = response.data.token;
						$scope.member_id = response.data.member_id;
						$scope.mdn = response.data.mdn;
	
						$rootScope.auth_token = $scope.token;
						$rootScope.member_id = $scope.member_id;
						$rootScope.mdn = $scope.mdn;
	
						var auth_info = {auth_token : $rootScope.auth_token, member_id:$rootScope.member_id, name:$rootScope.name, mdn:$rootScope.mdn};
	
						$cookieStore.put("auth_info", auth_info);
	
						$http.defaults.headers.post['X-Auth'] = $rootScope.auth_token;
						
						$window.location.href = '/';
					} else {
						$window.alert(response.msg);
					}
				})
				.error(function(response, state){
					if (state >= 400) {
						$rootScope.auth_token = null;
						$cookieStore.remove("auth_info");
					} else {
						$window.alert("error : " + response.message);
					}
				});
		}
	};
	
	$scope.guest = function(){
		$window.alert('준비중입니다.');
	}

	// 페이징 공통변수
	$scope.pageSize = 10;
	
	//공지사항 관련 변수
	$scope.notiList = [];
	$scope.currentNotiPage = 1;
	$scope.totalNoti = 0;
	$scope.pageNumNotiList = [];
	$scope.pageNotiFirst = 1;
	$scope.pageNotiNext = 1;
	
	$scope.getNotiList = function() {
		HomeSvc.getNotiList({start_index:($scope.currentNotiPage - 1) * $scope.pageSize, page_size:$scope.pageSize})
			.success(function(response) {
				$scope.notiList = response.data;
				$scope.totalNoti = response.total;
				$scope.setNotiPaginationInfo();
			})
			.error(function(response, state) {
				if (state >= 400) {
					$rootScope.auth_token = null;
					$cookieStore.remove("auth_info");
				} else {
					$window.alert("error : " + response.message);
				}
			});
	}
	
	$scope.setNotiPaginationInfo = function(){
		var temp = setPaginationInfo($scope.currentNotiPage, $scope.pageSize, $scope.totalNoti);
		$scope.pageNotiFirst = temp[0];
		temp.splice(0, 1);
		$scope.pageNotiNext = temp.pop();
		$scope.pageNumNotiList = temp;
	}
	
	$scope.notiPageChange = function(num) {
		console.log(num);
		$scope.currentNotiPage = num;
		$scope.getNotiList();
	};
	
	$scope.toggleContent = function(idx){
		var list = $('.news_list').find('li');
		if(list.eq(idx).hasClass('curr')){
			list.eq(idx).removeClass('curr');
		}else{
			list.eq(idx).addClass('curr');
		}
	}
	
	//언론자료 관련 변수
	$scope.pressList = [];
	$scope.currenPressPage = 1;
	$scope.totalPress = 0;
	$scope.pageNumPressList = [];
	$scope.pagePressFirst = 1;
	$scope.pagePressNext = 1;
	
	$scope.getPressList = function() {
		HomeSvc.getPressList({start_index:($scope.currenPressPage - 1) * $scope.pageSize, page_size:$scope.pageSize})
			.success(function(response) {
				$scope.pressList = response.data;
				$scope.totalPress = response.total;
				$scope.setPressPaginationInfo();
			})
			.error(function(response, state) {
				if (state >= 400) {
					$rootScope.auth_token = null;
					$cookieStore.remove("auth_info");
				} else {
					$window.alert("error : " + response.message);
				}
			});
	}
	
	$scope.setPressPaginationInfo = function(){
		var temp = setPaginationInfo($scope.currenPressPage, $scope.pageSize, $scope.totalPress);
		$scope.pagePressFirst = temp[0];
		temp.splice(0, 1);
		$scope.pagePressNext = temp.pop();
		$scope.pageNumPressList = temp;
	}
	
	$scope.pressPageChange = function(num) {
		console.log(num);
		$scope.currenPressPage = num;
		$scope.getPressList();
	};
	
	$scope.moveLogin = function(){
		if(confirm("로그인 후에 이용가능합니다.\n\n로그인 페이지로 이동하시겠습니까?")){
			$window.location.href = '/home/login.html';
			return true;
		}else{
			return false;
		}
	}
	
	$scope.getMemberInfo = function(){
		HomeSvc.getMemberInfo(data)
			.success(function(response){
				$scope.member_id = response.data.member_id;
				$scope.name = response.data.name;
				$scope.mdn = response.data.mdn;
				$scope.email = response.data.email;
				console.log('$scope.name : '+$scope.name+', $scope.mdn : '+$scope.mdn+', $scope.email : '+$scope.email);
			})
			.error(function(response){
				$window.alert(response.message);
			});
	}
	
	$scope.requestQnA = function() {
		if ($scope.title == "") {
			$window.alert("제목을 입력하세요.");
			return;
		}
		if ($scope.name == "") {
			$window.alert("이름을 입력하세요.");
			return;
		}
		if ($scope.email == "" || $scope.mdn == "") {
			$window.alert("이메일주소를 입력하세요.");
			return;
		} else if(!isEmail($scope.email)) {
			$window.alert("올바른 형식의 이메일주소를 입력하세요.");
			return;
		}
		if ($scope.mdn == "") {
			$window.alert("전화번호를 입력하세요.");
			return;
		} else if(!isInteger($scope.mdn)){
			$window.alert("전화번호를 숫자만 입력가능합니다.");
			return;
		}
		if ($scope.content == "") {
			$window.alert("문의사항을 입력하세요.");
			return;
		}
		if ($scope.chkAgree == false) {
			$window.alert('개인정보 수집 및 이용목적에 동의하셔야 이용가능합니다.');
			return;
		}
		
		var data = {member_id:$scope.member_id, title:$scope.title, content:$scope.content, board_type:$scope.board_type};
		HomeSvc.requestQnA(data)
			.success(function(response) {
				if(response.result == 0){
					$window.alert('문의사항이 등록되었습니다.');
					$window.location.href = '/home/introduce';
				}else{
					$window.alert('오류가 발생하였습니다.\n잠시후에 시도하세요.');
				}
			})
			.error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				$window.alert("error : " + data.message);
			}
		});
	}
	
	//로그아웃
	$scope.logout = function() {
		console.log('----------------- 로그아웃 --------------------');
		$rootScope.auth_token = null;
		$rootScope.member_id = null
		$rootScope.name = null
		$rootScope.mdn = null
		$rootScope.email = null
		$rootScope.certifyKey = null
		$http.defaults.headers.post['X-Auth'] = "";
		$cookieStore.remove("auth_info");
		
		$window.location.href = '/';
	}
	
	//로그인상태체크
	$scope.loggedIn = function() {
		if ($cookieStore.get("auth_info") != null && $cookieStore.get("auth_info") != undefined) {
			var auth_info = $cookieStore.get("auth_info");

			$rootScope.auth_token = auth_info.auth_token;
			$rootScope.member_id = auth_info.member_id;
			$rootScope.mdn = auth_info.mdn;
			$scope.member_id = auth_info.member_id;
			$scope.name = auth_info.name;
			$scope.mdn = auth_info.mdn;

			$http.defaults.headers.post['X-Auth'] = $rootScope.auth_token;
		};
		console.log('로그인 체크 => '+($rootScope.auth_token !== null));
		return $rootScope.auth_token !== null
	}
	
	$scope.stringToHtml = function(str){
		return $sce.trustAsHtml(str);
	}
	
	$scope.yyyyMMdd = function(date){
		var tmp = date.substring(0,10);
		var d = tmp.split("-");
		return d[0]+"."+d[1]+"."+d[2];
	}
	
	$scope.setPath = function(){
		console.log($location.path());
		var path = $location.path().replace("/SmartCare/","").replace(".html","");
		$scope.path  = path;
	}
	
	$scope.getPath = function(){
		return $scope.path;
	}
	
	$scope.setPath();
	
	console.log('path => '+$scope.path);
	if ($scope.getPath() == 'notice') {
		console.log('공지사항 목록 조회');
		$scope.getNotiList();
	} else if ($scope.getPath() == 'press') {
		console.log('언론자료 목록 조회');
		$scope.getPressList();
	} else if($scope.getPath() == 'inquiry') {
		console.log('문의하기');
		if($scope.loggedIn()){
			$scope.getMemberInfo();
		}else{
			$window.alert('로그인 후에 이용가능합니다');
			$window.location.href = '/SmartCare/login.html';
		}
	}
}]);