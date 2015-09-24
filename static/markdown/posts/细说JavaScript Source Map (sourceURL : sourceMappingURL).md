###Source map解决的问题
常见的源码转换，主要是以下三种情况:

1. 压缩，减小体积。比如jQuery 1.9的源码，压缩前是252KB，压缩后是32KB。
2. combo多个文件合并，减少HTTP请求数。
3. 其他语言编译成JavaScript。最常见的例子就是CoffeeScript。

> 这三种情况，都使得实际运行的代码不同于开发代码，除错（debug）变得困难重重。

>通常，JavaScript的解释器会告诉你，第几行第几列代码出错。但是，这对于转换后的代码毫无用处。举例来说，jQuery 1.9压缩后只有3行，每行3万个字符，所有内部变量都改了名字。你看着报错信息，感到毫无头绪，根本不知道它所对应的原始位置。

>这就是Source map想要解决的问题。

###启用Source map
只要在转换后的代码尾部，加上一句注释就可以了。

	/*# sourceMappingURL=/path/to/file.css.map */
	//@ sourceMappingURL=/path/to/file.js.map


UglifyJS等工具继承了Source map文件的生成和配置