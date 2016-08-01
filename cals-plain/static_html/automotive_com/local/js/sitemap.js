/* Javascript to create the sitemap, privacy and user content as modal dialogs */
jQuery(function () {
	(function() {
		var dialog = function(dialogContainer, width, height, cbFn, classname) {
			jQuery(dialogContainer).simpledialog({
				bgiframe: true,
				height: height,
				modal: true,
				dialogClass: classname,
				open: function() {
					if(typeof cbFn === 'function'){
						cbFn.call(this);
					}
				},
				width: width
			});
		};

		jQuery('.dialog-lnk').click(function (e) {
			e.preventDefault();
			switch(jQuery(this).attr('data-dialog')) {
				case 'sitemap':
					dialog( '#fed-sitemap', 900,'auto', function() {
						jQuery('.ui-dialog').removeClass('fed-privacy-dialog');
						jQuery('.ui-dialog').focus();
					},'fed-globalnav-jqueryui-dialog');
				break;

				case 'privacy':
					dialog( '#fed-privacypopup', 800,600, function() {
						jQuery("#fed-modalIframeId").attr("src", "http://privacy.sourceinterlinkmedia.com/");
						jQuery('.ui-dialog').addClass('fed-privacy-dialog');
						jQuery('.ui-dialog').focus();
					},'fed-globalnav-jqueryui-dialog');
				break;

				case 'usercontent':
					dialog( '#fed-usercontentpopup', 800,600, function() {
						jQuery("#fed-modalIframeUCId").attr("src", "http://privacy.sourceinterlinkmedia.com/submissions.html/");
						jQuery('.ui-dialog').removeClass('fed-privacy-dialog');
						jQuery('.ui-dialog').focus();
					},'fed-globalnav-jqueryui-dialog');
				break;
				
				case 'terms':
					dialog( '#fed-termspopup', 800,600, function() {
						jQuery("#fed-modalIframeTermsId").attr("src", "http://privacy.sourceinterlinkmedia.com/terms.html/");
						jQuery('.ui-dialog').removeClass('fed-privacy-dialog');
						jQuery('.ui-dialog').focus();
					},'fed-globalnav-jqueryui-dialog');
				break;
			}
		});

		if (jQuery('html').hasClass('ie6')) {
			jQuery('.fed-page-header-nav').find('li').hover(
				function() {
					jQuery(this).find('.fed-headernav-submenu').css('visibility', 'visible');
				},
				function() {
					jQuery(this).find('.fed-headernav-submenu').css('visibility', 'hidden');
				}
			);
			jQuery('#fed-sitemap').bgiframe();
			jQuery('#fed-privacypopup').bgiframe();
			jQuery('#fed-usercontentpopup').bgiframe();
		}
		
		/* search */
		$('.global-search-bg').on('click', '.global-search-btn', function () {
            searchAcom();
        });
        $('.global-search-bg input').keypress(function (e) {
            if (e.which == 13) {
                e.preventDefault();
                searchAcom();
            } 
        });
        function searchAcom() {
            window.s_objectID = 'HeaderSearch';
            var sCtrl = $('.global-search-bg input');
            sV = sCtrl.val();
            var isValidQuery = sCtrl.attr('placeholder') != sV && sV.length > 0;
            if (isValidQuery) {
                window.location = 'http://[env-var].automotive.com/search/results.html?q='+ encodeURIComponent(sV);						
            }
            else {
               	alert("Please enter search text");
            }
        }
	})();
});