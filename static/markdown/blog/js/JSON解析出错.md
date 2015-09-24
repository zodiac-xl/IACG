####背景

今天解析后端穿过来的json字符串无端报错 仔细看了看的确是JSON格式啊
再仔细检查 发现JSON 的key 和value 是单引号 试着改成双引 居然ok了

####QUESTION

why `"` work, not `'`


	var ob1="{'name':'zodiac'}";
	JSON.parse(ob); //error 
	
JSON parse不能解析单引号

####ANSWER

各大文档JSON parse时json格式key和value对象或字符串都是采用双引号""，也就是说
 
 	var ob2 ='{"name":"zodiac"}';
 
 才是标准的json.所以使用单引号会报错
 
 >单引号方式使用jQuery.parseJSON解析 在jquery 1.4之前的版本都是没有问题的。因为在1.3及更早版本中，jQuery通过javascript的eval方法来解析json对象。在1.4 中，jQuery使用了更严格的方法来解析json。所有的内容都必须使用双引号。
 
####引出另一种方法
 
 不想关心后端传递的是单引号还是双引号的JSON字符串
 
 我们可以用另一种方法
 
 	eval("("+ ob1 +")");



***`eval("("+ ob1 +")")`***原理

>原因在于：eval本身的问题。 由于json是以”{}”的方式来开始以及结束的，在JS中，它会被当成一个语句块来处理，所以必须强制性的将它转换成一种表达式。

>加上圆括号的目的是迫使eval函数在处理JavaScript代码的时候强制将括号内的表达式（expression）转化为对象，而不是作为语句（statement）来执行。


举一个例子，例如对象字面量{}，如若不加外层的括号，那么eval会将大括号识别为JavaScript代码块的开始和结束标记，那么{}将会被认为是执行了一句空语句。所以下面两个执行结果是不同的：

	alert(eval("{}")); // return undefined
	alert(eval("({})"));// return object[Object] 