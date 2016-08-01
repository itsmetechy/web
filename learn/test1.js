var roles = {
		name:'Shiva',
		timing:'afternoon',
		design:'Teamlead',
		
		whatDo: function(respon){			
			var $name = this.name, $timing = this.timing, $design = this.design;
			console.log(this.name+ " " + respon);
			
			function goals(){
				console.log($name+"'s office timing is " +$timing+ " and he is a "+$design);
			}			
			return goals;			
		}
		
}

var empStatus = roles.whatDo("should taking care of the project");
console.log(empStatus);

empStatus();
