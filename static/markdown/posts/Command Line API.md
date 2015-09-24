api		|	描述	| 示例
------|------	|------
$_		|	返回最近一次表达式解析的结果
$0 - $4	|	开发工具记忆了在tab或Profiles panel中选中的最近的5个DOM或JavaScript对象. 使用 $0, $1, $2, $3, and $4.
$(selector)	|	document.querySelector()
$$(selector)	|	document.querySelectorAll()
copy(object)	|	copy($0) 将对象复制到粘贴板
debug(function)	|	当函数被调用时debug
dir(object)	|	输出对象 包括它的所有properties 同console.dir()
dirxml(object)	|	输出xml对象 包括它的所有properties 同console.dirxml()
inspect(object/function) 	|	检查DOM节点、Obeject或函数，并在面板中标识 Obeject或函数限全局
getEventListeners(object)	|	返回绑定在object上的所有事件监听器
keys(object)	|	返回object的keys
values(object)	|	返回object的values
monitor(function)	|	监听函数，当函数被调用时，在console输出提示信息
unmonitor(function)	|	停止监听
monitorEvents(object[, events])	|	监听对象的指定事件	|	monitorEvents(window, "resize");
unmonitorEvents(object[, events])	|	停止监听对象的指定事件
profile([name]) 	|	开始一段名为name的profile录制 使用profileEnd(name)结束录制
table(data[, columns]) |	将数据用table输出 index对应index列， {}对应其他列	|	`var names = {index: {}};table(names);`









参考：<https://developer.chrome.com/devtools/docs/commandline-api>