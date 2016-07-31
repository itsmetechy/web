/* Gallery carousel thumbs
 *  Author: TN  2012-04-08
 *  Version 0.1
 *
 *  Dependencies: jquery.sim.carousel.js, jQuery, jQueryUI widget factory, twitter bootstrap-transition.js, modernizr.js
 *  uses css transitions with jQuery fallback for browsers that don't support transistions
 *
 *  this plugin extends the jquery.sim.carousel.js
 */
;(function ($) {
    "use strict";
    $.widget('sim.carouselThumbsPaging',$.sim.carousel, {
        _currentThumbOffset:0,
        _currentThumbPage:0,
        _thumbWidth:0,
        _parentInitView: $.sim.carousel.prototype._initView,
        _parentAddEvents: $.sim.carousel.prototype._addEvents,
        options:{
            visibleThumbs:1
        },
        _initView:function () {
            // in 1.9 we will do this._super( "_initView" );
            this._parentInitView.call( this );

            // init thumbs
            this._initThumbs(this, this.element.find(this.options.scrollContainer).find(this.options.slideContainer));
        },
        _initThumbs: function(self, $slideContainers) {
            $('<div/>').addClass('crsl-thumb-scroller').append($('<ul/>').addClass('crsl-thumb-list group')).appendTo(this.element);
            self.element.find('.crsl-thumb').each(function () {
                $('<li/>').append($(this)).appendTo(self.element.find('.crsl-thumb-list'));
            });

            var $thumbContainers = self.element.find('.crsl-thumb-list').find('li'),
                $thumbContainerFirst = $thumbContainers.eq(0);

            self._thumbWidth = $thumbContainerFirst.outerWidth(true);

            var thumbScrollWidth = Math.ceil($thumbContainers.length / self.options.visibleThumbs) * self.options.visibleThumbs * parseInt(self._thumbWidth, 10);
						
            $thumbContainerFirst.addClass('current');

            if ($slideContainers.length > this.options.visibleThumbs) {
                $('.crsl-thumb-list').css('width', thumbScrollWidth);
            }

            if ($slideContainers.length > 1) {
                var $thumbWrapper = $('<div/>').addClass('crsl-thumb-wrapper');
                if (this.options.visibleThumbs >= $thumbContainers.length) {
                    $('.crsl-thumb-lnk-next').addClass('disabled');
                }
                $thumbWrapper.append(self.element.find('.crsl-thumb-list').parent('div')).appendTo(this.element);
				$thumbWrapper.parent('div').append('<div class="controls-info group"><div class="total-num"><span class="begining-range">1</span> - <span class="end-range">' + ($thumbContainers.length > self.options.visibleThumbs ? self.options.visibleThumbs.toString() : $thumbContainers.length.toString()) + '</span> of <span class="num-of-items"></span></div><div class="controls"><a href="#" class="crsl-thumb-link crsl-thumb-lnk-prev disabled">&lt;</a><a href="#" class="crsl-thumb-lnk-pause">||</a><a href="#" class="crsl-thumb-link crsl-thumb-lnk-next">&gt;</a></div></div>');	
            }
        },
        _addEvents:function () {
            var self = this,
                method = ( $.isFunction( $('body').on ) ) ? 'on' : 'live';

            // in 1.9 we will do this._super( "_initView" );
            this._parentAddEvents.call( this );

            // click on thumb arrows
            this.element.find('.crsl-thumb-link')[method]('click', function (e) {
                e.preventDefault();
                self._thumbArrowClicked($(this));
            });

            // click on thumbnails
            this.element.find('.crsl-thumb-list li')[method]('click', function (e) {
                e.preventDefault();
                self._thumbClicked($(this));
            });
        },
        flipSlide:function (self, direction, slideDirection) {
            var $scrollContainer = self.element.find(self.options.scrollContainer),
                $currentSlide = $scrollContainer.find('.current'),
                animateProps = {
                    $slideToShow: $currentSlide.next(self.options.slideContainer),
                    amount: '-100%',
                    direction: direction,
                    slideDirection: slideDirection,
                    vertClass: ''
                },
                vertClass = '',
                jumpToIndex = arguments[4];

            if (arguments[3] === undefined) {
                self._resetAutoFlip();
            }

            if (jumpToIndex !== undefined) {
                if (direction === 'prev') {
                    animateProps.amount = '100%';
                }
                animateProps.$slideToShow = $scrollContainer.find(self.options.slideContainer).eq(jumpToIndex);
            } else {
                animateProps = self._setAnimateProps(self, $scrollContainer, $currentSlide, animateProps);
            }

            animateProps = self._setAnimateDirection(self, animateProps);
            self._animateSlide(self, $scrollContainer, $currentSlide, animateProps);

            if (jumpToIndex === undefined) {				
                self._setCurrentThumb(self,animateProps);
            }

        },
        autoFlip:function () {
            var self = this;
            this._flipIntervalId = window.setInterval(function () {
                if (!self._slideAnimating) {
                    self._slideAnimating = true;
                    self.element.carouselThumbsPaging('flipSlide', self, 'next', 'left',true);
                }
            }, self.options.autoFlipInterval);
        },
        _setCurrentThumb: function(self, animateProps) {
            var $currentThumb = self.element.find('.crsl-thumb-list').find('.current'),
                currentIndex = self.element.find('.crsl-thumb-list').children('li').index($currentThumb),
                totalThumbs = self.element.find('.crsl-thumb-list').find('li').length,
                indexToShow = (currentIndex + 1 >= totalThumbs) ? 0 : (currentIndex + 1),
				beginingRangeSelector = $('.begining-range'),
				endRangeSelector = $('.end-range');

            if (animateProps.direction === 'next') {
                if (indexToShow === 0) {
                    self._scrollThumbs(self,0);
					beginingRangeSelector.html('1');
					endRangeSelector.html(totalThumbs < self.options.visibleThumbs ? totalThumbs : self.options.visibleThumbs);
					
                } else if ((Math.ceil((indexToShow + 1) / self.options.visibleThumbs) - 1) > self._currentThumbPage) {
                    self._scrollThumbs(self, 'next');
                }
            } else {				
                indexToShow = (currentIndex <= 0) ? (totalThumbs - 1) : (currentIndex - 1);
                if (indexToShow + 1 >= totalThumbs && totalThumbs > self.options.visibleThumbs) {
                    self._scrollThumbs(self, (Math.ceil(totalThumbs / self.options.visibleThumbs) - 1));
					var modsix = totalThumbs % 6;
					if (modsix){
						beginingRangeSelector.html(totalThumbs - modsix + 1);
					}else{
						beginingRangeSelector.html(totalThumbs - 5);
					}
					endRangeSelector.html(totalThumbs);
                } else if ((Math.ceil((indexToShow + 1) / self.options.visibleThumbs) - 1) < self._currentThumbPage) {
                    self._scrollThumbs(self, 'prev');					
                }
            }
            $currentThumb.removeClass('current');
            self.element.find('.crsl-thumb-list').find('li:eq(' + indexToShow + ')').addClass('current');
        },
        _thumbArrowClicked:function ($this) {
            var direction = ($this.hasClass('crsl-thumb-lnk-prev') ? 'prev' : 'next');
            this._scrollThumbs(this, direction);
        },
        _thumbClicked:function ($this) {
            if (this._slideAnimating || $this.hasClass('current')) {
                return;
            }
			this._slideAnimating = true;
            this._resetAutoFlip();
            var indexToShow = this.element.find('.crsl-thumb-list').children('li').index($this),
                $slideContainers = this.element.find(this.options.slideContainer),
                currentIndex = $slideContainers.index(this.element.find('.current')),
                direction = ((indexToShow > currentIndex) ? 'next' : 'prev'),
                slideDirection = ((direction === 'next') ? 'left' : 'right');

            this.element.find('.crsl-thumb-list').find('.current').removeClass('current');
            $this.addClass('current');
            this.flipSlide(this, direction, slideDirection, false, indexToShow);
        },
        _scrollThumbs:function (self, direction) {
			var beginingRangeSelector = $('.begining-range'),
				endRangeSelector = $('.end-range'),
				beginingRange = parseInt( beginingRangeSelector.html() ),
				endRange = parseInt( endRangeSelector.html() );	
			
            var scrollAmount,
                $thumbScrollContainer = self.element.find('.crsl-thumb-list'),
                numberOfThumbs = $thumbScrollContainer.find('li').length;
			var mod = numberOfThumbs % self.options.visibleThumbs;
            if (direction === 'prev') {
                if (self._currentThumbPage === 0) {
                    return false;
                }
                self._currentThumbPage = self._currentThumbPage - 1;
				if(endRange == numberOfThumbs){
					beginingRangeSelector.html(beginingRange - self.options.visibleThumbs);
					endRangeSelector.html(endRange - mod);
				}else{
					beginingRangeSelector.html(beginingRange - self.options.visibleThumbs);
					endRangeSelector.html(endRange - self.options.visibleThumbs);
				}
            } else if (direction === 'next') {
                if (self._currentThumbPage + 1 >= Math.ceil(numberOfThumbs / self.options.visibleThumbs)) {
                    return false;
                }
                self._currentThumbPage = self._currentThumbPage + 1;
				beginingRangeSelector.html(beginingRange + self.options.visibleThumbs);
				if ((endRange + self.options.visibleThumbs) <= numberOfThumbs){
					endRangeSelector.html(endRange + self.options.visibleThumbs);
				}else{
					endRangeSelector.html(numberOfThumbs);
				}

            } else {
                self._currentThumbPage = direction;
            }

            scrollAmount = self._currentThumbPage * self._thumbWidth * self.options.visibleThumbs;
            if (Modernizr.csstransitions) {
                scrollAmount = (scrollAmount * -1);
                $thumbScrollContainer.css({left:scrollAmount});
                $thumbScrollContainer.one($.support.transition.end, function () {
                    self._currentThumbOffset = scrollAmount;
                });
            } else {
                self.element.find('.crsl-thumb-list').parent('div').animate({scrollLeft:scrollAmount}, self.options.flipSpeed, 'swing', function () {
                    self._currentThumbOffset = scrollAmount;
                });
            }
            if (self._currentThumbPage === 0) {
                self.element.find('.crsl-thumb-lnk-prev').addClass('disabled');
            } else {
                self.element.find('.crsl-thumb-lnk-prev').removeClass('disabled');
            }

            if (self._currentThumbPage + 1 >= Math.ceil(numberOfThumbs / self.options.visibleThumbs)) {
                self.element.find('.crsl-thumb-lnk-next').addClass('disabled');
            } else {
                self.element.find('.crsl-thumb-lnk-next').removeClass('disabled');
            }
        }
    });
})(jQuery);