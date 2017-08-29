index.controller('registerh5Ctrl',
	['$scope', '$http', '$window', '$rootScope', '$location','$interval','$routeParams', function ($scope, $http, $window, $rootScope, $location,$interval,$routeParams) {
	
    $scope.sex="男";//1代表性别男，0代表女
    $scope.select = function(index){
        if(index === 1){
            $scope.sex="男";
        }else if(index === 0){
            $scope.sex="女";
        }
    };

    $scope.professionflag="发型师";
    $scope.selectprofession = function(index){
        if(index === 1){
            $scope.professionflag="发型师";
        }else if(index === 2){
            $scope.professionflag="美妆师";
        }else if(index === 3){
            $scope.professionflag="美甲师";
        }else if(index === 4){
            $scope.professionflag="美搭师";
        }
    };

    $scope.lifemediaid=[];    //生活照列表用于上传
    $scope.workmediaid=[];    //工作照列表
    $scope.artmediaid=[];     //艺术照列表
    $scope.goodsmediaid=[];   //作品照列表
}]);