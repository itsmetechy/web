//var imgPushUrl = "chevrolet/camaro/2012/photos/exterior/hr-2/t3-12-8/";
$(function() {

	$(function() {
	
//		var itemindex = $('.thumb-page .item-wrap a[data-pushurl*="'+imgPushUrl+'"]').index($(this).parent());
		
		
		//alert(itemindex);
	//	var	imggroupId	= $(".view-container select").val();
		var initialAllPhotos = $(".resize-thumbs .view").html();
		/*Init*/
		var container = $('.mod-photo-gallery'),
			gallery = container.find('.gallery'),
			cycled = true,
			initialize = true,
			loadingAds = false,
			visiblePage = 0,
			totalThumbNum = container.find('.img-item').length,
			relatedOne = $(container.find('.related-galleries').find('.gallery-link')[0]),
			nextGalleryLink = relatedOne.attr('href'),
			nextGalleryImage = relatedOne.find('img').clone(),
			backToArticle = container.find('.related-bar').find('.back'),
			scrollToTop = true,
			loadingSlide = false,
			loadingThumbs = false,
			deviceAgent = navigator.userAgent.toLowerCase(),
			agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
		
		/*Handle Main Content And Accesibility*/
		container.find('.gallery-main-cont').hide();
		container.find('.img-item .item-inner').html('');
		
		/*Ofuscation*/
		container.on('click', '.related-bar .next, .thumb-pager .next-gallery', function(){
			window.location.href = nextGalleryLink;
		});
		
		container.on('mouseenter', '.thumb-pager .next-gallery', function(){
			$(this).addClass('flat-bottom').find('img').stop(true,true).slideDown('fast');
		});
		
		container.on('mouseleave', '.thumb-pager .next-gallery', function(){
			$(this).removeClass('flat-bottom').find('img').slideUp('fast');
		});
		
		container.on('click', '.thumb-pager .back-article', function(){
			window.location.href = backToArticle.attr('href');
		});
			
		/*Fill Related Galleries Side*/
		function fillRelatedGalleries(){
			var rightRelated = $('.mod-right-galleries'),
				itemList = rightRelated.find('.list');
			
			rightRelated.prepend('<span class="title">related galleries</span>');
			
			for ( var i = 0; i < 6; i ++ ){
				var relatedItem = $(container.find('.related-galleries').find('.gallery-link')[i]);
					relatedItemText = relatedItem.find('.gallery-title').text(),
					relatedItemLink = relatedItem.attr('href');
				itemList.append('<a class="list-item" href="' + relatedItemLink + '">' + relatedItemText + '</a>');
			}
			container.find('.thumb-pager .next-gallery').append(nextGalleryImage);
		};
		
		/*Insert Elements*/
		function insertElements(){
			
			/*Related Galleries Buttons*/
			container.find('.related-bar .back').after('<span class="related">Related Articles</span>');
		};
		
		/*Initialize Pager*/
		function initPager(){
			if( totalThumbNum < 12){
				container.find('.thumb-pager').find('.second-num').html(totalThumbNum);
				container.find('.thumb-pager').find('.arrow').hide();
			}
			container.find('.thumb-pager').find('.total-num').html(totalThumbNum);
			container.find('.thumb-pager').find('.page-info .back').addClass('disabled');
		};


		/*Create Article Pages of 12 Thumbs */
		function createCustomThumbPages(){
			$('.thumb-page').each(function(){
				$(this).children().unwrap();
			});
			var addHtml = $("#thumbPages").html();
			$(addHtml).appendTo(".resize-thumbs .view");
			$("#thumbPages").html('');
			$(".resize-thumbs .view").html(initialAllPhotos);
			var $imgItemArr = container.find('.img-item').parent('.item-wrap');

			
			var	imgItemArrLength = $imgItemArr.length,
				itemsPerDiv = 12;
			for ( var i = 0; i < imgItemArrLength; i += itemsPerDiv ){
				$imgItemArr.filter(':eq('+i+'),:lt('+(i+itemsPerDiv)+'):gt('+i+')').wrapAll('<div class="thumb-page" style="display:none" />');
				$(".thumb-page").removeClass("current-page");
				$(".thumb-page:first").addClass("current-page").show();
			}
			var extraHtml = $(".resize-thumbs .view").html();
			$("#thumbPages").html(extraHtml);
			$("#thumbPages .thumb-page").remove();
			$(".resize-thumbs .view > .item-wrap").remove();
			if( totalThumbNum < 12){
				container.find('.thumb-page').css('height','auto');
			}
			
			// Create Pagination Numbers
			$('#thumbPagination').html('');
			if ($('.thumb-page').size() > 1) {
				$('.thumb-page').each(function(e) {
					e = e + 1
					$('#thumbPagination').append('<li class="btn"><span class="btn-inner">' + e + '</span></li>');
				});
				$(".thumb-pager").show();
			} else {
				$(".thumb-pager").hide();
			}
			
			$('#thumbPagination li:first-child').addClass('currentGalleryPage');
		}
		
		/*Load Thumbnails for First Two pages*/
		function loadThumbPages(){
			loadImg($('.thumb-page')[0]);
			if( $('.thumb-page')[1] ){
				loadImg($('.thumb-page')[1]);
			}
		};
		
		/*Load Thumbnails Function*/
		function loadImg(page){
			if( page ){
				$(page).find('.img-item').each(function(){
					var item = $(this),
						imgsmall = item.data('small');
					//item.css('background-image','url(' + imgsmall + ')');
					//item.prepend('<img src= '+ imgsmall +' class="img-item" />');
				});
			}
		}
		
		/*Gallery Slider*/
		if( container.find('.img-item').length > 1){
            /*Move hash item to first position*/
			var photoUrl = window.location.pathname,
				firstString = photoUrl.split("photo_"),
				secondString = firstString[firstString.length - 1],
				numberString = secondString.substr(0, secondString.indexOf('.')),
				onlyNumber = parseInt(numberString),
				startPos = onlyNumber - 1,
				newFirst;
            if (startPos != "0"){
				newFirst = $(container.find('.view').find('.item-wrap')[startPos]);
				container.find('.view').prepend(newFirst);
			}
			/*Initialize Slider*/
			(function initAll(){
				insertElements();
				createCustomThumbPages();
				loadThumbPages()
				initSlider(0);
				initPager();
				fillRelatedGalleries();
			})();
		}else{
			/*Only One Item in Gallery*/
			var uniqueItem = container.find('.img-item');
			gallery.find('.slides').append('<div class="gallery-item" data-bgsrc="' + uniqueItem.data('large') + '" data-caption="' + uniqueItem.data('caption') + '" data-fullscreen="' + uniqueItem.data('fullscreen') + '" data-highres="' + uniqueItem.data('highres') + '"></div>');
			var caption = $('.gallery-item').data('caption'),
				largeImage = $('.gallery-item').data('bgsrc');
				//alert(largeImage);
			$('.gallery-item').css('background-image','url(' + largeImage + ')').addClass('current').show();
			container.find('.info-bar .caption').html(caption);	
		}

		
		if ( !Modernizr.touch){
			/*Show-Hide Zoom In*/
			container.on('mouseenter', '.gallery', function(event){
				container.find('.zoom-in').stop(true,true).fadeIn(300);
			});
			container.on('mouseleave', '.gallery', function(event){
				container.find('.zoom-in').stop(true,true).fadeOut(300);
			});
			
			/*Show-Hide Related Galleries*/
			
			container.on('mouseenter', '.view-wrap', function(event){
				if ($('.img-item.current-item').attr('data-imggroup')=="article"){
					container.find('.related-bar').stop(true,true).fadeIn(300);
				}
			});
			container.on('mouseleave', '.view-wrap', function(event){
				if( !(container.find('.related-open').length) ){
					container.find('.related-bar').stop(true,true).fadeOut(300);
				}
			
			});
			
			container.on('mouseenter', '.next-btn', function(){
				container.find('.view-wrap').mouseleave();
			});
			
			container.on('mouseleave', '.next-btn', function(){
				container.find('.view-wrap').mouseenter();
			});
			
			container.on('mouseenter', '.prev-btn', function(){
				container.find('.view-wrap').mouseleave();
			});
			
			container.on('mouseleave', '.prev-btn', function(){
				container.find('.view-wrap').mouseenter();
			});

			
			/*Show-Hide Zoom Out*/
			$('body').on('mouseenter', '.gallery-simsd-container ', function(event){
				$(this).find('.simsd-header').stop(true,true).fadeIn(300);
			});
			$('body').on('mouseleave', '.gallery-simsd-container ', function(event){
				$(this).find('.simsd-header').stop(true,true).fadeOut(300);
			});
			
			/*Related Photo Galleries Image Hover*/
			$('.mod-photo-gallery').find('.related-galleries').on('mouseenter', '.gallery-link', function() {
				if( $(this).find('.img-overlay').length ){
					$(this).find('.img-overlay').show();
				}else{
					$(this).prepend('<div class="img-overlay">View Gallery</div>');
				}
			});
			
			$('.mod-photo-gallery').find('.related-galleries').on('mouseleave', '.gallery-link', function() {
				$(this).find('.img-overlay').hide();
			});	
		}

		/*Load Bgs From Thumb*/
		if ( !Modernizr.touch){
			container.on('mouseenter', '.img-item', function(event){
				var item = $(this),
					itemPageIndex = item.parents('.thumb-page').index(),
					itemIndex = item.index() + ( itemPageIndex * 12 ),
					corresponding = $(gallery.find('.slides').find('.gallery-item')[itemIndex]);

				if( corresponding.css('background-image') == 'none' ){
					var largeImageC = corresponding.data('bgsrc');
					corresponding.css('background-image','url(' + largeImageC + ')');
				}
			});
		}
		
		/*Move gallery with keyboard*/
		$(document).keydown(function(e) {
			if (e.which == 37 && loadingSlide == false) {  // Left arrow key code
				container.find('.prev-btn').click();
			}
			else if (e.which == 39 && loadingSlide == false) {  // Right arrow key code
				var itemNumber = gallery.find('.slides .gallery-item').length - 1,
					lastCurrent = gallery.find('.slides .current').index() + 1;
					
				if( !((itemNumber ==  lastCurrent) && container.find('.related-open').length)  ){
					container.find('.next-btn').click();
				}
			}
		});
		
		/*Full Screen*/
		function fullScreen(){
			var fullScreen = container.find('.current').data('fullscreen'),
				highRes = container.find('.current').data('highres'),
				caption = container.find('.caption').text(),
				image = $('<img src="' + fullScreen + '" class="hires-image" />');
			$('#fx-high-res').find('.image').html(image);
			$('#fx-high-res').find('.hr-caption').text(caption);
			$('#fx-high-res').find('.download').attr('href', highRes);
			$(".gallery-item").mouseleave();
			$('<div  id="fullScreenLoading"></div>').appendTo(".view-wrap");
			$('.hires-image').load(function() {
				/*SimDialog*/
				$('#fx-high-res').simpledialog({
					bgiframe: true,
					height: 'auto',
					modal: true,
					width: 968,
					open: function() {
						$('.simsd-container').addClass('gallery-simsd-container');
						$("#fullScreenLoading").remove();
						/*If Big Vertical*/
						var windowHeight = $(window).height(),
							imageHeight = $('img.hires-image').height();
						if( (imageHeight + 60) >  windowHeight){
							$('img.hires-image').css('width','auto');
							$('img.hires-image').css('height', windowHeight * 0.8);
							$('.gallery-simsd-container').css('top','10%');
						}
					},
					close: function() {
						$('.simsd-container').removeClass('gallery-simsd-container');
					}
				});
			});		
		}
		
		/*Trigger Zoom In*/
		container.on('click', '.zoom-in', function(event){
			fullScreen();
		});
		
		/*Close Dialog*/
		$('#fx-high-res').on('click', '.image', function(event){
			$('.simsd-close').click();
			container.find('.zoom-in').hide();
		});

		$('body').on('click', '.simsd-overlay', function(event){
			container.find('.zoom-in').hide();
		});

		function initSlider(itemIndex){
			/*Insert Slides to Gallery*/
			
			var $imgItemArr = container.find('.img-item');
			$imgItemArr.each(function(){
				gallery.find('.slides').append('<div class="gallery-item" data-bgsrc="' + $(this).data('large') + '" data-caption="' + $(this).data('caption') + '" data-fullscreen="' + $(this).data('fullscreen') + '" data-highres="' + $(this).data('highres') + '"  data-imggroup="' + $(this).data('imggroup') + '"></div>');
			});
			
			/*Last Item For Related Galleries*/
			//gallery.find('.slides').append('<div class="gallery-item"></div>');

			/*Init Slider*/
			gallery
				.after('<div class="sliderControls"><span class="prev-btn" data-sobjectid="PhotoGallery:MainImage:Arrows:Left">« PREV</span><span class="next-btn" data-sobjectid="PhotoGallery:MainImage:Arrows:Right">NEXT »</span><div class="imgCounter"><span class="imgCount">1</span> of <span class="totalImg">15 </span><br><span class="imgCaption">rear</span></div></div>')

				.find('.slides').cycle({
				fx: 'scrollHorz',
				speed: 300, 
				timeout: 0,
				nowrap: false,
				startingSlide: itemIndex,
				next:		'.mod-photo-gallery .next-btn', 
				prev:		'.mod-photo-gallery .prev-btn',
				before: function() {
					var $this = $(this),
						currentPageIndex = parseInt(($this.index() / 12), 0),
						currentPage = $(container.find('.view').find('.thumb-page')[currentPageIndex]),
						currentIndex = $this.index() % 12,
						caption = $this.data('caption'),
						prev = $this.prev('.gallery-item'),
						next = $this.next('.gallery-item');
					
					loadingSlide = true;
				
					if( !next.hasClass('gallery-item') ){
						next = gallery.find('.gallery-item').first();
					}

					/*Load Prev-Next Bgs*/
					if( $this.css('background-image') == 'none' ){
						var largeImageThis = $this.data('bgsrc');
						if(largeImageThis){
							$this.css('background-image','url(' + largeImageThis + ')');
						}
					}
					
					if( prev.css('background-image') == 'none' ){
						var largeImagePrev = prev.data('bgsrc');
						if(largeImagePrev){
							prev.css('background-image','url(' + largeImagePrev + ')');
						}
					}
					
					if( next.css('background-image') == 'none' ){
						var largeImageNext = next.data('bgsrc');
						if(largeImageNext){
							next.css('background-image','url(' + largeImageNext + ')');
						}
					}
					container.find('.info-bar .caption').html(caption);
					container.find('.current').removeClass('current');
					cycled = true;
					/*Change Page Automatically*/
					if(visiblePage == 0 && currentPageIndex == $('.thumb-page').size()-1){
						nextThumbPage( $('.thumb-page:last-child').prev() );
						visiblePage = currentPageIndex
					}else if(visiblePage ==$('.thumb-page').size()-1 && currentPageIndex == 0){
						prevThumbPage( $('.thumb-page:first-child').next() );
						visiblePage = currentPageIndex
					}else if( visiblePage == (currentPageIndex - 1) ){
						nextThumbPage( currentPage.prev('.thumb-page') );
						visiblePage++;
					}else if( visiblePage == (currentPageIndex + 1) ){
						prevThumbPage( currentPage.next('.thumb-page') );
						visiblePage--;
					}
				var total_photos = $('.thumb-page .item-wrap').length;
				var current_img =  $('.thumb-page .current-item');
				var current_photo = current_img.index() +1;
				var imgCaption = current_img.attr('data-caption');
				var updateOverlayUI = function () {
					$('.imgCounter .imgCount').text(current_photo);
					$('.imgCounter .totalImg').text(total_photos);
					$('.imgCounter .imgCaption').text(imgCaption);
				}
				updateOverlayUI();

			


					/*Set Viewed Items and Current Page*/
					container.find('.view').find('.thumb-page').removeClass('current-page');
					currentPage.addClass('current-page');
					$(currentPage.find('.img-item')[currentIndex]).addClass('viewed-item');
					container.find('.img-item').removeClass('current-item');
					$(currentPage.find('.img-item')[currentIndex]).addClass('current-item');
				},
				
				after: function(currSlideElement, nextSlideElement, options, forwardFlag) {
					$('#counter').text((options.currSlide + 1) + ' of ' + (options.slideCount - 1));
					
					// HISTORY.PUSHSTATE
					var container = $("a.current-item");
					var imggroup = container.data('imggroup');
					imgid = container.data('pushurl');
					var filename = imggroup+ '/' +imgid;	
					history.replaceState(null, null, '/'+filename);
				},
			});
			
			
		}
		/*Toggle Related Galleries Container*/
		container.on('click', '.related-bar .related', function(){
			if( $(this).hasClass('related-open') ){
				container.find('.info-bar .caption').fadeIn();
				container.find('.related-bar .related-galleries').slideUp();
				$(this).removeClass('related-open').text('Related Articles');
				/*var itemNumber = gallery.find('.slides .gallery-item').length,
					lastCurrent = gallery.find('.slides .current').index() + 1;
				if( itemNumber ==  lastCurrent ){
					container.find('.prev-btn').click();
				}*/
			}else{
				container.find('.info-bar .caption').stop(true,true).fadeOut();
				container.find('.related-bar .related-galleries').slideDown();
				$(this).addClass('related-open').text('Close');
			}
		});
		

		/*Prev Thumb Page*/
		function prevThumbPage(currentPage){
			var currentFirst = parseInt(container.find('.thumb-pager').find('.first-num').text()),
				currentSecond = parseInt(container.find('.thumb-pager').find('.second-num').text());
			loadingThumbs = true;
			if( currentPage.prev().hasClass('thumb-page') ){
				if (agentID) {
					/*apple code*/
					$('.thumb-page:visible').hide(300, function(){
						currentPage.prev().show(300);
						prevInner(currentPage, currentFirst, currentSecond);
					});
				}else{
					$('.thumb-page:visible').hide('slide', {direction: 'right'}, 300, function(){
						currentPage.prev().show('slide', {direction: 'left'}, 300);
						prevInner(currentPage, currentFirst, currentSecond);
					});
				}
			}	
		}
		
		/*Prev Inner*/
		function prevInner(currentPage, currentFirst, currentSecond){
			/*Pager Numbers Change*/
			container.find('.thumb-pager').find('.first-num').html( currentFirst - 12 );
			container.find('.thumb-pager').find('.second-num').html( currentSecond - currentPage.find('.img-item').length );
			
			/*Disable-Enable Arrows*/
			container.find('.thumb-pager').find('.page-info .forward').removeClass('disabled');
			
			if(!currentPage.prev().prev().hasClass('thumb-page')){
				container.find('.thumb-pager').find('.page-info .back').addClass('disabled');
			}
			loadingThumbs = false;
			$('#thumbPagination li').removeClass('currentGalleryPage').eq(currentPage.index()-1).addClass('currentGalleryPage');
		}
		
		/*Next Thumb Page*/
		function nextThumbPage(currentPage){
			var currentFirst = parseInt(container.find('.thumb-pager').find('.first-num').text()),
				currentSecond = parseInt(container.find('.thumb-pager').find('.second-num').text());
			loadingThumbs = true;
			if( currentPage.next().hasClass('thumb-page') ){
				if (agentID) {
					/*apple code*/
					$('.thumb-page:visible').hide(300, function(){
						currentPage.next().show(300);
						nextInner(currentPage, currentFirst, currentSecond);
					});
				}else{
					$('.thumb-page:visible').hide('slide', {direction: 'left'}, 300, function(){
						currentPage.next().show('slide', {direction: 'right'}, 300);
						nextInner(currentPage, currentFirst, currentSecond);
					});
				}
			}
		}
		
		/*Next Inner*/
		function nextInner(currentPage, currentFirst, currentSecond){
			loadImg($('.thumb-page')[currentPage.index() + 2]);
			
			/*Pager Numbers Change*/
			container.find('.thumb-pager').find('.first-num').html( currentFirst + 12 );
			container.find('.thumb-pager').find('.second-num').html( currentSecond + currentPage.next().find('.img-item').length );
			
			/*Disable-Enable Arrows*/
			container.find('.thumb-pager').find('.page-info .back').removeClass('disabled');
			
			if(!currentPage.next().next().hasClass('thumb-page')){
				container.find('.thumb-pager').find('.page-info .forward').addClass('disabled');
			}
			loadingThumbs = false;
			$('#thumbPagination li').removeClass('currentGalleryPage').eq(currentPage.index()+1).addClass('currentGalleryPage');
		}
		
		/*Move Between Thumb Pages*/
		container.find('.thumb-pager').on('click', '.back', function(){
			if( loadingThumbs == false){
				var currentPage = container.find('.current-page');
				if( currentPage.prev().hasClass('thumb-page') ){
					currentPage.removeClass('current-page').prev('.thumb-page').addClass('current-page');
					prevThumbPage( currentPage );
					scrollToTop = false;
					clickThumb(container.find('.current-page').find('.img-item').first());
				}
			}
		});
		
		container.find('.thumb-pager').on('click', '.forward', function(){			
			if( loadingThumbs == false){
				var currentPage = container.find('.current-page');

				if( currentPage.next().hasClass('thumb-page') ){
					currentPage.removeClass('current-page').next('.thumb-page').addClass('current-page');
					nextThumbPage( currentPage );
					scrollToTop = false;
					clickThumb(container.find('.current-page').find('.img-item').first());
				}
			}
		});
		
		container.find('#thumbPagination').on('click', 'li', function(){
			if( loadingThumbs == false && (!$(this).hasClass('currentGalleryPage'))){
				var currentPage = container.find('.current-page');
				var currentEq = $('.thumb-page.current-page').index();
				var thisEq = $(this).index();
				currentPage.removeClass('current-page');
				$('.view .thumb-page').eq(thisEq).addClass('current-page')
				if(currentEq<thisEq){
					var currentPage = $('.thumb-page.current-page').prev('.thumb-page');
					nextThumbPage(currentPage);
					scrollToTop = false;
					clickThumb(container.find('.current-page').find('.img-item').first());
				}else{
					var currentPage = $('.thumb-page.current-page').next('.thumb-page');
					prevThumbPage(currentPage);
					scrollToTop = false;
					clickThumb(container.find('.current-page').find('.img-item').first());
				}
			}
		});
		
		/*TOUCH SCRIPTS*/
		if (Modernizr.touch){
			/*SWIPE*/
			container.find('.slides').swipe({
				swipeLeft:swipeLeftFn,
				swipeRight:swipeRightFn,
				allowPageScroll:"auto",
				click:function(event, target){
					container.find('.zoom-in').stop(true,true).fadeIn(300);
					container.find('.related-bar').stop(true,true).fadeIn(300);
				}
			});

			container.find('.view').swipe({
				swipeLeft:swipeLeftThumbsFn,
				swipeRight:swipeRightThumbsFn,
				allowPageScroll:"auto",
				click:function(event, target){
					scrollToTop = true;
					if( scrollToTop && $(target).hasClass('item-inner')){
						var item = $(target).parent('.img-item'),
							itemPageIndex = item.parents('.thumb-page').index(),
							itemIndex = item.parent('.item-wrap').index() + ( itemPageIndex * 12 );
						
						/*Load Corresponding Image*/
						var corresponding = $(gallery.find('.slides').find('.gallery-item')[itemIndex]);
						if( corresponding.css('background-image') == 'none' ){
							var largeImageC = corresponding.data('bgsrc');
							corresponding.css('background-image','url(' + largeImageC + ')');
						}
						
						clickThumb( $(target).parent('.img-item') );
					}
				}
			});

			//Swipe Images Handlers.
			function swipeLeftFn(event, direction){
				container.find('.next-btn').click();
			}
			
			function swipeRightFn(event, direction){
				container.find('.prev-btn').click();
			}
			
			//Swipe Thumbs Handlers.
			function swipeLeftThumbsFn(event, direction){
				container.find('.thumb-pager').find('.page-info .forward').click();
			}
			
			function swipeRightThumbsFn(event, direction){
				container.find('.thumb-pager').find('.page-info .back').click();
			}
		}else{
			/*Click item*/
			container.on('click', '.img-item', function(event){
				event.preventDefault();
				clickThumb($(this));
			});
		}
		
		function clickThumb(item){
			var itemPageIndex = item.parents('.thumb-page').index(),
				itemIndex = item.parent('.item-wrap').index() + ( itemPageIndex * 12 ),
				topPosition = 0;
				gallery.find('.slides').cycle(itemIndex);
			
			if( scrollToTop ){
				//$.scrollTo( '.photos-subhead', 500, {} );
				$("html, body").animate({ scrollTop: topPosition });
			}
			scrollToTop = true;		
		}
});

//function changeurl(){
//	//debugger;
//			var path ='http://localhost/jquery/lastindex.html/';
//			//var tt = path.length - 2;
//			var tt = path.length - 2;
//			if(path.lastIndexOf('/') !=tt) {
//			path = path.substring(0,tt);
//		 	var lastValue = path.substring(0, path.lastIndexOf('/')+1);
//			history.replaceState(null, null,lastValue+12 );
//	};
//};

});
