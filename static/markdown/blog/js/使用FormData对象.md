利用FormData对象,你可以使用一系列的键值对来模拟一个完整的表单,然后使用XMLHttpRequest发送这个"表单".

>FormData对象可以发送的数据格式：

>a Blob, File, or a string, if neither, the value is converted to a string

>对象和数组 请自觉JSON.stringify

###创建一个FormData对象
你可以先创建一个空的FormData对象,然后使用append()方法向该对象里添加字段,如下:

	var oMyForm = new FormData();

	oMyForm.append("username", "Groucho");
	oMyForm.append("accountnum", 123456); // 数字123456被立即转换成字符串"123456"

	// fileInputElement中已经包含了用户所选择的文件
	oMyForm.append("userfile", fileInputElement.files[0]);

	var oFileBody = "<a id="a"><b id="b">hey!</b></a>"; // Blob对象包含的文件内容
	var oBlob = new Blob([oFileBody], { type: "text/xml"});

	oMyForm.append("webmasterfile", oBlob);

	var oReq = new XMLHttpRequest();
	oReq.open("POST", "http://foo.com/submitform.php");
	oReq.send(oMyForm);
	
>注: 字段"userfile"和"webmasterfile"的值都包含了一个文件.通过 FormData.append()方法赋给字段"accountnum"的数字被自动转换为字符(字段的值可以是一个Blob对象,一个File对象,或者一个字符串,剩下其他类型的值都会被自动转换成字符串).
>
>在该例子中,我们创建了一个名为oMyForm的FormData对象,该对象中包含了名为"username", "accountnum", "userfile" 以及 "webmasterfile"的字段名,然后使用XMLHttpRequest的send()方法把这些数据发送了出去."webmasterfile"字段的值不是一个字符串,还是一个Blob对象.


###使用HTML表单来初始化一个FormData对象
可以用一个已有的`<form>`元素来初始化FormData对象,只需要把这个form元素作为参数传入FormData构造函数即可:

	var newFormData = new FormData(someFormElement);
例如:

	var formElement = document.getElementById("myFormElement");
	var oReq = new XMLHttpRequest();
	oReq.open("POST", "submitform.php");
	oReq.send(new FormData(formElement));
你还可以在已有表单数据的基础上,继续添加新的键值对,如下:

	var formElement = document.getElementById("myFormElement");
	formData = new FormData(formElement);
	formData.append("serialnumber", serialNumber++);
	oReq.send(formData);
你可以通过这种方式添加一些不想让用户编辑的固定字段,然后再发送.


###使用FormData对象发送文件
你还可以使用FormData来发送二进制文件.首先在HTML中要有一个包含了文件输入框的form元素:

	<form enctype="multipart/form-data" method="post" name="fileinfo">
	  <label>Your email address:</label>
	  <input type="email" autocomplete="on" autofocus name="userid" placeholder="email" required size="32" maxlength="64" /><br />
	  <label>Custom file label:</label>
	  <input type="text" name="filelabel" size="12" maxlength="32" /><br />
	  <label>File to stash:</label>
	  <input type="file" name="file" required />
	</form>
	<div id="output"></div>
	<a href="javascript:sendForm()">Stash the file!</a>
然后你就可以使用下面的代码来异步的上传用户所选择的文件:

	function sendForm() {
	  var oOutput = document.getElementById("output");
	  var oData = new FormData(document.forms.namedItem("fileinfo"));

	  oData.append("CustomField", "This is some extra data");

	  var oReq = new XMLHttpRequest();
	  oReq.open("POST", "stash.php", true);
	  oReq.onload = function(oEvent) {
	    if (oReq.status == 200) {
	      oOutput.innerHTML = "Uploaded!";
	    } else {
	      oOutput.innerHTML = "Error " + oReq.status + " occurred uploading your file.<br \/>";
	    }
	  };

	  oReq.send(oData);
	}
你还可以不借助HTML表单,直接向FormData对象中添加一个File对象或者一个Blob对象:

	data.append("myfile", myBlob);
>如果FormData对象中的某个字段值是一个Blob对象,则在发送http请求时,代表该Blob对象所包含文件的文件名的"Content-Disposition"请求头的值在不同的浏览器下有所不同,Firefox使用了固定的字符串"blob,"而Chrome使用了一个随机字符串.

你还可以使用jQuery来发送FormData,但必须要正确的设置相关选项:

	var fd = new FormData(document.getElementById("fileinfo"));
	fd.append("CustomField", "This is some extra data");
	$.ajax({
	  url: "stash.php",
	  type: "POST",
	  data: fd,
	  processData: false,  // 告诉jQuery不要去处理发送的数据
	  contentType: false   // 告诉jQuery不要去设置Content-Type请求头
	});

