(function($){
	$.fn.helloworld = function(options){
		var settings = $.extend({
			text: 'first jquery plugin',	
			color: 'red',
			fontStyle : null,
			complete: null
		},options);
		return this.each(function(){
		$(this).text(settings.text);
		if ( $.isFunction( settings.complete ) ) {
        settings.complete.call( this );
    }
	})	;
	}
	}(jQuery));