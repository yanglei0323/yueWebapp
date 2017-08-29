index.controller('agreementinfoCtrl',
	['$scope', '$http', '$window', '$rootScope', '$location','$interval','$routeParams', function ($scope, $http, $window, $rootScope, $location,$interval,$routeParams) {
	
    $scope.confirm =function(index){
        if(index == 1){
            $rootScope.agree=false;
            $window.history.back();
        }else if(index == 2){
            $rootScope.agree=true;
            $window.history.back();
        }
    };
    
}]);