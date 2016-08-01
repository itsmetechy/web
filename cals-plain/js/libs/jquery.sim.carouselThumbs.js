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
    $.widget('sim.carouselThumbs',$.sim.carousel, {
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

            var thumbScrollWidth = $thumbContainers.length * parseInt(self._thumbWidth, 10);

            $thumbContainerFirst.addClass('current');

            if ($slideContainers.length > this.options.visibleThumbs) {
                $('.crsl-thumb-list').css('width', thumbScrollWidth);
            }

            if ($slideContainers.length > 1) {
                var $thumbWrapper = $('<div/>').addClass('crsl-thumb-wrapper');
                if (this.options.visibleThumbs < $thumbContainers.length) {
                    $thumbWrapper.append('<a href="#" class="crsl-thumb-link crsl-thumb-lnk-prev disabled">&lt;</a><a href="#" class="crsl-thumb-link crsl-thumb-lnk-next">&gt;</a>');
                }
                $thumbWrapper.append(self.element.find('.crsl-thumb-list').parent('div')).appendTo(this.element);
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
                self.element.carouselThumbs('flipSlide', self, 'next', 'left',true);
            }, self.options.autoFlipInterval);
        },
        _setCurrentThumb: function(self, animateProps) {
            var $currentThumb = self.element.find('.crsl-thumb-list').find('.current'),
                currentIndex = self.element.find('.crsl-thumb-list').children('li').index($currentThumb),
                totalThumbs = self.element.find('.crsl-thumb-list').find('li').length,
                indexToShow = (currentIndex + 1 >= totalThumbs) ? 0 : (currentIndex + 1);

            if (animateProps.direction === 'next') {
                if (indexToShow === 0) {
                    self._scrollThumbs(self,0);
                } else if ((Math.ceil((indexToShow + 1) / self.options.visibleThumbs) - 1) > self._currentThumbPage) {
                    self._scrollThumbs(self, 'next');
                }
            } else {
                indexToShow = (currentIndex <= 0) ? (totalThumbs - 1) : (currentIndex - 1);
                if (indexToShow + 1 >= totalThumbs && totalThumbs > self.options.visibleThumbs) {
                    self._scrollThumbs(self, Math.floor(totalThumbs / self.options.visibleThumbs));
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
                return false;
            }
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
            var scrollAmount,
                $thumbScrollContainer = self.element.find('.crsl-thumb-list'),
                numberOfThumbs = $thumbScrollContainer.find('li').length;
            if (direction === 'prev') {
                if (self._currentThumbPage === 0) {
                    return false;
                }
                self._currentThumbPage = self._currentThumbPage - 1;
            } else if (direction === 'next') {
                if (self._currentThumbPage + 1 >= Math.ceil(numberOfThumbs / self.options.visibleThumbs)) {
                    return false;
                }
                self._currentThumbPage = self._currentThumbPage + 1;
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