var app = angular.module('app', [
    'ngRoute', 'ui.bootstrap'
]);

app.config( ['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/user', {templateUrl: 'templates/user.html'})
	.when('/school', {templateUrl: 'templates/school.html'})
	.when('/consult', {templateUrl: 'templates/consult.html'})
	
	$locationProvider.html5Mode(false);
	$locationProvider.hashPrefix('!');
}]);

app.service('SchoolSvc', function($http) {
	this.getSchoolList = function(school) {
		return $http.post('/admin/api/getSchoolListOfMember', school);
	}
	this.modifySchool = function(school) {
		return $http.post('/admin/api/modifySchool', school);
	}
	this.getSchoolNotiList = function(school) {
		return $http.post('/admin/api/getSchoolNotiList', school);
	}
	this.addSchoolNoti = function(noti) {
		return $http.post('/admin/api/addSchoolNoti', noti);
	}
	this.modifySchoolNoti = function(noti) {
		return $http.post('/admin/api/modifySchoolNoti', noti);
	}
});

app.service('UserSvc', function($http) {
	this.fetch = function() {
		return $http.post('/api/user/getList');
	}
	this.create = function(user) {
		return $http.post('/api/user/add', user);
	}
	this.modify = function(user) {
		return $http.post('/api/user/modify', user);
	}
	this.remove = function(user) {
		return $http.post('/api/user/remove', user);
	}
});

app.service('ConsultSvc', function($http) {
	this.getSessionList = function(category) {
		return $http.post('/admin/api/getSessionList', category);
	}
	this.getConsultList = function(session_id) {
		return $http.post('/admin/api/getConsultList', session_id);
	}
	this.addConsult = function(consult) {
		return $http.post('/admin/api/addConsult', consult);
	}
});

app.controller('ApplicationCtrl', function ($scope, SchoolSvc) {

})

app.controller('SchoolCtrl', function ($scope, SchoolSvc) {
	$scope.mode = ""; //edit or noti
	$scope.noti_mode = "";
	$scope.school_id;
	$scope.selected_school = null;

	$scope.categories = [
		{code: 1, name: "가정통신문"},
		{code: 2, name: "공지사항"},
		{code: 3, name: "일정"}
	];

	$scope.schools = [];
	$scope.notis = [];

	$scope.currentPageSchool = 1;
	$scope.totalSchoolListCount = 0;

	$scope.schoolPageChanged = function() {
		$scope.getSchoolList();
		$scope.clearSchool();
		$scope.notis = [];
		$scope.clearNoti();
	};
	
	$scope.getSchoolList = function() {
		SchoolSvc.getSchoolList({start_index:$scope.currentPageSchool - 1, page_size:10})
		.success(function(schools) {
			$scope.schools = schools.data;
			$scope.totalSchoolLists = schools.total;
		});
	}

	$scope.getSchoolList();
	
	$scope.editSchool = function(school) {
		$scope.mode = "edit";
		
		$scope.school_id = school.school_id;
		$scope.school_name = school.school_name;
		$scope.address = school.address;
		$scope.zipcode = school.zipcode;
		$scope.gubun1 = school.gubun1;
		$scope.gubun2 = school.gubun2;
		$scope.homepage = school.homepage;
		$scope.fax = school.fax;
		$scope.contact = school.contact;
		$scope.sido = school.sido;
		$scope.gugun = school.gugun;
		$scope.lat = school.lat;
		$scope.lng = school.lng;
	}
	
	$scope.modifySchool = function() {
		var school = {school_id:$scope.school_id,
				school_name:$scope.school_name,
				address:$scope.address,
				zipcode:$scope.zipcode,
				gubun1:$scope.gubun1,
				gubun2:$scope.gubun2,
				homepage:$scope.homepage,
				fax:$scope.fax,
				contact:$scope.contact,
				sido:$scope.sido,
				gugun:$scope.gugun,
				lat:$scope.lat,
				lng:$scope.lng};
		SchoolSvc.modifySchool(school)
		.success(function(result){
			$scope.school_name = null;
			$scope.address = null;
			$scope.zipcode = null;
			$scope.gubun1 = null;
			$scope.gubun2 = null;
			$scope.homepage = null;
			$scope.fax = null;
			$scope.contact = null;
			$scope.sido = null;
			$scope.gugun = null;
			$scope.lat = null;
			$scope.lng = null;
			
			$scope.getSchoolList();
			//SchoolSvc.getSchoolList()
			//.success(function(schools) {
			//	$scope.schools = schools.data;
			//})
		})
	}
	
	//알리미 버튼 클릭-----------------------------------------------------
	$scope.currentPageNoti = 1;
	$scope.totalNotiListCount = 0;
	$scope.itemPerNotiPage = 5;

	$scope.initNotiVariables = function() {
		$scope.currentPageNoti = 1;
		$scope.totalNotiListCount = 0;	
	}	

	$scope.notiPageChanged = function() {
		$scope.getNoti($scope.selected_school);
		$scope.clearNoti();
	};


	$scope.getNoti = function(school) {
		if ($scope.selected_school == null || $scope.selected_school.school_id != school.school_id) {
			$scope.initNotiVariables();	
		};

		$scope.selected_school = school;
		$scope.mode = "noti";
		$scope.school_id = school.school_id;
		
		var noti = {school_id:school.school_id, start_index:$scope.currentPageNoti - 1, page_size:$scope.itemPerNotiPage};
		
		SchoolSvc.getSchoolNotiList(noti)
		.success(function(notiList) {
			$scope.notis = notiList.data;
			$scope.totalNotiListCount = notiList.total;	
		})
	}
	
	$scope.clickEditNoti = function(noti) {
		$scope.noti_mode = "edit";
		
		$scope.noti_seq = noti.noti_seq;
		$scope.category = noti.category;
		$scope.title = noti.title;
		$scope.content = noti.content;
		$scope.noti_date = noti.noti_date;
	}
	//알리미  글 수정
	$scope.modifyNoti = function() {
		var noti = {
			noti_seq: $scope.noti_seq,
			category: $scope.category,
			title: $scope.title,
			content: $scope.content,
			noti_date: $scope.noti_date
		}

		SchoolSvc.modifySchoolNoti(noti)
		.success(function(result){
			$scope.getNoti($scope.selected_school);
			$scope.clearNoti();
		});
	}
	//알리미 신규 글 등록
	$scope.addNoti = function() {
		var noti = {
				school_id: $scope.school_id,
				category: $scope.category,
				title: $scope.title,
				content: $scope.content,
				noti_date: $scope.noti_date
		}

		SchoolSvc.addSchoolNoti(noti)
		.success(function(result){
			$scope.getNoti($scope.selected_school);
			$scope.clearNoti();
		});
	}

	$scope.clearNoti = function() {
		$scope.noti_seq = null;
		$scope.category = null;
		$scope.title = null;
		$scope.content = null;
		$scope.noti_date = null;
	}
})

app.directive('calendar', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attr, ngModel) {
            $(el).datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: function (dateText) {
                    scope.$apply(function () {
                        ngModel.$setViewValue(dateText);
                    });
                }
            });
        }
    };
})

app.controller('UserCtrl', function ($scope, SchoolSvc) {
	$scope.saveUser = function () {
		console.log("id:" + $scope.id + " name:" + $scope.name);
	}
})

app.filter('changeCategoryName', function() {
	return function(categoryNo) {
		var categoryName = "";

		switch (categoryNo) {
			case 1 : categoryName = "성상담"; break;
			case 2 : categoryName = "학업상담"; break;
			case 3 : categoryName = "진로상담"; break;
			case 4 : categoryName = "심리상담"; break;
			case 5 : categoryName = "성장상담"; break;
			case 6 : categoryName = "흡연상담"; break;
		}

		return categoryName;
	}
});

app.controller('ConsultCtrl', function ($scope, ConsultSvc) {
	$scope.selectedCategoryNo = 0;
	$scope.selectedCategoryInfo = "";
	$scope.consultMessage = "";
	$scope.sessions = [];
	$scope.consultLists = [];
	$scope.consultListCategoryNo = 0;

	$scope.categories = [
		{code: 0, name: "전체"},
		{code: 1, name: "성상담"},
		{code: 2, name: "학업상담"},
		{code: 3, name: "진로상담"},
		{code: 4, name: "심리상담"},
		{code: 5, name: "성장상담"},
		{code: 6, name: "흡연상담"}
	];

	$scope.getSessionList = function(categoryNo) {
		ConsultSvc.getSessionList({ categoryNo : categoryNo})
			.success(function(sessions) {
				$scope.sessions = sessions.data;
			});
	};

	$scope.getSelectedCategoryData = function() {
		if ($scope.selectedCategoryInfo != null) {
			$scope.selectedCategoryNo = $scope.selectedCategoryInfo["code"];
			$scope.getSessionList($scope.selectedCategoryNo);
		};
	}

	$scope.showConsultList = function(session_id, member_id, category_no) {
		$scope.session_id = session_id;
		$scope.member_id = member_id;
		$scope.consultListCategoryNo = category_no;

	 	ConsultSvc.getConsultList({ session_id : session_id})
			.success(function(lists) {
				$scope.consultLists = lists.data;

			});
    }

    $scope.addConsultMessage = function(){
    	if ($scope.consultMessage != "") {
    		var consult = {
				content: $scope.consultMessage,
				category: $scope.consultListCategoryNo,
				who: 1,
				member_id: $scope.member_id
			}

    		ConsultSvc.addConsult(consult)
    			.success(function(result) {
    				$scope.showConsultList($scope.session_id, $scope.member_id, $scope.consultListCategoryNo);
    				$scope.consultMessage = "";
    			});
    	};
    }

    $scope.getSessionList($scope.selectedCategoryNo);

})