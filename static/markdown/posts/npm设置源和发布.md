###使用淘宝npm

	npm install -g cnpm --registry=http://r.cnpmjs.org

###使用三快npm
[http://npm.sankuai.com](http://npm.sankuai.com)

[内部npm包](http://npm.sankuai.com/privates)

* 方法一：修改npm源为sankuai （为保证与普通 npm 环境分离，推荐方法二）
	
		npm config set registry http://r.npm.sankuai.com

* 方法二：

		#加在 .bashrc 或者 .zshrc 中，使用非 sh 系 shell 如 csh/fish 等的请自行创建别名
		 
		# npm registry in meituan
		NPM_REGISTRY=http://r.npm.sankuai.com
		# node.js 源码包地址，如果使用 io.js 把这个值改成 http://npm.sankuai.com/dist/iojs
		NODE_DIST=https://npm.taobao.org/dist
		 
		alias mnpm="npm --registry=$NPM_REGISTRY --disturl=$NODE_DIST 
		--userconfig=$HOME/.mnpmrc  --cache=$HOME/.cache/mnpm"
	
	1. mac 根目录下 ls -al 找到影藏的.zshrc文件 
	2. `open .zshrc`按上面添加NPM_REGISTRY和NODE_DIST变量 使用alias定义全局别名mnpm
	3. `source ~/.zshrc`重新载入配置文件
 	

###npm的常用命令


* npm install xxx 安装模块
* npm install xxx@1.1.1   安装1.1.1版本的xxx
* npm install xxx -g 将模块安装到全局环境中。
* npm ls 查看安装的模块及依赖
* npm ls -g 查看全局安装的模块及依赖
* npm uninstall xxx  (-g) 卸载模块
* npm cache clean 清理缓存
* npm help xxx  查看帮助
* npm config list 查看当前的目录配置
* npm config set name value 设置某个配置
* npm config delete name 删除某个配置
* npm config get name 获取配置
* npm view moudlename dependencies  查看包的依赖关系
* npm view modulenames  查看node模块的package.json文件夹
* npm view modulename labelname  查看package.json文件夹下某个标签的内容
* npm view modulename repository.url  查看包的源文件地址
* npm view modulename engines   查看包所依赖的node的版本
* npm help folders   查看npm使用的所有文件夹
* npm rebuild modulename    用于更改包内容后进行重建
* npm outdated   检查包是否已经过时，此命令会列出所有已经过时的包，可以及时进行包的更新
* npm update modulename   更新node模块

###发布

	$ npm adduser --registry http://registry.npmjs.org/ 

####发布到npm官方源

	npm publish

####发布到美团私有npm仓库
	# 登录
	mnpm adduser
	# 发布模块
	mnpm publish
[travis](https://travis-ci.org/)
	
###参考
	
 * [FE - npm](http://wiki.sankuai.com/display/DEV/FE+-+npm)
 * [美团内部npm源](http://wiki.sankuai.com/pages/viewpage.action?pageId=57412987)	