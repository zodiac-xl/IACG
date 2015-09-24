###作用
jQuery.Callbacks()是在版本1.7中新加入的。它是一个多用途的回调函数列表对象，提供了一种强大的方法来管理回调函数队列。

在很多时候需要控制一系列的函数顺序执行。那么一般就需要一个队列函数来处理这个问题

###核心思想

	var Callbacks = {
	      callbacks: [],
	      add: function(fn) {
	        this.callbacks.push(fn);
	      },
	      fire: function() {
	        this.callbacks.forEach(function(fn) {
	          fn();
	        })
	      }
	  }
	  
	  
###Jquery实现

	
> 转化options并缓存 jQuery.Callbacks("once memory") 
> 
> `"once memory"` convert to `{once:true,memory:true}`

	// String to Object options format cache
	var optionsCache = {};  

	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
		var object = optionsCache[ options ] = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		});
		return object;
	}
	

> jQuery.Callbacks用法


####Getting started
	function fn1( value ) {
	  console.log( value );
	}
	 
	function fn2( value ) {
	  console.log( "fn2 says: " + value );
	  return false;
	}
	
	var callbacks = $.Callbacks();
	callbacks.add( fn1 );
 
	// Outputs: foo!
	callbacks.fire( "foo!" );
	 
	callbacks.add( fn2 );
	 
	// Outputs: bar!, fn2 says: bar!
	callbacks.fire( "bar!" );
	
	
* once: 保证callback list只能被执行一次 (like a Deferred).
* memory: 保存最后fire传入的值，并在list增加callback时使用该值执行callback(like a Deferred).
* unique: 确保同一个callback只能被添加一次(so there are no duplicates in the list).
* stopOnFalse: Interrupts callings when a callback returns false.


####$.Callbacks( "once" ):

	var callbacks = $.Callbacks( "once" );
	
	callbacks.add( fn1 );
	callbacks.fire( "foo" );//foo
	
	callbacks.add( fn2 );
	callbacks.fire( "bar" );//not work
	
	callbacks.remove( fn2 );
	callbacks.fire( "foobar" );//not work
	 


####$.Callbacks( "memory" )

	var callbacks = $.Callbacks( "memory" );
	
	callbacks.add( fn1 );
	callbacks.fire( "foo" );//fn1 says:foo，fn2 says:foo
	
	callbacks.add( fn2 );//fn2 says:foo
	
	callbacks.fire( "bar" );//fn1 says:bar,fn2 says:bar
	
	callbacks.remove( fn2 );
	callbacks.fire( "foobar" );//foobar

####$.Callbacks( "unique" )
	var callbacks = $.Callbacks( "unique" );
	callbacks.add( fn1 );
	callbacks.fire( "foo" ); //foo
	callbacks.add( fn1 ); // Repeat addition not work
	callbacks.add( fn2 ); 
	callbacks.fire( "bar" );//bar,fn2 says:bar
	callbacks.remove( fn2 );
	callbacks.fire( "foobar" );//foobar
	 
####$.Callbacks( "stopOnFalse" )

	function fn1( value ) {
	  console.log( value );
	  return false;
	}
	 
	function fn2( value ) {
	  fn1( "fn2 says: " + value );
	  return false;
	}
	 
	var callbacks = $.Callbacks( "stopOnFalse" );
	callbacks.add( fn1 );
	callbacks.fire( "foo" );//foo 
	callbacks.add( fn2 );
	callbacks.fire( "bar" );//bar (fn2 not work because of fn1 return false)
	callbacks.remove( fn2 );
	callbacks.fire( "foobar" );//	foobar (fn2 not work because of fn1 return false)
	 
###使用$.Callbacks实现$.Deferred and Pub/Sub

####Pub/Sub

Pub/Sub （观察者模式）模型定义了如何向一个内容节点发布和订阅消息，这些节点被称作主题(topic)。

主题可以被认为是消息的传输中介，发布者(publisher)发布消息到主题，订阅者(subscriber) 从主题订阅消息。

主题使得消息订阅者和消息发布者保持互相独立，不需要接触即可保证消息的传送。

***工具包装***：

	var topics = {};
	 
	jQuery.Topic = function( id ) {
	  var callbacks, method,
	    topic = id && topics[ id ];
	 
	  if ( !topic ) {
	    callbacks = jQuery.Callbacks();
	    topic = {
	      publish: callbacks.fire,
	      subscribe: callbacks.add,
	      unsubscribe: callbacks.remove
	    };
	    if ( id ) {
	      topics[ id ] = topic;
	    }
	  }
	  return topic;
	};	
	
***示例***	

	// Subscribers
	$.Topic( "mailArrived" ).subscribe( fn1 );
	$.Topic( "mailArrived" ).subscribe( fn2 );
	$.Topic( "mailSent" ).subscribe( fn1 );
	 
	// Publisher
	$.Topic( "mailArrived" ).publish( "hello world!" );
	$.Topic( "mailSent" ).publish( "woo! mail!" );
	 
	// Here, "hello world!" gets pushed to fn1 and fn2
	// when the "mailArrived" notification is published
	// with "woo! mail!" also being pushed to fn1 when
	// the "mailSent" notification is published.
	 
	/*
	output:
	fn1 says:hello world!
	fn2 says: hello world!
	woo! mail!
	*/
	
####$.Deferreds 延迟执行



	// Subscribe to the mailArrived notification
	$.Topic( "mailArrived" ).subscribe( fn1 );
	 
	// Create a new instance of Deferreds
	var dfd = $.Deferred();
	 
	// Define a new topic (without directly publishing)
	var topic = $.Topic( "mailArrived" );
	 
	// When the deferred has been resolved, publish a
	// notification to subscribers
	dfd.done( topic.publish );
	 
	// Here the Deferred is being resolved with a message
	// that will be passed back to subscribers. It's possible to
	// easily integrate this into a more complex routine
	// (eg. waiting on an ajax call to complete) so that
	// messages are only published once the task has actually
	// finished.
	dfd.resolve( "it's been published!" );
	
	
	          