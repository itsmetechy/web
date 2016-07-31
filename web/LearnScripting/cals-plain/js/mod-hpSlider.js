 (function($) {

    $(function() {		
				$('#lazy-loading-slider').advancedSlider({width: 508,
					height: 265,
					scaleType: 'outsideFit',
					aspectRatio: 2,
					skin: 'glossy-square-gray',
					slideButtons: false,
					effectType: 'slide',
					swipeThreshold: 10000,
					overrideTransition: false,
					pauseSlideshowOnHover: false,
					slideArrowsToggle: false,
					thumbnailButtons: false,
					thumbnailType: 'scroller',
					thumbnailArrows: true,
					thumbnailSync: true,
					keyboardNavigation: false,
					shadow: false,
					pauseSlideshowOnHover: true,
					thumbnailScrollDuration:3E2,
					timerAnimation:true,
					timerAnimationControls:true,
					slideshowDelay: 3E3,
					maximumVisibleThumbnails: 6,
					minimumVisibleThumbnails: 1,
					thumbnailWidth: 75,
					thumbnailHeight: 30,
					transitionComplete: function(){
						var current = thumbContainer.find('.select').parent().index() + 1,
							divide = (current / 6),
							mod  =   (total % 6); 			/*>> This is for 16 Thumbnails */
							/*mod  =  6 - (total % 6);  >> If the thumbnails are having odd numbers.*/
						if( mod == 0){
						if( divide <= 1 ){
							$('.controls-info').find('.page-begin').html('1');
							$('.controls-info').find('.page-end').html('6');
							$('.arrows .previous').addClass('disabled').off('click');
							$('.arrows .next').removeClass('disabled');
							pagecount = 1;
						}else if( divide <= 2 ){
							$('.controls-info').find('.page-begin').html('7');
							$('.controls-info').find('.page-end').html('12');								
						}else if( divide <= 3 ){
							$('.controls-info').find('.page-begin').html('13');
							$('.controls-info').find('.page-end').html('18');	
							$('.arrows .next').addClass('disabled').off('click');
							$('.arrows .previous').removeClass('disabled');
							pagecount = 3;
						}			
					}else{
							if( divide <= 1 ){
								$('.controls-info').find('.page-begin').html('1');
								$('.controls-info').find('.page-end').html('6');
							}else if( divide <= 2 ){
								$('.controls-info').find('.page-begin').html(7 - mod);
								$('.controls-info').find('.page-end').html(12 - mod);					
							}else if( divide <= 3 ){
								$('.controls-info').find('.page-begin').html(13 - mod);
								$('.controls-info').find('.page-end').html(18 - mod);						
							}
					}	}
				});
				
				var carousel = $('.mod-hp-carousel'),
					thumbContainer = carousel.find('.thumbnail-scroller .container'),
					total = thumbContainer.find('li').length;
					
				$('.arrows').prepend('<a id="toggle" class="crsl-thumb-lnk-pause"></a>');				
				$('.arrows').prepend('<a id="toggle" class="crsl-thumb-lnk-pause"></a>');					
				$('.crsl-thumb-lnk-pause').click(function(){
					$(".timer-animation").click();});		
				
			
				var pagecount = 1;		
				$('.arrows .previous').addClass('disabled').off('click');			
				carousel.on('click', '.arrows .next', function(){
					pagecount++;
					if(pagecount > 3)
						pagecount = 3;
					if( pagecount == 1){
						$($('.thumbnail-wrapper')[0]).find('a').click();
						$('.arrows .previous').addClass('disabled').off('click');
						$(this).removeClass('disabled').on('click');							
					}else if( pagecount == 2){
						$($('.thumbnail-wrapper')[6]).find('a').click();
						$(this).removeClass('disabled').on('click');
						$('.arrows .previous').removeClass('disabled').on('click');
					}else if( pagecount == 3){
						$($('.thumbnail-wrapper')[12]).find('a').click();
						$(this).addClass('disabled').off('click');					
					}
					return false;	
				});
				
				carousel.on('click', '.arrows .previous', function(){					
					pagecount--;				
					if(pagecount < 1)
						pagecount = 1;
					if( pagecount == 1){					
						$($('.thumbnail-wrapper')[0]).find('a').click();
						$(this).addClass('disabled').on('click');
					}else if( pagecount == 2){
						$($('.thumbnail-wrapper')[6]).find('a').click();
						$('.arrows .next').removeClass('disabled').on('click');
					}else if( pagecount == 3){	
						$($('.thumbnail-wrapper')[12]).find('a').click();
					}
					return false;	
				});
			
				
				$('.advanced-slider .thumbnail-scroller').append('<div class="controls-info"><span class="page-begin">1</span> - <span class="page-end">6</span> of ' + total + '</div>');
				$('#toggle').live('click', function(){	
				if ($(this).attr("class") == "crsl-thumb-lnk-pause"){
					$(this).addClass('play');
					}else{$(this).attr('class', "crsl-thumb-lnk-pause")}
				 });
				 
				$('.advanced-slider').on('click', '.slide .image', function(){	
				var href = $('.slides .active').find('a').attr('href');
				window.location.href = href;
				});
		$('ul.container li a').each(function(){
			$(this).live('click',(function(){
				var getClass = $(this).attr('style');	
//				alert(getClass);
			}))
		})
		});
})(jQuery);