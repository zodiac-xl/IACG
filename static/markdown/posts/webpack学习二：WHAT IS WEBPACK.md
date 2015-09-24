
**webpack**是一种模块打包方案

webpack根据模块的依赖关系获取模块生成静态资源代表这些模块。

![modules with dependencies ---webpack---> static assets](http://webpack.github.io/assets/what-is-webpack.png)

###为什么新弄一种打包方案
现有的模块打包方案适合大型项目(特别是大型单页应用)。另一个原因是webpack发使用代码分割打包,静态资产可以通过模块化无缝贴合在一起。


###目标

* 分割将依赖树分割为按需加载的区块
* 保证初始加载时间在较少的范围内
* 每个静态资源都可以作为一个模块
* 可以将第3方环境集成为模块
* 可以很方便的定制模块以适应各种大型项目

###webpack的不同之处

####Code Splitting
webpack依赖树有两种类型的依赖关系:同步和异步。异步依赖作为分割点,形成一个新块。区块树优化后,一个区块对应一个文件。

####Loaders
webpack只能处理本地JavaScript,但加载器是用来将其他资源转换成JavaScript。通过这样做,每个资源都可以形成一个模块。

####Clever parsing
webpack拥有非常聪明的解析器,可以处理几乎所有的第三方库。它甚至允许在依赖中使用表达式，类似`require("./templates/" + name + ".jade")`。可以处理最常见的模块样式:CommonJs和AMD。

####Plugin system

webpack特性丰富的插件系统。最内部的特性都是基于这个插件系统。这允许您为您的需要定制webpack和分发常见开源插件。
