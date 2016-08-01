$(document).ready(function () {
    
    var $pagination = $('.pagination');
    var $lis = $pagination.find('li:not(#prev, #next)');  //selecting all lis except prev & next
    var itemsPerPage = 4; //fixed page show
    $lis.eq(itemsPerPage).nextAll().not('#next').hide().andSelf().addClass('active');
    var totalItems = $lis.length;
    var totalPages = Math.ceil(totalItems/itemsPerPage);
    //$lis.filter(':lt('+itemsPerPage+')').addClass('active');

    
    var $next = $("#next").click(function (e) {
        e.preventDefault;
        var idx = $lis.index($lis.filter('.active:last')) || 0;
        var $toHighlight = $lis.slice(idx + 1, idx + 6);
        if ($toHighlight.length == 0) {
            $prev.show();
            return;
        }
        
        $next.show();        
        $lis.filter('.active').removeClass('active').hide();
        $toHighlight.show().addClass('active')
    });
    
    var $prev = $("#prev").click(function (e) {
        e.preventDefault;
        var idx = $lis.index($lis.filter('.active:first')) || 0;
        var start = idx < 4 ? 0 : idx - 4;
        var $toHighlight = $lis.slice(start, start + 5);
        if ($toHighlight.length == 0) {
            $prev.hide();
            return;
        }      
        
        $next.show();
        $lis.filter('.active').removeClass('active').hide();
        $toHighlight.show().addClass('active')
    });
    
}); 