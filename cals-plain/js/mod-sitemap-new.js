(function($, window, undefined) {
    "use strict";
	
    $(function() {
			
			/* NEW CAR BY BRAND Expand Collapse */	
			$('.select-brand').on('click', '.collapse', function(){
				$(this).next('.container').slideUp();	
				$(this).removeClass('collapse').addClass('expand');				
			}); 
			$('.select-brand').on('click', '.expand', function(){
				$(this).next('.container').slideDown();		
				$(this).removeClass('expand').addClass('collapse');				
			});
			
		/* AUTO HEIGHT */
			var heightArray = $(".sitemap-cnt-module .container>.model-cnt").map( function(){
				return  $(this).height();
				}).get();
			var maxHeight = Math.max.apply( Math, heightArray);
				$(".sitemap-cnt-module .container>.model-cnt").height(maxHeight);
    });
})(jQuery,window);

