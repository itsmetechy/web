(function() {
	$(function() {

		$(".mod-cars-sale-home #mod-cars-sale-search").click(function() {
			var success = true;
			var makeselect = $('.mod-cars-sale-home select[name="mod-cars-sale-make"]');
			var modelselect = $('.mod-cars-sale-home select[name="mod-cars-sale-model"]');
			
			var zipBox = $('.mod-cars-sale-home input.zipcode');			
			var zipcheck = checkZip(zipBox);
			
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
	
	//Check Zip Funciton
	function checkZip(zipBox) {
		var UsZipCodes = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
		var zipBoxVal = zipBox.val();
		
		if (!Modernizr.input.placeholder) {
			if(	zipBox.val() != zipBox.data('placeholder') ){
				var isfilledZip = UsZipCodes.test(zipBoxVal);
				if (!isfilledZip){
					zipBox.addClass('error');
					return false;
				}else{
					zipBox.removeClass('error');
					return true;
				}
			}else{
				zipBox.addClass('error');
				return false;
			}
		}else{
			if (zipBoxVal){
				var isfilledZip = UsZipCodes.test(zipBoxVal);
				if (!isfilledZip){
					zipBox.addClass('error');
					return false;
				}else{
					zipBox.removeClass('error');
					return true;
				}
			}else{
				zipBox.addClass('error');
				return false;
			}

		}
		
		
	};

})();

