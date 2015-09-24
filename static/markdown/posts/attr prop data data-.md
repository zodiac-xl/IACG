


###背景attribute与property
attribute和property都可以翻译为属性，为了以示区别，通常把这两个单词翻译为属性与特性。想要了解attr与prop，我们应该先了解原生的attribute与property的适用场景




####attribute
setAttribute

通过方法 setAttribute设置的attribute最终都会反映到元素的attribute类型的节点中

$("body").get(0).setAttribute("customizedAttr","dsa")
会吧属性设置到element上 在dom中我们是可见的

####property

property是DOM对象的字段，跟我们平常使用的一些对象一样，包含很多字段，这些字段就是property，取值或者设置值和普通字段一样通过”对象.字段“的方式。

看起来attribute和property应该没有什么关系才对，怎么会。。。attribute和property容易混倄是因为很多attribute节点还有一个相对应的property属性，比如上面div的”id“ attribute 同样可以用t.id取到（实际上绝大部分人都是这样获取的），通过property更改id后，用getAttibute获取的id是更新后的id。

####attribute和property的区别
1. attribute和property共享数据，attribute更改了会对property造成影响，反之亦然，但是两者的自定义属性是独立的数据，即使name一样，也互不影响。

	    var body = document.querySelector("body");

	    body.setAttribute("class", "zodiac");
	    console.log(body.getAttribute("class"));//zodiac
	    console.log(body.className);//zodiac

	    body.className="xl";
	    console.log(body.getAttribute("class"));//xl
	    console.log(body.className);//xl


	    body.setAttribute("species", "people");
	    console.log(body.getAttribute("species"));//people
	    console.log(body.species);//undefined

	    body.species="dog";
	    console.log(body.getAttribute("species"));//people
	    console.log(body.species);//dog
		

	>IE6、7没有作区分，自定义属性数据依然共享

2. 并不是所有的attribute与对应的property名字都一致，比如刚才使用的attribute 的class属性，使用property操作的时候应该是这样className

	 	body.className="xl";
	
3. 对于值是true/false的property，类似于input的checked，attribute取得值是HTML文档字面量值，property是取得计算结果，property改变并不影响attribute字面量，但attribute改变会影响property计算；他们都会改变元素的状态。

		<input id="test3" type="checkbox"/>
		
		var t=document.getElementById('test3');
	        console.log(t.getAttribute('checked'));//null
	        console.log(t.checked);//false;
	        
	        t.setAttribute('checked','checked');
	        console.log(t.getAttribute('checked'));//checked
	        console.log(t.checked);//true
	        
	        t.checked=false;
	        console.log(t.getAttribute('checked'));//checked
	        console.log(t.checked);//false

 

4. 对于一些和路径相关的属性，两者取得值也不尽相同，同样的attribute取得是字面量，property取得是计算后的完整路径

		<a id="test4" href="#">Click</a>
		
		var t=document.getElementById('test4');
        console.log(t.getAttribute('href'));//#
        console.log(t.href);//file:///C:/Users/bsun/Desktop/ss/anonymous.html#


>根据W3C forms specification，checked属性是一个布尔值，这就意味着只要checked属性在HTML中表现出来了，那么相应的property就应该是true，即使checked没有值，所以想用使用类似`checked="false"`的方法取消选中是完全无效的，这点儿对其它布尔类型的属性一样适用。

W3C forms specification规定的其他布尔属性有：
  
  * async
  * autofocus
  * autoplay
  * checked
  * controls
  * defer
  * disabled
  * hidden
  * ismap
  * loop
  * multiple
  * open
  * readonly
  * scoped
  * selected

>关于checked 属性需要记住的最重要的一点是：它和checked property并不是一致的。实际上这个attribute和defaultChecked property一致，而且只应该用来设置checkbox的初始值。checked attribute并不随着checkedbox的状态而改变，但是checked property却跟着变。因此浏览器兼容的判断checkebox是否被选中应该使用property
>
>对于布尔类型的属性 attribute只应用来设置初始状态，状态改变attribute不会改变；我们应该使用property，它和状态才是想关联的


###attr与prop的区别
attr与prop是attribute与property缩写。	

在jquery中`$.attr()`的实现就是借用attributes，而prop的实现就是当然就是借用property了，当然也做了attributes不支持时（主要是非元素对象使用）使用property的兼容





在jQuery1.6之前，.attr()方法在获取一些attributes的时候使用了property值，这样会导致一些不一致的行为。在jQuery1.6中，.prop()方法提供了一中明确的获取property值得方式，这样.attr()方法仅返回attributes，当然也做了当不支持attributes方法时调用property的兼容

比如，selectedIndex, tagName, nodeName, nodeType, ownerDocument, defaultChecked, 和defaultSelected应该使用.prop()方法获取/设置值。 在jQuery1.6之前这些不属于attribute的property需要用.attr()方法获取。这几个并没有相应的attibute，只有property。

相应的布尔属性的attributes和property表现也是不一致的，所以也应该使用property 也就是.prop()方法获取/设置值

以checked为例：

		<input type="checkbox" checked="checked" />
		
		elem.checked	//true (Boolean) Will change with checkbox state
		$( elem ).prop( "checked" )	true (Boolean) Will change with checkbox state
		
		elem.getAttribute( "checked" )	"checked" (String) 
		Initial state of the checkbox; does not change
		
		$( elem ).attr( "checked" ) (1.6)	"checked" (String) 
		Initial state of the checkbox; does not change
		
		$( elem ).attr( "checked" ) (1.6.1+)
			"checked" (String) Will change with checkbox state
			
		$( elem ).attr( "checked" ) (pre-1.6)
			true (Boolean) Changed with checkbox state


再让我们来看一段代码

	 var $test = $("#test"),
            test = $test[0];
    console.log($test.attr("checked"));//checked
    console.log(test.getAttribute("checked"));//hehe
    console.log($test.prop("checked"));//true
    console.log(test["checked"]);//true
    console.log($("#foo").get(0).childNodes);//true
    console.log($("#foo").contents());//true

猫咪 为什么attr 和 attribute获取到的不一样呢？

我们再看看jquery attr实现核心
    
    var support={},Sizzle={};

    Sizzle.attr = function( elem, name ) {
        // Set document vars if needed
        if ( ( elem.ownerDocument || elem ) !== document ) {
            setDocument( elem );
        }

        var fn = Expr.attrHandle[ name.toLowerCase() ],
                val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
                        fn( elem, name, !documentIsHTML ) :
                        undefined;

        //根据W3C forms specification检查属性是否是一个布尔值（如果是就意味着只要该属性在HTML中表现出来了，那么相应的property就应该是true，即使属性没有值或者值为"false"）
        
        //原生的getAttribute获取一个布尔属性是返回的是字面值 设置的是多少就是多少，而jquery不同在于也许是出于规范的考虑，attr获取布尔属性的值时一律返回该布尔属性而不是它的值
        
        //这就解释了为什么attr 和 attribute获取到的checked不一样了


        return val === undefined ?
                support.attributes || !documentIsHTML ?
                        elem.getAttribute( name ) :
                        (val = elem.getAttributeNode(name)) && val.specified ?
                                val.value :
                                null :
                val;
        //specified:检测是否在HTML中设置了属性值，设置了返回true，否者返回false
        //当支持attributes或者不是html文档时使用getAttribute 反之如果是html文档但是又不支持attributes时使用getAttributeNode
    };

    support.attributes = assert(function( div ) {
        div.className = "i";
        return !div.getAttribute("className");
        //我们知道IE6/7不区分属性attribute和特征property 所以只有IE6/7才会返回true 现代浏览器div.getAttribute("className") 返回undefined （className属性对应class特性）
    });


>getAttribute 通常用于替换getAttributeNode方法，来获得元素的属性值，性能也更快.  性能对比是 `element.id `大于 `element.getAttribute('id')` 大于 `element.getAttributeNode('id').nodeValue`






###IE6/7 hack

  1. IE6/7不区分属性attribute和特征property
  2. IE6/7中setAttribute()、getAttribute()不能操作class、for等属性
  3. IE6/7不能通过getAttribute/setAttribute来操作值不为字符串的特征
    在现代浏览器中getAttribute一定会返回HTML中对应的字符串，而IE67返回的结果不可预知，因此在IE67下，我们要用AttributeNode来操作属性。
  4. IE6/7/8不能通过style属性来获取CSS文本
    这个问题应当是IE6/7不区分属性和特征的后遗症，在获取style这个属性的时候，使用elem.style.cssText就好了。
 4. IE6/7会解析相对URL成为绝对URL
    这个问题甚至导致了IE6/7下空的href/src属性会产生重复的请求，可以使用getAttribute('href/src', 4)。getAttribute的第二个参数的含义
   * 0  属性不区分大小写搜索,返回找到的第一个值。
	* 1  属性区分大小写搜索,返回找到的第一个值。
	* 2  将值按字符串返回，不适用绑定的事件，老版本ie默认返回的事件绑定的函数   
	* 4  返回展开的URL，只适用url或href属性 
    
   > getAttribute的二个参数只在老版本ie中有实际作用 现代浏览器是按不区分大小写返回字符串，url也是返回字面量，不会计算为完整的路径
    
 5. 元素特征的默认行为不同
    这一类的BUG会比较多，比如在一些旧的webkit浏览器里面，checkbox/radio 的默认value值为""，而不是on。在一些旧的webkit浏览器select的第一个元素不会被选中。
    

###form的坑

背景：浏览器为了方便我们访问 form 中的子元素，约定可以使用 document.form.key 的方式逐级访问表单元素。那么很自然的，如果表单元素中有 name="key" 的元素，那么当然就会“覆盖”了 form 自有 的 key 属性。

解决办法：
使用 getAttributeNode 方法，也就是 form.getAttribute("key") 改成 form.getAttributeNode("key").nodeValue 
    
###原生value和$.val()
原生的value实际上就是property取值，在面对 checkbox，radio，select等标签时，原生取值就比较麻烦需要自己去用`：cheked`选择器或者判断`checked`属性书否为`true`才能拿到值,但是$这些都考虑到了的哦，它会根据nodeName、nodeType帮我们做这些事的；所以我们就心安理得的用了


###data-和$.data

$.data源码观察：
	
	isNode = elem.nodeType,
	cache = isNode ? jQuery.cache : elem,
	cache[id]=data;
	
>id是由传进来的元素加上随机数生成的基本唯一值
>
>所以如果元素是一个节点，$.data将data放在了以节点为key的jquery cache对象中的,只和jquery有关 和dom无关，单独的作用域，不会文档中属性相互影响，解决了**form的坑**。而如果不是节点就将就下将其作为元素的一个property存储，当然这样就影响到了传入的元素了。

data-实际是操作node attribute 完完全全的影响到了DOM 在DOM中也是可见的,实际存储在元素的dataset属性中

> dataset是一个DOMStringMap 只读 不能通过修改dataset的值 达到操作data-的效果


    

