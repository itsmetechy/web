//color highlighter
(function ($) {
    $.fn.fontHightlighted = function (options) {
        var settings = $.extend({
            color: 'yellow',
            backgroundColor: 'red'
        }, options);

    };


    //truncate
    $.fn.truncate = function (selector, max) {
        var selector = $(this),
            originalStr = selector.text(),
            oLength = originalStr.length,
            strLength = max,
            newString = '';
        if (oLength > strLength) {
            newString = originalStr.substring(0, strLength) + '...';
            selector.text(newString);
        }
        
};
}(jQuery));