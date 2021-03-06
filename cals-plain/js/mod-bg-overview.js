(function() {
	$(function($) {
		/* Disable Tab and Set Default Tab */
		reviewDisplayed = false
		$("ul.tab > li").each(function(){
			var thisClass = $(this).attr("class");
			if ($("#"+thisClass).is(':empty') || !$.trim($("#"+thisClass).html())) {
				$("."+thisClass).addClass('disable');
			}else{
				if(reviewDisplayed == false){
					$("#"+thisClass).show();
					$(this).addClass('selected');
					reviewDisplayed = true
				}
			}
		});
		/* Coming Soon text for Diabled Links 
		var storedtext;
		$('.mod-tabbed-container li.disable').hover(
			function() { 
				storedtext = $(this).html();
				$(this).html('Coming Soon'); 
			},
			function() { $(this).html(storedtext); }
		);*/
		
		/* Tab Content */
		$(".mod-tabbed-container ul.tab > li").click(function() {
			if(!$(this).hasClass("selected")){
				var thisClass = $(this).attr("class");
				$(".tabContent").hide();
				$("#"+thisClass).show();
				$(".mod-tabbed-container .tab li").removeClass('selected');
				$(this).addClass('selected');
				bGuideRefreshAds();
			}
		});		
		$(".mod-tabbed-container .tab li.disable").off('click');
	});
})(jQuery);