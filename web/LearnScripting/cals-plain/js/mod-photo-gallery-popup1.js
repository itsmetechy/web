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
 $(document).ready(function () {
     var getLength = $('.mod-gallery-thumb a img').length;
     $('.mod-gallery-thumb a img').each(function () {
         var getImgPath = $(this).attr('src');
         for (i = 1; i <= getLength; i++) {}
         $('#popupSlide').append('<img src= ' + getImgPath + ' class="popupImg" width="952" height="613" />');
     })
     $('a.popupClose').click(function () {
         closePopup();
     });
     //adding dynamic alt value
  	$('#popupSlide img').each(function(){
		var indexValue = $(this).index()	
		$(this).attr('alt',indexValue+1);
	});
	//setting and storing Values
	$('#popupSlide img:first').addClass('active');
	var next = $('#Next');
	var prev = $('#Prev');
	var imgWidth = $('.slideCaptionWrap').width();
	var totalImages = $('#popupSlide img').length;
	var sliderWidth = imgWidth * totalImages;
	$('#popupSlide').css('width',sliderWidth);
	
	function btnAction(){
	var getaltValue = $('#popupSlide img.active').attr('alt');
	//var lastaltValue = $('.slider img:last').attr('alt');
	var storeValue = getaltValue;	
	if(storeValue == 1){
		prev.hide();	
	}else if(storeValue == totalImages){
		next.hide();	
		};
	};
	function animateAction(){
        $('#popupSlide img').removeClass('active');  
        $active.addClass('active'); 
        var count = $active.attr('alt') -1;                       
        var sliderposition = count * imgWidth;               
        $('#popupSlide').animate({'left': -sliderposition}, 500); 	
	};
	next.click(function(){
		$active = $('#popupSlide img.active').next();
		animateAction();
		btnAction();     
		prev.show();	
	});
	
	prev.click(function(){
		$active = $('#popupSlide img.active').prev(); 
		animateAction();
		btnAction();
		next.show();   
	});
	btnAction();
     /*Close Dialog*/
     $('body').on('click', '.mod-gallery-popup', function (event) {
         closePopup();
     });
 })