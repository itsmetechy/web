
(function($){

  $.fn.extend({

    gallery: function (options) {

      var defaults = {
        mainImage: ".img"
      };

      options = $.extend(defaults, options);

      return this.each(function () {

        var thumbnail = $(this).find("a"),
            mainImage = $(this).siblings().find(options.mainImage);

        thumbnail.on("click", function (e) {
          e.preventDefault();
          var galleryImage = $(this).attr("href");
          mainImage.attr("src", galleryImage).css("background-color","green");
        });

      });

    }

  });

})(jQuery);
