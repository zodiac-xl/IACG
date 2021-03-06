
###一、文件规范
####1、文件归档至约定的目录中 所有css可分为两大类：通用类和业务类
 
通用类：
 
 * 基本样式库 /css/core
 * 通用UI样式库 /css/lib
 * JS组件相关样式库 /css/ui

业务类

* 电影 /css/movie/
* 读书 /css/book/
* 音乐 /css/music/
* 社区 /css/sns/

另外可以对具体的CSS进行文档化的整理

* reset /css/core/reset.css
* 通用模块容器 /css/core/mod.css
* 评星 /css/core/rating.css
* 通用按钮 /css/core/common_button.css
* 分页 /css/core/pagination.css

####2、文件引入方式：外联 内联 内嵌
link和style标签都应放在head中；原则上不应使用内嵌方式，避免使用!important，嵌套不要超过一层

* 外联方式：\<link rel=”stylesheet” href=”…” />
* 内联方式：\<style>…\</style> 

####3、文件名以及编码

* 文件名必须由小写字母、数字、中划线组成
* 文件必须使用UTF-8编码，需要在HTML中指定，css中默认为UTF-8。
* 单个css文件避免过大，不宜维护（建议少于300行）

###二、注释规范
####1、文件顶部注释

	/*  
	* @description: 中文说明  
	* @author: name  
	* @update: name (2013-04-13 18:32)  
	*/ 

####2、模块注释（模块注释必须单独一行）

	/* module: module1 by zodiac */  
	…  
	/* module: module2 by zodiac */ 

####3、单行注释和多行注释
单行注释可以的单独一行，也可以写在行尾，单行注释最多不超过40个汉字或80个英文字符


	/* this is a short comment */ 


多行注释必须写在单独行


	/*  
	* this is comment line 1.  
	* this is comment line 2.  
	*/ 

####4、特殊注释
用于标注待办、修改信息


	/* TODO: xxxx by name 2013-04-13 18:32 */  
	/* BUGFIX: xxxx by name 2012-04-13 18:32 */ 

####5、区域注释
对于代码区块注释，将样式语句分区块


	/* Header */  
	/* Footer */  
	/* Gallery */ 


###三、命名规范
使用有意义的或通用的ID和class命名:ID和class的命名应反映该元素的功能或使用通用名称，而不要用抽象的晦涩的命名。反映元素的使用目的是首选；使用通用名称代表该元素不表特定意义，与其同级元素无异，通常是用于辅助命名；使用功能性或通用的名称可以更适用于文档或模版变化的情况

* /* 不推荐: 无意义 */ #yee-1901 {}
* /* 不推荐: 与样式相关 */ .button-green {}.clear {}
* /* 推荐: 特殊性 */ #gallery {}#login {}.video {}
* /* 推荐: 通用性 */ .aux {}.alt {}

常用命名：page、wrap、layout、header(head)、footer(foot、ft)、content(cont)、menu、nav、main、submain、sidebar(side)、logo、banner、title(tit)、popo(pop)、icon、note、btn、txt、iblock、window(win)、tips等

ID和class命名越简短越好，只要足够表达涵义。这样既有助于理解，也能提高代码效率。

* /* 不推荐 */ #navigation {}.atr {}
* /* 推荐 */ #nav {}.author {}　　　　

类型选择器避免同时使用标签、ID和class作为定位一个元素选择器；从性能上考虑也应尽量减少选择器的层级。

* /* 不推荐 */ul#example {}　div.error {}
* /* 推荐 */#example {}　.error {}

命名时需要注意的点：

* 规则命名中，一律采用小写加中划线的方式，不允许使用大写字母或 _
* 命名避免使用中文拼音，应该采用更简明有语义的英文单词进行组合
* 命名注意缩写，但是不能盲目缩写，具体请参见常用的CSS命名规则
* 不允许通过1、2、3等序号进行命名
* 避免class与id重名
* id用于标识模块或页面的某一个父容器区域，名称必须唯一，不要随意新建id
* class用于标识某一个类型的对象，命名必须言简意赅。
* 尽可能提高代码模块的复用，样式尽量用组合的方式
* 规则名称中不应该包含颜色（red/blue）、定位（left/right）等与具体显示效果相关的信息。应该用意义命名，而不是样式显示结果命名。

###4、书写规范
####1、排版规范
推荐使用多行形式书写

* 每一条规则的大括号 { 前添加空格；
* 多个selector共用一个样式集，则多个selector必须写成多行形式；
* 每一条规则结束的大括号 } 必须与规则选择器的第一个字符对齐；
* 属性名冒号之前不加空格，冒号之后加空格；
* 属性值之后添加分号；

####2、属性编写顺序
* 显示属性：display/list-style/position/float/clear …
* 自身属性（盒模型）：width/height/margin/padding/border
* 背景：background
* 行高：line-height
* 文本属性：color/font/text-decoration/text-align/text-indent/vertical-align/white-space/content…
* 其他：cursor/z-index/zoom/overflow
* CSS3属性：transform/transition/animation/box-shadow/border-radius
如果使用CSS3的属性，如果有必要加入浏览器前缀，则按照 -webkit- / -moz- / -ms- / -o- / std的顺序进行添加，标准属性写在最后。
* 链接的样式请严格按照如下顺序添加： a:link -> a:visited -> a:hover -> a:active

####3、规则书写规范
* 使用单引号，不允许使用双引号;
* 每个声明结束都应该带一个分号，不管是不是最后一个声明;
* 除16进制颜色和字体设置外，CSS文件中的所有的代码都应该小写;
* 除了重置浏览器默认样式外，禁止直接为html tag添加css样式设置;
* 每一条规则应该确保选择器唯一，禁止直接为全局.nav/.header/.body等类设置属性;

####4、代码性能优化
* 合并margin、padding、border的-left/-top/-right/-bottom的设置，尽量使用短名称。
* 选择器应该在满足功能的基础上尽量简短，减少选择器嵌套，查询消耗。但是一定要避免覆盖全局样式设置。
* 注意选择器的性能，不要使用低性能的选择器。
* 禁止在css中使用*选择符。
* 除非必须，否则，一般有class或id的，不需要再写上元素对应的tag。
* 0后面不需要单位，比如0px可以省略成0，0.8px可以省略成.8px。
* 如果是16进制表示颜色，则颜色取值应该大写。
* 如果可以，颜色尽量用三位字符表示，例如#AABBCC写成#ABC 。
* 如果没有边框时，不要写成border:0，应该写成border:none 。
* 尽量避免使用AlphaImageLoader 。
* 在保持代码解耦的前提下，尽量合并重复的样式。
* background、font等可以缩写的属性，尽量使用缩写形式 。

####5、CSS Hack的使用
不轻易使用浏览器检测和CSS Hacks，考虑到代码高效率和易管理，虽然这两种方法能快速解决浏览器解析差异，但会降低代码效率且不易管理。
推荐使用下面的：

* IE都能识别*，其他浏览器均不支持
* IE6支持下划线"_"，其他浏览器均不支持
* IE6能识别*，但不能识别 !important 
* IE7能识别*，也能识别!important 
* FF不能识别*，但能识别!important 



区别属性：

浏览器 | 属性
----  |----
IE6   |_property:value
IE7   |*property:value
IE8   |property:value

区别规则

浏览器 | 属性
----  |----
IE6   | * html selector { ... }
IE7   | *:first-child+html selector { ... }
非IE6 | html>body selector { ... }
firefox only | @-moz-document url-prefix() { ... }
safari3+/chrome1+| @media all and (-webkit-min-device-pixel-ratio:0) { ... }
opera only | @media all and (-webkit-min-device-pixel-ratio:1000),not all and (-webkit-min-device-pixel-ratio:0) { ... }
iphone/moblie webkit | @media screen and (max-device-width:480px) { ... }

####6、字体规则

* 为了防止文件合并及编码转换时造成问题，建议将样式中文字体名字改成对应的英文名字，如：黑体(SimHei) 宋体(SimSun) 微软雅黑 (Microsoft Yahei，几个单词中间有空格组成的必须加引号)
* 字体粗细采用具体数值，粗体bold写为700，正常normal写为400
* font-size以px pt rem为单位，推荐用px（注：pt为打印版字体大小设置），不允许使用xx-small/x-small/small/medium/large/x-large/xx-large等值
* 为了对font-family取值进行统一，更好的支持各个操作系统上各个浏览器的兼容性，font-family不允许在业务代码中随意设置