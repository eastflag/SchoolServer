$(function() {
    $('#side-menu').metisMenu();
});

var app = angular.module('app', [
    'ngRoute', 'ui.bootstrap', 'ngFileUpload'
]);

app.config( ['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/member', {templateUrl: 'templates/member.html'})
	.when('/school', {templateUrl: 'templates/school.html'})
	.when('/consult', {templateUrl: 'templates/consult.html'})
	.when('/noti', {templateUrl: 'templates/noti.html'})
	.when('/qna', {templateUrl: 'templates/qna.html'})
	
	$locationProvider.html5Mode(false);
	$locationProvider.hashPrefix('!');
}]);

app.service('MemberSvc', function($http) {
	this.getHomeList = function(search) {
		return $http.post('/admin/api/getHomeList', search);
	}
	this.addHome = function(home) {
		return $http.post('/admin/api/addHome', home);
	}
	this.modifyHome = function(home) {
		return $http.post('/admin/api/modifyHome', home);
	}
	this.getMemberList = function(home) {
		return $http.post('/admin/api/getAllMember', home);
	}
	this.modifyMember = function(member) {
		return $http.post('/admin/api/modifyMember', member);
	}
	this.getPayList = function(member) {
		return $http.post('/api/getPayList', member);
	}
	this.addPay = function(pay) {
		return $http.post('/api/addPay', pay);
	}
});

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

app.service('NotiSvc', function($http) {
	this.getNotiList = function() {
		return $http.post('/api/getNotiList');
	}
	this.addNoti = function(noti) {
		return $http.post('/api/addNoti', noti);
	}
	this.modifyNoti = function(noti) {
		return $http.post('/api/modifyNoti', noti);
	}
	this.removeNoti = function(noti) {
		return $http.post('/api/removeNoti', noti);
	}
});

app.service('BoardSvc', function($http) {
	this.getBoardList = function(board) {
		return $http.post('/api/getBoardList', board);
	}
	this.answerBoard = function(board) {
		return $http.post('/api/modifyBoard', board);
	}
	this.removeBoard = function(board) {
		return $http.post('/api/removeBoard', board);
	}
});

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
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

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
			case 7 : categoryName = "학교폭력"; break;
			case 8 : categoryName = "친구관계"; break;
			case 9 : categoryName = "가정폭력"; break;
		}

		return categoryName;
	}
});

app.controller('ApplicationCtrl', function ($scope) {

})

app.controller('MemberCtrl', function ($scope, MemberSvc) {
	$scope.homes = [];
	$scope.members = [];
	$scope.pays = [];
	$scope.home_id = "";
	$scope.member_id = "";
	$scope.pay;

	$scope.currentPageHome = 1;
	$scope.totalHomeListCount = 0;

	$scope.currentPageMember = 1;
	$scope.totalMemberListCount = 0;

	$scope.search_value = "";
	$scope.home_mode = "";
	$scope.home_mode_text = "홈아이디 추가";
	$scope.member_mode = "";
	$scope.member_mode_text = "멤버 추가";
	$scope.pay_mode = "";
	$scope.pay_mode_text = "결제일 추가";

	$scope.getHomeList = function() {
		var search_query = "";

		if ($scope.search_value == "") {
			search_query = {start_index:($scope.currentPageHome - 1) * 10, page_size:10};
		} else {
			search_query = {start_index:($scope.currentPageHome - 1) * 10, page_size:10, search_value:$scope.search_value};
		}

		MemberSvc.getHomeList(search_query)
		.success(function(homes) {
			$scope.homes = homes.data;
			$scope.totalHomeListCount = homes.total;

			$scope.clearHome();
		});
	}

	$scope.getHomeList();

	$scope.homeListPageChanged = function() {
		$scope.getHomeList();
	};

	$scope.editHome = function(home) {
		$scope.home_mode = "edit";
		$scope.home_mode_text = "홈아이디 수정";

		$scope.home_id = home.home_id;
		$scope.home_use_yn = home.use_yn;

		$scope.getMemberList(home);
	}

	$scope.clearHome = function() {
		$scope.home_mode = "";
		$scope.home_mode_text = "홈아이디 추가";

		$scope.home_id = "";
		$scope.home_use_yn = "";
	}

	$scope.addHome = function(home) {
		var home = {
			home_id: $scope.home_id
		}
		MemberSvc.addHome(home)
		.success(function(data){
			$scope.clearHome();
			$scope.getHomeList();
		});
	}

	$scope.modifyHome = function() {
		var home = {
			home_id: $scope.home_id,
			use_yn: $scope.home_use_yn
		}
		MemberSvc.modifyHome(home) 
		.success(function(data) {
			$scope.clearHome();
			$scope.getHomeList();
		});
	}

	$scope.getMemberList = function(home) {
		MemberSvc.getMemberList(home)
		.success(function(memberList) {
			$scope.members = memberList.data;

			$scope.clearMember();
		})
	}

	$scope.editMember = function(member) {
		$scope.member_id = member.member_id;
		$scope.member_mode = "edit";
		$scope.member_mode_text = "멤버 수정";

		$scope.name = member.name;
		$scope.relation = member.relation;
		$scope.mdn = member.mdn;
		$scope.birth_date = member.birth_date;
		$scope.sex = member.sex;
		$scope.school_id = member.school_id;
		$scope.school_grade = member.school_grade;
		$scope.school_class = member.school_class;
		$scope.is_parent = member.is_parent;
		$scope.member_use_yn = member.use_yn;

		$scope.getPayList(member);
	}

	$scope.clearMember = function() {
		$scope.member_id = "";
		$scope.member_mode = "";
		$scope.member_mode_text = "멤버 추가";

		$scope.name = null;
		$scope.relation = null;
		$scope.mdn = null;
		$scope.birth_date = null;
		$scope.sex = null;
		$scope.school_id = null;
		$scope.school_grade = null;
		$scope.school_class = null;
		$scope.is_parent = null;
		$scope.member_use_yn = null;
	}

	$scope.modifyMember = function() {
		var member = {
			member_id : $scope.member_id,
			name : $scope.name,
			relation : $scope.relation,
			mdn: $scope.mdn,
			birth_date : $scope.birth_date,
			sex : $scope.sex,
			school_id : $scope.school_id,
			school_grade : $scope.school_grade,
			school_class : $scope.school_class,
			is_parent : $scope.is_parent,
			use_yn : $scope.member_use_yn
		}
		MemberSvc.modifyMember(member)
		.success(function(result){
			$scope.clearMember();
			
			$scope.getMemberList({home_id:$scope.home_id});
		})

	}

	$scope.memberListPageChanged = function(member) {
		$scope.getMemberList(member);
	};

	$scope.getPayList = function(member) {
		$scope.pay = {member_id:member.member_id};

		MemberSvc.getPayList({member_id:member.member_id})
		.success(function(payList){
			$scope.pays = payList.data;
		})
	}

	$scope.addPay = function() {
		MemberSvc.addPay({member_id: $scope.pay.member_id, pay_date:$scope.pay_date})
		.success(function(){
			$scope.getPayList({member_id: $scope.pay.member_id});
		})
	}

	$scope.getToday = function() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();

		if(dd < 10) {
		    dd = "0" + dd;
		} 

		if(mm < 10) {
		    mm = "0" + mm;
		} 

		$scope.pay_date = yyyy + "-" + mm + "-" + dd;
	}

	$scope.getToday();
});

app.controller('SchoolCtrl', ['$scope','Upload', 'SchoolSvc', function ($scope, Upload, SchoolSvc) {
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
	$scope.search_value = "";
	$scope.noti_mode_text = "알림창 추가";

	$scope.schoolPageChanged = function() {
		$scope.getSchoolList();
		$scope.notis = [];
		$scope.clearNoti();
	};

	$scope.getSchoolList = function() {
		var search_query = "";

		if ($scope.search_value == "") {
			search_query = {start_index:($scope.currentPageSchool - 1) * 10, page_size:10};
		} else {
			search_query = {start_index:($scope.currentPageSchool - 1) * 10, page_size:10, search_value:$scope.search_value};
		}

		SchoolSvc.getSchoolList(search_query)
		.success(function(schools) {
			$scope.schools = schools.data;
			$scope.totalSchoolListCount = schools.total;
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
		$scope.code = school.code;
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
				lng:$scope.lng,
				code:$scope.code};
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
			$scope.code = null;
			
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

		$scope.clearNoti();

		$scope.selected_school = school;
		$scope.mode = "noti";
		$scope.school_id = school.school_id;
		
		var noti = {school_id:school.school_id, start_index:($scope.currentPageNoti - 1) * $scope.itemPerNotiPage, page_size:$scope.itemPerNotiPage};
		
		SchoolSvc.getSchoolNotiList(noti)
		.success(function(notiList) {
			$scope.notis = notiList.data;
			$scope.totalNotiListCount = notiList.total;	
		})
	}
	
	$scope.clickEditNoti = function(noti) {
		$scope.noti_mode = "edit";
		$scope.noti_mode_text = "알림장 수정";

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
		$scope.title = null;
		$scope.content = null;
		$scope.noti_date = null;

		$scope.noti_mode = "";
		$scope.noti_mode_text = "알림장 추가";
	}

	$scope.clickNewNoti = function(){
		$scope.clearNoti();

		$scope.noti_mode = "";
		$scope.noti_mode_text = "알림장 추가";
	}

    $scope.uploadFiles = function(file) {
        $scope.f = file;
        if (file && !file.$error) {
            file.upload = Upload.upload({
                url: '/admin/upload',   
                file: file
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });

            file.upload.progress(function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }   
    }
}]); 

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
		{code: 6, name: "흡연상담"},
		{code: 7, name: "학교폭력"},
		{code: 8, name: "친구관계"},
		{code: 9, name: "가정폭력"}
	];

	$scope.getSessionList = function(categoryNo) {
		ConsultSvc.getSessionList({ category : categoryNo})
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

    				$scope.getSessionList($scope.selectedCategoryNo);
    			});
    	};
    }

    $scope.getSessionList($scope.selectedCategoryNo);
})

app.controller('NotiCtrl', ['$scope', '$window', 'NotiSvc', function ($scope, $window, NotiSvc) {
	$scope.noti;
	$scope.notis = [];

	$scope.noti_mode = "";
	$scope.noti_mode_text = "공지 추가";
	$scope.currentPageNoti = 1;
	$scope.totalNotiListCount = 0;

	$scope.getNotiList = function() {
		NotiSvc.getNotiList()
		.success(function(notis) {
			$scope.notis = notis.data;
		});
	}

	$scope.editNoti = function(noti) {
		$scope.noti = noti;

		$scope.noti_mode = "edit";
		$scope.noti_mode_text = "공지 수정";
	}

	$scope.deleteConfirm = function(noti) {
		if ($window.confirm("삭제하시겠습니까?")) {	
			NotiSvc.removeNoti(noti)
			.success(function(result) {
				$scope.getNotiList();

				$scope.clearNoti();
			});
		};
	}

	$scope.modifyNoti = function(){
		NotiSvc.modifyNoti($scope.noti)
		.success(function(result) {
			$scope.getNotiList();

			$scope.clearNoti();
		});
	}

	$scope.addNoti = function() {
		NotiSvc.addNoti($scope.noti)
		.success(function(result) {
			$scope.getNotiList();

			$scope.clearNoti();
		});
	}

	$scope.notiListPageChanged = function() {
		$scope.getNotiList();
	};

	$scope.initNoti = function() {
		$scope.clearNoti();
	}

	$scope.clearNoti = function(){
		$scope.noti_mode = "";
		$scope.noti_mode_text = "공지 추가";

		$scope.noti = null;
	}

	$scope.getNotiList();
}]);

app.controller('BoardCtrl', function ($scope, BoardSvc) {
	$scope.board;
	$scope.boards = [];

	$scope.currentPageBoard = 1;
	$scope.totalBoardListCount = 0;

	$scope.getBoardList = function() {
		BoardSvc.getBoardList({board_type:1})
		.success(function(boards) {
			$scope.boards = boards.data;

			$scope.clearBoard();
		});
	}

	$scope.clickBoard = function(board) {
		$scope.board = board;
	}

	$scope.answerBoard = function() {
		BoardSvc.answerBoard({board_id:$scope.board.board_id, answer:$scope.board.answer})
		.success(function(result) {
			$scope.getBoardList({board_type:1});

			$scope.clearBoard();
		});
	}

	$scope.clearBoard = function(){
		$scope.board = null;
	}

	$scope.boardListPageChanged = function() {
		$scope.getBoardList();
	};

	$scope.getBoardList();
})
