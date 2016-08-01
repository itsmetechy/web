(function() {
	$(function() {
		var cpoPage = $('.cpo-page'),
			cpoPageSlider = cpoPage.find('.slider .slider-content'),
			cpoPageSliderPrev = cpoPage.find('.slider .prev'),
			cpoPageSliderNext = cpoPage.find('.slider .next'),
			cpoPageLinkSlider = cpoPage.find('.link-slider'),
			cpoPageLinkSliderPrev = cpoPage.find('.link-slider .prev'),
			cpoPageLinkSliderNext = cpoPage.find('.link-slider .next');
	
				
		
		if( cpoPageSlider.find('.item').length > 1 ){
			cpoPageSlider
				.cycle({
				fx: 		'scrollHorz',
				speed: 		300, 
				timeout:	4000,
				prev:		cpoPageSliderPrev,
				next:		cpoPageSliderNext,
				pause:		true
			});
			
			cpoPageSlider.parents('.slider').addClass('cycled');
			cpoPageSliderPrev.find('.arrow').css('visibility','visible');
			cpoPageSliderNext.find('.arrow').css('visibility','visible');
		}
		
		if( cpoPageLinkSlider.find('.link-item').length > 1 ){
			cpoPageLinkSlider.find('.link-list')
				.cycle({
					fx: 		'scrollHorz',
					speed: 		300, 
					timeout:	0,
					prev:		cpoPageLinkSliderPrev,
					next:		cpoPageLinkSliderNext,
					pause:		true
				});
			
			cpoPageLinkSliderPrev.css('visibility','visible');
			cpoPageLinkSliderNext.css('visibility','visible');
		}

	});	
})();