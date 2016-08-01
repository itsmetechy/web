var counter = (function() {
		var count = 0;
		
		var mod = {
				doCount : function(){					
					count++;
				},
				getCount : function(){
					return count;
				}				
		}		
		return mod;
})();


