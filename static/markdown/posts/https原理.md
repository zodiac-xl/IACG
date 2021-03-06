###一些基本概念
HTTPS其实是有两部分组成：HTTP + SSL/TLS，也就是在HTTP上又加了一层处理加密信息的模块。服务端和客户端的信息传输都会通过TLS进行加密，所以传输的数据都是加密后的数据。具体是如何进行加密，解密，验证的。我们先了解一些基本概念。

####密码学的相关概念

* 密码学(cryptography)：目的是通过将信息编码使其不可读，从而达到安全性。
* 明文(plain text)：发送人、接受人和任何访问消息的人都能理解的消息。
* 密文(cipher text)：明文消息经过某种编码后，得到密文消息。
* 加密(encryption)：将明文消息变成密文消息。
* 解密(decryption)：将密文消息变成明文消息。
* 算法：取一个输入文本，产生一个输出文本。
* 加密算法：发送方进行加密的算法。
* 解密算法：接收方进行解密的算法。
* 密钥(key)：只有发送方和接收方理解的消息
* 对称密钥加密(Symmetric Key Cryptography)：加密与解密使用相同密钥。
* 非对称密钥加密(Asymmetric Key Cryptography)：加密与解密使用不同密钥。


####HTTP TCP/IP Socket  SSL/TLS HTTPS关系

网络由下往上分为:物理层、数据链路层、网络层、传输层、会话层、表示层和应用层。

我们知道IP协议对应于网络层，TCP协议对应于传输层，而HTTP协议对应于应用层，


* HTTP是应用层协议，主要解决如何包装数据。
* TPC/IP协议是传输层协议，主要解决数据如何在网络中传输，
* SSL/TLS：传输层安全协议TLS，及其前身安全套接层SSL是一种安全协议，目的是为互联网通信，提供安全及数据完整性保障。应用层数据不再直接传递给传输层，而是使用传输层安全协议进行加密，再传递给传输层。
* socket则是对TCP/IP协议的封装和应用(程序员层面上)。
* HTTPS = HTTP + SSL/TLS

>关于TCP/IP和HTTP协议的关系，网络有一段比较容易理解的介绍：

>我们在传输数据时，可以只使用(传输层)TCP/IP协议，但是那样的话，如果没有应用层，便无法识别数据内容。

####TCP 三次握手

* 第一次握手：建立连接时，客户端发送syn包（syn=j）到服务器，并进入SYN_SENT状态，等待服务器确认。
>客户端告诉服务器我要连接你，请做好准备


* 第二次握手：服务器收到syn包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态；
第三次。
>服务器确认客户端，发送确认码给客户端，告诉自己已经准备好了。

* 第三次握手：客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1），此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手。
>客户端确认服务器准备就绪；至此，完成三次握手，客户端与服务器开始传送数据。


####SSL/TLS四次握手

常用算法：

* 非对称加密算法：RSA，DSA/DSS 
* 对称加密算法：AES，RC4，3DES 
* HASH算法：MD5，SHA1，SHA256

* 第一次握手：建立连接，客户端发送自己支持的一套加密规则到服务器，告诉服务器我要连接你，请做好准备
* 第二次握手：服务器从中选出一组加密算法与HASH算法，并将自己的身份信息以证书的形式发回给浏览器。证书里面包含了网站地址，加密公钥，以及证书的颁发机构等信息收到请求后用SSL/TLS的非对称加密算法RSA生成公钥和私钥，把公钥放在证书里发送给客户端，私钥自己保存


	>RSA算法基于一个十分简单的数论事实：将两个大素数相乘十分容易，但是想要对其乘积进行因式分解却极其困难。
	
	>理论上只要其钥匙的长度足够长，用RSA加密的信息实际上是不能被解破的。但在分布式计算和量子计算机理论日趋成熟的今天，RSA加密安全性受到了挑战。

	>其公钥和私钥是一对大素数（100到200位十进制数或更大）的函数。从一个公钥和密文恢复出明文的难度，等价于分解两个大素数之积（这是公认的数学难题）。
 
* 第三次握手：客户端收到公钥和证书后先向一个权威的服务器检查证书的合法性，如果证书合法，客户端产生一段随机数，这个随机数就作为通信的密钥，我们称之为对称密钥，用公钥加密这段随机数，然后发送到服务器
* 第四次握手：服务器收到公钥加密的包后用密钥解密获取对称密钥，然后，双方就可以已对称密钥进行加密解密通信了。



>通过非对称加密的方式传递对称加密密钥，可以保证对称加密的密钥不在传输过程中暴露






###性能



SSL介于应用层和TCP层之间。应用层数据不再直接传递给传输层，而是传递给SSL层，SSL层对从应用层收到的数据进行加密，并增加自己的SSL头。

RSA性能是非常低的，原因在于寻找大素数、大数计算、数据分割需要耗费很多的CPU周期，所以一般的HTTPS连接只使用非对称加密交换对称加密密钥，在之后的通信使用对称加密。



* HTTP耗时 = TCP握手
* HTTPs耗时 = TCP握手 + SSL握手

>所以，HTTPs肯定比HTTP耗时，这就叫SSL延迟。

>HTTPs链接比HTTP链接要长3倍的时间，具体数字取决于CPU的快慢。

>所以，如果是对安全性要求不高的场合，为了提高网页性能，建议不要采用保密强度很高的数字证书。一般场合下，1024位的证书已经足够了，2048位和4096位的证书将进一步延长SSL握手的耗时。

###http和https的区别
1. https协议需要到ca申请证书，一般免费证书很少，需要交费。
2. http是超文本传输协议，信息是明文传输，https 则是具有安全性的ssl加密传输协议。
3. http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
4. http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。