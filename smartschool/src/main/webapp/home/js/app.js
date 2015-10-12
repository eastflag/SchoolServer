var app = angular.module('home', ['ngRoute', 'ngCookies']);

app.run(['$rootScope', function($rootScope) {
	$rootScope.auth_token = null;
	$rootScope.member_id = null
	$rootScope.mdn = null
	$rootScope.index_url = "/HealthCare/index";
	$rootScope.menu = 0;
}]);

app.config( ['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
		.when('/HealthCare/index', {templateUrl: 'home/templates/index.html', controller:'IndexCtrl'})
		.when('/HealthCare/login', {templateUrl: 'home/templates/login.html', controller:'IndexCtrl'})
		.when('/HealthCare/notice', {templateUrl: 'home/templates/notice.html', controller:'NotiCtrl'})
		.when('/HealthCare/request', {templateUrl: 'home/templates/request.html', controller:'ReqCtrl'})
		.when('/HealthCare/introduce', {templateUrl: 'home/templates/introduce.html', controller:'QnACtrl'})
		.when('/HealthCare/inquiry', {templateUrl: 'home/templates/inquiry.html', controller:'QnACtrl'})
		.otherwise({redirectTo: '/HealthCare/index'});
	
	$locationProvider.html5Mode(true);
	//$locationProvider.hashPrefix('!');

	$httpProvider.defaults.headers.post['X-Auth'] = "";
}]);

app.service('IndexSvc', function($http) {
	this.requestCertification = function(data) {
		return $http.post('/HealthCare/api/getSmsCertifyKey', data);
	}
	this.login = function(data){
		return $http.post('/HealthCare/api/login', data);
	}
	this.logout = function(){
		return $http.get('/HealthCare/api/logout');
	}
});

app.controller('IndexCtrl', function ($scope, $http, $rootScope, $cookieStore, $window, $location, IndexSvc) {
	$scope.token = null;
	$scope.error = null;
	
	$scope.credentials = {
			member_id:null,
			name:null,
			mdn:null,
			email:null,
			certifyKey:null
		}
	
	$scope.request = false;
	
	$scope.init = function(){
		var curr_url = $location.path();
		if(curr_url=='/HealthCare/login'){
			if($rootScope.auth_token == null){
				$rootScope.menu = 1;
			}else{
				$window.location.href = '/HealthCare/index';
			}
		}else if(curr_url=='/HealthCare/index'){
			$rootScope.menu = 0;
		}
		console.log('$rootScope.menu : '+$rootScope.menu);
	}
	
	//인증번호요청
	$scope.requestCertification = function(){
		if($scope.request){
			$window.alert('이미 인증번호요청을 하셨습니다.\n잠시후에 다시 시도하세요.');
			return;
		}else{
			if($scope.credentials.mdn=='' || $scope.credentials.mdn == null){
				$window.alert('핸드폰번호를 입력해주세요.');
				return;
			}
			else if(!isInteger($scope.credentials.mdn)){
				$window.alert("숫자만 입력하세요.");
				return;
			}
			else{
				var data = {"mdn": $scope.credentials.mdn};
				IndexSvc.requestCertification(data)
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
		else if($scope.credentials.mdn=='' || $scope.credentials.mdn == null) {
			$window.alert('핸드폰번호를 입력해주세요.');
			return;
		}
		else if(!isInteger($scope.credentials.mdn)) {
			$window.alert("숫자만 입력하세요.");
			return;
		}
		else if($scope.credentials.certifyKey == '' || $scope.credentials.certifyKey == null) {
			$window.alert("인증번호를 입력하세요.");
			return;
		}
		else if(!isInteger($scope.credentials.certifyKey)) {
			$window.alert("숫자만 입력하세요.");
			return;
		}
		else{
			$scope.error = null;
			IndexSvc.login($scope.credentials)
				.success(function(response){
					if(response.result == 0) {
						$scope.credentials.mdn = '';
						$scope.credentials.certifyKey = '';
	
						$scope.token = response.data.token;
						$scope.credentials.member_id = response.data.member_id;
						$scope.credentials.mdn = response.data.mdn;
	
						$rootScope.auth_token = $scope.token;
						$rootScope.member_id = $scope.credentials.member_id;
						$rootScope.mdn = $scope.credentials.mdn;
	
						var auth_info = {auth_token : $rootScope.auth_token, member_id:$rootScope.member_id, mdn:$rootScope.mdn};
	
						$cookieStore.put("auth_info", auth_info);
	
						$http.defaults.headers.post['X-Auth'] = $rootScope.auth_token;
						
						$window.location.href = '/HealthCare/index';
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
	
	//로그인상태체크
	$scope.loggedIn = function() {
		if ($cookieStore.get("auth_info") != null && $cookieStore.get("auth_info") != undefined) {
			var auth_info = $cookieStore.get("auth_info");

			$rootScope.auth_token = auth_info.auth_token;
			$rootScope.member_id = auth_info.member_id;
			$rootScope.mdn = auth_info.mdn;
			$scope.credentials.member_id = auth_info.member_id;
			$scope.credentials.mdn = auth_info.mdn;

			$http.defaults.headers.post['X-Auth'] = $rootScope.auth_token;
		};

		return $rootScope.auth_token !== null
	}
	
	$scope.guest = function(){
		$window.alert('준비중입니다.');
	}

	//로그아웃
	$scope.logout = function() {
		console.log('----------------- Log out! --------------------');
		IndexSvc.logout()
			.success(function(response){
				if(response.result == 0){
					$rootScope.auth_token = null;
					$http.defaults.headers.post['X-Auth'] = "";
					$cookieStore.remove("auth_info");
					$window.location.href = '/HealthCare/index';
				}
			})
			.error(function(response, state){
				$window.alert("error : " + response.message);
			});
	}
	
	$scope.getMenu = function(){
		return $rootScope.menu;
	}
	
	$scope.init();
});

app.service('NotiSvc', function($http) {
	this.getNotiList = function(search) {
		return $http.post('/HealthCare/api/getNotiList', search);
	}
});
app.controller('NotiCtrl', function ($scope, $rootScope, $window, $cookieStore, $window, NotiSvc) {
	$scope.noti = {title : "", content : "" };
	$scope.notis = [];

	$scope.currentPage = 1;
	$scope.total = 0;
	$scope.pageSize = 10;
	$scope.pageList = [];
	$scope.pageLast;
	
	$scope.init = function(){
		$rootScope.menu = 2;
		$scope.getNotiList();
	}
	
	$scope.getNotiList = function() {
		NotiSvc.getNotiList({start_index:($scope.currentPage - 1) * $scope.pageSize, page_size:$scope.pageSize})
		.success(function(response) {
			$scope.notis = response.data;
			$scope.total = response.total;
			$scope.setPaginationInfo();
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
	
	$scope.setPaginationInfo = function(){
		var temp = setPaginationInfo($scope.currentPage, $scope.pageSize, $scope.total);
		
		$scope.pageLast = temp.pop();
		$scope.pageList = temp;
	}
	
	$scope.toggleContent = function(idx){
		var list = $('.news_list').find('li');
		if(list.eq(idx).hasClass('curr')){
			list.eq(idx).removeClass('curr');
		}else{
			list.eq(idx).addClass('curr');
		}
	}

	$scope.pageChange = function(num) {
		$scope.currentPage = num;
		$scope.getNotiList();
	};

	$scope.init();
});

app.service('QnASvc', function($http) {
	this.requestQnA = function(data) {
		return $http.post('/HealthCare/api/requestQnA', data);
	}
	this.getMemberInfo = function(data){
		return $http.post('/HealthCare/api/getMemberInfo', data);
	}
});
app.controller('QnACtrl', function ($scope, $rootScope, $cookieStore, $window, $location, QnASvc) {
	$scope.member_id = null;
	$scope.name = null;
	$scope.mdn = null;
	$scope.email = null;
	$scope.title = null;
	$scope.content = null;
	$scope.board_type = 1;
	$scope.chkAgree = false;
	
	$scope.init = function(){
		$rootScope.menu = 4;
		
		var curr_url = $location.path();
		if($rootScope.auth_token == null && curr_url=='/HealthCare/inquiry'){
			if(confirm("로그인 후에 이용가능합니다.\n로그인 페이지로 이동하시겠습니까?")){
				$window.location.href = '/HealthCare/login';
			}else{
				$window.location.href = '/HealthCare/index';
			}
		}else if($rootScope.auth_token !== null && curr_url=='/HealthCare/inquiry'){
			var data = {member_id:$rootScope.member_id, mdn:$rootScope.mdn}
			QnASvc.getMemberInfo(data)
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
		
		QnASvc.requestQnA(data)
			.success(function(response) {
				if(response.result == 0){
					$window.alert('문의사항이 등록되었습니다.');
					$window.location.href = '/HealthCare/introduce';
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
	
	$scope.moveLogin = function(){
		if(confirm("로그인 후에 이용가능합니다.\n로그인 페이지로 이동하시겠습니까?")){
			$window.location.href = '/HealthCare/login';
			return true;
		}else{
			return false;
		}
	}
	
	$scope.init();
});


app.service('ReqSvc', function($http) {
	this.download = function(type) {
		if(type=='all'){
			return "통합서비스 신청서 다운로드";
		} else if(type=='part'){
			return "안전,정보알림 서비스 신청서 다운로드";
		}
	}
});
app.controller('ReqCtrl', function ($scope, $rootScope, $cookieStore, $window, ReqSvc) {
	
	$scope.init = function(){
		$rootScope.menu = 3;
	}
	$scope.download = function(type) {
		//$window.alert(ReqSvc.download(type));
		$window.alert('준비중입니다.');
	}
	
	$scope.init();
});