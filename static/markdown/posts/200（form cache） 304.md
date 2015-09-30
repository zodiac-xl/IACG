
###304
304 发送请求
服务器比较request的if-modified-since和上次reponse头Last-Modified 如果相同 则返回304
reponse头中的Last-Modified会在下次request头中写入if-modified-since中

###200（from cache）
不发送请求  针对静态资源css js img等
在短时间（大概10s）的返回 跳转操作时使用的缓存 不发送请求 直接使用缓存文件

若对页面进行刷新（ F5或者刷新页面 ），两者均为 304（在10s内或者不在10s内）
