###DevTools插件安装

安装方法跟Chrome应用的安装方法是一样的，可以通过Chrome应用商店或者直接crx安装文件来安装。

###jQuery Audit

安装地址：[Chrome应用商店链接](https://chrome.google.com/webstore/detail/jquery-audit/dhhnpbajdcgdmbbcoakfhmfgmemlncjg/)

jQuery Audit是让你可以在DevTools查看页面节点的events、data等jQuery属性和数据。


>jQuery Audit会自动在Elements面板的最前面加上window和document对象

其他详细的用法可以查看[官方文档](https://github.com/zertosh/jquery-audit)。


###JS Runtime Inspector

安装地址：[Chrome应用商店链接](https://chrome.google.com/webstore/detail/js-runtime-inspector/iilpjebedgohcmlffhnkhbjhabkdhfmn)

JS Runtime Inspector让你可以在DevTools上可以直接通过对象或函数名称和值来匹配查找，点击搜索后会在控制台输出查找到的结果。实质是搜索所有全局作用域对象及遍历其属性，所以仍然对闭包无可奈何。


###Devtools redirect

安装地址：[Chrome应用商店链接](https://chrome.google.com/webstore/detail/devtools-redirect/jmhdebkkippcccflcoddckhjjfgnfhnp)

Devtools redirect可以帮你给页面上的网络连接重定位。事实上网络请求重定位的功能，可以用fiddler或者charles轻松实现，但Devtools redirect可以让你直接在浏览器上配置这些重定位。




###jQuery Debugger

安装地址：[Chrome应用商店链接](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)

jQuery Debugger顾名思义就是帮你debug jQuery,它主要有两大功能：

1. 通过选择器字符串来查找页面上的某个元素，等同于你在代码里写$('ul>li')这样的方式。
请输入图片描述
2. 查看页面某个元素的jQuery对象属性。这有点类似前面说过的jQuery Audit插件。


###Grunt DevTools

安装地址：[Chrome应用商店链接](https://chrome.google.com/webstore/detail/grunt-devtools/fbiodiodggnlakggeeckkjccjhhjndnb)

一个可以在DevTools快速运行和查看Grunt任务的插件。有了它，你就不用经常地在浏览器工具、terminal和编辑器上来回切换窗口了。

详细描述可以查看[官方文档](https://github.com/vladikoff/grunt-devtools)。


###Application Postman - REST Client

Postman是一个测试ajax api的客户端



Extends the Developer Tools, adding tools for debugging and profiling AngularJS applications.


###DevTools Theme

最后介绍的不是DevTools的插件，而是主题。大家或许有疑问：这个由什么用呢？嗯，没错，就是装B用的。当别人看着你在调试网页的时候，打开的Chrome开发工具竟然是如此高大上。。。

* ZeroDarkMatrix主题：[Chrome应用商店链接](https://chrome.google.com/webstore/detail/devtools-theme-zero-dark/bomhdjeadceaggdgfoefmpeafkjhegbo)
* Dracula主题：[Chrome应用商店链接](https://chrome.google.com/webstore/detail/dracula-theme-for-devtool/gedipeckgflanbhlcglokjjacilfidda)


安装这些主题的方法可以查看ZeroDarkMatrix的[说明](https://github.com/mauricecruz/chrome-devtools-zerodarkmatrix-theme)。


参考：<http://addyosmani.com/blog/devtools-extensions-for-webapp-developers/>


