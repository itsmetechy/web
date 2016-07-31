(function() {
	$(function() {
		var listSelector = $('.mod-hp-makes .mod-hp-makes-list'),
			numOfCols = listSelector.data('numofcols'),
			numOfItems = listSelector.children('li').length,
			itemsPerCol = Math.floor(numOfItems / numOfCols),
			extraItems = numOfItems % numOfCols,
			currentItem = 1,
			currentContainer = 1;
			
		listSelector.children('li').each(function(){
			if (currentItem <= itemsPerCol){
				$(this).appendTo('.mod-hp-makes div.make-column:nth-child('+currentContainer+') ul');
				currentItem ++;
			}else{
				if (extraItems > 0){
					extraItems --;
					$(this).appendTo('.mod-hp-makes div.make-column:nth-child('+currentContainer+') ul');
					currentItem = 1;
					currentContainer ++;
				}else{
					currentItem = 2;
					currentContainer ++;
					$(this).appendTo('.mod-hp-makes div.make-column:nth-child('+currentContainer+') ul');				
				}
			}
		});	

		$('.mod-hp-makes .make-column').height( $('.mod-hp-makes').height() );		

	});
})();


