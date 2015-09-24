

###打开DevTools
   
操作     		|   Windows / Linux   |     Mac
--------		|	-------------------	|	-----------------
打开开发工具	|	F12, Ctrl + Shift + I	|   Cmd + Opt + I
打开开发工具并切换到检查元素模式	|	Ctrl + Shift +  |   Cmd + Shift + C
打开开发工具并切换到控制台	|	Ctrl + Shift + J    |    Cmd + Opt + J



###All Panels

操作		|	 Windows / Linux  |     Mac
----------|--------------------|---------
打开General Settings dialog|	?, F1|	?
下一个面板	|	Ctrl + ]	|	Cmd + ]
上一个面板	|	Ctrl + [	|	Cmd + [
面板历史中的下一个	|	Ctrl + Alt + [   |   Cmd + Opt + [
面板历史中的下一个	|   Ctrl + Alt + ]   |   Cmd + Opt + ]
Change docking location调试器位置	    |Ctrl + Shift + D  | Cmd + Shift + D
Open Device Mode设备模拟		|	Ctrl + Shift + M  |  Cmd + Shift + M
Toggle Console / close settings dialog when open |	Esc	|Esc
刷新page|	F5, Ctrl + R|	Cmd + R
不使用缓存强制刷新	|Ctrl + F5, Ctrl + Shift + R|	Cmd + Shift + R
在当前文件或面板下查找|Ctrl + F|	Cmd + F
在所有资源中查找	|Ctrl + Shift + F	|Cmd + Opt + F
查找文件	| Ctrl + O	|Cmd + O
Zoom in (while focused in DevTools)|	Ctrl + +	|Shift + +
Zoom out|	Ctrl + -|	Shift + -
Restore default text size|	Ctrl + 0	|Shift + 0


###Elements Panel
操作		|	 Windows / Linux  |     Mac
----------|--------------------|---------
Undo change	|Ctrl + Z	|Cmd + Z
Redo change	|Ctrl + Y	|Cmd + Y, Cmd + Shift + Z
Navigate	|Up, Down	|Up, Down
Expand / collapse node|	Right, Left	|Right, Left
Expand node	|Single-click on arrow	|Single-click on arrow
Expand / collapse node and all its children	|Ctrl + Alt + Click on arrow icon|	Opt + Click on arrow icon
Edit attribute	|Enter, Double-click on attribute	|Enter, Double-click on attribute
Hide element|	H	|H
Toggle edit as HTML	|F2

	
Right-clicking an element you can:

* Force element pseudo states: (:active, :hover, :focus, :visited)
* Set breakpoints on the elements: (Subtree modifications, Attribute modification, Node removal)
* Scroll into View




###Styles Sidebar
操作		|	 Windows / Linux  |     Mac
----------|--------------------|---------
Edit rule	| Single-click |	Single-click
Insert new property	| Single-click on whitespace | Single-click on whitespace
Edit next / previous property	|Tab, Shift + Tab	|Tab, Shift + Tab
Increment / decrement value|	Up, Down|	Up, Down
Increment / decrement value by 10	|Shift + Up, Shift + Down	|Shift + Up, Shift + Down
Increment / decrement value by 10|	PgUp, PgDown	|PgUp, PgDown
Increment / decrement value by 100	|Shift + PgUp, Shift + PgDown	|Shift + PgUp, Shift + PgDown
Increment / decrement value by 0.1	|Alt + Up, Alt + Down	|Opt + Up, Opt + Down

* Element模拟状态(:active, :hover, :focus, :visited)

* Adding style selectors Add new style selectors
* animations设置动画慢放


###Sources Panel
操作		|	 Windows / Linux  |     Mac
----------|--------------------|---------
Pause / resume script execution|	F8, Ctrl + \	|F8, Cmd + \
Step over next function call|	F10, Ctrl + '	|F10, Cmd + '
Step into next function call	|F11, Ctrl + ;	|F11, Cmd + ;
Step out of current function	|Shift + F11, Ctrl + Shift + ;	|Shift + F11, Cmd + Shift + ;
Select next call frame|	Ctrl + .|	Opt + .
Select previous call frame	|Ctrl + ,	|Opt + ,
Toggle breakpoint condition	|Click on line number, Ctrl + B	|Click on line number, Cmd + B
Edit breakpoint condition	|Right-click on line number	|Right-click on line number
Delete individual words	|Alt + Delete|	Opt + Delete
Comment a line or selected text|	Ctrl + /	|Cmd + /
Save changes to local modifications|	Ctrl + S	|Cmd + S
Save all changes	|Ctrl + Alt + S|	Cmd + Opt + S
Go to line|	Ctrl + G	|Ctrl + G
Search by filename	|Ctrl + O	|Cmd + O
Jump to line number	|Ctrl + P + :`<number>`	|Cmd + P + :`<number>`
Jump to column	|Ctrl + O + :`<number>` + :`<number>`	|Cmd + O + :`<number>` + :`<number>`
Go to member	|Ctrl + Shift + O	|Cmd + Shift + O
Close active tab|	Alt + W	|Opt + W
Run snippet	|Ctrl + Enter|	Cmd + Enter





###Code Editor Shortcuts
操作		|	 Windows / Linux  |     Mac
----------|--------------------|---------
Go to matching bracket|	Ctrl + M
Jump to line number|	Ctrl + P + :`<number>`	|Cmd + P + :`<number>`
Jump to column |	Ctrl + O + :`<number>` + :`<number>`	| Cmd + O + :`<number>` + :`<number>`
Toggle comment	|Ctrl + /|	Cmd + /
Select next occurrence|	Ctrl + D	|Cmd + D
Undo last selection	|Ctrl + U|	Cmd + U



###Timeline Panel
操作		|	 Windows / Linux  |     Mac
----------|--------------------|---------
Start / stop recording	|Ctrl + E	|Cmd + E
Save timeline data	|Ctrl + S	|Cmd + S
Load timeline data|	Ctrl + O	|Cmd + O

###Profiles Panel
操作		|	 Windows / Linux  |     Mac
----------|--------------------|---------
Start / stop recording	| Ctrl + E	| Cmd + E

###Console
操作		|	 Windows / Linux  |     Mac
----------|--------------------|---------
Accept suggestion	|Right|	Right
Previous command / line |	Up	|Up
Next command / line|	Down|	Down
Focus the Console	|Ctrl + `|	Ctrl + `
Clear Console	|Ctrl + L	|Cmd + K 
Multi-line entry	|Shift + Enter|	Ctrl + Return
Execute	|Enter	|Return
多行输入|Shift + Enter | 
运行元素检查模式|Cmd + Shift + C 
输出table|console.table（）|`console.table([{a:1, b:2, c:3}, {a:"foo", b:false, c:undefined}])`;<br/>`console.table([[1,2,3], [2,3,4]])`;
为logs添加样式|console.log |console.log('%cBlue! %cRed!', 'color: blue;', 'color: red;');
清除log历史|Cmd + L
将选中的元素在控制台显示|$0
将选中的元素的兄弟在控制台显示|$1,$2,$3,$4
显示最近一次console的结果|$_ 
使用xpath 表达式查询DOM | $x(xpath) |`$x('//img')`<br/>`var frame = document.getElementsByTagName('iframe')[0].contentWindow.document.body`;<br/>`$x('//'img, frame)`;
document.querySelector()|$(selector)
document.querySelectorAll()|$$(selector)
调试函数，当函数被调用时，断点，使用undebug(fn)接触调试|debug(function)|debug

Right-clicking on console:

* PXMLHttpRequest logging: Turn on to view the XHR log
* Preserve log upon navigation
* Filter: Hide and unhide messages from script files
* Clear console: Clear all console messages

###Screencasting
操作		|	 Windows / Linux  |     Mac
----------|--------------------|---------
Pinch zoom in and out	|Alt + Scroll,Ctrl + Click and drag with two fingers	|Opt + Scroll, Cmd + Click and drag with two fingers
Inspect element tool	|Ctrl + Shift + C	|Cmd + Shift + C


###Other Chrome Shortcuts


操作		|	 Windows / Linux  |     Mac
----------|--------------------|---------
Find next|	Ctrl + G	|Cmd + G
Find previous	|Ctrl + Shift + G	|Cmd + Shift + G
Open a new window ||Ctrl + N	|Cmd  + N
Open a new window in Incognito mode	|Ctrl + Shift + N	|Cmd + Shift + N
Toggle Bookmarks bar on and off	|Ctrl + Shift + B	|Cmd + Shift + B
View the History page	|Ctrl + H	|Cmd + Y
View the Downloads page	|Ctrl + J	|Cmd + Shift + J
地址栏focus|F6, Ctrl + L|Cmd + L

参考：<https://developer.chrome.com/devtools/docs/shortcuts>