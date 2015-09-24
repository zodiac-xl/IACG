Gulp.js：比 Grunt 更简单的自动化的项目构建利器

###开始

1. 项目下或全局安装gulp

		$ npm install  gulp
		$ npm install --global gulp

2. 在项目下添加package.json文件 文件内容必须文JSON格式

3. 在你的项目的 devDependencies 下安装gulp

		$ npm install --save gulp
	
	>当你为你的模块安装一个依赖模块时，正常情况下你得先安装他们（在模块根目录下npm install module-name），然后连同版本号手动将他们添加到模块配置文件package.json中的依赖里（dependencies）。

-save和save-dev可以省掉你手动修改package.json文件件的步骤。

* npm install module-name -save 自动把模块和版本号添加到dependencies部分
* npm install module-name -save-dve 自动把模块和版本号添加到devdependencies部分

>至于到底是添加到开发依赖模块还是产品依赖模块， 一般的devDepandencies主要是配置测试框架， 例如jshint、mocha。


4. 在你项目的根目录下创建 gulpfile.js 文件 以后添加各种插件

		var gulp = require('gulp');

		gulp.task('default', function() {
		  // place code for your default task here
		});
	
5. 运行 gulp

`$ gulp`这个默认任务将会运行但不会产生任何东西。
>运行个别的任务，用 `gulp <task> <othertask>`。







参考：<http://www.gulpjs.com.cn/docs/api/>