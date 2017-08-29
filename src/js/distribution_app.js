index.controller('disappCtrl',
	['$scope', '$http', '$window', '$rootScope', '$location','$routeParams', function ($scope, $http, $window, $rootScope, $location,$routeParams) {
	// console.log("分销详情控制器");

	var designerid=$routeParams.designerid;
	$scope.invatationnum=300;
	$scope.moneytotal=3000;
	// 1.1	邀请得利_top
	var data={
        designerid: designerid
    };
	$http.post('/designer/invitation/top.json', data, postCfg)
	.then(function (resp) {
		console.log(resp);
		if (1 === resp.data.code) {
            $scope.invatationnum=resp.data.data.invatationnum;
            $scope.moneytotal=resp.data.data.moneytotal;
		}
	}, function (resp) {
		console.log(resp);
	});

	// 1.2	邀请得利_邀请列表(未产生奖励)
	$scope.loading=false;
	var page0=1;
	function getDesignerList0 (){
		$scope.loading=true;
		var data={
	        designerid: designerid,
	        type:0,
	        page:page0
	    };
		$http.post('/designer/invitation/list.json', data, postCfg)
		.then(function (resp) {
			console.log(resp);
			if (1 === resp.data.code) {
	            $scope.loading=false;
	            page0++;
			}
		}, function (resp) {
			console.log(resp);
		});
	}
	$scope.getDesignerList0=getDesignerList0();
	getDesignerList0();

	$scope.activeTab=1;
	$scope.activeshow=false;
	$scope.toggleActive = function(){
		$scope.activeshow=!$scope.activeshow;
	};
}]);