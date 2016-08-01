jQuery(function(){
	"use strict";
	/*
	Object for this module
	 */
	var modCpoDrillCompare = {};
	(function($, cpo){

		cpo.init = function(){
			this.setSelectors();
			this.setEvents();
		};
		cpo.setSelectors = function(){
			this.$changeVehicleBtn = $('.mod-cpo-drill-compare').find('.change-vehicle-btn');
		};
		cpo.setEvents = function(){
			this.$changeVehicleBtn.on('click', function(e){
				/*
				Show the hidden YMM options
				 */
				e.preventDefault();
				$(e.currentTarget).toggleClass('change-vehicle-btn-active').parent().children('.change-vehicle-options').toggle();
			});
		};
		return cpo.init();
	})(jQuery, modCpoDrillCompare);
});
