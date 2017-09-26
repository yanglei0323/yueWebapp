index.controller('registerh5Ctrl',
	['$scope', '$http', '$window', '$rootScope', '$location','$interval','$routeParams', function ($scope, $http, $window, $rootScope, $location,$interval,$routeParams) {
	$scope.saveloading = false;
    $scope.btntext = '提交';
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
        var Orientation = '';//ios手机图片旋转参数
        EXIF.getData(file, function() {   
            EXIF.getAllTags(this);      
            Orientation = EXIF.getTag(this, 'Orientation');  
            //return; 
        });
        var reader = new FileReader();
        reader.readAsDataURL(file);// 将文件以Data URL形式进行读入页面
        reader.onload = function(e) {
            var imgurl = this.result;
            //模拟form上传
            var img  = new Image();
            img.onload = function() {
                var canvas = document.createElement('canvas');//创建临时canvas
                // canvas.css('display','none');
                canvas.width = this.width;//给canvas宽高赋值
                canvas.height = this.height;
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = '#000';//绘制背景色
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(img,0,0,canvas.width,canvas.height);
                 
                var base64 = canvas.toDataURL("image/jpeg",0.7);//压缩图片，生成base64字符串
                if (navigator.userAgent.match(/iphone/i)) {//判断ios手机中图片旋转参数（只是对展示的图片旋转）
                    if(Orientation == 6){
                        $('.update-img-life').prepend("<span style='transform:rotate(90deg);float:left;margin-right:0.266667rem;border-radius:0.066667rem;width:1.76rem;height:1.76rem;display:inline-block;overflow:hidden;'><img src="+base64+" style='width:1.76rem;height:auto;' /></span>"); 
                    }else{
                        $('.update-img-life').prepend("<span style='float:left;margin-right:0.266667rem;border-radius:0.066667rem;width:1.76rem;height:1.76rem;display:inline-block;overflow:hidden;'><img src="+base64+" style='width:1.76rem;height:auto;' /></span>"); 
                    }
                }else{
                    $('.update-img-life').prepend("<span style='float:left;margin-right:0.266667rem;border-radius:0.066667rem;width:1.76rem;height:1.76rem;display:inline-block;overflow:hidden;'><img src="+base64+" style='width:1.76rem;height:auto;' /></span>"); 
                }
                $scope.lifemediaid.push(base64.split(',')[1]); //去掉base64字符串前缀，并push到准备好的数组
                // console.log($scope.lifemediaid);
                // window.location.href=base64;//查看压缩后图片大小
                if($scope.lifemediaid.length >=3){
                    $(".showlifebtn").css('display','none');
                }
            };
            img.src = imgurl;
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
        var Orientation = '';
        EXIF.getData(file, function() {   
            EXIF.getAllTags(this);      
            Orientation = EXIF.getTag(this, 'Orientation');  
            //return; 
        });
        var reader = new FileReader();
        reader.readAsDataURL(file);// 将文件以Data URL形式进行读入页面
        reader.onload = function(e) {
            var imgurl = this.result;
            //模拟form上传
            var img  = new Image();
            img.onload = function() {
                var canvas = document.createElement('canvas');
                // canvas.css('display','none');
                canvas.width = this.width;
                canvas.height = this.height;
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = '#000';//绘制背景色
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(img,0,0,canvas.width,canvas.height);
                 
                var base64 = canvas.toDataURL("image/jpeg",0.7);
                if (navigator.userAgent.match(/iphone/i)) {
                    if(Orientation == 6){
                        $('.update-img-work').prepend("<span style='transform:rotate(90deg);float:left;margin-right:0.266667rem;border-radius:0.066667rem;width:1.76rem;height:1.76rem;display:inline-block;overflow:hidden;'><img src="+base64+" style='width:1.76rem;height:auto;' /></span>"); 
                    }else{
                        $('.update-img-work').prepend("<span style='float:left;margin-right:0.266667rem;border-radius:0.066667rem;width:1.76rem;height:1.76rem;display:inline-block;overflow:hidden;'><img src="+base64+" style='width:1.76rem;height:auto;' /></span>"); 
                    }
                }else{
                    $('.update-img-work').prepend("<span style='float:left;margin-right:0.266667rem;border-radius:0.066667rem;width:1.76rem;height:1.76rem;display:inline-block;overflow:hidden;'><img src="+base64+" style='width:1.76rem;height:auto;' /></span>"); 
                }
                $scope.workmediaid.push(base64.split(',')[1]); 
                // console.log($scope.workmediaid);
                if($scope.workmediaid.length >=3){
                    $(".showworkbtn").css('display','none');
                }
            };
            img.src = imgurl;
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
        var Orientation = '';
        EXIF.getData(file, function() {   
            EXIF.getAllTags(this);      
            Orientation = EXIF.getTag(this, 'Orientation');  
            //return; 
        });
        var reader = new FileReader();
        reader.readAsDataURL(file);// 将文件以Data URL形式进行读入页面
        reader.onload = function(e) {
            var imgurl = this.result;
            //模拟form上传
            var img  = new Image();
            img.onload = function() {
                var canvas = document.createElement('canvas');
                // canvas.css('display','none');
                canvas.width = this.width;
                canvas.height = this.height;
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = '#000';//绘制背景色
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(img,0,0,canvas.width,canvas.height);
                 
                var base64 = canvas.toDataURL("image/jpeg",0.7);
                if (navigator.userAgent.match(/iphone/i)) {
                    if(Orientation == 6){
                        $('.update-img-art').prepend("<span style='transform:rotate(90deg);float:left;margin-right:0.266667rem;border-radius:0.066667rem;width:1.76rem;height:1.76rem;display:inline-block;overflow:hidden;'><img src="+base64+" style='width:1.76rem;height:auto;' /></span>"); 
                    }else{
                        $('.update-img-art').prepend("<span style='float:left;margin-right:0.266667rem;border-radius:0.066667rem;width:1.76rem;height:1.76rem;display:inline-block;overflow:hidden;'><img src="+base64+" style='width:1.76rem;height:auto;' /></span>"); 
                    }
                }else{
                    $('.update-img-art').prepend("<span style='float:left;margin-right:0.266667rem;border-radius:0.066667rem;width:1.76rem;height:1.76rem;display:inline-block;overflow:hidden;'><img src="+base64+" style='width:1.76rem;height:auto;' /></span>"); 
                }
                $scope.artmediaid.push(base64.split(',')[1]); 
                // console.log($scope.artmediaid);
                if($scope.artmediaid.length >=3){
                    $(".showartbtn").css('display','none');
                }
            };
            img.src = imgurl;
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
        var Orientation = '';
        EXIF.getData(file, function() {   
            EXIF.getAllTags(this);      
            Orientation = EXIF.getTag(this, 'Orientation');  
            //return; 
        });
        var reader = new FileReader();
        reader.readAsDataURL(file);// 将文件以Data URL形式进行读入页面
        reader.onload = function(e) {
            var imgurl = this.result;
            //模拟form上传
            var img  = new Image();
            img.onload = function() {
                var canvas = document.createElement('canvas');
                // canvas.css('display','none');
                canvas.width = this.width;
                canvas.height = this.height;
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = '#000';//绘制背景色
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(img,0,0,canvas.width,canvas.height);
                 
                var base64 = canvas.toDataURL("image/jpeg",0.7);
                if (navigator.userAgent.match(/iphone/i)) {
                    if(Orientation == 6){
                        $('.update-img-goods').prepend("<span style='transform:rotate(90deg);float:left;margin-right:0.266667rem;border-radius:0.066667rem;width:1.76rem;height:1.76rem;display:inline-block;overflow:hidden;'><img src="+base64+" style='width:1.76rem;height:auto;' /></span>"); 
                    }else{
                        $('.update-img-goods').prepend("<span style='float:left;margin-right:0.266667rem;border-radius:0.066667rem;width:1.76rem;height:1.76rem;display:inline-block;overflow:hidden;'><img src="+base64+" style='width:1.76rem;height:auto;' /></span>"); 
                    }
                }else{
                    $('.update-img-goods').prepend("<span style='float:left;margin-right:0.266667rem;border-radius:0.066667rem;width:1.76rem;height:1.76rem;display:inline-block;overflow:hidden;'><img src="+base64+" style='width:1.76rem;height:auto;' /></span>"); 
                }
                $scope.goodsmediaid.push(base64.split(',')[1]); 
                // console.log($scope.goodsmediaid);
                if($scope.goodsmediaid.length >=3){
                    $(".showgoodsbtn").css('display','none');
                }
            };
            img.src = imgurl;
        };
    });
    $scope.name = '';
    $scope.telephone = '';
    $scope.stagename = '';
    $scope.age = '';
    $scope.birthplace = '';
    $scope.employmenttime = '';
    $scope.cutprice = '';
    $scope.simpleinfo = '';
    // 点击注册按钮
    var phoneRe = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    $scope.toRegister = function (){

        if (!phoneRe.test($scope.telephone)) {//验证手机号
            alert('手机号无效！');
            return false;
        }
        if($scope.name === ''|| $scope.telephone===''|| $scope.stagename===''|| $scope.age===''|| $scope.birthplace===''|| $scope.employmenttime===''|| $scope.cutprice===''|| $scope.simpleinfo===''|| $scope.lifemediaid.length === 0|| $scope.workmediaid.length === 0|| $scope.artmediaid.length === 0|| $scope.goodsmediaid.length === 0){
            alert('有信息尚未填写，请完善后再提交');
            return false;
        }
        if($scope.saveloading){
            return false;
        }
        $scope.saveloading = true;
        $scope.btntext = '上传中...';
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
            'remark':$scope.remark,
            'lifeimg':$scope.lifemediaid,
            'jobimg':$scope.workmediaid,
            'artimg':$scope.artmediaid,
            'workimg':$scope.goodsmediaid
        };
        $http.post('/designer/register/save.json',data, postCfg)
        .then(function (resp) {
            console.log(resp);
            $scope.saveloading = false;
            $scope.btntext = '提交';
            if (1 === resp.data.code) {
                
                $location.path('register_suc');
            }else{
                alert(resp.data.reason);
            }
        }, function (resp) {
            $scope.saveloading = false;
            $scope.btntext = '提交';
            alert('网络请求错误，请稍后重试！');
        });
    };
}]);