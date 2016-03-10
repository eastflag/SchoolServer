$(function() {
    $('#side-menu').metisMenu();
});

var app = angular.module('app', [
    'ngRoute', 'ui.bootstrap', 'ngFileUpload', 'ngCookies', 'angularModalService', 'ckeditor', 'toaster', 'ngAnimate', 'angular-jwt', 'ngScrollbars', 'ngAnimate'
]);

app.run(['$rootScope', '$cookieStore', '$http', 'toaster', function($rootScope, $cookieStore, $http, toaster) {
  	$rootScope.role_id = 0;
  	$rootScope.login_url = "/index.html";

  	$rootScope.refreshToken = function(new_token) {
		$rootScope.auth_token = new_token;

		var auth_info = {auth_token : $rootScope.auth_token, role_id : $rootScope.role_id};

		$cookieStore.put("auth_info", auth_info);

		$http.defaults.headers.post['X-Auth'] = $rootScope.auth_token;
  	};

  	$rootScope.logout = function() {
  		$rootScope.auth_token = null;
  		$cookieStore.remove("auth_info");
  		$rootScope.pop('error', 'LogOut', '세션이 만료되었습니다.', 3000);
  	}

  	$rootScope.pop = function(type, title, content, time) {
  		toaster.pop(type, title, content, time);
  	}

  	$rootScope.clear = function() {
  		toaster.clear();
  	}
}]);

app.config( ['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
	.when('/member', {templateUrl: '/admin/templates/member.html'})
	.when('/school', {templateUrl: '/admin/templates/school.html'})
	.when('/consult', {templateUrl: '/admin/templates/consult.html'})
	.when('/noti', {templateUrl: '/admin/templates/noti.html'})
	.when('/qna', {templateUrl: '/admin/templates/qna.html'})
	.when('/os', {templateUrl: '/admin/templates/os.html'})
	.when('/admin', {templateUrl: '/admin/templates/admin.html'})
	.when('/location_use', {templateUrl: '/admin/templates/location_use.html'})
	.when('/admin_access', {templateUrl: '/admin/templates/admin_access.html'})
	.when('/press', {templateUrl: '/admin/templates/press.html'})
	.when('/magazine', {templateUrl: '/admin/templates/magazine.html'})
	.when('/challenge', {templateUrl: '/admin/templates/challenge.html'})
	.when('/statistic', {templateUrl: '/admin/templates/statistic.html'})
	
	
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

app.service('LocationAccessSvc', function($http) {
	this.getLocationAccessList = function(access) {
		return $http.post('/admin/api/getLocationAccessList', access);
	}
});

app.service('AdminAccessSvc', function($http) {
	this.getAdminAccessList = function(access) {
		return $http.post('/admin/api/getAdminAccessList', access);
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

app.service('OsSvc', function($http) {
	this.getOsInfoList = function() {
		return $http.post('/admin/api/getOsInfoList');
	}
	this.modifyOsInfo = function(osInfo) {
		return $http.post('/admin/api/modifyOsInfo', osInfo);
	}
});



app.service('StatSvc', function($http){
	this.getGugun = function(stat) {
		return $http.post('/admin/api/getGugun',stat);
	}
	this.getSchoolByAddr = function(stat){
		return $http.post('/admin/api/getSchoolByAddr',stat);
	}
	this.getSchoolGrade = function(stat){
		return $http.post('/admin/api/getSchoolGrade',stat);
	}	
	this.getSchoolClass=function(stat){
		return $http.post('/admin/api/getSchoolClass',stat);
	}
	this.getResult=function(stat){
		return $http.post('/admin/api/getResult',stat);
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

app.controller('MainCtrl', ['$scope', '$http', '$rootScope', '$cookieStore', 'MainSvc', 'jwtHelper', function ($scope, $http, $rootScope, $cookieStore, MainSvc, jwtHelper) {
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
			//expire time 검증
			var token = auth_info.auth_token;
			var isExpired = jwtHelper.isTokenExpired(token);
			
			if(isExpired) {
				return false;
			} else {
				$rootScope.auth_token = auth_info.auth_token;
				$rootScope.role_id = auth_info.role_id;
				$scope.role_id = auth_info.role_id;

				$http.defaults.headers.post['X-Auth'] = $rootScope.auth_token;
				return true
			}
		} else {
			return false;
		}
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

    $scope.leaves_array = ["탈퇴", "사용중"];
	$scope.leaves = {
		"탈퇴": 0, "사용중": 1
	};

	$scope.deletes_array = ["삭제", "사용중"];
	$scope.deletes = {
		"삭제": 0,  "사용중": 1
	};

	$scope.parents_array =["자녀", "부모"];
	$scope.parents = {
		"자녀": 0, "부모": 1
	};

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
		.success(function(homes, status, headers) {
			$rootScope.refreshToken(headers('X-Auth'));
			$scope.homes = homes.data;
			$scope.totalHomeListCount = homes.total;

			$scope.clearHome();
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
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
			if (status == 401) {
				$rootScope.logout();
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
			if (status == 401) {
				$rootScope.logout();
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
		.success(function(memberList, status, headers) {
			$rootScope.refreshToken(headers('X-Auth'));
			$scope.members = memberList.data;
			$scope.totalMemberListCount = memberList.total;
			$scope.clearMember();
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
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
			if (status == 401) {
				$rootScope.logout();
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
			if (status == 401) {
				$rootScope.logout();
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
		.success(function(payList, status, headers){
			$rootScope.refreshToken(headers('X-Auth'));
			$scope.pays = payList.data;
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
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
			if (status == 401) {
				$rootScope.logout();
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
			if (status == 401) {
				$rootScope.logout();
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
				if (status == 401) {
					$rootScope.logout();
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
			//$rootScope.refreshToken(headers('X-Auth'));
			$scope.school_lists = schoolLists.data;
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
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

app.controller('LocationAccessCtrl', ['$scope', '$rootScope', '$cookieStore', 'LocationAccessSvc', function ($scope, $rootScope, $cookieStore, LocationAccessSvc) {
	$scope.currentPage = 1;
	$scope.totalCount = 0;

	$scope.getLocationAccessList = function() {
		LocationAccessSvc.getLocationAccessList({start_index:($scope.currentPage - 1) * 10, page_size:10})
		.success(function(datas, status, headers) {
			$rootScope.refreshToken(headers('X-Auth'));
			$scope.datas = datas.data;
			$scope.totalCount = datas.total;
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.getLocationAccessList();
}]);

app.controller('AdminAccessCtrl', ['$scope', '$rootScope', '$cookieStore', 'AdminAccessSvc', function ($scope, $rootScope, $cookieStore, AdminAccessSvc) {
	$scope.currentPage = 1;
	$scope.totalCount = 0;

	$scope.getAdminAccessList = function() {
		AdminAccessSvc.getAdminAccessList({start_index:($scope.currentPage - 1) * 10, page_size:10})
		.success(function(datas, status, headers) {
			$rootScope.refreshToken(headers('X-Auth'));
			$scope.datas = datas.data;
			$scope.totalCount = datas.total;
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.getAdminAccessList();
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
		.success(function(schools, status, headers) {
			$rootScope.refreshToken(headers('X-Auth'));
			$scope.schools = schools.data;
			$scope.totalSchoolListCount = schools.total;
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
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
			if (status == 401) {
				$rootScope.logout();
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
		.success(function(notiList, status, headers) {
			$rootScope.refreshToken(headers('X-Auth'));
			$scope.notis = notiList.data;
			$scope.totalNotiListCount = notiList.total;	
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
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
			if (status == 401) {
				$rootScope.logout();
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
        	data : {file:$scope.f, data:JSON.stringify(noti)}
    	}).success(function(data, status, headers, config) {
    		console.log('data: ' + data + "," + data.result);
    		$scope.f = null;
			$scope.filename = "";
			
			$scope.getNoti($scope.selected_school);
			$scope.clearNoti();
    	}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
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

		if ($scope.f != null && $scope.f.$error != null && $scope.f.$error != undefined) {
			alert("첨부 파일은 10MB를 넘길 수 없습니다.");
			$scope.f.$error = null;
			$scope.f.$errorParam = "";
			return;
		}

    	$scope.upload = Upload.upload({
        	url: '/admin/api/addSchoolNoti',
        	data : {file:$scope.f, data:JSON.stringify(noti)}
    	}).success(function(data, status, headers, config) {
    		console.log('data: ' + data + "," + data.result);
    		if(data.result == 0) {
				$scope.getNoti($scope.selected_school);
				$scope.clearNoti();
			} else {
				alert(data.msg);
			}
    	}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
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
		.success(function(sessions, status, headers) {
			$rootScope.refreshToken(headers('X-Auth'));
			$scope.sessions = sessions.data;
			$scope.totalSessionListCount = sessions.total;
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
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
		.success(function(lists, status, headers) {
			$rootScope.refreshToken(headers('X-Auth'));
			$scope.consultLists = lists.data;
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
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
				if (status == 401) {
					$rootScope.logout();
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
		.success(function(notis, status, headers) {
			$rootScope.refreshToken(headers('X-Auth'));
			$scope.notis = notis.data;
			$scope.totalNotiListCount = notis.total;

		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
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
				if (status == 401) {
					$rootScope.logout();
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
			if (status == 401) {
				$rootScope.logout();
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
		.success(function(boards, status, headers) {
			$rootScope.refreshToken(headers('X-Auth'));
			$scope.boards = boards.data;
			$scope.totalBoardListCount = boards.total;

			$scope.clearBoard();
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
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
			if (status == 401) {
				$rootScope.logout();
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

app.controller('OsCtrl', ['$scope', '$rootScope', '$cookieStore', 'OsSvc', function ($scope, $rootScope, $cookieStore, OsSvc) {
	$scope.osInfoList = [];
	$scope.tempList = []; //원본 데이터 유지

	$scope.getOsInfoList = function() {
		OsSvc.getOsInfoList()
		.success(function(osinfos, status, headers) {
			$rootScope.refreshToken(headers('X-Auth'));
			$scope.osInfoList = osinfos.data;
			$scope.tempList = angular.copy(osinfos.data);
			console.log("$scope.tempList:" + $scope.tempList[0].os_name);
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.editOsInfo = function(osInfo) {
		//var index = $scope.osInfoList.indexOf(osInfo);
		//console.log("index:" + index);
		//$scope.tempList[index] = osInfo;
	}

	$scope.clearOsInfo = function(index) {
		console.log("index:" + index + $scope.osInfoList[index].version_code + "," + $scope.tempList[index].version_code);
		$scope.osInfoList[index] = angular.copy($scope.tempList[index]);
	}

	$scope.modifyOsInfo = function(osInfo) {
		OsSvc.modifyOsInfo(osInfo)
		.success(function(data, status){
			if (status == 200) {
				//원본 데이터 유지
				var index = $scope.osInfoList.indexOf(osInfo);
				$scope.tempList[index] = angular.copy($scope.osInfoList[index]);
				alert("변경되었습니다.");
			} else {
				alert("fail.");
			}
		})
		.error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.getOsInfoList();
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
		.success(function(admins, status, headers) {
			$rootScope.refreshToken(headers('X-Auth'));
			$scope.admins = admins.data;
			$scope.totalAdminListCount = admins.total;

			$scope.clearAdmin();
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
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
			if (status == 401) {
				$rootScope.logout();
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
			if (status == 401) {
				$rootScope.logout();
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
				if (status == 401) {
					$rootScope.logout();
				} else {
					alert("error : " + data.message);
				}
			});
		};
	}
}]);

//언론자료 관리
app.service('PressSvc', function($http) {
	this.getPressList = function(data) {
		return $http.post('/admin/api/getPressList', data);
	}
	this.removePress = function(data){
		return $http.post('/admin/api/removePress', data);
	}
	this.removeFile = function(data){
		return $http.post('/admin/api/removeAttachFile',data);
	}
});
app.controller('PressCtrl', ['$scope', '$rootScope', '$window', '$cookieStore', '$window', 'Upload', 'PressSvc', function ($scope, $rootScope, $window, $cookieStore, $window, Upload, PressSvc) {
	$scope.presses = [];
	$scope.totalCount = 0;
	$scope.currentPage = 1;

	$scope.hide = true;
	$scope.mode = '';
	$scope.mode_text = '';
	
	$scope.getPressList = function(){
		PressSvc.getPressList({start_index:($scope.currentPage - 1) * 10, page_size:10})
		.success(function(response, status, headers) {
			$rootScope.refreshToken(headers('X-Auth'));
			$scope.presses = response.data;
			$scope.totalCount = response.total;
			
			$scope.clearPress();
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
			} else {
				alert("error : " + data.message);
			}
		});
	}
	
	$scope.clearPress = function() {
		$scope.hide = true;
		$scope.mode = '';
		$scope.mode_text = '';
		
		$scope.title = null;
		$scope.content = null;
		$scope.f = [];
		$scope.filenames = [
			{code:1, name:null},
			{code:2, name:null}
		];
	}
	
	$scope.pageChange = function() {
		$scope.getPressList();
	};
	
	$scope.uploadFiles = function(file,idx) {
		console.log('file selected');

		if (file != null && file.name != null) {
			$scope.f[idx] = file;
			$scope.filenames[idx].name = file.name;
			$scope.filenames[idx].file_id = null;
		};
	}
	
	$scope.writePress = function() {
		$scope.hide = false;
		$scope.mode = 'write';
		$scope.mode_text = '언론자료 추가';
		$scope.title = null;
		$scope.content = null;
		$scope.f = [];
		$scope.filenames = [
			{code:1, name:null, file_id:null},
			{code:2, name:null, file_id:null}
		];
	}
	
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
	
	$scope.addPress = function(){
		console.log('언론자료 등록');
		if ($scope.title == null) {
			$window.alert('제목을 입력하세요.');
			return;
		}
		else if($scope.content == null) {
			$window.alert('내용을 입력하세요.');
			return;
		}

		else if(!$scope.checkImgName()){
			$window.alert('중복된 첨부파일이 있습니다.\n첨부파일을 확인하세요.');
			return;
		}
		else {
			console.log({title: $scope.title, content: $scope.content, files : $scope.f});
			
			$scope.upload = Upload.upload({
				url: '/admin/api/addPress',
				data : {title: $scope.title, content: $scope.content, files : $scope.f}
			}).success(function(response) {
				if(response.result == 0) {
					$window.alert('언론자료가 등록되었습니다.');
					$scope.getPressList();
					$scope.clearPress();
				} else {
					$window.alert(response.msg);
				}
			}).error(function(data, status) {
				if (status == 401) {
					$rootScope.logout();
				} else {
					alert("error : " + data.message);
				}
			});
		}
	}
	
	$scope.editPress = function(press){
		console.log('언론자료 상세');
		
		$scope.hide = false;
		$scope.mode = 'edit';
		$scope.press_id = press.press_id;
		$scope.title = press.title;
		$scope.content = press.content;
		$scope.f = [];
		for(var i=0; i<press.list.length;i++){
			$scope.filenames[i] = {code:(i+1), name:press.list[i].org_name, file_id:press.list[i].file_id};
		}
	}
	
	$scope.removeFile = function(idx){
		console.log('파일삭제');
		if($scope.filenames[(idx-1)].file_id == null){
			$scope.f[idx-1] = null;
			$scope.filenames[(idx-1)].name = null;
		} else if($scope.filenames[(idx-1)].file_id != null && $scope.mode == 'edit'){
			if($window.confirm("파일을 삭제하시겠습니까?")){
				$scope.f[idx-1] = null;
				$scope.filenames[(idx-1)].name = null;
				
				PressSvc.removeFile({file_id:$scope.filenames[(idx-1)].file_id})
					.success(function(response){
						if(response.result == 0) {
							$window.alert('첨부파일이 삭제되었습니다.');
						} else {
							$window.alert('삭제 실패!\n잠시 후에 다시 시도하세요.');
						}
					})
					.error(function(response,status){
						if (status == 401) {
							$rootScope.logout();
						} else {
							alert("error : " + data.message);
						}
					});
			}else{
				return false;
			}
		}
	}
	
	$scope.modifyPress = function(){
		console.log('언론자료 수정');
		if ($scope.title == null) {
			$window.alert('제목을 입력하세요.');
			return;
		}
		else if($scope.content == null) {
			$window.alert('내용을 입력하세요.');
			return;
		}
		else if(!$scope.checkImgName()){
			$window.alert('중복된 첨부파일이 있습니다.\n첨부파일을 확인하세요.');
			return;
		}
		else {
			console.log({press_id : $scope.press_id, title: $scope.title, content: $scope.content, files : $scope.f});
			$scope.upload = Upload.upload({
				url: '/admin/api/modifyPress',
				data : {press_id : $scope.press_id, title: $scope.title, content: $scope.content, files : $scope.f}
			}).success(function(response) {
				if(response.result == 0) {
					$window.alert('언론자료가 수정되었습니다.');
					$scope.getPressList();
					$scope.clearPress();
				} else {
					$window.alert('수정 실패!\n잠시 후에 다시 시도하세요.');
				}
			}).error(function(data, status) {
				if (status == 401) {
					$rootScope.logout();
				} else {
					alert("error : " + data.message);
				}
			});
		}
	}
	
	$scope.removePress = function(press){
		if($window.confirm('해당 언론자료를 삭제하시겠습니까?')){
			PressSvc.removePress(press)
				.success(function(response){
					if(response.result == 0) {
						$window.alert('언론자료가 삭제되었습니다.');
						$scope.getPressList();
						$scope.clearPress();
					} else {
						$window.alert('삭제 실패!\n잠시 후에 다시 시도하세요.');
					}
				})
				.error(function(response, state){
					if (status == 401) {
						$rootScope.logout();
					} else {
						alert("error : " + response.message);
					}
				});
		}else{
			return;
		}
	}
	
	$scope.getPressList();
}]);

// 건강매거진 관리
app.service('MagazineSvc', function($http) {
	this.getMagazineList = function(params) {
		return $http.post('/admin/api/getMagazineList', params);
	}
	this.removeMagazine = function(params) {
		return $http.post('/admin/api/removeMagazine', params);
	}
});
app.controller('MagazineCtrl', ['$scope', '$rootScope', '$window', '$cookieStore', '$window', 'Upload', 'MagazineSvc', function ($scope, $rootScope, $window, $cookieStore, $window, Upload, MagazineSvc) {
	$scope.magazines = [];
	$scope.totalCount = 0;
	$scope.currentPage = 1;
	
	$scope.mode = null;
	$scope.mode_text = "메거진 추가";
	
	$scope.years = [];
	$scope.months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
	
	$scope.getMagazineList = function(){
		$scope.clearMagazine();
		MagazineSvc.getMagazineList({start_index:($scope.currentPage - 1) * 10, page_size:10})
		.success(function(response, status, headers) {
			$rootScope.refreshToken(headers('X-Auth'));
			$scope.magazines = response.data;
			$scope.totalCount = response.total;
			
			$scope.clearMagazine();
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
			} else {
				alert("error : " + data.message);
			}
		});
	}

	$scope.clearMagazine = function() {
		$scope.mode = null;
		$scope.mode_text = "건강매거진 추가";
		
		var cDate = new Date();
		var currYear = cDate.getFullYear();
		for(var i=0;i<10;i++){
			var tmp = (currYear-i);
			$scope.years[i] = tmp;
		}

		$scope.title = '';
		$scope.subTitle = '';
		$scope.subject = '';
		$scope.content = '';
		$scope.year = '';
		$scope.month = '';
		$scope.f = [];
		$scope.filenames = [
			{code:1, name:null},
			{code:2, name:null},
			{code:3, name:null},
			{code:4, name:null},
			{code:5, name:null},
			{code:6, name:null},
			{code:7, name:null},
			{code:8, name:null},
			{code:9, name:null},
			{code:10, name:null}
		];
	}
	
	$scope.addMode = function(){
		$scope.clearMagazine();
		$scope.mode = 'add';
	}
	
	$scope.pageChange = function() {
		$scope.getMagazineList();
	};
	
	$scope.f = [];
	$scope.uploadFiles = function(file,idx) {
		if (file != null && file.name != null) {
			$scope.f[idx] = file
			$scope.filenames[idx].name = file.name;
		};
	}
	
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
	
	$scope.addMagazine = function(){
		if($scope.year == ''){
			$window.alert('연도를 선택하세요.');
			return;
		}
		else if($scope.month == ''){
			$window.alert('월을 선택하세요.');
			return;
		}
		else if($scope.title == ''){
			$window.alert('제목을 입력하세요.');
			return;
		}
		else if($scope.subject == ''){
			$window.alert('주제를 입력하세요.');
			return;
		}
		else if($scope.content == ''){
			$window.alert('내용을 입력하세요.');
			return;
		}
		else if(!$scope.checkImgName()){
			$window.alert('중복 이미지가 있습니다.\n이미지를 확인하세요.');
			return;
		}
		else if($scope.filenames[0].name==''){
			$window.alert('첫번째 이미지가 없습니다.\n건강매거진 이미지를 선택하세요.');
			return;
		}
		else if($scope.f.length==0){
			$window.alert('선택된 이미지가 없습니다.\n건강매거진 이미지를 선택하세요.');
			return;
		}
		else {
			var magazine = {
				year: $scope.year,
				month: $scope.month,
				title: $scope.title,
				subject: $scope.subject,
				content: $scope.content,
				img_1:$scope.filenames[0].name,
				img_2:$scope.filenames[1].name,
				img_3:$scope.filenames[2].name,
				img_4:$scope.filenames[3].name,
				img_5:$scope.filenames[4].name,
				img_6:$scope.filenames[5].name,
				img_7:$scope.filenames[6].name,
				img_8:$scope.filenames[7].name,
				img_9:$scope.filenames[8].name,
				img_10:$scope.filenames[9].name,
				files : $scope.f
			}
			
			$scope.upload = Upload.upload({
				url: '/admin/api/addMagazine',
				data : magazine
			}).success(function(data, status, headers, config) {
				console.log('data: ' + data + "," + data.result);
				if(data.result == 0) {
					$window.alert('건강매거진이 등록되었습니다.');
					$scope.getMagazineList();
					$scope.clearMagazine();
				} else {
					$window.alert(data.msg);
				}
			}).error(function(data, status) {
				if (status == 401) {
					$rootScope.logout();
				} else {
					alert("error : " + data.message);
				}
			});
		}
	}

	$scope.editMagazine = function(magazine){
		console.log('건강매거진 수정');
		$scope.magazine_id = magazine.magazine_id;
		$scope.mode = "edit";
		$scope.mode_text = "건강매거진 수정";
		
		$scope.year = magazine.year;
		$scope.month = magazine.month;
		$scope.title = magazine.title;
		$scope.subject = magazine.subject;
		$scope.content = magazine.content;
		$scope.filenames = [
			{code:1, name:magazine.img_1=='null'?'':magazine.img_1},
			{code:2, name:magazine.img_2=='null'?'':magazine.img_2},
			{code:3, name:magazine.img_3=='null'?'':magazine.img_3},
			{code:4, name:magazine.img_4=='null'?'':magazine.img_4},
			{code:5, name:magazine.img_5=='null'?'':magazine.img_5},
			{code:6, name:magazine.img_6=='null'?'':magazine.img_6},
			{code:7, name:magazine.img_7=='null'?'':magazine.img_7},
			{code:8, name:magazine.img_8=='null'?'':magazine.img_8},
			{code:9, name:magazine.img_9=='null'?'':magazine.img_9},
			{code:10, name:magazine.img_10=='null'?'':magazine.img_10}
		];
	}
	
	$scope.deleteFile = function(idx){
		$scope.filenames[idx].name='';
	}
	
	$scope.modifyMagazine = function(){
		if($scope.year == ''){
			$window.alert('연도를 선택하세요.');
			return;
		}
		else if($scope.month == ''){
			$window.alert('월을 선택하세요.');
			return;
		}
		else if($scope.title == ''){
			$window.alert('제목을 입력하세요.');
			return;
		}
		else if($scope.subject == ''){
			$window.alert('주제를 입력하세요.');
			return;
		}
		else if($scope.content == ''){
			$window.alert('내용을 입력하세요.');
			return;
		}
		else if(!$scope.checkImgName()){
			$window.alert('중복 이미지가 있습니다.\n이미지를 확인하세요.');
			return;
		}
		else if($scope.filenames[0].name==''){
			$window.alert('첫번째 이미지가 없습니다.\n건강매거진 이미지를 선택하세요.');
			return;
		}
		else {
			console.log('건강매거진 수정');
			
			var magazine = {
				magazine_id:$scope.magazine_id,
				year: $scope.year,
				month: $scope.month,
				title: $scope.title,
				subject: $scope.subject,
				content: $scope.content,
				img_1:$scope.filenames[0].name,
				img_2:$scope.filenames[1].name,
				img_3:$scope.filenames[2].name,
				img_4:$scope.filenames[3].name,
				img_5:$scope.filenames[4].name,
				img_6:$scope.filenames[5].name,
				img_7:$scope.filenames[6].name,
				img_8:$scope.filenames[7].name,
				img_9:$scope.filenames[8].name,
				img_10:$scope.filenames[9].name,
				files: $scope.f
			}
			
			console.log('magazine',magazine);
			$scope.upload = Upload.upload({
				url: '/admin/api/modifyMagazine',
				data : magazine
			}).success(function(response) {
				if(response.result == 0) {
					$window.alert('건강매거진이 수정되었습니다.');
					$scope.getMagazineList();
				} else {
					$window.alert(response.msg);
				}
			}).error(function(data, status) {
				if (status == 401) {
					$rootScope.logout();
				} else {
					alert("error : " + data.message);
				}
			});
		}
	}

	$scope.viewMagazine = function(magazine){
		console.log('건강매거진 보기');
		$scope.magazine_id = magazine.magazine_id;
		$scope.mode = "view";
		$scope.mode_text = "건강매거진 상세";
		
		$scope.year = magazine.year;
		$scope.month = magazine.month;
		$scope.title = magazine.title;
		$scope.subject = magazine.subject;
		$scope.content = magazine.content;
		
		var path = '/upload/magazine/'+magazine.year+'/'+magazine.month+'/';
		$scope.slide_images = [
			{image: magazine.img_1!='null'?path+magazine.img_1:''},
			{image: magazine.img_2!='null'?path+magazine.img_2:''},
			{image: magazine.img_3!='null'?path+magazine.img_3:''},
			{image: magazine.img_4!='null'?path+magazine.img_4:''},
			{image: magazine.img_5!='null'?path+magazine.img_5:''},
			{image: magazine.img_6!='null'?path+magazine.img_6:''},
			{image: magazine.img_7!='null'?path+magazine.img_7:''},
			{image: magazine.img_8!='null'?path+magazine.img_8:''},
			{image: magazine.img_9!='null'?path+magazine.img_9:''},
			{image: magazine.img_10!='null'?path+magazine.img_10:''}
		];
		
		setSwiper();
	}
	
	$scope.getStatus = function(){
		console.log('$scope.mode => '+$scope.mode);
		if($scope.mode == 'view' || $scope.mode == null){
			return false;
		}else{
			return true;
		}
	}
	
	$scope.removeMagazine = function(magazine){
		console.log('매거진 삭제--------------');
		if ($window.confirm("해당 건강매거진을 삭제하시겠습니까?")) {
			MagazineSvc.removeMagazine(magazine)
				.success(function(response) {
					if(response.result == 0){
						$scope.getMagazineList();
						$scope.clearMagazine();
					} else {
						$window.alert('삭제 실패!\n잠시 후에 다시 시도하세요.');
					}
				}).error(function(response, status) {
					if (status == 401) {
						$rootScope.logout();
					} else {
						alert("error : " + response.message);
					}
				});
		}
	}
	
	$scope.getMagazineList();
	console.log('------- MagazineCtrl -------');
}]);

// 도전! 건강! 관리
app.service('ChallengeSvc', function($http) {
	this.getChallengeList = function(params) {
		return $http.post('/admin/api/getChallengeList', params);
	}
	this.getChallengeTop5List = function() {
		return $http.post('/admin/api/getChallengeTop5List');
	}
	this.setupChallengeRank = function(params){
		return $http.post('/admin/api/setupChallengeRank',params);
	}
	this.releaseChallengeRank = function(params){
		return $http.post('/admin/api/releaseChallengeRank',params);
	}
});
app.controller('ChallengeCtrl', ['$scope', '$rootScope', '$window', '$cookieStore', '$window', 'Upload', 'ChallengeSvc', function ($scope, $rootScope, $window, $cookieStore, $window, Upload, ChallengeSvc) {
	$scope.challengesTop5 = [];	//1~5위 도전건강 목록
	$scope.challenges = [];		// 순위 없는 목록
	$scope.totalCount = 0;
	$scope.currentPage = 1;
	
	$scope.mode = "";
	
	$scope.getChallengeTop5List = function(){
		ChallengeSvc.getChallengeTop5List()
			.success(function(response, status, headers) {
				$rootScope.refreshToken(headers('X-Auth'));
				$scope.challengesTop5 = response.data;
			})
			.error(function(data, status) {
				if (status == 401) {
					$rootScope.logout();
				} else {
					alert("error : " + data.message);
				}
			});
	}
	
	$scope.getChallengeList = function(){
		ChallengeSvc.getChallengeList({start_index:($scope.currentPage - 1) * 10, page_size:10})
			.success(function(response, status, headers) {
				$rootScope.refreshToken(headers('X-Auth'));
				$scope.challenges = response.data;
				$scope.totalCount = response.total;
				
				$scope.clear();
			})
			.error(function(response, status) {
				if (status == 401) {
					$rootScope.logout();
				} else {
					alert("error : " + response.message);
				}
			});
	}

	$scope.clear = function() {
		$scope.mode = "";
		$scope.challenge_id = null;
		$scope.name = null;
		$scope.title = null;
		$scope.content = null;
		$scope.imgs = [
			{code:1, img:null},
			{code:2, img:null},
			{code:3, img:null},
			{code:4, img:null},
			{code:5, img:null}
		];
		$scope.rank = null;
	}
	
	$scope.pageChange = function() {
		$scope.getChallengeList();
	};
	
	$scope.viewChallenge = function(challenge){
		console.log(challenge);
		$scope.mode = "view";
		$scope.challenge_id = challenge.challenge_id;
		$scope.name = challenge.member_name;
		$scope.title = challenge.title;
		$scope.content = challenge.content;
		$scope.imgs = [
			{code:1, img:challenge.img_1==null?null:'/upload/challenge/'+challenge.home_id+"/"+challenge.img_1},
			{code:2, img:challenge.img_2==null?null:'/upload/challenge/'+challenge.home_id+"/"+challenge.img_2},
			{code:3, img:challenge.img_3==null?null:'/upload/challenge/'+challenge.home_id+"/"+challenge.img_3},
			{code:4, img:challenge.img_4==null?null:'/upload/challenge/'+challenge.home_id+"/"+challenge.img_4},
			{code:5, img:challenge.img_5==null?null:'/upload/challenge/'+challenge.home_id+"/"+challenge.img_5}
		]
		$scope.rank = challenge.rank==0?'':challenge.rank;
		console.log('------------- 상세보기 -------------');
	}
	
	$scope.releaseChallengeRank = function(challenge){
		if($window.confirm('순위를 해제하시겠습니까?')){
			ChallengeSvc.releaseChallengeRank(challenge)
				.success(function(response){
					if(response.result==0){
						$window.alert('순위가 해제되었습니다.');
						$scope.getChallengeTop5List();
						$scope.getChallengeList();
					}else{
						$window.alert('순위해제 실패!\n잠시 후에 다시 시도하세요.');
					}
				})
				.error(function(response, status) {
					if (status == 401) {
						$rootScope.logout();
					} else {
						alert("error : " + response.message);
					}
				});
		}
		return;
	}
	
	$scope.setupChallengeRank = function(){
		console.log('------------- 순위설정 -------------');
		if($scope.rank == '' || $scope.rank == null){
			$window.alert('순위를 지정하세요.');
			return;
		} else {
			var challenge = {challenge_id:$scope.challenge_id, rank:$scope.rank};
			console.log(challenge);
			ChallengeSvc.setupChallengeRank({challenge_id:$scope.challenge_id, rank:$scope.rank})
				.success(function(response){
					if(response.result == 0 ){
						$window.alert('순위가 설정되었습니다.');
						$scope.getChallengeTop5List();
						$scope.getChallengeList();
					} else {
						$window.alert('순위설정 실패!\n잠시 후에 다시 시도하세요.');
						$scope.clear();
					}
				})
				.error(function(response, status) {
					if (status == 401) {
						$rootScope.logout();
					} else {
						alert("error : " + response.message);
					}
				});
		}
	}
	
	$scope.getChallengeTop5List();
	$scope.getChallengeList();
}]);

app.controller('CkeditorCtrl', ['$scope', function ($scope) {
	// Editor options.
	$scope.options = {
			language: 'kr',
			skin: 'moono',
			filebrowserImageUploadUrl: '/editor/image/upload',
			toolbarLocation: 'top',
			font_names : 'Gulim/Gulim;Dotum/Dotum;Batang/Batang;Gungsuh/Gungsuh;Arial/Arial;Tahoma/Tahoma;Verdana/Verdana',
			fontSize_sizes : '8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;',
			height : 300,
			enterMode : CKEDITOR.ENTER_BR,
			shiftEnterMode : CKEDITOR.ENTER_P,
			toolbar: 'full',
			toolbar_full: [
				{ name: 'wysiwyg', items: ['Source','-','NewPage','Preview','-','Templates'] },
				{ name: 'styles', items: [ 'Font', 'Format', 'FontSize', 'TextColor', 'PasteText', 'RemoveFormat' ] },
				{ name: 'basicstyles',items: [ 'Bold', 'Italic', 'Strike', 'Underline' ] },
				{ name: 'paragraph', items: [ 'BulletedList', 'NumberedList', 'Blockquote' ] },
				{ name: 'editing', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
				{ name: 'tools', items: [ 'Maximize' ] },
				{ name: 'clipboard', items: [ 'Undo', 'Redo' ] },
				{ name: 'insert', items: [ 'Image', 'Table', 'SpecialChar'] },'/',
			]
	};
	// Called when the editor is completely ready.
	$scope.onReady = function () {
		CKEDITOR.on('dialogDefinition', function( ev ){
			var dialogName = ev.data.name;
			var dialogDefinition = ev.data.definition;
		
			switch (dialogName) {
				case 'image': //Image Properties dialog
					//dialogDefinition.removeContents('info');
					dialogDefinition.removeContents('Link');
					dialogDefinition.removeContents('advanced');
					break;
			}
		});
	};
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


app.controller('StatisticCtrl', ['$scope', 'StatSvc', '$rootScope', '$filter', function($scope, StatSvc, $rootScope, $filter){
	//입력폼 활성화, 비활성화 변수
	$scope.gugunDisabled = true;
	$scope.gradeDisabled = true;
	$scope.classDisabled = true;
	$scope.submenuDisabled = true;
	
	$scope.select_sido="";
	$scope.select_gugun="";
	$scope.select_school="";
	$scope.select_grade="";
	$scope.select_menu="";
	$scope.select_submenu="";

	$scope.submenuList;
	$scope.outputList;
	$scope.results = null;

	 	//출력형태 선택
 	$scope.getOutput = function() {
 		$scope.results = null;
 		$scope.select_menu = "";
 		$scope.select_submenu = "";
 	}

	 //통계항목 메뉴선택 - sub메뉴 출력하기
 	$scope.getSubmenu = function() {
 		$scope.results = null;
 		if($scope.select_menu == "HEIGHT" || $scope.select_menu == "WEIGHT") {
 			$scope.submenuDisabled = true;
 			$scope.select_submenu = "";
 		} else if ($scope.select_menu == "BMI") {
 			$scope.submenuDisabled = false;
 			$scope.select_submenu = "";
 			$scope.submenuList = [
 				'저체중', '정상', '과체중', '비만', '고도비만'
 			]
 		} else if ($scope.select_menu == "SMOKE"){
 			$scope.submenuDisabled = false;
 			$scope.select_submenu = "";
			$scope.submenuList = [
				'비흡연', '간접흡연', '흡연중', '과다흡연'
			]
 		} else {
 			$scope.submenuDisabled = true;
 			$scope.select_submenu = "";
 		}
 	}

 	//시입력-구군 구하기
	$scope.getGugun = function() {
		//유효성 체크
		$scope.select_gugun = "";
		$scope.select_school = "";
		if($scope.select_sido == "") {
			$scope.gugunDisabled = true;
			return;
		}

		var search = {sido:$scope.select_sido};

		StatSvc.getGugun(search)
		.success(function(datas){
			$scope.gugunList = datas.data;
			//성공시 구선택 박스 활성화
			$scope.gugunDisabled = false;
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
			} else {
				alert("error : " + data.message);
			}
		});

	}

	//구군입력 - 학교 구하기
 	$scope.getSchoolByAddr = function(){
 		if($scope.select_gugun == "") {
 			return;
 		}

		var search = {
			sido:$scope.select_sido,
			gugun:$scope.select_gugun	
		};

 		var search_school="";

		StatSvc.getSchoolByAddr(search)
		.success(function(schoolDatas){
			$scope.schoolList = schoolDatas.data;
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
			} else {
				alert("error : " + data.message);
			}
		});

 	}

 	//학교입력 - 학년 출력하기.
 	$scope.getSchoolGrade = function(){
 		if($scope.select_school == "") {
 			$scope.gradeDisabled = true;
 			$scope.select_grade = "";
 			return;
 		}

 		var search = {
			school_id:$scope.select_school
		}


		StatSvc.getSchoolGrade(search)
		.success(function(gradeData){
			$scope.gradeList = gradeData.data;
			//성공시 학년 선택 활성화
			$scope.gradeDisabled = false;
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
			} else {
				alert("error : " + data.message);
			}
		});

 	}
	
 	//학년입력 - 학반 출력하기.
 	$scope.getSchoolClass = function(){
 		if($scope.select_grade == "") {
 			$scope.classDisabled = true;
 			$scope.select_class = "";
 			return;
 		}

 		var searchC = {
			school_id:$scope.select_school,
			school_grade:$scope.select_grade
		}


		StatSvc.getSchoolClass(searchC)
		.success(function(classData){
			$scope.classList = classData.data;
			//성공시 반입력 활성화
			$scope.classDisabled = false;
		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
			} else {
				alert("error : " + data.message);
			}
		});
 	}


 	$scope.getResult = function(){
 		if($scope.measure_date == null) {
 			$rootScope.pop('error', 'warning', '측정일을 선택하세요.', 1000);
 			return;
 		}
 		if($scope.select_output == null) {
 			$rootScope.pop('error', 'warning', '출력형태를 선택하세요.', 1000);
 			return;
 		}
 		if($scope.select_output == "통계") {
			if($scope.select_menu == null) {
	 			$rootScope.pop('error', 'warning', '통계항목을 선택하세요.', 1000);
	 			return;
	 		}
	 		if($scope.select_school == "") {
				$rootScope.pop('error', 'warning', '학교를 선택하세요.', 1000);
				return;
			}
 		} else if($scope.select_output == "명단") {
			if($scope.select_school <= 0) {
				$rootScope.pop('error', 'warning', '학교를 선택하세요.', 1000);
				return;
			}
 		}
 		
 		

 		var formatted_date = $filter('date')($scope.measure_date,'yyyy-MM');

 		var search = {
 			sido : $scope.select_sido,
			gugun : $scope.select_gugun,
			school_id:$scope.select_school,
			section:$scope.select_menu,
			output: $scope.select_output,
			measure_date: formatted_date
		}

		if($scope.select_sex != "") {
			search.sex = $scope.select_sex;
		}
		if($scope.select_grade != "") {
			search.school_grade = $scope.select_grade;
		}
		if($scope.select_class != "") {
			search.school_class = $scope.select_class;
		}
		if($scope.select_submenu != "") {
			search.section2 = $scope.select_submenu;
		}

		StatSvc.getResult(search)
		.success(function(ResultData){
			$scope.results = ResultData.data;

		}).error(function(data, status) {
			if (status == 401) {
				$rootScope.logout();
			} else {
				alert("error : " + data.message);
			}
		});
 	}

 	//필터로 소팅하기
 	$scope.orderByColumn = function(x) {
 		$scope.column = x;
 	}

 	//datePicker 설정
	$scope.maxDate = new Date(); //현재 날짜 이후는 선택 불가능하게 설정

	$scope.isOpened = false;

	$scope.openDatepicker = function() {
 		$scope.isOpened = true;
	};

}]);