<html>
<head>
	<title>9lessons tutorials</title>
	<style>
	.box
	{
	font-family:'Georgia', Times New Roman, Times;
	font-size:18px;
	padding:10px;
	
	}
	.box a
	{
	color:#000;
	
	}
	.box a:hover
	{
	color:#96BC43;
	
	}
	
	</style>
	<script src="http://ajax.googleapis.com/ajax/
libs/jquery/1.3.0/jquery.min.js" type="text/javascript">
	</script>


	<script type="text/javascript">
$(function() 
{

$(document).ready(function()
	{
	
	
		
		$.getJSON("json_data.php",function(data)
		{
				$.each(data.posts, function(i,data){
					var div_data ="<div class='box'><a href='"+data.url+"'>"+data.title+"</a></div>"
						
					$(div_data).appendTo("#9lessonsLinks");
				});
			}
		);
		return false;
	});


});
</script>

	
	
	
</head>
<body>
		
	<div id="9lessonsLinks"></div>
	
	
</body>
</html>