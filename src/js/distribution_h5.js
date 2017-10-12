index.controller('dish5Ctrl',
	['$scope', '$http', '$window', '$rootScope', '$location','$interval','$routeParams', function ($scope, $http, $window, $rootScope, $location,$interval,$routeParams) {

    $scope.showQrcode = false;
    var designerid=$routeParams.designerid;
    // 获取发型师详情
    $http.post('/designer/invitation/getinfo.json', {'designerid': designerid}, postCfg)
    .then(function (resp) {
        console.log(resp);
        if (1 === resp.data.code) {
            resp.data.data.designer.avatar = picBasePath + resp.data.data.designer.avatar;
            $scope.designerinfo = resp.data.data.designer;
        }
    }, function (resp) {
        // alert('数据请求失败，请稍后再试！');
    });

	var phoneRe = /^(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|17[3|5|6|7|8]|18[0-9])\d{8}$/;
    var codeRe = /^\d{4}$/;
    $scope.sendCodeText = '获取验证码';
    if($rootScope.agree == 2){
        $scope.checkAg = true;
    }else if($rootScope.agree == 1){
        $scope.checkAg = false;
    }else{
        $scope.checkAg = true;
    }
    // 获取验证码
    $scope.getCode = function () {
        if ($scope.sending) {
            return;
        }
        if (!phoneRe.test($scope.phone)) {
            alert('手机号无效！');
            return;
        }
        // 获取当前时间戳
        var _timestamp = (new Date()).valueOf();
        var startMd5='_timestamp='+_timestamp+'&telnum='+$scope.phone+'&key=www.yueyishujia.com';
        var sign= md5(startMd5).toUpperCase();
        // console.log(sign);
        var md5Data={
            telnum: $scope.phone,
            _timestamp:_timestamp,
            sign:sign
        };
    	$http.post('/designer/sign/register/sendcode.json', md5Data, postCfg)
    	.then(function (resp) {
            // console.log(resp);
    		if (1 === resp.data.code) {
                $scope.sending = true;
                var leftTime = 60;
    			var timer = $interval(function () {
                    if (leftTime > 0) {
                        $scope.sendCodeText = '重新发送(' + (leftTime--) + ')';
                    }
                    else {
                        $scope.sendCodeText = '获取验证码';
                        $scope.sending = false;
                        $interval.cancel(timer);
                    }
                }, 1000);
    		}else{
                alert(resp.data.reason);
            }
    	}, function (resp) {
    		console.log(resp);
    	});
    };
    // 确认登录
    $scope.confirmLogin = function () {
        if (-1 === checkParams()) {
            return;
        }
        if(!$scope.checkAg){
        	alert("请勾选《悦艺术家造型师合作协议》!");
        	return;
        }
    	var data = {
    		telnum: $scope.phone,
    		check: $scope.code,
            designerid:designerid
    	};
    	$http.post('/designer/register/codeverify.json', data, postCfg)
    	.then(function (resp) {
    		console.log(resp);
            if (1 === resp.data.code) {
                var user = resp.data.data;
                sessionStorage.setItem('user', JSON.stringify(user));
                // $location.path('register_h5').search({'designerid': designerid});
                window.location.href = 'index.html#/register_h5/'+designerid;
            }
            else if (0 === resp.data.code) {
                alert(resp.data.reason);
            }
    	}, function (resp) {
            // alert('数据请求失败，请稍后再试！');
    	});
    };
    // 协议选择
    $scope.checkAgfunc = function (){
    	$scope.checkAg = !$scope.checkAg;
    };
    $scope.showQrImg = function (){
        $scope.showQrcode = !$scope.showQrcode;
    };
    $scope.goAgreementInfo = function(){
        $location.path('agreementinfo');
    };
    $scope.goStore = function (){
        $location.path('store');
    };
    function checkParams() {
        if (!phoneRe.test($scope.phone)) {
            alert('手机号无效！');
            return -1;
        }
        if (!codeRe.test($scope.code)) {
            alert('验证码无效！');
            return -1;
        }
        return 1;
    }
}]);