<?php
/*
	@! jQuery pagination plugin
-----------------------------------------------------------------------------	
	# author: @akshitsethi
	# web: http://www.akshitsethi.me
	# email: ping@akshitsethi.me
	# mobile: (91)9871084893
-----------------------------------------------------------------------------
	@@ The biggest failure is failing to try.
*/
?>
<!doctype html>
<html lang="en">
<head>
<title>Pagination using jQuery - A tutorial by akshitsethi.me</title>
<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="Description" content="Learn to implement beautiful client side pagination using jQuery." />
<meta name="Keywords" content="jquery, pagination, jquery pagination, pagination via jquery, akshitsethi" />
<meta name="Owner" content="Akshit Sethi" />
<link rel="shortcut icon" href="img/favicon.ico">
<link href="css/style.css" media="screen" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.pages.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	$("div.holder").jPages({
	    containerID : "content",
	    perPage: 5
  	});
});
</script>
</head>
<body>
	<div class="header">
		<div class="header-inner clearfix">
			<div class="pull-left">
				<a href="http://www.akshitsethi.me" target="_blank"><img src="img/logo.png" class="logo"></a>
			</div>

			<div class="pull-right">
				<p class="small-text no-margin"><span class="highlight">jQuery's <strong>pagination</strong> plugin</span></p>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="page-header">
			<h1>Pagination using jQuery</h1>
			<p>With the help of jQuery, we can create beautiful pagination on the client side without any server side code change. Have a look at the example below.</p>
		</div>

		<div class="holder"></div>

		<ul id="content">
			<li><span>Item 1</span></li>
			<li><span>Item 2</span></li>
			<li><span>Item 3</span></li>
			<li><span>Item 4</span></li>
			<li><span>Item 5</span></li>
			<li><span>Item 6</span></li>
			<li><span>Item 7</span></li>
			<li><span>Item 8</span></li>
			<li><span>Item 9</span></li>
			<li><span>Item 10</span></li>
			<li><span>Item 11</span></li>
			<li><span>Item 12</span></li>
			<li><span>Item 13</span></li>
			<li><span>Item 14</span></li>
			<li><span>Item 15</span></li>
			<li><span>Item 16</span></li>
			<li><span>Item 17</span></li>
			<li><span>Item 18</span></li>
			<li><span>Item 19</span></li>
			<li><span>Item 20</span></li>
		</ul>

		<div class="page-footer">
			<p>A small piece of code by <strong><a href="http://www.akshitsethi.me" target="_blank">Akshit Sethi</a></strong></p>
		</div>
	</div>
</body>
</html>