/* Gallery carousel
 *  Author: TN  2012-04-08
 *  Version 0.4
 *
 *  Dependencies: jQuery, jQueryUI with widget factory, twitter bootstrap-transition.js, modernizr.js
 *  uses css transitions with jQuery fallback for browsers that don't support transistions
  */
;(function ($) {
    "use strict";
    $.widget('sim.carousel', {
        _flipIntervalId:null,
        _slideAnimating:false,
        options:{
            autoFlipInterval:false,
            flipSpeed:400,
            scrollContainer:null,
            scrollVertically:false,
            showPrevNextLink:true,
            slideContainer:null,
            subTitleMaxLength:0,
            titleMaxLength:0
        },
        _create:function () {
            var self = this;

            if (this.options.slideContainer === null || this.options.scrollContainer === null) {
                return(false);
            }

            /**
             * size scroll container and add navigation links
             */
            this._initView();

            /**
             * add event listeners
             */
            this._addEvents();

            /**
             * autoflip if set as option
             */
            if (this.options.autoFlipInterval) {
                this.autoFlip();
            }

            if (this.options.titleMaxLength) {
                this.element.find('.crsl-info-title').each(function () {
                    self._textOverflow($(this), self.options.titleMaxLength);
                });
            }

            if (this.options.subTitleMaxLength) {
                this.element.find('.crsl-info-sub').each(function () {
                    self._textOverflow($(this), self.options.subTitleMaxLength);
                });
            }

            /**
             * trigger callback after init
             */
            this._trigger('initialized');
        },
        _initView:function () {
            var $slideContainers = this.element.find(this.options.scrollContainer).find(this.options.slideContainer);

            if ($slideContainers.length > 1) {
                // add slide links
                this._addSlideLinks($slideContainers);
            }

            $slideContainers.eq(0).addClass('current');
        },
        _addSlideLinks: function($slideContainers) {
            if (this.options.showPrevNextLink) {
                $('<span class="crsl-sld-link crsl-sld-link-prev">previous</span><span class="crsl-sld-link crsl-sld-link-next">next</span>').prependTo(this.element);
            }
        },
        _addEvents:function () {
            var self = this,
                method = ( $.isFunction( $('body').on ) ) ? 'on' : 'live';

            // click on slide arrows
            this.element.find('.crsl-sld-link')[method]('click', function (e) {
                e.preventDefault();
                self._slideArrowClicked($(this));
            });
        },
        _slideArrowClicked:function ($this) {
            if (this._slideAnimating) {
                return;
            }
            this._slideAnimating = true;
            var direction = ($this.hasClass('crsl-sld-link-prev') ? 'prev' : 'next'),
                slideDirection = (direction === 'next') ? 'left' : 'right';
            this.flipSlide(this, direction, slideDirection);
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
                vertClass = '';

            if (arguments[3] === undefined) {
                self._resetAutoFlip();
            }

            animateProps = self._setAnimateProps(self, $scrollContainer, $currentSlide, animateProps);
            animateProps = self._setAnimateDirection(self, animateProps);
            self._animateSlide(self, $scrollContainer, $currentSlide, animateProps);
        },
        _setAnimateProps: function(self, $scrollContainer, $currentSlide, animateProps) {
            if (animateProps.direction === 'next') {
                if (!animateProps.$slideToShow.length) {
                    animateProps.$slideToShow = $scrollContainer.find(self.options.slideContainer).first();
                }
            } else {
                animateProps.amount = '100%';
                animateProps.$slideToShow = $currentSlide.prev(self.options.slideContainer);
                if (!animateProps.$slideToShow.length) {
                    animateProps.$slideToShow = $scrollContainer.find(self.options.slideContainer).last();
                }
            }
            return animateProps;
        },
        _setAnimateDirection: function(self, animateProps) {
            if (self.options.scrollVertically) {
                if (animateProps.slideDirection === 'left') {
                    animateProps.slideDirection = 'bottom';
                } else {
                    animateProps.slideDirection = 'top';
                }
                animateProps.vertClass = ' vert';
            }
            return animateProps;
        },
        _animateSlide: function(self, $scrollContainer, $currentSlide, animateProps) {
            if (Modernizr.csstransitions) {
                var tmp = animateProps.$slideToShow.addClass(animateProps.direction + animateProps.vertClass).get(0).offsetWidth; // force reflow
                $currentSlide.addClass(animateProps.slideDirection + animateProps.vertClass);
                animateProps.$slideToShow.addClass(animateProps.slideDirection);
                animateProps.$slideToShow.one($.support.transition.end, function () {
                    animateProps.$slideToShow.addClass('current').removeClass(animateProps.slideDirection + ' ' + animateProps.direction);
                    $currentSlide.removeClass('current ' + animateProps.slideDirection);
                    self._slideAnimating = false;
                });
            } else {
                var currentCss = {left: animateProps.amount},
                    nextCss = {left: '0%'};
                if (self.options.scrollVertically) {
                    currentCss = {top: animateProps.amount};
                    nextCss = {top: '0%'};
                }

                $currentSlide.animate(currentCss, self.options.flipSpeed, function() {
                    $(this).removeClass('current').removeAttr('style');
                });
                animateProps.$slideToShow.addClass(animateProps.direction + animateProps.vertClass).animate(nextCss, self.options.flipSpeed, function() {
                    $(this).removeAttr('style').addClass('current').removeClass(animateProps.direction);
                    self._slideAnimating = false;
                });
            }
        },
        _textOverflow:function (textNode, maxLength) {
            var textString = textNode.find('span').text();
            if (textString.length > maxLength) {
                textNode.find('span').text(textString.substr(0, (maxLength - 3)) + '...');
            }
        },
        autoFlip:function () {
            var self = this;
            this._flipIntervalId = window.setInterval(function () {
                self.element.carousel('flipSlide', self, 'next', 'left',true);
            }, self.options.autoFlipInterval);
        },
        _resetAutoFlip: function() {
            window.clearInterval(this._flipIntervalId);
            if (this.options.autoFlipInterval) {
                this.autoFlip();
            }
        },
        _setOption:function (key, value) {
            if (key === 'autoFlipInterval') {
                window.clearInterval(this._flipIntervalId);
            }
            $.Widget.prototype._setOption.apply(this, arguments);
        }
    });
})(jQuery);