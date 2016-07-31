(function() {
	$(function($) {
	
		var modCpoDrillBg = {};
		(function($, cpo){

		cpo.init = function(){
			this.setSelectors();
			this.setEvents();
		};
		cpo.setSelectors = function(){
			this.$changeVehicleBtn = $('.mod-bg-certified-costs').find('.change-vehicle-btn');
		};
		cpo.setEvents = function(){
			this.$changeVehicleBtn.on('click', function(e){
				/*
				Show the hidden YMM options
				 */
				e.preventDefault();
				$(e.currentTarget).toggleClass('change-vehicle-btn-active').parent().children('.compare-cpo-cost-small').toggle();
			});
		};
		return cpo.init();
	})(jQuery, modCpoDrillBg);
	
	
		var cpoBuyerPage = $('.compare-cpo-cost, .compare-cpo-cost-small');

		/*Custom Selects*/
		cpoBuyerPage.find('.make .custom-select, .model .custom-select, .year .custom-select').customselect({
			helptext:	true,
			ddwidth:	'auto',
			hidecss:	true,
		});
		
		/*Custom Selects Small*/
		cpoBuyerPage.find('.make .custom-select-small, .model .custom-select-small, .year .custom-select-small').customselect({
			helptext:	true,
			ddwidth:	'auto',
			hidecss:	true,
		});

		this.insertStarRating = function(){
			var $newStarRatingMod = $(),
				maxRating = 0,
				rating = 0,
				$modStarRating = $('.mod-star-rating-cpo'),
				isStarRating = ($modStarRating.length !== 0);
			/*
			* Is there a star rating cpo mod on the page that we can copy?
			* */
			if ( isStarRating ) {
				$('.select-list-item').each(function(){
					/*
					* Append only if we have a rating available.
					* */
					maxRating = $(this).data('rating-max');
					rating = $(this).data('rating');
					if ( maxRating !== undefined && rating !== undefined ) {
						$newStarRatingMod = $modStarRating.eq(0).clone();
						/* Clean existing classes/rating */
						$newStarRatingMod = $newStarRatingMod.find('.star-wrapper').removeClass().addClass('star-wrapper rating-max-' + maxRating ).end();
						$newStarRatingMod = $newStarRatingMod.find('.rating').removeClass().addClass('rating rating-' + rating ).end();
						$newStarRatingMod.appendTo($(this));
					}
				});
			}
		};
		this.insertStarRating();

	
	});
})(jQuery);