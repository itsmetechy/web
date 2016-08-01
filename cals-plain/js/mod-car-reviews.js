(function($, window, undefined) {
    "use strict";
    $(function() {

        /*Local Storage*/
        var storedView = localStorage.getItem("viewType"),
            viewContainer = $('.mod-car-review .view-type');
        if( (storedView === 'gallery') && !(viewContainer.hasClass('gallery-view')) ){
            viewContainer.addClass('gallery-view');
            viewContainer.removeClass('list-view');
        }else if( (storedView === 'list') && !(viewContainer.hasClass('list-view')) ){
            viewContainer.addClass('list-view');
            viewContainer.removeClass('gallery-view');
        }


        /*Toggle Views*/
        $('.view-type .toggle-view .gallery').click(function () {
            var viewType = $(this).parents('.view-type');
            viewType.addClass('gallery-view');
            viewType.removeClass('list-view');
            setHeight();
            setCategoryGrid();
            /*Set View to Local Storage*/
            localStorage.setItem('viewType', 'gallery');
        });

        $('.view-type .toggle-view .list').click(function () {
            var viewType = $(this).parents('.view-type');
            viewType.addClass('list-view');
            viewType.removeClass('gallery-view');
            setHeightListView();
            /*Set View to Local Storage*/
            localStorage.setItem('viewType', 'list');
        });

        /*Gallery View Item Height*/
		


		function setHeight(){
			$('.mod-car-review .gallery-view .article-blk').each(function(){
				var itemsHeight = 0;
				$(this).find('.mod-carreview-article')
					.each(function(){
						var height = ($(this).outerHeight());
						if( height > itemsHeight){
							itemsHeight = height;
						}
					})
					.each(function(){
						$(this).height(itemsHeight);
						$(this).parents('.mod-carreview-article').find('.info').css('margin-bottom', itemsHeight + 'px');
					});
			});	
        }
		
		function setHeightListView(){
            $('.mod-car-review .list-view .mod-carreview-article').each(function(){
                $(this).css('height', 'auto');
                $(this).parents('.mod-carreview-article').find('.info').css('margin-bottom','0');

            });
        }
		
		
        function setCategoryGrid(){
            //take the left hand border off the 3rd, 6th, 9th etc element and also the bottom border off the last row
            if ($(".mod-car-review-category .mod-car-review .gallery-view").length) {
                $(".mod-car-review-category .mod-car-review .gallery-view .mod-carreview-article:nth-child(3n+1)").css('border-left','none');
                var count = $(".mod-car-review-category .mod-car-review .gallery-view .mod-carreview-article").length,
                //alert(count);
                    rem = count % 3,
                    takeaway;
                if ( rem === 0) { takeaway = 2; }   else if (rem === 2) {takeaway = 1;} else { takeaway = 0;}
                var lastones = count - takeaway;
                $(".mod-car-review-category .mod-car-review .gallery-view .mod-carreview-article:nth-child(n+" + (lastones) + ")").css('border-bottom','none');
            }
        }
        setHeight();
        setCategoryGrid();
		
		
			$('.mod-car-review').find('.mod-car-review-article').on('mouseenter', '.mod-carreview-article', function() {
				if( $(this).find('.review-overlay').length ){
					$(this).find('.review-overlay').show();
				}else{
					$(this).find('.mod-thumbnail').prepend('<div class="review-overlay"></div>');
				}
			});
			
			$('.mod-car-review').find('.article-blk').on('mouseleave', '.mod-carreview-article', function() {
				$(this).find('.review-overlay').hide();
			});	
			
			/* READ ARTICLE AUTO HEIGHT */		
			var heightArray = $(".select-model .container>div").map( function(){
				return  $(this).height();
			}).get();
			var maxHeight = Math.max.apply( Math, heightArray);
				$(".select-model .container>div").height(maxHeight);		
			/* END OF READ ARTICLE AUTO HEIGHT */
			
			
			/* Review Make AUTO HEIGHT */	
			var heightArray = $(".select-review-make .make-container>div").map( function(){
				return  $(this).height();
			}).get();
			var maxHeight = Math.max.apply( Math, heightArray);
				$(".select-review-make .make-container>div").height(maxHeight);	
			
		/*	REVIEW BY MAKE AND REVIEW BY BODY STYLE FUNCTION	*/			
			
		$('.mod-car-review').find('.select-review-make').on('click', 'h3.make', function() {
			$('.body-container').hide();
			$('.make-container').show();
			$('h3.make').addClass('active').css('color','#000');
			$('h3.class').removeClass('active').css('color','#CCC');		
		});
		$('.mod-car-review').find('.select-review-make').on('click', 'h3.class', function() {
			$('.body-container').show();
			$('.make-container').hide();
			$('h3.class').addClass('active').css('color','#000');
			$('h3.make').removeClass('active').css('color','#CCC');
			var heightArray = $(".select-review-body .body-container>div").map( function(){
				return  $(this).height();
			}).get();
			var maxHeight = Math.max.apply( Math, heightArray);
				$(".select-review-body .body-container>div").height(maxHeight);	
		});

    });
})(jQuery,window);

