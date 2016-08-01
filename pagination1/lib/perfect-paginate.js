$(document).ready(function () {
    
    var $pagination = $('.pagination');
    var $lis = $pagination.find('li:not(#prev, #next)');
    var itemsPerPage = 5;
    $lis.filter(':gt(4)').hide();
    $lis.filter(':lt('+itemsPerPage+')').addClass('active');

    
    var $next = $("#next").click(function () {
        var idx = $lis.index($lis.filter('.active:last')) || 0;
        var $toHighlight = $lis.slice(idx + 1, idx + 6);
        if ($toHighlight.length < itemsPerPage) {
            $next.hide();
        }else{
            $prev.show();
        }
        
        $lis.filter('.active').removeClass('active').hide();
        $toHighlight.show().addClass('active')
    });
    
    var $prev = $("#prev").click(function () {
        var idx = $lis.index($lis.filter('.active:first')) || 0;
        var start = idx < itemsPerPage ? 0 : idx - itemsPerPage;
        var $toHighlight = $lis.slice(start, start + itemsPerPage);
        if (idx == itemsPerPage) {
            $prev.hide();
        }else{
            $next.show();
        }
        
        $lis.filter('.active').removeClass('active').hide();
        $toHighlight.show().addClass('active');
    });
        var idx = $('.active:last').index();
        if (idx == itemsPerPage) {
            $prev.hide();
        }
    
}); 