 (function() {

    /*Dialog Functions*/
    $(function() {
        $(".mod-about-us #inqury-trigger, .mod-about-us #inquiry-trigger-too").click(function() {

            /*Hide the thanks wind and show input*/
            $('#send-popup').find('.main-form').show();
            $('#send-popup').find('.thanks').hide();

           //SB Below call to resetEmailErrors should be uncommented for K2DN as it is a function outside of this anonymous function that needs to be called
           // resetEmailErrors();

            /*Create-Show Popup*/
            var popup = $('#send-popup'),
                fxOverlay = $('.fx-overlay');

            if ($(this).hasClass('init')) {
                popup.show();
            } else {
                var windowWidth = $(window).width(),
                    windowHeight = $(window).height(),
                    popupLeft = ((windowWidth - popup.width()) / 2),
                    popupTop = ((windowHeight - popup.height()) / 2);
                popup.show();
                popup.css({
                    left: popupLeft,
                    top: popupTop
                });
                $(this).addClass('init');
                popup.appendTo('form');
                //$('body').append('<div class="simsd-overlay"></div>');
            }

            /*Create-Show Overlay*/
            if (!fxOverlay.length) {
                $('<div/>').addClass('fx-overlay').css({
                    height: $('body').height(),
                    left: 0,
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    zIndex: '2000000'
                }).appendTo('body');
            } else {
                fxOverlay.css('display', 'block');
            }

            return false;
        });

        $("body").delegate(".btn-close, .fx-overlay", "click", function() {
            var popup = $('.contact-popup'),
                simsdOverlay = $('.fx-overlay');

            // Clear out all the input, text, and select values in the form upon clos
            $.each($('.email-resize input,.email-resize textarea, .email-resize select'), function() {
                if (this.type !== 'button') {
                    $(this).val("");
                }
            });
            popup.hide();
            simsdOverlay.hide();
        });

    });
})();