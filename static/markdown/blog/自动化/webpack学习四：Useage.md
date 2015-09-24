###WHAT ARE LOADERS?
Loaders是应用程序资源转化器，它们是把原始资源作为参数传递并返回新资源的方法（运行环境为nodejs）


###Loader的特点

* Loaders可以串联，他们应用于管道资源。最后加载程序将返回JavaScript,并可以返回任意格式(传递给下一个装载器)
* Loaders同步和异步可选
* Loaders运行于nodeJS，可以做大量自定义操作
* Loaders接手query parameters，可以用作传递配置
* Loaders可以绑定到扩展的RegExps正则表达式
* Loaders可以通过`npm`发布和安装
* 除了`main`，普通的模块可以通过`package.json` loader输出一个loader
* Loaders接受配置
* 插件可以丰富Loaders的特性
* Loaders可以输出任意文件

###RESOLVING LOADERS
Loaders和模块类似，一个loader模块被设计为输出一个方法并兼容node.js。一般情况下使用npm管理loaders，但也可以在app中像文件一样使用loaders

####Referencing loaders 定义 引用loaders
按照惯例，loaders命名格式为xxx-loader，xxx为具体功能，例如：json-loader

引用时可以使用loader的完整(实际)名称(如json-loader),或其缩写名称(例如json)。

webpack configuration API决定loader的命名规范和搜索优先级

符合规范的loader命名有助于使用，特别是使用`require`引用它们的时候

####Installing loaders

	$ npm install xxx-loader --save
	
###USAGE
使用loader有多重方式

* 使用`require`表达式
* 通过configuration配置
* 通过CLI命令行配置


####loaders in require
>Note: 如非必要，尽量避免使用这种方式，如果想让scripts环境无关(node.js and browser)，
>可以使用configuration配置的方法指定loader

>`require`(or define, require.ensure, etc.)可以指定加载器，使用`！`分割路径名，每一部分都是相对当前文件地址


	require("./loader!./dir/file.txt");
	// => uses the file "loader.js" in the current directory to transform
	//    "file.txt" in the folder "dir".

	require("jade!./template.jade");
	// => uses the "jade-loader" (that is installed from npm to "node_modules")
	//    to transform the file "template.jade"

	require("!style!css!less!bootstrap/less/bootstrap.less");
	// => the file "bootstrap.less" in the folder "less" in the "bootstrap"
	//    module (that is installed from github to "node_modules") is
	//    transformed by the "less-loader". The result is transformed by the
	//    "css-loader" and then by the "style-loader".

####Configuration
配置loader时可以使用正则表达式


	{
	    module: {
	        loaders: [
	            { test: /\.jade$/, loader: "jade" },
	            // => "jade" loader is used for ".jade" files

	            { test: /\.css$/, loader: "style!css" },
	            // => "style" and "css" loader is used for ".css" files
	            // 可替代的方式:
	            { test: /\.css$/, loaders: ["style", "css"] },
	        ]
	    }
	}

####CLI
使用命令行绑定loaders


	$ webpack --module-bind jade --module-bind 'css=style!css'
	This uses the loader “jade” for “.jade” files and the loaders “style” and “css” for “.css” files.

###Query parameters
Loader可以通过a query string can（和浏览器中一样）传递参数

####in require
	require("url-loader?mimetype=image/png!./file.png");

####Configuration
	{ test: /\.png$/, loader: "url-loader?mimetype=image/png" }
	or

	{
	    test: /\.png$/,
	    loader: "url-loader",
	    query: { mimetype: "image/png" }
	}
####CLI
	webpack --module-bind "png=url-loader?mimetype=image/png"
