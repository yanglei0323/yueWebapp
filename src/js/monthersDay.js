index.controller('monthersDayCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$timeout',
	function ($scope, $http, $window, $location, $rootScope,$timeout) {
	$scope.shoose = function(num){
		switch(num){
			case 1:
				sessionStorage.setItem('selectNum', '1');
				$location.path('monthersDay2');
				break;
			case 2:
				sessionStorage.setItem('selectNum', '2');
				$location.path('monthersDay2');
				break;
			case 3:
				sessionStorage.setItem('selectNum', '3');
				$location.path('monthersDay2');
				break;
			case 4:
				sessionStorage.setItem('selectNum', '4');
				$location.path('monthersDay2');
				break;
		}
	};
}]);