index.controller('registerh5Ctrl',
	['$scope', '$http', '$window', '$rootScope', '$location','$interval','$routeParams', function ($scope, $http, $window, $rootScope, $location,$interval,$routeParams) {
	
    var designerid=$routeParams.designerid;
    $scope.sex=0;//1代表性别男，0代表女
    $scope.select = function(index){
        $scope.sex=index;
    };

    $scope.professionflag=1;
    $scope.selectprofession = function(index){
        $scope.professionflag=index;
    };

    $scope.lifemediaid=[];    //生活照列表用于上传
    $scope.workmediaid=[];    //工作照列表
    $scope.artmediaid=[];     //艺术照列表
    $scope.goodsmediaid=[];   //作品照列表
    // 暂时不清楚用ng-if判断length失效的原因，临时用以下控制上传按钮的显示隐藏

    // 上传生活照
    $("#lifeImg").on('change',function(obj){
        var file = $(this)[0].files[0];      
        //判断类型是不是图片  
        if(!/image\/\w+/.test(file.type)){     
            alert("请确保文件为图像类型");   
            return false;   
        }   
        var reader = new FileReader(); 
        reader.onloadend = function(e) {  
            $('.update-img-life').prepend("<span style='float:left;margin-right:0.266667rem;border-radius:0.066667rem;width:1.76rem;height:1.76rem;display:inline-block;overflow:hidden;'><img src="+e.target.result+" style='width:1.76rem;height:auto;' /></span>");  
        };  
        reader.readAsDataURL(file);   
        reader.onload = function(e){   
            $scope.lifemediaid.push(this.result.split(',')[1]); 
            if($scope.lifemediaid.length >=3){
                $(".showlifebtn").css('display','none');
            }
        };
    });
    // 上传工作照
    $("#workImg").on('change',function(obj){
        var file = $(this)[0].files[0];      
        //判断类型是不是图片  
        if(!/image\/\w+/.test(file.type)){     
            alert("请确保文件为图像类型");   
            return false;   
        }   
        var reader = new FileReader(); 
        reader.onloadend = function(e) {  
            $('.update-img-work').prepend("<span style='float:left;margin-right:0.266667rem;border-radius:0.066667rem;width:1.76rem;height:1.76rem;display:inline-block;overflow:hidden;'><img src="+e.target.result+" style='width:1.76rem;height:auto;' /></span>");  
        };  
        reader.readAsDataURL(file);   
        reader.onload = function(e){   
            $scope.workmediaid.push(this.result.split(',')[1]); 
            if($scope.workmediaid.length >=3){
                $(".showworkbtn").css('display','none');
            }
        };
    });
    // 上传艺术照
    $("#artImg").on('change',function(obj){
        var file = $(this)[0].files[0];      
        //判断类型是不是图片  
        if(!/image\/\w+/.test(file.type)){     
            alert("请确保文件为图像类型");   
            return false;   
        }   
        var reader = new FileReader(); 
        reader.onloadend = function(e) {  
            $('.update-img-art').prepend("<span style='float:left;margin-right:0.266667rem;border-radius:0.066667rem;width:1.76rem;height:1.76rem;display:inline-block;overflow:hidden;'><img src="+e.target.result+" style='width:1.76rem;height:auto;' /></span>");  
        };  
        reader.readAsDataURL(file);   
        reader.onload = function(e){   
            $scope.artmediaid.push(this.result.split(',')[1]); 
            if($scope.artmediaid.length >=3){
                $(".showartbtn").css('display','none');
            }
        };
    });
    // 上传作品照
    $("#goodsImg").on('change',function(obj){
        var file = $(this)[0].files[0];      
        //判断类型是不是图片  
        if(!/image\/\w+/.test(file.type)){     
            alert("请确保文件为图像类型");   
            return false;   
        }   
        var reader = new FileReader(); 
        reader.onloadend = function(e) {  
            $('.update-img-goods').prepend("<span style='float:left;margin-right:0.266667rem;border-radius:0.066667rem;width:1.76rem;height:1.76rem;display:inline-block;overflow:hidden;'><img src="+e.target.result+" style='width:1.76rem;height:auto;' /></span>");  
        };  
        reader.readAsDataURL(file);   
        reader.onload = function(e){   
            $scope.goodsmediaid.push(this.result.split(',')[1]); 
            if($scope.goodsmediaid.length >=3){
                $(".showgoodsbtn").css('display','none');
            }
        };
    });

    // 点击注册按钮
    $scope.toRegister = function (){
        if($scope.name === ''|| $scope.telephone===''|| $scope.stagename===''|| $scope.sex===''|| $scope.age===''|| $scope.birthplace===''|| $scope.professionflag===''|| $scope.employmenttime===''|| $scope.cutprice===''|| $scope.simpleinfo===''|| $scope.lifemediaid.length === 0|| $scope.workmediaid.length === 0|| $scope.artmediaid.length === 0|| $scope.goodsmediaid.length === 0){
            alert('有信息尚未填写，请完善后再提交');
            return false;
        }
        var job=[];
        job.push($scope.professionflag);
        var data={
            'designerid':designerid,
            'name':$scope.name,
            'nickname':$scope.stagename,
            'telephone':$scope.telephone,
            'sexflag':$scope.sex,
            'age':$scope.age,
            'birthplace':$scope.birthplace,
            'job':job,
            'careertime':$scope.employmenttime,
            'cutmoney':$scope.cutprice,
            'wkexp':$scope.work,
            'education':$scope.education,
            'media':$scope.activity,
            'magazine':$scope.magazine,
            'coartist':$scope.stars,
            'cobrand':$scope.brand,
            'designexp':$scope.designexp,
            'simpleinfo':$scope.simpleinfo,
            'remark':$scope.remark
        };
        $http.post('/designer/register/save.json',data, postCfg)
        .then(function (resp) {
            console.log(resp);
            if (1 === resp.data.code) {
                
                // $location.path('payTailor');
            }
        }, function (resp) {
            // alert('数据请求失败，请稍后再试！');
        });
    };
}]);