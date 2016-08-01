/* Provides a polyfill (fallback) for column-count for IE 6-9 and Opera 10.6 and 11
*  Author: SB  9-20-2011
*  Version 1.0
*
*  Tested with jQuery 1.6.4 and jQuery UI 1.8.14.custom.min.js
*  Tested with: modernizr-2.0.6.custom.min.js
*  Dependencies: jQuery, jQueryUI, modernizr and the CSS tag group which is a clear fix for floats (see CSS and .js files in this directory)
*
*/

(function($) {
    $.widget('sim.columnizeUL', {
        options: {
            columnCount: 3
        },
        _create: function() {
            o = this.options;
            var colCount = o.columnCount;
            var liCount = $('li', this.element).size();
            var liPerColumn = Math.ceil(liCount / colCount);
            colCount = Math.ceil(liCount / liPerColumn);
            var colWidth = Math.floor(100 / colCount);
            var colWidthUnit = '%';
            var classname = this.element.attr('class');

            if (this.element.parent().width() > 0) {
                colWidth = Math.floor(this.element.parent().width() / colCount);
                colWidthUnit = 'px';
            }
            if (liCount > 0) {
                var $out = $('<div class="group"></div>');
                var cnt = 0,
                    ulHeight = 0;
                var $ul = 0;
                for (i = 0; i < colCount; i++) {
                    //for IE7 and IE8 and IE 9- reduce last column's width by 1 - wrapper div gets moved to new line
                    if (i == colCount - 1 && $.browser.msie && ($.browser.version == 7 || $.browser.version == 8 || $.browser.version == 9)) {
                        colWidth = colWidth - 2;
                    }

                    var $ul = $('<ul></ul>');
                    $ul.attr('class', this.element.attr('class'));
                    for (j = 0; j < liPerColumn; j++) {
                        if (cnt == liCount) {
                            break;
                        }
                        $li = $('li', this.element)[cnt];
                        var strLi = '<li class ="' + $li.className + '">' + $li.innerHTML + '</li>';
                        $ul.append($(strLi));
                        cnt++;
                    }


                    var $col = $('<div class="mod-cld-' + classname + '"' + 'style="float:left;width:' + colWidth + colWidthUnit + ';"></div>');
                    $col.append($ul);
                    $out.append($col);
                }
                this.element.replaceWith($out);

                //set the min-height of all the uls to the height of the first
                var firstDiv = $('.mod-cld-' + classname + ":first");
                var divMinHeight = firstDiv.innerHeight();

                var allULs = $('.mod-cld-' + classname);
                allULs.css('min-height', divMinHeight);

            }
        }
    });

    $(function() {
    //For browsers that do not support column-count (IE 7-9 and Opera 10.6 and Opera 11) for ols and ul creating floating uls to split
    //list into requested number of columns
    //example data-columncount="2" will split ul into two columns
    if (!Modernizr.csscolumns) {
        $('ul,ol').each(function() {
            var dataProp = 'columncount';
            var colCount = $(this).data(dataProp);
            if ($(this) != null && colCount != null && String(colCount) != 'undefined') {
                if (colCount > 1) {
                    $(this).columnizeUL({ columnCount: colCount });
                }
            }
        });


    }
    });
})(jQuery);


