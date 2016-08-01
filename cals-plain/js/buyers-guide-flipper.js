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
	var bGuideSlideStart = {ordernumber:'1'};
	var bGuideSlideStartNumber= parseInt(bGuideSlideStart.ordernumber)-1;
	if($("#lazy-loading-slider-bGuide ul.slides > li").size()<=1){
		$('<style type="text/css">#lazy-loading-slider-bGuide .slide-arrows { display:none; }</style>').appendTo("head");
	}
	load_images();
	var lastEq = -1
    $(function() {
		$('#lazy-loading-slider-bGuide').advancedSlider({
			xmlSource: null,
			width: 618,
			height: 433,
			aspectRatio: 2,
			skin: "glossy-square-gray-bGuide",
			scrollbarSkin: "scrollbar-1",
			shadow: false,
			alignType: "centerTop",
			scaleType: "insideFit",
			allowScaleUp: false,
			preloadNearbyImages: true,
			slideStart: bGuideSlideStartNumber,
			shuffle: false,
			slideshow: false,
			slideshowDelay: 3E3,
			slideshowDirection: "next",
			slideshowLoop: true,
			slideshowControls: false,
			pauseSlideshowOnHover: false,
			slideArrows: true,
			slideArrowsToggle: false,
			slideButtons: true,
			slideButtonsNumber: false,
			slideButtonsToggle: false,
			slideButtonsCenter: true,
			slideButtonsContainerCenter: true,
			autoToggle: false,
			timerAnimation: false,
			fullscreenControls: false,
			htmlDuringTransition: true,
			overrideTransition: false,
			initialEffect: true,
			effectType: "slide",
			slideMask: false,
			sliceFade: true,
			fadePreviousSlide: false,
			slideDirection: "autoHorizontal",
			slideLoop: false,
			slideDuration: 700,
			slideEasing: "swing",
			thumbnailType: "none",
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
			transitionStart: function(){
				bGuideRefreshAds();
			}/*,
			transitionComplete: function(){
				if ($.browser.msie){
					var bW = parseInt($.browser.msie && $.browser.version);
					if(bW<=8){
						$('#lazy-loading-slider-bGuide ul.slides li.slide.active').each(function(){
							var thisAbGuideLink = $(this).children("a.bGuideLink");
							var outerHTML = $("<div />").append($(thisAbGuideLink).clone()).html();
							$(thisAbGuideLink).remove();
							$(this).prepend(outerHTML);
						});
					}
				}
			}*/
		});
		if ($.browser.msie){
			var bW = parseInt($.browser.msie && $.browser.version);
			if(bW<=8){
				$('#lazy-loading-slider-bGuide').on('click', 'li.slide.active img.image', function(){	
					var href = $('li.slide.active').find('a.bGuideLink').attr('href');
					window.location.href = href;
				});
			}
			if(bW==8){
			$("ul.bGuideCarDet li > span > a").hover(function(){
					$(this).addClass("hovered");
				},function(){
					$(this).removeClass("hovered");
				});
			}
		}
		$("nav#mod-side-nav").hover(function(){
			$(".slide-wrapper").css('position','static');
			$(".slider-bGuide-review").css('z-index','0');
		},function(){
			$(".slide-wrapper").css('position','');
			$(".slider-bGuide-review").css('z-index','11');
		});
		
	});
})(jQuery);
function bGuideRefreshAds() {
	$('.dart_ad').each(function() {
		var iframe = $(this);
		var url = iframe.attr('src');
		if(url.indexOf('#') != -1){
			url = url.substr(0,url.indexOf('#'));
		}
		iframe.get(0).contentWindow.location.replace(url); 
	});
}