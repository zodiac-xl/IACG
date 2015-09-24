###console.assert(expression, object)
断言当expression为false时，console输出object

	console.assert(2<1,"2大于1")//Assertion failed: 2大于1
	

###console.clear()
同Cmd + K 

###console.count(label)
计数输出调用次数并用label标记

	console.count("time")	//time:1
	console.count("time")	//time:2
	

###console.dir(object)
如果object是一个HTML element，则输出DOM的properties，不同于console.log（）直接输出参数，dir按对象输出

	console.log([1,2])	//[1, 2]
	console.dir([1,2])	//Array[2]
	console.dir(document.body);	//body对象
	console.log("document body: %O", document.body); //document body:body对象
	console.log(document.body);	//body Dom

###console.error(object [, object, ...])
和log类似 类型为错误

###console.warn(object [, object, ...])
和log类似 类型为警告



###console.group(object[, object, ...])
开始一个标题可选的新的记录组。调用此方法后输出在相同的视觉组，直到调用console.groupEnd()结束这一层级;

console.groupCollapsed()类似，不同在于输出的对象是未展开的;
>层级为：一个group或groupCollapsed对应一个groupEnd

	console.group("Authenticating user '%s'", 11)
	console.group("Authenticating user '%s'", 22)
	console.groupCollapsed("Authenticating user '%s'", 33)
	console.groupEnd()
	console.groupEnd()
	console.groupEnd()
	
###console.log(object [, object, ...])
可以传递一个或多个对象。如果传递的第一个参数可能包含格式说明，由一个%和一个字母组成，可以格式化输出，类是C

>console.info(object [, object, ...])，console.debug(object [, object, ...])和log完全相同
	
	console.log("User %s has %d points", "zodiac", 100); 
	//User zodiac has 100 points	

Format |Specifier	Description
-------|----------------
%s	| string
%d or %i |	integer
%f	|  floating point value
%o|	 DOM element
%O	| JavaScript object
%c	| CSS styles 

###console.profile([label])
如果Chrome DevTools开启状态，该方法将开启一个使用label标记的JavaScript CPU性能解析，使用console.profileEnd()结束解析，具体的解析会被添加到profile面板

###console.time(label)	
开启一个使用label标记的JavaScript性能计时器，使用console.timeEnd(label)结束相应计时器，然后输出中间执行js花费的时间，常用来衡量js的执行效率。


###console.timeStamp([label])
时间戳将为一个事件在Timeline面板添加一个时间轴，将相关的屏幕布局、渲染等添加到时间线，可以在

###console.trace(object)
打印一个从trace方法被调用开始的堆栈追踪,包括链接到特定的JavaScript源代码行。一个计数器显示追踪方法trace()被调用的次数

参考：<https://developer.chrome.com/devtools/docs/console-api>