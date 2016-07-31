$(document).ready(function () {
	    $('.mod-gallery-thumb a').each(function () {
        $(this).click(function () {
            var getimgPath = $(this).find('img').attr('src');
            $('#popupSlide').html(" ");
            $('#popupSlide').append('<div class="images"><img src= ' + getimgPath + ' class="images" /></div>');
            $('.mod-gallery-thumb ul li').removeClass('active');
            var totalImages = $('.mod-gallery-thumb ul li').length;
            $(this).parent().addClass('active');
            var getaltValue = $(this).parent().attr('alt');
            var storeValue = getaltValue - 1;
            if (storeValue == 0) {
                $('#Prev').hide();
            } else if (storeValue == totalImages) {
                $('#Next').hide();
            } else {
                $('#Prev,#Next').show();
            };
            openPopup();
        });
    });

    $('a.popupClose').click(function () {
        closePopup();
    });

    //adding dynamic alt value
    $('.mod-gallery-thumb ul li').each(function () {
        var indexValue = $(this).index()
        $(this).attr('alt', indexValue + 1);
    });

    //setting and storing Values
    $('.mod-gallery-thumb ul li:first').addClass('active');
    var next = $('#Next');
    var prev = $('#Prev');
    var imgWidth = $('.slideCaptionWrap').width();
    var totalImages = $('.mod-gallery-thumb ul li').length;

    function btnAction() {
        var getaltValue = $('.mod-gallery-thumb ul li.active').attr('alt');
        var storeValue = getaltValue;
        if (storeValue == 1) {
            prev.show();
        } else if (storeValue == totalImages) {
            next.show();
        };
    };

    function animateAction() {
        //$('.mod-gallery-thumb ul li').removeClass('active');
        
        var nextImgPath = $active.find('img').attr('src');
        $('#popupSlide').html(" ");
        $('#popupSlide').append('<div class="images"><img src= ' + nextImgPath + ' class="images" /></div>');
//        var count = $active.attr('alt') - 1;
//        var sliderposition = count * imgWidth;
//        $('.mod-gallery-thumb ul').animate({
//            'left': -sliderposition
//        }, 500);
        btnAction();
    };
    next.click(function () {
        $active = $('.mod-gallery-thumb ul li.active');
		//$active.length?$active.next():$active.parent().children(':first').addClass('active');
		var nextSldier = $cuactiverrent.next().length?$active.next():$active.parent().children(':first')
        animateAction();
        btnAction();
        prev.show();
    });

    prev.click(function () {
        $active = $('.mod-gallery-thumb ul li.active').prev();
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

function popup() {
    var wWidth = $(window).width();
    var wHeight = $(window).height();
    var $this = $('.mod-gallery-thumb a');
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

});