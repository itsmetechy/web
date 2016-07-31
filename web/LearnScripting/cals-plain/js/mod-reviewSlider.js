var preImages = new Array();
var loaded = new Array()
var currCount = 0;
var timerID = ""
function load_images(){
   $('.advanced-slider-review li.slide').each( function(index) {
		preImages[index] = new Image()
		preImages[index].src = $(this).attr('data-image');
	});
	for (i = 0; i < preImages.length; i++) { 
		loaded[i] = false
	}
	checkLoad()
}

function checkLoad() {
	if (currCount == preImages.length) { 
		//All Images Loaded
	return
	}
	for (i = 0; i < preImages.length; i++) {
		if (loaded[i] == false && preImages[i].complete) {
			loaded[i] = true
			currCount++
		}
	}
	timerID = setTimeout("checkLoad()",10) 
}
(function($) {
	load_images();
	var lastEq = -1
	$(".modreviewCarouselImageWra div").append('<img width="664" height="327" src="" /><img width="664" height="327" src="" />');
    $(function() {		
		$('#lazy-loading-slider-review').advancedSlider({
			xmlSource: null,
			width: 800,
			height: 450,
			aspectRatio: 2,
			skin: "glossy-square-gray-review",
			scrollbarSkin: "scrollbar-1",
			shadow: false,
			alignType: "centerCenter",
			scaleType: "outsideFit",
			allowScaleUp: false,
			preloadNearbyImages: true,
			slideStart: 0,
			shuffle: false,
			slideshow: true,
			slideshowDelay: 3E3,
			slideshowDirection: "next",
			slideshowLoop: true,
			slideshowControls: false,
			slideshowControlsToggle: true,
			slideshowControlsShowDuration: 500,
			slideshowControlsHideDuration: 500,
			pauseSlideshowOnHover: false,
			slideArrows: true,
			slideArrowsToggle: false,
			slideArrowsShowDuration: 500,
			slideArrowsHideDuration: 500,
			slideButtons: false,
			slideButtonsNumber: false,
			slideButtonsToggle: false,
			slideButtonsShowDuration: 500,
			slideButtonsHideDuration: 500,
			slideButtonsCenter: true,
			slideButtonsContainerCenter: true,
			keyboardNavigation: false,
			keyboardNavigationOnFocusOnly: false,
			autoToggle: false,
			autoToggleDelay: 5E3,
			timerAnimation: true,
			timerAnimationControls: true,
			timerFadeDuration: 500,
			timerToggle: false,
			timerRadius: 18,
			timerStrokeColor1: "#000000",
			timerStrokeColor2: "#FFFFFF",
			timerStrokeOpacity1: 0.5,
			timerStrokeOpacity2: 0.7,
			timerStrokeWidth1: 8,
			timerStrokeWidth2: 4,
			lightbox: false,
			lightboxTheme: "pp_default",
			lightboxOpacity: 0.8,
			lightboxIcon: true,
			lightboxIconToggle: false,
			lightboxIconFadeDuration: 500,
			thumbnailLightboxIcon: true,
			thumbnailLightboxIconToggle: true,
			fullscreenControls: false,
			fullscreenControlsToggle: true,
			fullscreenControlsShowDuration: 500,
			fullscreenControlsHideDuration: 500,
			fullscreenThumbnailScrollerOverlay: true,
			fullscreenSlideButtons: false,
			fullscreenShadow: false,
			htmlDuringTransition: true,
			overrideTransition: false,
			initialEffect: true,
			effectType: "slide",
			sliceEffectType: "random",
			sliceDelay: 50,
			sliceDuration: 1E3,
			sliceEasing: "swing",
			horizontalSlices: 5,
			verticalSlices: 3,
			slicePattern: "random",
			slicePoint: "centerCenter",
			sliceStartPosition: "left",
			sliceStartRatio: 1,
			slideMask: false,
			sliceFade: true,
			fadePreviousSlide: false,
			fadePreviousSlideDuration: 300,
			slideDirection: "autoHorizontal",
			slideLoop: false,
			slideDuration: 700,
			slideEasing: "swing",
			fadeInDuration: 700,
			fadeOutDuration: 700,
			fadeInEasing: "swing",
			fadeOutEasing: "swing",
			swipeOrientation: "horizontal",
			swipeDuration: 700,
			swipeBackDuration: 300,
			swipeSlideDistance: 10,
			swipeEasing: "swing",
			swipeMouseDrag: true,
			swipeTouchDrag: true,
			swipeGrabCursor: true,
			swipeThreshold: 10000,
			thumbnailType: "scroller",
			thumbnailWidth: 118,
			thumbnailHeight: 58,
			thumbnailSlideAmount: 10,
			thumbnailSlideDuration: 300,
			thumbnailSlideEasing: "swing",
			thumbnailScrollerToggle: false,
			thumbnailScrollerResponsive: false,
			thumbnailScrollerCenter: true,
			thumbnailScrollerOverlay: false,
			thumbnailScrollDuration: 3E2,
			thumbnailScrollEasing: "swing",
			maximumVisibleThumbnails: 6,
			minimumVisibleThumbnails: 1,
			thumbnailOrientation: "horizontal",
			thumbnailLayers: 1,
			thumbnailTooltip: false,
			tooltipShowDuration: 300,
			tooltipHideDuration: 300,
			thumbnailCaptionPosition: "bottom",
			thumbnailCaptionToggle: true,
			thumbnailCaptionEffect: "slide",
			thumbnailCaptionShowDuration: 500,
			thumbnailCaptionHideDuration: 500,
			thumbnailCaptionEasing: "swing",
			thumbnailScrollbar: false,
			thumbnailButtons: false,
			thumbnailArrows: true,
			thumbnailButtonsToggle: false,
			thumbnailArrowsToggle: false,
			thumbnailScrollbarToggle: false,
			scrollbarArrowScrollAmount: 100,
			thumbnailScrollerHideDuration: 500,
			thumbnailScrollerShowDuration: 500,
			thumbnailArrowsHideDuration: 500,
			thumbnailArrowsShowDuration: 500,
			thumbnailButtonsHideDuration: 500,
			thumbnailButtonsShowDuration: 500,
			thumbnailScrollbarHideDuration: 500,
			thumbnailScrollbarShowDuration: 500,
			thumbnailSync: true,
			thumbnailMouseScroll: false,
			thumbnailMouseScrollEase: 90,
			thumbnailMouseScrollSpeed: 10,
			thumbnailMouseWheel: false,
			thumbnailMouseWheelSpeed: 20,
			thumbnailMouseWheelReverse: false,
			thumbnailScrollbarEase: 10,
			captionToggle: false,
			captionDelay: 0,
			captionSize: 70,
			captionBackgroundOpacity: 0.5,
			captionBackgroundColor: "#000000",
			captionShowEffect: "slide",
			captionShowEffectDuration: 500,
			captionShowEffectEasing: "swing",
			captionShowSlideDirection: "auto",
			captionHideEffect: "fade",
			captionHideEffectDuration: 300,
			captionHideEffectEasing: "swing",
			captionHideSlideDirection: "auto",
			captionPosition: "bottom",
			captionLeft: 50,
			captionTop: 50,
			captionWidth: 300,
			captionHeight: 100,
			videoPlayAction: "stopSlideshow",
			videoPauseAction: "none",
			videoEndAction: "startSlideshow",
			reachVideoAction: "none",
			leaveVideoAction: "pauseVideo",
			jwPlayerPath: "js/jw-player/player.swf",
			slideProperties: null,
			slideOpen: null,
			slideClick: null,
			slideMouseOver: null,
			slideMouseOut: null,
			thumbnailClick: null,
			thumbnailMouseOver: null,
			thumbnailMouseOut: null,
			/*transitionStart: null,*/
			/*transitionComplete: null,*/
			videoPlay: null,
			videoPause: null,
			videoEnd: null,
			videoFullscreenChange: null,
			xmlLoaded: null,
			doSliderLayout: null,
			transitionStart: function(){
				currentEq = $("#lazy-loading-slider-review ul.slides li.transition").index();
				prevImageSrc = $("#lazy-loading-slider-review li.active").prev("li").attr("data-image");
				nextImageSrc = $("#lazy-loading-slider-review li.active").next("li").attr("data-image");
				currentImageSrc = $("#lazy-loading-slider-review li.active").attr("data-image");
				prevCurrentImageSrc = $("div#modreviewCarouselPrevImage img:last-child").attr("src");
				nextCurrentImageSrc = $("div#modreviewCarouselNextImage img:first-child").attr("src");
				if(prevImageSrc==undefined){
					prevImageSrc = $("#lazy-loading-slider-review ul.slides li:last-child").attr("data-image");
				}
				if(nextImageSrc==undefined){
					nextImageSrc = $("#lazy-loading-slider-review ul.slides li:first-child").attr("data-image");
				}
				if(currentEq>lastEq){
					$("div#modreviewCarouselNextImage img:first-child").attr("src",currentImageSrc);
					$("div#modreviewCarouselNextImage img:last-child").attr("src",nextImageSrc);
					$("div#modreviewCarouselPrevImage img:first-child").attr("src",prevCurrentImageSrc);
					$("div#modreviewCarouselPrevImage img:last-child").attr("src",prevImageSrc);
					$("div#modreviewCarouselNextImage .modreviewCarouselImageWra div").css('left','0')
					.animate({
						left:'-664px'
					},700);
					$("div#modreviewCarouselPrevImage .modreviewCarouselImageWra div").css('left','-606px')
					.animate({
						left:'-1270px'
					},700);
				}else{
					$("div#modreviewCarouselNextImage img:last-child").attr("src",nextCurrentImageSrc);//
					$("div#modreviewCarouselNextImage img:first-child").attr("src",nextImageSrc);
					$("div#modreviewCarouselPrevImage img:last-child").attr("src",currentImageSrc);//
					$("div#modreviewCarouselPrevImage img:first-child").attr("src",prevImageSrc);
					$("div#modreviewCarouselNextImage .modreviewCarouselImageWra div").css('left','-664px')
					.animate({
						left:'0'
					},700);
					$("div#modreviewCarouselPrevImage .modreviewCarouselImageWra div").css('left','-1270px')
					.animate({
						left:'-606px'
					},700);
				}
			},
			transitionComplete: function(){
				lastEq = $("#lazy-loading-slider-review ul.slides li.active").index()
				//$("div#modreviewCarouselNextImage img,div#modreviewCarouselPrevImage img").show();
				var current = thumbContainer.find('.select').parent().index() + 1,
				divide = (current / 6),
				mod  =   (total % 6); 			/*>> This is for 16 Thumbnails */
				/*mod  =  6 - (total % 6);  >> If the thumbnails are having odd numbers.*/
				if( mod == 0){
					if( divide <= 1 ){
						$('#lazy-loading-slider-review .controls-info').find('.page-begin').html('1');
						$('#lazy-loading-slider-review .controls-info').find('.page-end').html('6');
						$('#lazy-loading-slider-review .arrows .previous').addClass('disabled').off('click');
						$('#lazy-loading-slider-review .arrows .next').removeClass('disabled');
						pagecount = 1;
					}else if( divide <= 2 ){
						$('#lazy-loading-slider-review .controls-info').find('.page-begin').html('7');
						$('#lazy-loading-slider-review .controls-info').find('.page-end').html('12');
						$('#lazy-loading-slider-review .arrows .previous').removeClass('disabled').off('click');								
					}else if( divide <= 3 ){
						$('#lazy-loading-slider-review .controls-info').find('.page-begin').html('13');
						$('#lazy-loading-slider-review .controls-info').find('.page-end').html('18');	
						$('#lazy-loading-slider-review .arrows .next').addClass('disabled').off('click');
						$('#lazy-loading-slider-review .arrows .previous').removeClass('disabled');
						pagecount = 3;
					}			
				}else{
					if( divide <= 1 ){
						$('#lazy-loading-slider-review .controls-info').find('.page-begin').html('1');
						$('#lazy-loading-slider-review .controls-info').find('.page-end').html('6');
					}else if( divide <= 2 ){
						$('#lazy-loading-slider-review .controls-info').find('.page-begin').html(7 - mod);
						$('#lazy-loading-slider-review .controls-info').find('.page-end').html(12 - mod);					
					}else if( divide <= 3 ){
						$('#lazy-loading-slider-review .controls-info').find('.page-begin').html(13 - mod);
						$('#lazy-loading-slider-review .controls-info').find('.page-end').html(18 - mod);						
					}
				}
			}
		});
				
		var carousel = $('.modreviewCarousel'),
			thumbContainer = carousel.find('.thumbnail-scroller .container'),
			total = thumbContainer.find('li').length;
					               
		$('#lazy-loading-slider-review .arrows .previous').after('<a id="togglePlayPause" class="crslReview-thumb-lnk-pause">Pause</a>');				
		$('#lazy-loading-slider-review .arrows .previous').html("Prev 6");
		$('#lazy-loading-slider-review .arrows .next').html("Next 6");
		$('#lazy-loading-slider-review .arrows a').css('top','');
		$('.crslReview-thumb-lnk-pause').click(function(){
			$(".timer-animation").click();
		});		
			
		var pagecount = 1;		
		$('#lazy-loading-slider-review .arrows .previous').addClass('disabled').off('click');			
		carousel.on('click', '#lazy-loading-slider-review .arrows .next', function(){
			pagecount++;
			if(pagecount > 3)
				pagecount = 3;
			if( pagecount == 1){
				$($('#lazy-loading-slider-review .thumbnail-wrapper')[0]).find('a').click();
				$('#lazy-loading-slider-review .arrows .previous').addClass('disabled').off('click');
				$(this).removeClass('disabled').on('click');							
			}else if( pagecount == 2){
				$($('#lazy-loading-slider-review .thumbnail-wrapper')[6]).find('a').click();
				$(this).removeClass('disabled').on('click');
				$('#lazy-loading-slider-review .arrows .previous').removeClass('disabled').on('click');
			}else if( pagecount == 3){
				$($('#lazy-loading-slider-review .thumbnail-wrapper')[12]).find('a').click();
				$(this).addClass('disabled').off('click');					
			}
			return false;	
		});
				
		carousel.on('click', '#lazy-loading-slider-review .arrows .previous', function(){					
			pagecount--;				
			if(pagecount < 1)
				pagecount = 1;
			if( pagecount == 1){					
				$($('#lazy-loading-slider-review .thumbnail-wrapper')[0]).find('a').click();
				$(this).addClass('disabled').on('click');
			}else if( pagecount == 2){
				$($('#lazy-loading-slider-review .thumbnail-wrapper')[6]).find('a').click();
				$('#lazy-loading-slider-review .arrows .next').removeClass('disabled').on('click');
			}else if( pagecount == 3){	
				$($('#lazy-loading-slider-review .thumbnail-wrapper')[12]).find('a').click();
			}
			return false;	
		});
			
		$('.advanced-slider-review .thumbnail-scroller').append('<div class="controls-info">Showing reviews <span class="page-begin">1</span> - <span class="page-end">6</span> of ' + total + '</div>');
				
		$('#togglePlayPause').live('click', function(){
		$(this).text($(this).text() == 'Pause' ? 'Play' : 'Pause');	
		if ($(this).attr("class") == "crslReview-thumb-lnk-pause"){
			$(this).addClass('play');
			}else{$(this).attr('class', "crslReview-thumb-lnk-pause")}
		 });
		 
		$('.advanced-slider-review').on('click', '.slide .image', function(){	
		var href = $('.slides .active').find('a').attr('href');
		window.location.href = href;
		});
		
		$(".advanced-slider-review .thumbnail").on('mouseenter', function(){
			$(this).children(".caption").stop(true,true).fadeIn();
		});
		$(".advanced-slider-review .thumbnail").on('mouseleave', function(){
			$(this).children(".caption").stop(true,true).fadeOut();
		});

	});
})(jQuery);