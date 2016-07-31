(function($) {
	$.widget('sim.simpledialog', {
		options: {
			bgiframe:			true,
			close:				false,
			dialogClass:		false,
            height: 			'auto',
			modal:				false,
			open:				false,
			width: '300px',
			supportsFixed: true
		},
		_create: function() {
			var self = this;
			this.options.supportsFixed = this._supportsFixed();
			if (this.options.modal) {
				var simsdOverlay = $('.simsd-overlay');
				if (!simsdOverlay.length) {
					$('<div/>').addClass('simsd-overlay').css({
						height: $('body').height(),
						left: 0,
						position: 'absolute',
						top: 0,
						width: '100%',
						zIndex: '2000000'
					}).appendTo('body').click(function(e) {
                            e.preventDefault();
                            self._closeDialog(this);
					});

					if (this.options.bgIframe) {
						simsdOverlay.bgiframe();
					}
				} else {
					simsdOverlay.css('display','block');
				}
			}

			$('<div/>').css({
				position: 'fixed',
				zIndex: '2000001'
			}).addClass('simsd-container').append(
					$('<div/>').css('position', 'relative').addClass('simsd-header').append('<a href="#" class="simsd-close">close</a>')
				).append(this.element.css('display','block')).appendTo('body').find('.simsd-close').click(function(e) {
				e.preventDefault();
				self._closeDialog(this);
			});

			if (!this.options.supportsFixed) {
				$('.simsd-container').css('position', 'absolute');
				$(window).resize(function() {
					self._positionDialog(this.element);
				});
				$(window).bind('scroll', function() {
					self._positionDialog(this.element);
				});
			}

			this._bindKeyEvents();
		},
		_init: function() {
			var simsdContainer = this.element.parents('.simsd-container');
			if (simsdContainer.length) {
				simsdContainer.show();
				$('.simsd-overlay').show();
				this._bindKeyEvents();
			}
			this._positionDialog();
            this._trigger('open');

		},
		_positionDialog: function() {
			if (this.element.parents('.simsd-container').is(':visible')) {
				var windowWidth = $(window).width(),
					windowHeight = $(window).height(),
					dialogWidth = this.options.width,
					dialogMarginLeft = (dialogWidth / 2 * -1),
					simsdContainer = this.element.parents('.simsd-container');
				simsdContainer.css({
					left: '50%',
					marginLeft:dialogMarginLeft,
					width:dialogWidth
				});
				var dialogHeight = (this.options.height === 'auto') ? this.element.parents('.simsd-container').outerHeight() : this.options.height,
				dialogTop = ((dialogHeight > windowHeight) ? 0 : (windowHeight / 2) - (dialogHeight / 2)) + ((this.options.supportsFixed) ? 0 : $(window).scrollTop());
				simsdContainer.css({top: dialogTop});
				if (this.options.height !== 'auto') {
				  this.element.css({height: this.options.height});
				}
			}
		},
		_closeDialog: function(closeButton) {
			$('.simsd-container').hide();
			$('.simsd-overlay').hide();
            this._trigger('close');
		},
		_bindKeyEvents: function() {
			// bind keydown events
			$(document).keyup(function (e) {
				if (e.keyCode === 27) { // ESC
					e.preventDefault();
					$('.simsd-close').click();
					$(document).unbind('keyup');
				}
			});
		},
		_supportsFixed: function() {
			var testDiv = document.createElement("div");
			testDiv.id = "testingPositionFixed";
			testDiv.style.position = "fixed";
			testDiv.style.top = "0px";
			testDiv.style.right = "0px";
			document.body.appendChild(testDiv);
			var offset = 1;
			var supported = false;
			if (typeof testDiv.offsetTop === "number") {
				if (testDiv.offsetTop !== null) {
					if (testDiv.offsetTop !== "undefined") {
						offset = parseInt(testDiv.offsetTop, 10);
					}
				}
			}
			if (offset === 0) {
				supported = true;
			}

			return supported;
		}
	});
})(jQuery);