(function($, window, undefined) {
    "use strict";
	
	$(function() {
		var listSelector = $('.mod-brand-container .mod-hp-makes-list'),
			numOfCols = listSelector.data('brandcols'),
			numOfItems = listSelector.children('li').length,
			itemsPerCol = Math.floor(numOfItems / numOfCols),
			extraItems = numOfItems % numOfCols,
			currentItem = 1,
			currentContainer = 1;
			
		listSelector.children('li').each(function(){
			if (currentItem <= itemsPerCol){
				$(this).appendTo('.mod-brand-container div.make-column:nth-child('+currentContainer+') ul');
				currentItem ++;
			}else{
				if (extraItems > 0){
					extraItems --;
					$(this).appendTo('.mod-brand-container div.make-column:nth-child('+currentContainer+') ul');
					currentItem = 1;
					currentContainer ++;
				}else{
					currentItem = 2;
					currentContainer ++;
					$(this).appendTo('.mod-brand-container div.make-column:nth-child('+currentContainer+') ul');				
				}
			}
		});	

		$('.mod-brand-container,.mod-brand-container .make-column').height( $('.mod-brand-container').height() );		

	});

    $(function() {
			
			/* NEW CAR BY BRAND Expand Collapse */	
			$('.select-brand').on('click', '.collapse', function(){
				$(this).next('.mod-brand-container').slideUp();	
				$(this).removeClass('collapse').addClass('expand');				
			}); 
			$('.select-brand').on('click', '.expand', function(){
				$(this).next('.mod-brand-container').slideDown();		
				$(this).removeClass('expand').addClass('collapse');				
			});

    });
})(jQuery,window);

