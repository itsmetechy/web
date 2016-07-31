$(function() {
	
	var obj = {
		name:'Shiva',
		age:32,
	 hello:function(){
	 console.log(this.name);
	 	console.log("func3 Hello");
	 },
	 wel:function(name){
	 	 	console.log("Welcome to hello 2");
	 	 	console.log(this.name?this.name:name);
	 }
	}

	obj.wel();
	
	
	$('body').on('click','a', function(){
		var name = 'Joe'
		obj.wel(name);
	});
});