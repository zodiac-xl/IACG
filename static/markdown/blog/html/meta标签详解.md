###一、定义语言
	 <meta charset="utf-8"/>	 
规定 HTML 文档的字符编码 ；常用的有UTF8是国际编码 GBK是中文编码等；  
如果网页出现乱码，可以检查网页输出编码、网页文件保存编码、数据库整理编码是否一致

###二、name属性
name属性主要用于描述网页，与之对应的属性值为content，content中的内容主要是便于搜索引擎机器人查找信息和分类信息用的。
  
meta标签的name属性语法格式是：
	
	<meta name="参数" content="具体的参数值">
	
name属性主要参数：

1. Keywords 告诉搜索引擎你网页的关键字是什么




		<meta name ="keywords" content="science,education,culture,politics,ecnomics,relationships,entertainment,human">
		
		
		
		
		
2. description 告诉搜索引擎你的网站主要内容



		<meta name="description" content="This page is about the meaning of science,education,culture.">
		
		
3. robots 机器人向导告诉搜索机器人哪些页面需要索引，哪些页面不需要索引 content的参数有all,none,index,noindex,follow,nofollow。默认是all。


		<meta name="robots" content="none">
		
		
* all：文件将被检索，且页面上的链接可以被查询；

* none：文件将不被检索，且页面上的链接不可以被查询；

* index：文件将被检索；（让robot/spider登录）

* follow：页面上的链接可以被查询；

* noindex：文件将不被检索，但页面上的链接可以被查询；(不让robot/spider登录)

* nofollow：文件将不被检索，页面上的链接可以被查询。(不让robot/spider顺着此页的连接往下探找)
		
		
4. author标注网页的作者
5. Copyright (版权)
6. revisit-after(重访)

		<META name="revisit-after" CONTENT="7 days" >



###三、http-equiv属性
http-equiv顾名思义，相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，与之对应的属性值为content，content中的内容其实就是各个参数的变量值。

meta标签的http-equiv属性语法格式是：
		
		<meta http-equiv="参数" content="参数变量值">
		
		
		
http-equiv属性主要参数：

1. Expires 设定网页的到期时间。一旦网页过期，必须重新请求服务器。（时间必须使用***GMT时间格式***）


		<meta http-equiv="expires" content="Fri,12 Jan 2001 18:18:18 GMT">
		
		
2. Pragma(cache模式）浏览器默认缓存页面 设置后禁止浏览器从本地计算机的缓存中访问页面内容（无法***脱机浏览***）

		<meta http-equiv="Pragma" content="no-cache">
		
		
3. Refresh 自动刷新并转到新页面 停留content秒钟后自动刷新到URL网址 URL可为空

		<meta http-equiv="Refresh" content="2;URL">
		
		
		
4. Set-Cookie(cookie设定）一般存放小数据 如果网页过期，那么存盘的cookie将被删除（时间必须使用***GMT时间格式***）

		<meta http-equiv="Set-Cookie" content="cookievalue=xxx; expires=Friday,12-Jan-2001 18:18:18 GMT; path=/">


5. Window-target 显示窗口的设定 这个属性是用来防止别人在框架里调用你的页面。Content选项：_blank、_top、_self、_parent。

		<Meta http-equiv=Widow-target Content=_top>
		
6. date网页创建时间

		<meta name="date" content="2008-07-12T20:50:30+00:00" />
		
7. last-modified 页面的最后生成时间

		<meta name="last-modified" content="2008-07-12T20:50:30+00:00" />

		
		

###四、动画效果（IE）
使用meta标签，我们还可以在进入网页或者离开网页的一刹那实现动画效果 （所加网页不能是一个Frame页） 

		<meta http-equiv="Page-Enter" content="revealTrans(duration=5.0,transition=20)">
		
Duration表示滤镜特效的持续时间（单位：秒）

Transition滤镜类型。表示使用哪种特效，取值为0-23:

* Page-Enter : 进入页面

* Page-Exit  : 离开页面

* Site-Enter : 进入网站

* Site-Exit  : 离开网站

* 0矩形缩小
* 1矩形扩大
* 2 圆形缩小
* 3 圆形扩大
* 4 下到上刷新
* 5 上到下刷新
* 6 左到右刷新
* 7 右到左刷新
* 8 竖百叶窗
* 9 横百叶窗
* 10 错位横百叶窗
* 11 错位竖百叶窗
* 12 点扩散
* 13 左右到中间刷新
* 14 中间到左右刷新
* 15 中间到上下
* 16 上下到中间
* 17 右下到左上
* 18 右上到左下
* 19 左上到右下
* 20 左下到右上
* 21 横条
* 22 竖条
* 23 以上22种随机选择一种

###五、其他用法

1. Link (链接) 很多网站如果你把她保存在收件夹中后，会发现它连带着一个小图标，如果再次点击进入之后还会发现地址栏中也有个小图标。现在只要在你的页头加上这段话，就能轻松实现这一功能。

		<Link href="soim.ico" rel="Shortcut Icon">
		
		
2. Base (基链接) 插入网页基链接属性
网页上的所有相对路径在链接时都将在前面加上“http://www.***.com/”。其中target=_blank是链接文件在新 的窗口中打开，你可以做其他设置。将“_blank”改为“_parent”是链接文件将在当前窗口的父级窗口中打开；改为“_self”链接文件在当前 窗口（帧）中打开；改为“_top”链接文件全屏显示

		<Base href=http://www.***.net/ target=_blank>





		
