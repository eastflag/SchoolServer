$(function() {
    $('#side-menu').metisMenu();
});

var app = angular.module('app', [
    'ngRoute', 'ui.bootstrap', 'ngFileUpload', 'ngCookies', 'angularModalService'
]);

app.run(['$rootScope', function($rootScope) {
  	$rootScope.auth_token = null;
  	$rootScope.role_id = 0;
  	$rootScope.login_url = "/index.html";
}]);

app.config( ['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
	.when('/member', {templateUrl: 'templates/member.html'})
	.when('/school', {templateUrl: 'templates/school.html'})
	.when('/consult', {templateUrl: 'templates/consult.html'})
	.when('/noti', {templateUrl: 'templates/noti.html'})
	.when('/qna', {templateUrl: 'templates/qna.html'})
	.when('/admin', {templateUrl: 'templates/admin.html'})
	
	$locationProvider.html5Mode(false);
	$locationProvider.hashPrefix('!');

	$httpProvider.defaults.headers.post['X-Auth'] = "";
}]);

app.service('MainSvc', function($http) {
	this.getLogin = function(login) {
		return $http.post('/api/getLogin', login);
	}
})

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
	this.addMember = function(member) {
		return $http.post('/admin/api/addMember', member);
	}
	this.modifyMember = function(member) {
		return $http.post('/admin/api/modifyMember', member);
	}
	this.getPayList = function(member) {
		return $http.post('/admin/api/getPayList', member);
	}
	this.addPay = function(pay) {
		return $http.post('/admin/api/addPay', pay);
	}
	this.modifyPay = function(pay) {
		return $http.post('/admin/api/modifyPay', pay);
	}
	this.removePay = function(pay) {
		return $http.post('/admin/api/removePay', pay);
	}
	this.getSearchSchoolList = function(school) {
		return $http.post('/api/getSchoolList', school);
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
	this.removeSchoolNoti = function(noti) {
		return $http.post('/admin/api/removeSchoolNoti', noti);
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
	this.getNotiList = function(noti) {
		return $http.post('/admin/api/getNotiList', noti);
	}
	this.addNoti = function(noti) {
		return $http.post('/admin/api/addNoti', noti);
	}
	this.modifyNoti = function(noti) {
		return $http.post('/admin/api/modifyNoti', noti);
	}
	this.removeNoti = function(noti) {
		return $http.post('/admin/api/removeNoti', noti);
	}
});

app.service('BoardSvc', function($http) {
	this.getBoardList = function(board) {
		return $http.post('/admin/api/getBoardList', board);
	}
	this.answerBoard = function(board) {
		return $http.post('/api/modifyBoard', board);
	}
	this.removeBoard = function(board) {
		return $http.post('/api/removeBoard', board);
	}
});

app.service('AdminSvc', function($http) {
	this.getManagerList = function(admin) {
		return $http.post('/admin/api/getManagerList', admin);
	}
	this.addManager = function(admin) {
		return $http.post('/admin/api/addManager', admin);
	}
	this.modifyManager = function(admin) {
		return $http.post('/admin/api/modifyManager', admin);
	}
	this.removeManager = function(admin) {
		return $http.post('/admin/api/removeManager', admin);
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

app.controller('MainCtrl', ['$scope', '$http', '$rootScope', '$cookieStore', 'MainSvc', function ($scope, $http, $rootScope, $cookieStore, MainSvc) {
	$scope.token = null;
	$scope.error = null;
	$scope.role_id = null;

	$scope.login = function() {
		$scope.error = null;
		MainSvc.getLogin({id:$scope.id, pass:$scope.pass})
		.success(function(value){
			if(value.result == 0) {
				$scope.id = null;
				$scope.pass = null;

				$scope.token = value.data.token;
				$scope.role_id = value.data.role_id;

				$rootScope.auth_token = $scope.token;
				$rootScope.role_id = $scope.role_id;

				var auth_info = {auth_token : $rootScope.auth_token, role_id : $rootScope.role_id};

				$cookieStore.put("auth_info", auth_info);

				$http.defaults.headers.post['X-Auth'] = $rootScope.auth_token;
				console.log('rootScope token:' + $rootScope.auth_token);
			} else {
				alert(value.msg);
			}
		})
		.error(function(error) {
			$scope.error = error;
		})
	}

	$scope.loggedIn = function() {
		if ($cookieStore.get("auth_info") != null && $cookieStore.get("auth_info") != undefined) {
			var auth_info = $cookieStore.get("auth_info");

			$rootScope.auth_token = auth_info.auth_token;
			$rootScope.role_id = auth_info.role_id;
			$scope.role_id = auth_info.role_id;

			$http.defaults.headers.post['X-Auth'] = $rootScope.auth_token;
		};

        return $rootScope.auth_token !== null;
    }

    $scope.logOut = function() {
    	$rootScope.auth_token = null;
		$rootScope.role_id = 0;
		$scope.role_id = 0;

		$http.defaults.headers.post['X-Auth'] = "";

		$cookieStore.remove("auth_info");
    }
}]);

app.controller('MemberCtrl', ['$scope', '$http', '$rootScope', '$window', '$cookieStore', 'MemberSvc', 'ModalService', function ($scope, $http, $rootScope, $window, $cookieStore, MemberSvc, ModalService) {
	$scope.homes = [];
	$scope.members = [];
	$scope.pays = [];
	$scope.home_id = null;
	$scope.new_home_id = null;
	$scope.member_id = null;
	$scope.pay_id = null;

	$scope.currentPageHome = 1;
	$scope.totalHomeListCount = 0;

	$scope.currentPageMember = 1;
	$scope.totalMemberListCount = 0;

	$scope.search_value = null;
	$scope.home_order_key = null;
	$scope.search_value_name = null;
	$scope.home_mode = "";
	$scope.home_mode_text = "홈아이디 추가";
	$scope.member_mode = "";
	$scope.member_mode_text = "멤버 추가";
	$scope.pay_mode = "";
	$scope.pay_mode_text = "결제일 추가";

	$scope.leaves = [
		{code: 0, name: "탈퇴"},
		{code: 1, name: "사용중"}
	];

	$scope.deletes = [
		{code: 0, name: "삭제"},
		{code: 1, name: "사용중"}
	];

	$scope.parents = [
		{code: 0, name: "자녀"},
		{code: 1, name: "부모"}
	];

	$scope.isMemberEdit = function() {
		if($scope.member_mode == "edit") {
			return true;
		} else {
			return false;
		}
	}

	$scope.getHomeList = function() {
		var search_query = {start_index:($scope.currentPageHome - 1) * 10, page_size:10};
		search_query.search_value = $scope.search_value;
		search_query.order_key = $scope.home_order_key;

		MemberSvc.getHomeList(search_query)
		.success(function(homes) {
			$scope.homes = homes.data;
			$scope.totalHomeListCount = homes.total;

			$scope.clearHome();
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.getHomeList();

	$scope.homeListPageChanged = function() {
		$scope.getHomeList();
	};

	$scope.editHome = function(home) {
		$scope.home_mode = "edit";
		$scope.home_mode_text = "홈아이디 수정";
		$scope.search_value_name = null;

		$scope.home_id = home.home_id;
		$scope.new_home_id = home.home_id;
		$scope.home_use_yn = home.use_yn;

		$scope.getMemberList(home);
	}

	$scope.clearHome = function() {
		$scope.home_mode = "";
		$scope.home_mode_text = "홈아이디 추가";

		$scope.home_id = null;
		$scope.new_home_id = null;
		$scope.home_use_yn = null;
	}

	$scope.addHome = function(home) {
		console.log('home_id:' + $scope.home_id);
		console.log('new_home_id:' + $scope.new_home_id);
		if ($scope.new_home_id == null) {
			alert("홈아이디를 입력하세요.");
			return;
		};

		var home = {
			home_id: $scope.new_home_id
		}
		MemberSvc.addHome(home)
		.success(function(data){
			if(data.result == 0) {
				$scope.clearHome();
				$scope.getHomeList();
			} else {
				alert(data.msg);
			}
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.modifyHome = function() {
		console.log('home_id:' + $scope.home_id);
		console.log('new_home_id:' + $scope.new_home_id);
		if ($scope.new_home_id == null) {
			alert("홈아이디를 입력하세요.");
			return;
		};

		var home = {
			home_id: $scope.home_id,
			new_home_id: $scope.new_home_id,
			use_yn: $scope.home_use_yn
		}
		MemberSvc.modifyHome(home) 
		.success(function(data) {
			$scope.clearHome();
			$scope.getHomeList();
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.getMemberList = function(home) {
		var search_query_name = {start_index:($scope.currentPageMember - 1) * 10, page_size:10};

		if ($scope.search_value_name != null) {
			search_query_name.search_value = $scope.search_value_name;

			if($scope.member_search_key == 'mdn') {
				search_query_name.search_key = "mdn";
			} else if($scope.member_search_key == 'school_id') {
				search_query_name.search_key = "school_id";
			} else {
				search_query_name.search_key = "name";
			}
			//search_query_name = {start_index:($scope.currentPageMember - 1) * 10, page_size:10, name:$scope.search_value_name};
			console.log('search_query_name:' + JSON.stringify(search_query_name));
		}
		search_query_name.home_id = $scope.home_id;

		MemberSvc.getMemberList(search_query_name)
		.success(function(memberList) {
			$scope.members = memberList.data;
			$scope.totalMemberListCount = memberList.total;
			$scope.clearMember();
		}).error(function(data, status) {
			if (status >= 400 && status < 500) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.editMember = function(member) {
		$scope.member_id = member.member_id;
		$scope.member_mode = "edit";
		$scope.member_mode_text = "멤버 수정";

		$scope.new_home_id_2 = member.home_id;
		$scope.name = member.name;
		$scope.relation = member.relation;
		$scope.mdn = member.mdn;
		$scope.birth_date = member.birth_date;
		$scope.sex = member.sex;
		$scope.school_id = member.school_id;
		$scope.school_name = member.school_name;
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

		$scope.new_home_id_2 = null;
		$scope.name = null;
		$scope.relation = null;
		$scope.mdn = null;
		$scope.birth_date = null;
		$scope.sex = null;
		$scope.school_id = null;
		$scope.school_name = null;
		$scope.school_grade = null;
		$scope.school_class = null;
		$scope.is_parent = null;
		$scope.member_use_yn = null;
	}

	$scope.addMember = function() {
		console.log('name' + $scope.name);
		if($scope.home_id == null) {
			alert("추가할려는 홈을 선택하세요.");
			return;
		}

		if ($scope.name == null) {
			alert("멤버 이름을 입력하세요.");
			return;
		};

		if ($scope.relation == null) {
			alert("멤버 관계를 입력하세요.");
			return;
		};

		if ($scope.is_parent != "0" && $scope.is_parent != "1") {
			alert("멤버의 부모여부를 선택하세요.");
			return;
		} 

		if ($scope.is_parent == "0") {
			if ($scope.birth_date == null) {
				alert("생년월일을 입력하세요.");
				return;
			};

			if ($scope.sex == null) {
				alert("성별을 입력하세요.");
				return;
			};

			if ($scope.school_id == null) {
				alert("학교id를 입력하세요.");
				return;
			};

			if ($scope.school_grade == null) {
				alert("학년을 입력하세요.");
				return;
			};

			if ($scope.school_class == null) {
				alert("반을 입력하세요.");
				return;
			};
		}

		if ($scope.school_id == "0") {
			$scope.school_id = null;
		};

		if($scope.mdn == "") {
			$scope.mdn = null;
		}

		var member = {
			home_id: $scope.home_id,
			name : $scope.name,
			relation : $scope.relation,
			mdn: $scope.mdn,
			birth_date : $scope.birth_date,
			sex : $scope.sex,
			school_id : $scope.school_id,
			school_grade : $scope.school_grade,
			school_class : $scope.school_class,
			is_parent : $scope.is_parent
		}
		MemberSvc.addMember(member)
		.success(function(result){
			if(result.result == 0) {
				$scope.clearMember();
				$scope.getMemberList({home_id:$scope.home_id});
			} else {
				alert(result.msg);
			}
		}).error(function(data, status) {
			if (status >= 400 && status < 500) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.modifyMember = function() {
		if ($scope.new_home_id_2 == null) {
			alert("홈아이디를 입력하세요.");
			return;
		};

		if ($scope.name == null) {
			alert("멤버 이름을 입력하세요.");
			return;
		};

		if ($scope.relation == null) {
			alert("멤버 관계를 입력하세요.");
			return;
		};

		if ($scope.is_parent != "0" && $scope.is_parent != "1") {
			alert("멤버의 부모여부를 선택하세요.");
			return;
		} 

		if ($scope.is_parent == "0") {
			if ($scope.birth_date == "") {
				alert("생년월일을 입력하세요.");
				return;
			};

			if ($scope.sex == null) {
				alert("성별을 입력하세요.");
				return;
			};

			if ($scope.school_id == null) {
				alert("학교id를 입력하세요.");
				return;
			};

			if ($scope.school_grade == null) {
				alert("학년을 입력하세요.");
				return;
			};

			if ($scope.school_class == null) {
				alert("반을 입력하세요.");
				return;
			};
		}

		if ($scope.school_id == "0") {
			$scope.school_id = null;
		};

		var member = {
			member_id : $scope.member_id,
			home_id : $scope.new_home_id_2,
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
			if(result.result==0) {
				$scope.clearMember();
				$scope.getMemberList({home_id:$scope.home_id});
			} else {
				alert(result.msg);
			}
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.memberListPageChanged = function(member) {
		$scope.getMemberList(member);
	};

	$scope.getPayList = function(member) {
		MemberSvc.getPayList({member_id:member.member_id})
		.success(function(payList){
			$scope.pays = payList.data;
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.editPay = function(pay) {
		$scope.pay_mode = "edit";
		$scope.pay_mode_text = "결제 수정";

		$scope.pay_id = pay.pay_id;
		$scope.pay_date = pay.pay_date;
	}

	$scope.clearPay = function() {
		$scope.pay_mode = "";
		$scope.pay_mode_text = "결제 수정";

		$scope.pay_id = null;
		$scope.pay_date = null;
	}

	$scope.addPay = function() {
		MemberSvc.addPay({member_id: $scope.member_id, pay_date:$scope.pay_date})
		.success(function(){
			$scope.getPayList({member_id: $scope.member_id});
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.modifyPay = function() {
		MemberSvc.modifyPay({pay_id: $scope.pay_id, pay_date:$scope.pay_date})
		.success(function(){
			$scope.clearPay();
			$scope.getPayList({member_id: $scope.member_id});
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.confirmTodeletePay = function(pay) {
		if ($window.confirm("삭제하시겠습니까?")) {	
			MemberSvc.removePay(pay)
			.success(function(result) {
				$scope.getPayList({member_id:$scope.member_id});

				$scope.clearPay();
			}).error(function(data, status) {
				if (status >= 400) {
					$rootScope.auth_token = null;
					$cookieStore.remove("auth_info");
				} else {
					alert("error : " + data.message);
				}
			});
		};
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

	$scope.searchSchool = function() {
        ModalService.showModal({
            templateUrl: 'searchSchoolModal.html',
            controller: "SearchSchoolCtrl"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
            	if (result.selected_yn == "Y") {
            		$scope.school_id = result.school_id;
            		$scope.school_name = result.school_name;
            	};
            });
        });
    };
}]);

app.controller('SearchSchoolCtrl', ['$scope', 'MemberSvc', 'close', function ($scope, MemberSvc, close) {
	$scope.school_name = "";
	$scope.school_lists = [];
	$scope.selected_school = { selected_yn : "N", school_id : "0", school_name : "" };

	$scope.getSearchSchoolList = function() {
		$scope.selected_school = { selected_yn : "N", school_id : "0", school_name : "" };

		MemberSvc.getSearchSchoolList({school_name:$scope.school_name})
		.success(function(schoolLists){
			$scope.school_lists = schoolLists.data;
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.selectSchool = function(school_list) {
		$scope.selected_school = { selected_yn : "Y", school_id : school_list.school_id, school_name : school_list.school_name };
	}

 	$scope.closePopup = function(result) {
 		if (result == "Y" && $scope.selected_school.selected_yn == "Y") {
 			close($scope.selected_school, 500);
 		} else {
 			$scope.selected_school.selected_yn = "N";
 			close($scope.selected_school, 500);
 		}	 	
 	};
}]);

app.controller('SchoolCtrl', ['$scope', '$rootScope', '$window', '$cookieStore','Upload', 'SchoolSvc', function ($scope, $rootScope, $window, $cookieStore, Upload, SchoolSvc) {
	$scope.mode = ""; //edit or noti
	$scope.noti_mode = "";
	$scope.school_id;
	$scope.selected_school = null;

	$scope.categories = [
		{code: 1, name: "가정통신문"},
		{code: 2, name: "공지사항"}
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
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
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

		$scope.getNoti(school);
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
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
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
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}
	
	$scope.clickEditNoti = function(noti) {
		$scope.noti_mode = "edit";
		$scope.noti_mode_text = "알림장 수정";

		$scope.f = null;

		$scope.noti_seq = noti.noti_seq;
		$scope.category = noti.category;
		$scope.title = noti.title;
		$scope.content = noti.content;
		$scope.filename = noti.filename;
	}

	// 알리미 글 삭제
	$scope.removeNoti = function(noti) {
		if (! $window.confirm("정말 삭제하시겠습니까?")) {
			return;
		};

		SchoolSvc.removeSchoolNoti({noti_seq : noti.noti_seq})
		.success(function(result) {
			$scope.f = null;
			$scope.filename = "";

			$scope.getNoti($scope.selected_school);
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}


	//알리미  글 수정
	$scope.modifyNoti = function() {
		if ($scope.category == "") {
			alert("알림장 카테고리를 선택하세요.");
			return;
		};

		if ($scope.title == "") {
			alert("알림장 제목을 입력하세요.");
			return;
		};

		if ($scope.content == "") {
			alert("알림장 본문을 입력하세요.");
			return;
		};

		var noti = {
			noti_seq: $scope.noti_seq,
			category: $scope.category,
			title: $scope.title,
			content: $scope.content
		}

		if ($scope.f.$error != null && $scope.f.$error != undefined) {
			alert("첨부 파일은 10MB를 넘길 수 없습니다.");
			$scope.f.$error = null;
			$scope.f.$errorParam = "";
			return;
		}

    	$scope.upload = Upload.upload({
        	url: '/admin/api/modifySchoolNoti',
        	method: 'POST',
        	file:$scope.f,
        	//data 속성으로 별도의 데이터를 보냄.
        	data : JSON.stringify(noti),
        	fileFormDataName : 'file',
    	}).success(function(data, status, headers, config) {
    		console.log('data: ' + data + "," + data.result);
    		$scope.f = null;
			$scope.filename = "";
			
			$scope.getNoti($scope.selected_school);
			$scope.clearNoti();
    	}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}
	//알리미 신규 글 등록
	$scope.addNoti = function() {
		var noti = {
				school_id: $scope.school_id,
				category: $scope.category,
				title: $scope.title,
				content: $scope.content
		}

		if ($scope.f.$error != null && $scope.f.$error != undefined) {
			alert("첨부 파일은 10MB를 넘길 수 없습니다.");
			$scope.f.$error = null;
			$scope.f.$errorParam = "";
			return;
		}

    	$scope.upload = Upload.upload({
        	url: '/admin/api/addSchoolNoti',
        	method: 'POST',
        	file:$scope.f,
        	//data 속성으로 별도의 데이터를 보냄.
        	data : JSON.stringify(noti),
        	fileFormDataName : 'file',
    	}).success(function(data, status, headers, config) {
    		console.log('data: ' + data + "," + data.result);
    		if(data.result == 0) {
				$scope.getNoti($scope.selected_school);
				$scope.clearNoti();
			} else {
				alert(data.msg);
			}
    	}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});

	}

	$scope.clearNoti = function() {
		$scope.category = "";
		$scope.noti_seq = null;
		$scope.title = null;
		$scope.content = null;
		$scope.f = null;

		$scope.noti_mode = "";
		$scope.noti_mode_text = "알림장 추가";
	}

	$scope.clickNewNoti = function(){
		$scope.clearNoti();

		$scope.noti_mode = "";
		$scope.noti_mode_text = "알림장 추가";

		$scope.filename = "";
	}

    $scope.uploadFiles = function(file) {
    	console.log('file selected');
        $scope.f = file;

        if ($scope.f != null && $scope.f.name != null) {
        	$scope.filename = $scope.f.name;
        };

/*        if (file && !file.$error) {
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
        }  */ 
    }
}]); 

app.controller('ConsultCtrl', ['$scope', '$rootScope', '$cookieStore', 'ConsultSvc', function ($scope, $rootScope, $cookieStore, ConsultSvc) {
	$scope.selectedCategoryNo = 0;
	$scope.selectedCategoryInfo = "";
	$scope.consultMessage = "";
	$scope.sessions = [];
	$scope.consultLists = [];
	$scope.consultListCategoryNo = 0;

	$scope.currentPageSession = 1;
	$scope.totalSessionListCount = 0;

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

	$scope.sessionPageChanged = function() {
		$scope.getSessionList();
	};

	$scope.getSessionList = function(categoryNo) {
		var search = {category: categoryNo, start_index:($scope.currentPageSession - 1) * 10, page_size:10};
		ConsultSvc.getSessionList(search)
		.success(function(sessions) {
			$scope.sessions = sessions.data;
			$scope.totalSessionListCount = sessions.total;
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	};

	$scope.getSelectedCategoryData = function() {
		if ($scope.selectedCategoryInfo != null) {
			$scope.selectedCategoryNo = $scope.selectedCategoryInfo["code"];
			$scope.currentPageSession = 1;
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
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
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
    		}).error(function(data, status) {
				if (status >= 400) {
					$rootScope.auth_token = null;
					$cookieStore.remove("auth_info");
				} else {
					alert("error : " + data.message);
				}
			});
    	};
    }

    $scope.getSessionList($scope.selectedCategoryNo);
}])

app.controller('NotiCtrl', ['$scope', '$rootScope', '$window', '$cookieStore', 'NotiSvc', function ($scope, $rootScope, $window, $cookieStore, NotiSvc) {
	$scope.noti = {title : "", content : "" };
	$scope.notis = [];

	$scope.noti_mode = "";
	$scope.noti_mode_text = "공지 추가";
	$scope.currentPageNoti = 1;
	$scope.totalNotiListCount = 0;

	$scope.getNotiList = function() {
		NotiSvc.getNotiList({start_index:($scope.currentPageNoti - 1) * 10, page_size:10})
		.success(function(notis) {
			$scope.notis = notis.data;
			$scope.totalNotiListCount = notis.total;

		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
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
			}).error(function(data, status) {
				if (status >= 400) {
					$rootScope.auth_token = null;
					$cookieStore.remove("auth_info");
				} else {
					alert("error : " + data.message);
				}
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
		if ($scope.noti.title == "") {
			alert("공지 제목을 입력하세요.");
			return;
		};

		if ($scope.noti.content == "") {
			alert("공지 내용을 입력하세요.");
			return;
		};

		NotiSvc.addNoti($scope.noti)
		.success(function(result) {
			$scope.getNotiList();

			$scope.clearNoti();
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
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

app.controller('BoardCtrl', ['$scope', '$rootScope', '$cookieStore', 'BoardSvc', function ($scope, $rootScope, $cookieStore, BoardSvc) {
	$scope.board;
	$scope.boards = [];

	$scope.currentPageBoard = 1;
	$scope.totalBoardListCount = 0;

	$scope.getBoardList = function() {
		BoardSvc.getBoardList({board_type:1, start_index:($scope.currentPageBoard - 1) * 10, page_size:10})
		.success(function(boards) {
			$scope.boards = boards.data;
			$scope.totalBoardListCount = boards.total;

			$scope.clearBoard();
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.clickBoard = function(board) {
		$scope.board = board;
	}

	$scope.answerBoard = function() {
		if ($scope.board.answer == "") {
			alert("답변을 입력하세요.");
			return;
		};

		BoardSvc.answerBoard({board_id:$scope.board.board_id, answer:$scope.board.answer})
		.success(function(result) {
			$scope.getBoardList({board_type:1});

			$scope.clearBoard();
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.clearBoard = function(){
		$scope.board = null;
	}

	$scope.boardListPageChanged = function() {
		$scope.getBoardList();
	};

	$scope.getBoardList();
}])

app.controller('AdminCtrl', ['$scope', '$rootScope', '$window', '$cookieStore', 'AdminSvc', function ($scope, $rootScope, $window, $cookieStore, AdminSvc) {
	$scope.admins = [];
	
	$scope.currentPageAdmin = 1;
	$scope.totalAdminListCount = 0;

	$scope.admin_mode = "";
	$scope.admin_mode_text = "관리자 추가";

	$scope.roles = [
		{code: 1, name: "슈퍼관리자"},
		{code: 2, name: "상담사"},
		{code: 3, name: "측정관리자"}
	];


	$scope.getManagerList = function(){
		AdminSvc.getManagerList({start_index:($scope.currentPageAdmin - 1) * 10, page_size:10})
		.success(function(admins) {
			$scope.admins = admins.data;
			$scope.totalAdminListCount = admins.total;

			$scope.clearAdmin();
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.getManagerList();

	$scope.clearAdmin = function() {
		$scope.admin_mode = "";
		$scope.admin_mode_text = "관리자 추가";

		$scope.id = null;
		$scope.pass = null;
		$scope.name = null;
		$scope.role_id = "";
	}

	$scope.adminListPageChanged = function() {
		$scope.getManagerList();
	};

	$scope.editAdmin = function(admin) {
		$scope.manager_id = admin.manager_id;
		$scope.admin_mode = "edit";
		$scope.admin_mode_text = "관리자 수정";

		$scope.id = admin.id;
		$scope.pass = admin.pass;
		$scope.name = admin.name;
		$scope.role_id = admin.role_id;
	}

	$scope.addAdmin = function() {
		var admin = {
			id: $scope.id,
			pass: $scope.pass,
			name: $scope.name,
			role_id: $scope.role_id
		}

		AdminSvc.addManager(admin)
		.success(function(data){
			$scope.clearAdmin();
			$scope.getManagerList();
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.modifyAdmin = function() {
		var admin = {
			manager_id: $scope.manager_id,
			name: $scope.name,
			role_id: $scope.role_id
		}
		
		AdminSvc.modifyManager(admin)
		.success(function(data){
			$scope.clearAdmin();
			$scope.getManagerList();
		}).error(function(data, status) {
			if (status >= 400) {
				$rootScope.auth_token = null;
				$cookieStore.remove("auth_info");
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.deleteAdmin = function(admin) {
		if ($window.confirm("삭제하시겠습니까?")) {	
			AdminSvc.removeManager(admin)
			.success(function(result) {
				$scope.currentPageAdmin = 1;
				
				$scope.clearAdmin();
				$scope.getManagerList();
			}).error(function(data, status) {
				if (status >= 400) {
					$rootScope.auth_token = null;
					$cookieStore.remove("auth_info");
				} else {
					alert("error : " + data.message);
				}
			});
		};
	}
}]);