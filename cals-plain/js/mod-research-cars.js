(function() {
	$(function() {

		$(".mod-research-cars #mod-research-continue").click(function() {
			var success = true;
			var makeselect = $('.mod-research-cars select[name="mod-research-make"]');
			var modelselect = $('.mod-research-cars select[name="mod-research-model"]');
			
			if( makeselect.val() == 'default'){
				success = false;
				makeselect.addClass('error');
			}else{
				makeselect.removeClass('error');
			}
			if( modelselect.val() == 'default'){
				success = false;
				modelselect.addClass('error');
			}else{
				modelselect.removeClass('error');
			}
			if( success ){
				alert('submit');
			}else{
				return false;
			}
		});

	});
})();

