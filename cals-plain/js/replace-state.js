var acomHotlistSingle = acomHotlistSingle || {};
var itemId;

jQuery(function() {
    (function($, hl) {
        "use strict";
        var loadingAds = false;
        hl.init = function() {
            hl.setSelectors();
            hl.setEvents();
            hl.buildPaginationButtons();
        };

        hl.setSelectors = function() {
            hl.$researchItems = $('.research-item');
            // Pagination, used to clone all page numbers
            hl.$btnBlockItemClone = $('.btnclone');
            hl.$researchVehicle = $('.learn-more');
            $(".research-item").each(function() {
                $(this).children().find("a.gallery-link").prepend("<span class='mod-prev'>Prev</span><span class='mod-next'>Next</span>");
            });
        };

        hl.setEvents = function() {
            hl.$btnBlockItemClone.on('click', $.proxy(hl.goToPage, this));
            $('.mod-prev').on('click', function() {
                if (!$(this).hasClass("modBtnDisabled")) {
                    itemId = $("ul.mod-pager li.btnclone.modBtnDisabled").index() - 2;
                    showHotList();
                    if ($(this).text() == "Prev")
                        omnitureTrackInner('Features:Hot Lists:Article Detail:MainImage:PrevImage');
                    else
                        omnitureTrackInner('Features:Hot Lists:Article Detail:Pagination:PrevPage');
                    return false;
                }
            });

            $('.mod-next').on('click', function() {
                //if (!$(this).hasClass("modBtnDisabled")) {
                if (!$(this).hasClass("modBtnDisabled") && !$(this).hasClass("nextArticleTrigger")) {
                    itemId = $("ul.mod-pager li.btnclone.modBtnDisabled").index();
                    showHotList();
                    if ($(this).text() == "Next")
                        omnitureTrackInner('Features:Hot Lists:Article Detail:MainImage:NextImage');
                    else
                        omnitureTrackInner('Features:Hot Lists:Article Detail:Pagination:NextPage');
                    return false;
                }
            });

            $("ul.mod-pager li.mod-next.nextArticleTrigger").live({
                mouseenter:
				   function() {
				       $("div.nextArticleTitleBox").stop(true, true).fadeIn();
				   },
                mouseleave:
				   function() {
				       //$("a.nextArticleTitleBox").fadeOut();
				       $("div.nextArticleTitleBox").stop(true, true).fadeOut();
				   }
            });

            hl.$researchVehicle.on('click', function(e) {
                var href = $(e.currentTarget).parent().find('h3 a').attr('href');
                if (href != null && href != undefined)
                    window.location.href = href;
            });

            $('.viewall').on('click', function(e) {
                var href = $(e.currentTarget).data('href');
                if (href != null && href != undefined)
                    window.location.href = href;
            });

            $('.nextArticleTitleBox').on('click', function(e) {
                var href = $(e.currentTarget).find('a').attr('href');
                if (href != null && href != undefined)
                    window.location.href = href;
            });

            $('.nextArticleLink').on('click', function(e) {
                var href = $(e.currentTarget).data('href');
                if (href != null && href != undefined)
                    window.location.href = href;
            });
        };

        hl.goToPage = function(event) {
            itemId = $(event.currentTarget).data('item-id');
            omnitureTrackInner('Features:Hot Lists:Article Detail:Pagination:Page[Page' + (itemId + 1) + ']');
            showHotList();
        };

        function showHotList() {
            $("ul.mod-pager li.mod-next").removeClass("nextArticleTrigger")
            $("ul.mod-pager li,.research-item a.gallery-link span").removeClass("modBtnDisabled");
            $("ul.mod-pager li.btnclone").eq(itemId).addClass("modBtnDisabled");
            if (itemId == 0) {
                $('.mod-prev').addClass("modBtnDisabled")
                $(".mod-next .btn-inner a").css('display', 'none');
                $(".mod-next span.nextPager").css('display', 'block');
            } else if (itemId == $('.research-item').size() - 1) {
                $('.mod-next').addClass("modBtnDisabled")
                $("ul.mod-pager li.mod-next").removeClass("modBtnDisabled")
                $(".mod-next span.nextPager").css('display', 'none');
                $(".mod-next .btn-inner a").css('display', 'block');
                $("ul.mod-pager li.mod-next").addClass("nextArticleTrigger")
            } else {
                $('.mod-prev,.mod-next').removeClass("modBtnDisabled");
                $(".mod-next .btn-inner a").css('display', 'none');
                $(".mod-next span.nextPager").css('display', 'block');
            }
            var spnItem = 'span[data-Index="' + (itemId + 1) + '"]';
            $('.research-item-active').removeClass('research-item-active');
            hl.$researchItems.eq(itemId).addClass('research-item-active');
            //Load ADS
            hl.loadAds(jQuery(document).find(spnItem));
        };

        hl.buildPaginationButtons = function() {
            var i = 1; //Page number
            this.$researchItems.each(function(index, value) {
                //item-id used to show and hide all research items
                hl.$btnBlockItemClone.clone(true, true).
						data('item-id', index).
						find('.btn-inner').
						html((i)).
					end().
					insertAfter('.btnclone:last');
                i++;
            });
            this.$btnBlockItemClone.remove();
            $("ul.mod-pager li.btnclone:first").addClass("modBtnDisabled");
            $('.mod-prev').addClass("modBtnDisabled");
        };

        hl.loadAds = function(value) {
            loadingAds = true;

            var test_val = false;
            var ord_val = Math.floor(Math.random() * 89999) + 10000;
            $('.dart_ad').each(function() {
                var iframe = $(this);
                var url = iframe.attr('src');
                if (url.indexOf('#') != -1) {
                    url = url.substr(0, url.indexOf('#'));
                }
                url = url.replace(/ord=([a-z1-9_-]*);/gi, "ord=" + ord_val + ";");
                url = url.replace(/bodystyle=([a-z1-9_-]*);/gi, "bodystyle=" + value.data('bodystyle') + ";");
                url = url.replace(/class=([a-z1-9_-]*);/gi, "class=" + value.data('class') + ";");
                url = url.replace(/make=([a-z1-9_-]*);/gi, "make=" + value.data('make') + ";");
                url = url.replace(/model=([a-z1-9_-]*);/gi, "model=" + value.data('model') + ";");
                url = url.replace(/year=([a-z1-9_-]*);/gi, "year=" + value.data('year') + ";");
                url = url.replace(/trim=([a-z1-9_-]*);/gi, "trim=" + value.data('trim') + ";");
                iframe.removeAttr('style');
                iframe.get(0).contentWindow.location.replace(url);
                setTimeout(function() { test_val = false; }, 100);
            });

            setTimeout(function() { loadingAds = false; }, 3000);
        };

        return (hl.init());
    })(jQuery, acomHotlistSingle);

});