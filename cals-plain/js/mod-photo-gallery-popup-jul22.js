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
         $('#popupSlide').append('<img src= ' + getImgPath + ' class="popupImg" />');
         $('#popupSlide img:first').addClass('show');
     })
     $('a.popupClose').click(function () {
         closePopup();
     });
     $('#popupSlide img.popupImg').hide();
     $('#popupSlide img.popupImg:first').show();
     $('#Next').click(function () {
         var current = $('#popupSlide img.show');
         var next = current.next().length ? current.next() : current.parent().children(':first');
         current.hide().removeClass('show');
         next.fadeIn().addClass('show');
     });
     $('#Prev').click(function () {
         var current = $('#popupSlide img.show');
         var prevImg = current.prev().length ? current.prev() : current.parent().children(':last');
         current.hide().removeClass('show');
         prevImg.fadeIn().addClass('show');
     });
     /*Close Dialog*/
     $('body').on('click', '.mod-gallery-popup', function (event) {
         closePopup();
     });
 })