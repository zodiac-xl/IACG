
###gulp.src(globs[, options])

>globs 类型：String 或者 Array

>options 类型：Object 通过 glob-stream 传送到 node-glob 的参数对象，即将
参数传递给globs中具体的插件
	 
gulp 除了支持 node-glob 支持的参数 和 glob-stream 支持的参数外，还额外增加了一些参数：
	 
>options.buffer 类型：Boolean,默认值： true 当把这属性设置成 false 时，返回的 file.contents 将是一个数据流而不是缓冲文件。当在文件非常大时，这个属性非常有用。注意： 某些插件可能没有实现对数据流的支持。

>options.read Type: Boolean,Default: true  当把这个属性设置成 false 时，file.contents 返回的将是 null 并且根本不去读取文件。

>options.base Type: String,默认值：glob 模式匹配串之前的所有内容

	// 匹配 'client/js/somedir/somefile.js' ，`base` 设置为 `client/js/`
	gulp.src('client/js/**/*.js') 
	  .pipe(minify())
	  .pipe(gulp.dest('build'));  
	  // 写入文件 'build/somedir/somefile.js'

	gulp.src('client/js/**/*.js', { base: 'client' })`base` 设置为 `client`，所以输出时包含了/js/目录
	  .pipe(minify())
	  .pipe(gulp.dest('build'));  
	  // 写入文件 'build/js/somedir/somefile.js'


###gulp.dest(path[, options])
可以作为管道（pipe）传输或者写入生成。将传输进来的数据重新发出（emit）出去就可以通过管道（pipe）输出到多个文件夹。不存在的文件夹会被创建。

>path 类型：String 或者 Function,输出文件的目标路径（或目录）。或者是一个 function 返回的路径，function 将接收一个 vinyl 文件实例 作为参数。
>
>options Type: Object
>
>options.cwd Type: String,Default: process.cwd(),cwd 用于计算输出目录的，只有提供的输出目录是相对路径时此参数才有用。
>
>options.mode Type: String,Default: 0777,8进制数字组成的字符串，用于为创建的输出目录指定权限。

###gulp.task(name[, deps], fn)
定义一个使用 Orchestrator 的任务。


>name 任务的名字。从命令行运行任务时，任务名的中间不能存在空格。


>deps 类型：Array,此数组中列出的所有从属任务将在你的任务执行前执行并执行完毕。

gulp.watch(glob [, opts], tasks) 或者 gulp.watch(glob [, opts, cb])

如果被监视的文件发生了改变就执行某些动作。此方法永远返回一个可以发出 change 事件的 EventEmitter 对象。


###gulp.watch(glob[, opts], tasks)


>glob 类型：String 或 Array,单个 glob 或 一组 glob，用于匹配需要监视的文件。


>opts 类型：Object 此参数将被传递给 gaze。


>tasks 类型：Array,当文件改变时所需要运行的任务的名称（可以是多个任务），通过 gulp.task() 添加。

	var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
	watcher.on('change', function(event) {
	  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});


###gulp.watch(glob[, opts, cb])


>glob 类型：String 或 Array,单个 glob 或 一组 glob，用于匹配需要监视的文件。


>opts 类型：Object,此参数将被传递给 gaze。


>cb(event) 类型：Function,当文件每次变化时都会调用此回调函数。

	gulp.watch('js/**/*.js', function(event) {
	  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
>此回调函数接收一个对象类型的参数 -- event，它包含了此次文件改变所对应的信息：


>event.type 可以是 added、changed 或 deleted。


>event.path 此路径指向触发事件的文件。



参考：<http://www.gulpjs.com.cn/docs/api/>



