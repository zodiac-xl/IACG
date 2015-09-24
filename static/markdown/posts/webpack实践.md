###思想：

* 分页打包页面代码
* 整体打包模块化的代码
* 代码根据版本号缓存在localstroage
* 使用字符级别的增量更新
* 首页不常用代码延迟加载

###dependences

* nodeJS
* webpack
* gulp

###how


####安装


	$ npm install webpack --save-dev //安装webpack
	$ npm install gulp -save
	$ npm init  //添加package.json configuration 
	
	
####配置webpack task	
	var gulp = require("gulp");
	var gutil = require("gulp-util");
	var webpack = require("webpack");
	var WebpackDevServer = require("webpack-dev-server");


	gulp.task("webpack", function (callback) {
	    // run webpack
	    webpack({
	        // configuration
	    }, function (err, stats) {
	        if (err) throw new gutil.PluginError("webpack", err);
	        gutil.log("[webpack]", stats.toString({
	            // output options
	        }));
	        callback();
	    });
	});
	
####配置webpack.config.js
