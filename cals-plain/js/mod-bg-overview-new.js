(function() {
	$(function($) {
		var vehicleTab={capsule:"Enable",roadtest:"Enable",firstdrive:"disable",quickdrive:"disable",firstlook:"disable"}
		var setActiveTab = false;
		for (var className in vehicleTab) {
			if (vehicleTab[className] == "Enable" && setActiveTab == false) {
				$('.'+className).addClass('selected');
				setActiveTab = true;
			}
			if (vehicleTab[className] == "disable") {
				$('.'+className).addClass('disable');
			}
		}
	
		/* Tab Content */
		$(".mod-tabbed-container ul.tab > li").click(function() {
			if(!$(this).hasClass("selected")){
				var thisClass = $(this).attr("class");
				$(".mod-tabbed-container .tab li").removeClass('selected');
				$(this).addClass('selected');
				bGuideRefreshAds();
			}
		});		
		$(".mod-tabbed-container .tab li.disable").off('click');
		
		/* DATA ATTRIBUTE */
		var vehicleInformation={capsule:"data-pubArticleId=1120,data-PubArticleSlug=mdx,data-slug=capsule",roadtest:"data-pubArticleId=11201,data-PubArticleSlug=mdx1",firstdrive:"data-pubArticleId=1120firstdrive,data-PubArticleSlug=mdxfirstdrive,data-slug=firstdrive",quickdrive:"data-pubArticleId=1120quickdrive,data-PubArticleSlug=mdxquickdrive,data-slug=quickdrive",firstlook:"data-pubArticleId=1120firstlook,data-PubArticleSlug=mdxfirstlook,data-slug=firstlook"}
		for (var vehicleInfo in vehicleInformation) {
			var vehicleInfoContent = vehicleInformation[vehicleInfo]; 
			var vehicleInfoArray = vehicleInfoContent.split(",");
			for(i=0;i<vehicleInfoArray.length;i++){
				var vehicleInfoArrayContent = vehicleInfoArray[i].split("=")
				$(".mod-tabbed-container ul.tab > li."+vehicleInfo).attr(vehicleInfoArrayContent[0],vehicleInfoArrayContent[1])
			}
		}
	});
})(jQuery);