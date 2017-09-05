index.controller('wechatcallCtrl',
	['$scope', '$http', '$window', '$rootScope', '$location','$routeParams', function ($scope, $http, $window, $rootScope, $location,$routeParams) {
	var designerid=$routeParams.designerid;
    // 获取发型师详情
    $http.post('/user/invitation/sendtofriend.json', {'userid': designerid}, postCfg)
    .then(function (resp) {
        // console.log(resp);
        if (1 === resp.data.code) {
            resp.data.data.user.imgurl = picBasePath + resp.data.data.user.imgurl;
            resp.data.data.user.vip.servicediscount = parseInt(resp.data.data.user.vip.servicediscount)*10;
            $scope.designerinfo = resp.data.data.user;
        }
    }, function (resp) {
        // alert('数据请求失败，请稍后再试！');
    });
}]);