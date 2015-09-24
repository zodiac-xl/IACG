###MOTIVATION动机

现今的websites已经越来越向web apps发展：
 
 * 页面中JavaScript越来越多
 * 你可以在现代浏览器做更多的事情。
 * 更少的完全重载（页内跳转变多）→页面中更多的代码。

导致的问题是大量的代码在客户端

一个大型的代码库需要被高效地组织。模块系统应运而生，模块系统可以将代码库分割成多个细小的模块，便于开发、维护、提高性能等。

###MODULE SYSTEM STYLES模块化方案

现有的模块化方案：

* 单纯的script标签 (without a module system)
* CommonJs
* AMD和它的一些变种
* ES6 modules
* and more…

####`<script>`标签

这种方式需要我们人工维护一个模块化代码结构

		
	<script src="module1.js"></script>
	<script src="module2.js"></script>
	<script src="libraryA.js"></script>
	<script src="module3.js"></script>
	
单个模块提供一个global object接口，这样各个模块之间可以共享接口

常见问题：

* 全局变量过多 易冲突
* 加载顺序很重要
* 模块间的依赖需要开发者自己决绝
* 大型项目中 依赖可能变得很多 导致需要使用很多`<script>`标签 难于管理

####CommonJs: synchronous require 同步加载
使用同步的`require`方法加载依赖并返回相应的接口。接口输出方式为：为`exports`添加properties或设置`module.exports`值

	require("module");
	require("../file.js");
	exports.doStuff = function() {};
	module.exports = someValue;

CommonJs用于nodeJS服务端

优势：

* 在服务端模块可以复用
* 已经有了很多成熟的模块（npm）
* 简单易用

问题：

* CommonJs虽然很适合在nodeJS服务端使用，但是因为同步调用，会造成阻塞；而网络请求是异步的，阻塞调用并不适用于网络。
* 没有对应的多模块加载

使用：

* node.js - server-side
* browserify
* modules-webmake - compile to one bundle
* wreq - client-side

####AMD: asynchronous require 异步加载 预加载
应为CommonJs是同步加载，并不适合前端模块管理，AMD异步加载应运而生
 
	require(["module", "../file"], function(module, file) { /* ... */ });
	define("mymodule", ["dep1", "dep2"], function(d1, d2) {
	  return someExportedValue;
	});

优势：

* 符合网络的异步请求的风格	
* 有对应的多模块加载

问题：

* 在头部编码，不易编写和阅读
* 虽然不再需要开发者操心管理模块依赖，但是依赖过多时网络请求过多

使用：

* require.js - client-side
* curl - client-side

####CMD: asynchronous require 异步加载 懒加载
CMD和AMD类似，不同在于：

* AMD 是提前执行 预加载，CMD 是延迟执行 懒加载
* CMD 推崇依赖就近，AMD 推崇依赖前置
* AMD 相当于所有模块都提前请求，要用的时候不需要再发送请求；而CMD是当需要用到这个模块时，才去发送请求这个模块。

		
		define(function (requie, exports, module) {
			//依赖可以就近书写
			    var a = require('./a');
			    a.test();			     
			//软依赖
			if (status) {		     
				var b = requie('./b');
				b.test();
			 }
		});
		
		
		
####ES6 modules
浏览器支持较缓慢，模块比较少


###传输TRANSFERRING
模块需要在客户端执行，所以它们必须从服务端传输到客户端

现有2种传输方式

1. 一个模块一个请求
2. 所有模块放在在一个请求中 

2种方式都得到了广泛应用，且各有优劣：

* 一个模块一个请求
	* 优点：只有需要的模块被传输了
	* 问题：大量的请求意味着大量的请求头
	* 问题：延迟或等待的请求降低了应用的启动速度

* 所有模块在一个请求中
	* 优点：更少的请求头，更少的延迟或等待
	* 问题：传统的打包会把不需要的模块也进行传输

####分块传输Chunked transferring
越灵活的传输方案越优秀，折中的方案相比极端的方案更适合大多数案例
>当编译所有模块时：将模块分割成多个区块（chunks）
我们获得了多个小区块请求，不需要的模块组成的区块在初始化的时候并不会加载，只有在需要的时候才会发出请求。

核心思想：

把模块打包成多个区块，应用的初始化请求只加载包含必须模块的区块，其他区块延迟加载。提高了应用初始化速度的同时，打包预下载其他依赖可以减少请求，做到无接口时页面无延迟体验。

###不只JS模块化WHY ONLY JAVASCRIPT?
模块化方案为什么只做JavaScript呢，大量的静态资源同样需要：

* stylesheets
* images
* webfonts
* html for templating
* etc.

and also:

* cooffeesccript --> javaScript
* less --> css

This should be as easy as:

	require("./style.css");
	require("./style.less");
	require("./template.jade");
	require("./image.png");
		