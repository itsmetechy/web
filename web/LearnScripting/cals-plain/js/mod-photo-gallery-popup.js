 $(document).ready(function () {
	 
	 //initialize images
     var getLength = $('.mod-gallery-thumb a img').length;
     $('.mod-gallery-thumb a img').each(function () {
         var getImgPath = $(this).attr('src');
         for (i = 1; i <= getLength; i++) {}
         $('#popupSlide').append('<div class="images"><img src= ' + getImgPath + ' class="popupImg" /></div>');
		 var getHeight = $('#popupSlide').height();
		  var getWidth = $('#popupSlide').width();
		 $('#popupSlide div.images').css({
			height:getHeight,
			width:getWidth
		 });
     })
     $('a.popupClose').click(function () {
         closePopup();
     });
	 
     //adding dynamic alt value
  	$('#popupSlide div.images').each(function(){
		var indexValue = $(this).index()	
		$(this).attr('alt',indexValue+1);
	});
	
	//setting and storing Values
	$('#popupSlide div.images:first').addClass('active');
	var next = $('#Next');
	var prev = $('#Prev');
	var imgWidth = $('.slideCaptionWrap').width();
	var totalImages = $('#popupSlide div.images').length;
	var sliderWidth = imgWidth * totalImages;
	$('#popupSlide').css('width',sliderWidth);
	
	function btnAction(){
	var getaltValue = $('#popupSlide div.images.active').attr('alt');
	var storeValue = getaltValue;	
	if(storeValue == 1){
		prev.hide();	
	}else if(storeValue == totalImages){
		next.hide();	
		};
	};
	function animateAction(){
        $('#popupSlide div.images').removeClass('active');  
        $active.addClass('active'); 
        var count = $active.attr('alt') -1;                       
        var sliderposition = count * imgWidth;               
        $('#popupSlide').animate({'left': -sliderposition}, 500); 	
	};
	next.click(function(){
		$active = $('#popupSlide div.images.active').next();
		animateAction();
		btnAction();     
		prev.show();	
	});
	
	prev.click(function(){
		$active = $('#popupSlide div.images.active').prev(); 
		animateAction();
		btnAction();
		next.show();  
	});
	btnAction();
     /*Close Dialog*/
     $('body').on('click', '.mod-gallery-popup', function (event) {
         closePopup();
     });
 });
 /*Move gallery with keyboard*/
	$(document).keydown(function(e) {
		if (e.which == 37) {  // Left arrow key code
			$('#Prev').click();
		}
		else if (e.which == 39) {  // Right arrow key code
			$('#Next').click();
		}
	});
  function popup() {
     var wWidth = $(window).width();
     var wHeight = $(window).height();
     var $this = $('.mod-gallery-thumb a');
     $this.live('click', function (e) {
         e.preventDefault()
         $('.mod-gallery-popup').css({
             height: wHeight,
             width: wWidth
         })
         openPopup();
     })
 }
 popup();
 function openPopup() {
     $('.mod-gallery-popup').fadeIn();
     $('.popupWrap').fadeIn();
 }

 function closePopup() {
     $('.mod-gallery-popup').fadeOut();
     $('.popupWrap').fadeOut();
 }
 