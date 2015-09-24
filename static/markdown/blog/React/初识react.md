###React特点

* Learn once, write everywhere
* mvc 专注v

> React Native 想要「同一组人只需要写一次 UI ，就能同时运行在服务器、浏览器和手机」是不正确的。历史上所有標榜 "Write once, run everywhere" 的项目都失敗了。 React Native 在发表时，說的是 "Learn once, write everywhere"。浏览器、 iOS 及 Android 的後端 js 逻辑可以共用，UI 还是得写3次，但架构的思考模式会一样 (都用 CSS flexbox)，画面元件还是得替换。

###React认识误区

1. React不是一个完整的MVC框架，最多可以认为是MVC中的V（View），甚至React并不非常认可MVC开发模式；
2. React的服务器端Render能力只能算是一个锦上添花的功能，并不是其核心出发点，事实上React官方站点几乎没有提及其在服务器端的应用；
3. 有人拿React和Web Component相提并论，但两者并不是完全的竞争关系，你完全可以用React去开发一个真正的Web Component；
4. React不是一个新的模板语言，JSX只是一个表象，没有JSX的React也能工作。

###React原理
在Web开发中，我们总需要将变化的数据实时反应到UI上，这时就需要对DOM进行操作。而 复杂或频繁的DOM操作通常是性能瓶颈产生的原因 （如何进行高性能的复杂DOM操作通常是衡量一个前端开发人员技能的重要指标）。

React为此引入了 虚拟DOM（Virtual DOM） 的机制：在浏览器端用Javascript实现了一套DOM API。
>基于React进行开发时所有的DOM构造都是通过虚拟DOM进行，每当数据变化时，React都会重新构建整个DOM树，然后React将当前整个DOM树和上一次的DOM树进行对比，得到DOM结构的区别，然后仅仅将需要变化的部分进行实际的浏览器DOM更新。
>
>而且React能够批处理虚拟DOM的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并，例如你连续的先将节点内容从A变成B，然后又从B变成A，React会认为UI不发生任何变化，而如果通过手动控制，这种逻辑通常是极其复杂的。尽管每一次都需要构造完整的虚拟DOM树，但是因为虚拟DOM是内存数据，性能是极高的，而对实际DOM进行操作的仅仅是Diff部分，因而能达到提高性能的目的。这样，在保证性能的同时，开发者将不再需要关注某个数据的变化如何更新到一个或多个具体的DOM元素，而只需要关心在任意一个数据状态下，整个界面是如何Render的。

如果你像在90年代那样写过服务器端Render的纯Web页面那么应该知道，服务器端所要做的就是根据数据Render出HTML送到浏览器端。如果这时因为用户的一个点击需要改变某个状态文字，那么也是通过刷新整个页面来完成的。服务器端并不需要知道是哪一小段HTML发生了变化，而只需要根据数据刷新整个页面。换句话说，任何UI的变化都是通过整体刷新来完成的。而React将这种开发模式以高性能的方式带到了前端，每做一点界面的更新，你都可以认为刷新了整个页面。至于如何进行局部更新以保证性能，则是React框架要完成的事情。

借用Facebook介绍React的视频中聊天应用的例子，当一条新的消息过来时，传统开发的思路如上图，你的开发过程需要知道哪条数据过来了，如何将新的DOM结点添加到当前DOM树上；而基于React的开发思路如下图，你永远只需要关心数据整体，两次数据之间的UI如何变化，则完全交给框架去做。可以看到，使用React大大降低了逻辑复杂性，意味着开发难度降低，可能产生Bug的机会也更少。


###React的组件化

虚拟DOM(virtual-dom)不仅带来了简单的UI开发逻辑，同时也带来了组件化开发的思想，所谓组件，即封装起来的具有独立功能的UI部件。React推荐以组件的方式去重新思考UI构成，将UI上每一个功能相对独立的模块定义成组件，然后将小的组件通过组合或者嵌套的方式构成大的组件，最终完成整体UI的构建。例如，Facebook的instagram.com整站都采用了React来开发，整个页面就是一个大的组件，其中包含了嵌套的大量其它组件，大家有兴趣可以看下它背后的代码。

如果说MVC的思想让你做到视图-数据-控制器的分离，那么组件化的思考方式则是带来了UI功能模块之间的分离。我们通过一个典型的Blog评论界面来看MVC和组件化开发思路的区别。

对于MVC开发模式来说，开发者将三者定义成不同的类，实现了表现，数据，控制的分离。开发者更多的是从技术的角度来对UI进行拆分，实现松耦合。

对于React而言，则完全是一个新的思路，开发者从功能的角度出发，将UI分成不同的组件，每个组件都独立封装。

在React中，你按照界面模块自然划分的方式来组织和编写你的代码，对于评论界面而言，整个UI是一个通过小组件构成的大组件，每个组件只关心自己部分的逻辑，彼此独立。


React认为一个组件应该具有如下特征：

1. 可组合（Composeable）：一个组件易于和其它组件一起使用，或者嵌套在另一个组件内部。如果一个组件内部创建了另一个组件，那么说父组件拥有（own）它创建的子组件，通过这个特性，一个复杂的UI可以拆分成多个简单的UI组件；

2. 可重用（Reusable）：每个组件都是具有独立功能的，它可以被使用在多个UI场景；

3. 可维护（Maintainable）：每个小的组件仅仅包含自身的逻辑，更容易被理解和维护；

###一、HTML 模板  

	
	<!DOCTYPE html>
	<html>
	  <head>
	    <script src="../build/react.js"></script>
	    <script src="../build/JSXTransformer.js"></script>
	  </head>
	  <body>
	    <div id="example"></div>
	    <script type="text/jsx">
	      // ** Our code goes here! **
	    </script>
	  </body>
	</html>
	
>上面代码有两个地方需要注意。
>
>首先，最后一个 script 标签的 type 属性为 text/jsx 。这是因为 React 独有的 JSX 语法，跟 JavaScript 不兼容。凡是使用 JSX 的地方，都要加上 type="text/jsx" 。

>其次，React 提供两个库： react.js 和 JSXTransformer.js ，它们必须首先加载。其中，JSXTransformer.js 的作用是将 JSX 语法转为 JavaScript 语法。这一步很消耗时间，实际上线的时候，应该将它放到服务器完成。

###二、React.render()
React.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。

	React.render(
	  <h1>Hello, world!</h1>,
	  document.getElementById('example')
	);

上面代码将一个 h1 标题，插入 example 节点

###三、JSX 语法
 HTML 语言直接写在 JavaScript 语言之中，不加任何引号，这就是 JSX 的语法，它允许 HTML 与 JavaScript 的混写
 
	 var names = ['Alice', 'Emily', 'Kate'];

	React.render(
	  <div>
	  {
	    names.map(function (name) {
	      return <div>Hello, {name}!</div>
	    })
	  }
	  </div>,
	  document.getElementById('example')
	);
	
>JSX 的基本语法规则：遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析
>

JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员

	var arr = [
	  <h1>Hello world!</h1>,
	  <h2>React is awesome</h2>,
	];
	React.render(
	  <div>{arr}</div>,
	  document.getElementById('example')
	);
	
###四、组件
React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。React.createClass 方法就用于生成一个组件类


	var HelloMessage = React.createClass({
	  render: function() {
	    return <h1>Hello {this.props.name}</h1>;
	  }
	});

	React.render(
	  <HelloMessage name="John" />,
	  document.getElementById('example')
	);
	
>变量 HelloMessage 就是一个组件类。模板插入 <HelloMessage /> 时，会自动生成 HelloMessage 的一个实例（下文的"组件"都指组件类的实例）。所有组件类都必须有自己的 render 方法，用于输出组件。

>组件的用法与原生的 HTML 标签完全一致，可以任意加入属性，比如 <HelloMessage name="John" /> ，就是 HelloMessage 组件加入一个 name 属性，值为 John。组件的属性可以在组件类的 this.props 
>
>需要注意的点：
>
>1. 变量名用{}包裹，且不能加双引号。
>2. 获取属性的值用的是this.props.属性名
>3. class 属性需要写成 className ，for 属性需要写成 htmlFor ，这是因为 class 和 for 是 JavaScript 的保留字。
>4. 创建的组件名称首字母必须大写。
>5. 组件的style属性的设置方式也值得注意，不能写成style="opacity:{this.state.opacity};"而要写成style={{opacity: this.state.opacity}},
这是因为 React 组件样式是一个对象，所以第一重大括号表示这是 JavaScript 语法，第二重大括号表示样式对象。




###五、this.props.children
this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children 属性。它表示组件的所有子节点

	var NotesList = React.createClass({
	  render: function() {
	    return (
	      <ol>
	      {
	        this.props.children.map(function (child) {
	          return <li>{child}</li>
	        })
	      }
	      </ol>
	    );
	  }
	});

	React.render(
	  <NotesList>
	    <span>hello</span>
	    <span>world</span>
	  </NotesList>,
	  document.body
	);
	
>上面代码的 NoteList 组件有两个 span 子节点，它们都可以通过 this.props.children 读取，
>
>这里需要注意，只有当子节点多余1个时，this.props.children 才是一个数组，否则是不能用 map 方法的， 会报错。

###六、React.findDOMNode()


组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff ，它可以极大提高网页的性能表现。
但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 React.findDOMNode 方法（查看 demo06 ）。


	var MyComponent = React.createClass({
	  handleClick: function() {
	    React.findDOMNode(this.refs.myTextInput).focus();
	  },
	  render: function() {
	    return (
	      <div>
	        <input type="text" ref="myTextInput" />
	        <input type="button" value="Focus the text input" onClick={this.handleClick} />
	      </div>
	    );
	  }
	});

	React.render(
	  <MyComponent />,
	  document.getElementById('example')
	);
	

>上面代码中，组件 MyComponent 的子节点有一个文本输入框，用于获取用户的输入。这时就必须获取真实的 DOM 节点，虚拟 DOM 是拿不到用户输入的。为了做到这一点，文本输入框必须有一个 ref 属性，然后 this.refs.[refName] 就指向这个虚拟 DOM 的子节点，最后通过 React.findDOMNode 方法获取真实 DOM 的节点。
需要注意的是，由于 React.findDOMNode 方法获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个方法，否则会返回 null 。上面代码中，通过为组件指定 Click 事件的回调函数，确保了只有等到真实 DOM 发生 Click 事件之后，才会调用 React.findDOMNode 方法。
React 组件支持很多事件，除了 Click 事件以外，还有 KeyDown 、Copy、Scroll 等，完整的事件清单请查看[官方文档](http://facebook.github.io/react/docs/events.html#supported-events)。

###七、this.state

组件免不了要与用户互动，React 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI

	var LikeButton = React.createClass({
	  getInitialState: function() {
	    return {liked: false};
	  },
	  handleClick: function(event) {
	    this.setState({liked: !this.state.liked});
	  },
	  render: function() {
	    var text = this.state.liked ? 'like' : 'haven\'t liked';
	    return (
	      <p onClick={this.handleClick}>
	        You {text} this. Click to toggle.
	      </p>
	    );
	  }
	});

	React.render(
	  <LikeButton />,
	  document.getElementById('example')
	);
	
>上面代码是一个 LikeButton 组件，它的 getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取。当用户点击组件，导致状态变化，this.setState 方法就修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。
由于 this.props 和 this.state 都用于描述组件的特性，可能会产生混淆。一个简单的区分方法是，this.props 表示那些一旦定义，就不再改变的特性，而 this.state 是会随着用户互动而产生变化的特性。

###八、表单

用户在表单填入的内容，属于用户跟组件的互动，所以不能用 this.props 读取（查看 demo08 ）。

	var Input = React.createClass({
	  getInitialState: function() {
	    return {value: 'Hello!'};
	  },
	  handleChange: function(event) {
	    this.setState({value: event.target.value});
	  },
	  render: function () {
	    var value = this.state.value;
	    return (
	      <div>
	        <input type="text" value={value} onChange={this.handleChange} />
	        <p>{value}</p>
	      </div>
	    );
	  }
	});

	React.render(<Input/>, document.body);
>上面代码中，文本输入框的值，不能用 this.props.value 读取，而要定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值。textarea 元素、select元素、radio元素都属于这种情况，更多介绍请参考[官方文档](http://facebook.github.io/react/docs/forms.html)。


###九、组件的生命周期
组件的生命周期分成三个状态：

* Mounting：已插入真实 DOM
* Updating：正在被重新渲染
* Unmounting：已移除真实 DOM

React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。

* componentWillMount()
* componentDidMount()
* componentWillUpdate(object nextProps, object nextState)
* componentDidUpdate(object prevProps, object prevState)
* componentWillUnmount()

此外，React 还提供两种特殊状态的处理函数。

* componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
* shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

这些方法的详细说明，可以参考[官方文档](http://facebook.github.io/react/docs/component-specs.html#lifecycle-methods)

	var Hello = React.createClass({
	  getInitialState: function () {
	    return {
	      opacity: 1.0
	    };
	  },

	  componentDidMount: function () {
	    this.timer = setInterval(function () {
	      var opacity = this.state.opacity;
	      opacity -= .05;
	      if (opacity < 0.1) {
	        opacity = 1.0;
	      }
	      this.setState({
	        opacity: opacity
	      });
	    }.bind(this), 100);
	  },

	  render: function () {
	    return (
	      <div style={{opacity: this.state.opacity}}>
	        Hello {this.props.name}
	      </div>
	    );
	  }
	});

	React.render(
	  <Hello name="world"/>,
	  document.body
	);

>上面代码在hello组件加载以后，通过 componentDidMount 方法设置一个定时器，每隔100毫秒，就重新设置组件的透明度，从而引发重新渲染。




###十、Ajax
组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 componentDidMount 方法设置 Ajax 请求，等到请求成功，再用 this.setState 方法重新渲染 UI （查看 demo10 ）。

	var UserGist = React.createClass({
	  getInitialState: function() {
	    return {
	      username: '',
	      lastGistUrl: ''
	    };
	  },

	  componentDidMount: function() {
	    $.get(this.props.source, function(result) {
	      var lastGist = result[0];
	      if (this.isMounted()) {
	        this.setState({
	          username: lastGist.owner.login,
	          lastGistUrl: lastGist.html_url
	        });
	      }
	    }.bind(this));
	  },

	  render: function() {
	    return (
	      <div>
	        {this.state.username}'s last gist is
	        <a href={this.state.lastGistUrl}>here</a>.
	      </div>
	    );
	  }
	});

	React.render(
	  <UserGist source="https://api.github.com/users/octocat/gists" />,
	  document.body
	);
>上面代码使用 jQuery 完成 Ajax 请求，这是为了便于说明。React 没有任何依赖，完全可以使用其他库

###其他教程：

* [React 中文社区维护者之一](http://nav.react-china.org/)
* [React Native 官方文档的完整中文翻译教程](http://wiki.jikexueyuan.com/project/react-native/)


