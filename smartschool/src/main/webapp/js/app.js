var app = angular.module('app', [
    'ngRoute'
]);

app.config( ['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/school', {templateUrl: 'templates/school.html'})
	.when('/user', {templateUrl: 'templates/user.html'})
	
	$locationProvider.html5Mode(false);
	$locationProvider.hashPrefix('!');
}]);

app.service('SchoolSvc', function($http) {
	this.getSchoolList = function() {
		return $http.post('/admin/api/getSchoolListOfMember');
	}
	this.modifySchool = function(school) {
		return $http.post('/admin/api/modifySchool', school);
	}
	this.getSchoolNotiList = function(school) {
		return $http.post('/admin/api/getSchoolNotiList', school);
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

app.controller('ApplicationCtrl', function ($scope, SchoolSvc) {

})

app.controller('SchoolCtrl', function ($scope, SchoolSvc) {
	$scope.mode = "";
	$scope.categories = [
		{code: 1, name: "가정통신문"},
		{code: 2, name: "공지사항"},
		{code: 3, name: "가정통신문"}
	];
	$scope.category = 0;
	$scope.schools = [];
	$scope.notis = [];
	
	SchoolSvc.getSchoolList()
	.success(function(schools) {
		$scope.schools = schools.data;
	})
	
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
			SchoolSvc.getSchoolList()
			.success(function(schools) {
				$scope.schools = schools.data;
			})
		})
	}
	
	$scope.getNoti = function(school) {
		$scope.mode = "noti";
		
		var noti = {school_id:school.school_id};
		SchoolSvc.getSchoolNotiList(noti)
		.success(function(schools) {
			$scope.notis = schools.data;
		})
	}
})

app.controller('UserCtrl', function ($scope, SchoolSvc) {

})