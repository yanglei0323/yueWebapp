index.controller('disappCtrl',
	['$scope', '$http', '$window', '$rootScope', '$location','$routeParams', function ($scope, $http, $window, $rootScope, $location,$routeParams) {
	// console.log("分销详情控制器");

	var designerid=$routeParams.designerid;
	$scope.invatationnum=0;
	$scope.moneytotal=0;
	// 1.1	邀请得利_top
	var data={
        designerid: designerid
    };
	$http.post('/designer/invitation/top.json', data, postCfg)
	.then(function (resp) {
		// console.log(resp);
		if (1 === resp.data.code) {
            $scope.invatationnum=resp.data.data.invatationnum;
            $scope.moneytotal=resp.data.data.moneytotal;
		}
	}, function (resp) {
		console.log(resp);
	});

	// 1.2	邀请得利_邀请列表(未产生奖励)
	$scope.invitationlist0 = [];
	$scope.serialnum0=1; // 排名序号，方便判断
	var page0=1;
	function getDesignerList0 (){
		var data={
	        designerid: designerid,
	        type:0,
	        page:page0
	    };
		$http.post('/designer/invitation/list.json', data, postCfg)
		.then(function (resp) {
			// console.log(resp);
			if (1 === resp.data.code) {
				var designerinvitationlist0=resp.data.data.designerinvitationlist;
				if(designerinvitationlist0.length >= 1){
					for(var i=0;i<designerinvitationlist0.length;i++){
						designerinvitationlist0[i].invitationdesigner.avatar = picBasePath + designerinvitationlist0[i].invitationdesigner.avatar;
						designerinvitationlist0[i].serialnum = $scope.serialnum0;
						designerinvitationlist0[i].date=designerinvitationlist0[i].date.split(' ')[0];
						$scope.invitationlist0.push(designerinvitationlist0[i]);
						$scope.serialnum0++;
					}
					// console.log($scope.invitationlist0);
	            	page0++;
	            	getDesignerList0();
				}
			}
		}, function (resp) {
			console.log(resp);
		});
	}
	getDesignerList0();

	// 1.2	邀请得利_邀请列表(已产生奖励)
	$scope.invitationlist1 = [];
	$scope.serialnum1=1; // 排名序号，方便判断
	var page1=1;
	function getDesignerList1 (){
		var data={
	        designerid: designerid,
	        type:1,
	        page:page1
	    };
		$http.post('/designer/invitation/list.json', data, postCfg)
		.then(function (resp) {
			// console.log(resp);
			if (1 === resp.data.code) {
				var designerinvitationlist1=resp.data.data.designerinvitationlist;
				if(designerinvitationlist1.length >= 1){
					for(var i=0;i<designerinvitationlist1.length;i++){
						designerinvitationlist1[i].invitationdesigner.avatar = picBasePath + designerinvitationlist1[i].invitationdesigner.avatar;
						designerinvitationlist1[i].serialnum = $scope.serialnum1;
						designerinvitationlist1[i].date=designerinvitationlist1[i].date.split(' ')[0];
						$scope.invitationlist1.push(designerinvitationlist1[i]);
						$scope.serialnum1++;
					}
					console.log($scope.invitationlist1);
	            	page1++;
	            	getDesignerList1();
				}
			}
		}, function (resp) {
			console.log(resp);
		});
	}
	getDesignerList1();


	$scope.activeTab=1;
	$scope.activeshow=false;
	$scope.toggleActive = function(){
		$scope.activeshow=!$scope.activeshow;
	};
	$scope.sharePage = function (){
		var url = 'jsbridge://doAction';
		var iframe = document.createElement('iframe');
		iframe.style.width = '1px';
		iframe.style.height = '1px';
		iframe.style.display = 'none';
		iframe.src = url;
		document.body.appendChild(iframe);
		setTimeout(function() {
		    iframe.remove();
		}, 100);
	};
}]);