<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Untitled Document</title>
<script>
//create popup window
var domain = 'http://localhost/web/jquery/test.html';
var iframe = document.getElementById('myIFrame').contentWindow;

//periodical message sender
setInterval(function(){
	var message = 'Hello!  The time is: ' + (new Date().getTime());
	console.log('blog.local:  sending message:  ' + message);
	iframe.postMessage(message,domain); //send the message and target URI
},6000);
</script>
</head>

<body>
<iframe id="myIframe" src="con1.php"></iframe>
</body>
</html>