# yueWebapp
悦艺术家公众号webapp（未去#号版）
目前线上版本
已修复支付功能

## 去#号步骤
- 1、开启HTML5模式:
```js
	index.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	   //..省略代码
	    $locationProvider.html5Mode(true);
	}]);
```
- 2、编辑 index.html，增加base标签:
```html
	<base href="/webapp/build/html/">
```
- 3、编辑nginx的配置文件，增加try_files配置:
```js
	location ^~ /yueWebapp/build/html/ {
        alias E:/nginx/html/yueWebapp/build/html/;
        index index.html;
        try_files $uri $uri/ /index.html =404;
    }
```
