var app = angular.module('home', ['ngRoute', 'ngCookies', 'ngSanitize']);

app.run(['$rootScope', function($rootScope) {
	$rootScope.rootPath = "/";
	
	$rootScope.home_id = null;
	$rootScope.name = null;
	$rootScope.mdn = null;
	$rootScope.email = null;
}]);

app.config( ['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
	/*$routeProvider
		.when('/', {templateUrl: '/SmartCare/in_app/index.html'})
	*/
	$locationProvider.html5Mode(true);
}]);

app.service('CommonSvc', function($http) {
	this.toggleContent = function(idx){
		var list = $('.news_list').find('li');
		if(list.eq(idx).hasClass('curr')){
			list.eq(idx).removeClass('curr');
		}else{
			list.eq(idx).addClass('curr');
		}
	};
	this.yyyyMMdd = function(date) {
		if(date == null || date ==''){
			return '';
		}
		var tmp = date.substring(0,10);
		var d = tmp.split("-");
		return d[0]+"."+d[1]+"."+d[2];
	};
	this.setPaginationInfo = function(targetPage, page_size, total){
		var currentPage = targetPage;
		var pageSize = page_size;
		var totalItemCount = total;
		var totalPageCount=1;
		var firstPageNoOnPageList;
		var lastPageNoOnPageList;
		var prevPageNoOnPageList;
		var nextPageNoOnPageList;
		
		if(totalItemCount==0){
			var result = [1,1,1];
			return result;
		} else {
			totalPageCount = parseInt((totalItemCount-1)/pageSize) + 1;
			firstPageNoOnPageList = parseInt((currentPage-1)/pageSize)*pageSize + 1;
			lastPageNoOnPageList = firstPageNoOnPageList+pageSize-1;
			if(lastPageNoOnPageList > totalPageCount){
				lastPageNoOnPageList = totalPageCount;
			}
			prevPageNoOnPageList = firstPageNoOnPageList-pageSize;
			if(prevPageNoOnPageList<1){
				prevPageNoOnPageList=1;
			}
			nextPageNoOnPageList = lastPageNoOnPageList+1;
			if(nextPageNoOnPageList > totalPageCount){
				nextPageNoOnPageList = totalPageCount;
			}
		
			var result = [totalPageCount+2];
			var j=0;
			result[j] = prevPageNoOnPageList;
			j++;
			for(var i=firstPageNoOnPageList; i<=lastPageNoOnPageList; i++){
				result[j]=i;
				j++;
			}
			result[j] = nextPageNoOnPageList;
			return result;
		}
	}
});

app.controller('CommonCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', 'CommonSvc', function($scope, $rootScope, $cookies, $window, $location, CommonSvc){
	$scope.home_id = null;
	$scope.name = null;
	$scope.mdn = null;
	$scope.email = null;
	
	//로그인상태체크
	$scope.loggedIn = function() {
		var member_info = $cookies.getObject("member_info");
		
		if (member_info != null && member_info != undefined) {
			$scope.home_id = member_info.home_id;
			$scope.name = member_info.name;
			$scope.mdn = member_info.mdn;
			$scope.email = member_info.email;
			
			$rootScope.home_id = $scope.home_id;
			$rootScope.name = $scope.name;
			$rootScope.mdn = $scope.mdn;
			$rootScope.email = $scope.email;
			
			var loadDt = new Date();
			var expires = new Date(Date.parse(loadDt) + 1000 * 60*30);  //30분후
			var member_info = {home_id:$scope.home_id, name:$scope.name, mdn:$scope.mdn, email:$scope.email};
			$cookies.putObject("member_info", member_info,{'path': '/', 'expires':expires});
			console.log('로그인 상태 => '+true);
			return true;
		}else{
			console.log('로그인 상태 => '+false);
			return false;
		}
	}
}]);

app.service('NoticeSvc', function($http) {
	this.getNotiList = function(data) {
		console.log('----------------- 공지사항 목록 --------------------');
		return $http.post('/web/api/getNotiList', data);
	};
});

app.controller('NoticeCtrl', ['$scope', 'NoticeSvc', 'CommonSvc', function ($scope, NoticeSvc, CommonSvc) {
	$scope.notiList = [];
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.totalNoti = 0;
	$scope.pageNumList = [];
	$scope.pageFirst = 1;
	$scope.pageNext = 1;
	
	$scope.getNotiList = function() {
		NoticeSvc.getNotiList({start_index:($scope.currentPage - 1) * $scope.pageSize, page_size:$scope.pageSize})
			.success(function(response) {
				$scope.notiList = response.data;
				$scope.totalNoti = response.total;
				$scope.setPaginationInfo();
			})
			.error(function(response, state) {
				if (state >= 400) {
					$cookies.remove("member_info",{'path': '/'});
				} else {
					$window.alert("error : " + response.message);
				}
			});
	}
	
	$scope.setPaginationInfo = function(){
		var temp = CommonSvc.setPaginationInfo($scope.currentPage, $scope.pageSize, $scope.totalNoti);
		$scope.pageFirst = temp[0];
		temp.splice(0, 1);
		$scope.pageNext = temp.pop();
		$scope.pageNumList = temp;
	}
	
	$scope.pageChange = function(num) {
		console.log(num);
		$scope.currentPage = num;
		$scope.getNotiList();
	};
	
	$scope.toggleContent = function(idx){
		CommonSvc.toggleContent(idx);
	}
	
	$scope.yyyyMMdd = function(date){
		return CommonSvc.yyyyMMdd(date);
	};
	
	
	$scope.getNotiList();
}]);

app.service('PressSvc', function($http) {
	this.getPressList = function(data){
		console.log('-----------------언론자료 목록 --------------------');
		return $http.post('/web/api/getPressList', data);
	}
	this.viewPress = function(data){
		console.log('-----------------언론자료 상세 --------------------');
		return $http.post('/web/api/getPress', data);
	}
});

app.controller('PressCtrl', ['$scope', '$sce', 'PressSvc', 'CommonSvc', function ($scope, $sce, PressSvc, CommonSvc) {
	$scope.pressList = [];		//목록
	$scope.press = {
		title:null,
		content:null,
		created:null,
		attach:[]
	};
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.totalPress = 0;
	$scope.pageNumList = [];
	$scope.pageFirst = 1;
	$scope.pageNext = 1;
	$scope.flag = null;
	$scope.press_id = null;
	
	//언론자료 목록
	$scope.getPressList = function() {
		PressSvc.getPressList({start_index:($scope.currentPage - 1) * $scope.pageSize, page_size:$scope.pageSize})
			.success(function(response) {
				$scope.pressList = response.data;
				$scope.totalPress = response.total;
				$scope.setPressPaginationInfo();
			})
			.error(function(response, state) {
				if (state >= 400) {
					$cookies.remove("member_info",{'path': '/'});
				} else {
					$window.alert("error : " + response.message);
				}
			});
	}
	
	//언론자료 상세
	$scope.viewPress = function(press_id){
		console.log('press_id => '+press_id);
		PressSvc.viewPress({press_id:press_id})
			.success(function(response){
				if(response.result==0){
					$scope.press.title = response.data.title;
					$scope.press.content = response.data.content;
					$scope.press.created = CommonSvc.yyyyMMdd(response.data.created);
					$scope.press.attach = response.data.list;
				}else{
					$window.alert('해당 게시물이 존재하지 않습니다.');
					$window.location.href='/SmartCare/press.html';
				}
			})
			.error(function(response, state){
				if (state >= 400) {
					$cookies.remove("member_info",{'path': '/'});
				} else {
					$window.alert("error : " + response.message);
				}
			})
	}
	
	//언론자료 페이징설정
	$scope.setPressPaginationInfo = function(){
		var temp = CommonSvc.setPaginationInfo($scope.currentPage, $scope.pageSize, $scope.totalPress);
		$scope.pageFirst = temp[0];
		temp.splice(0, 1);
		$scope.pageNext = temp.pop();
		$scope.pageNumList = temp;
	}
	
	//언론자료 페이지이동
	$scope.pageChange = function(num) {
		console.log(num);
		$scope.currentPage = num;
		$scope.getPressList();
	};
	
	$scope.stringToHtml = function(str){
		return $sce.trustAsHtml(str);
	}
	
	$scope.toggleContent = function(idx){
		CommonSvc.toggleContent(idx);
	}
	
	$scope.yyyyMMdd = function(date){
		return CommonSvc.yyyyMMdd(date);
	}
	
	$scope.getPressList();
}]);

app.service('RequestSvc', function($http) {
	this.getMemberInfo = function(data){
		return $http.post('/web/api/getMemberInfo', data);
	};
	this.requestQnA = function(data) {
		return $http.post('/web/api/requestQnA', data);
	};
});
app.controller('RequestCtrl', ['$scope', '$rootScope', '$window', 'RequestSvc', function ($scope, $rootScope, $window, RequestSvc) {
	$scope.home_id = $rootScope.home_id;
	$scope.member_id = $rootScope.member_id;
	$scope.name = $rootScope.name;
	$scope.mdn = $rootScope.mdn;
	$scope.email = $rootScope.email;
	
	$scope.moveLogin = function(){
		if(confirm("로그인 후에 이용가능합니다.\n\n로그인 페이지로 이동하시겠습니까?")){
			$window.location.href = '#!/login.html';
			return true;
		}else{
			return false;
		}
	};
	
	$scope.getMemberInfo = function(){
		RequestSvc.getMemberInfo({member_id:$scope.member_id})
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
	};
	
	//문의사항 등록
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
		RequestSvc.requestQnA(data)
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
					$cookies.remove("member_info",{'path': '/'});
				} else {
					$window.alert("error : " + data.message);
				}
			});
	};
}]);