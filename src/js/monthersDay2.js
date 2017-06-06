index.controller('monthersDay2Ctrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$timeout',
	function ($scope, $http, $window, $location, $rootScope,$timeout) {
	var num = JSON.parse(sessionStorage.selectNum);
	switch(num){
		case 1:
			$scope.selectA = true;
			break;
		case 2:
			$scope.selectB = true;
			break;
		case 3:
			$scope.selectC = true;
			break;
		case 4:
			$scope.selectD = true;
			break;
	}
}]);