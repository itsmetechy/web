(function() {
	$(function() {
		$('.mod-top-ten .top-ten-tabs li:first-child').addClass('selected');
		$('.mod-top-ten .top-ten-tabs span').click(function() {
			$('.mod-top-ten .top-ten-tabs li').removeClass('selected');
			$(this).parent().addClass('selected');
			
			$('.mod-top-ten .content-item').hide();
			var id = $(this).attr('rel');
			$('.mod-top-ten .content-item'+id).show();
		});
	});;
})();