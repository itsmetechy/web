(function() {
	$(function($) {
	
		reviewDisplayed = false
		$('.mod-mini-social .mod-tabs li').each(function(){
			var thisClass = $(this).attr("class");
			if ($("#"+thisClass).is(':empty') || !$.trim($("#"+thisClass).html())) {
				$("."+thisClass).addClass('disable');
			}else{
				if(reviewDisplayed == false){
					$("#"+thisClass).show();
					$(this).addClass('expand');
					reviewDisplayed = true
				}
			}
		});
		
		$('.mod-mini-social .mod-tabs li').click(function() {	
		if(!$(this).hasClass("expand")){
				var thisClass = $(this).attr("class");	
				$(".tabcontent").hide();
				$("#"+thisClass).show();
				$('.mod-mini-social .mod-tabs li').removeClass('expand').find('.hdr-txt').hide();
				$(this).addClass('expand').find('.hdr-txt').show();		
		}
		});
				$(".mod-mini-social .mod-tabs li:last").off('click');
	});
})(jQuery);

