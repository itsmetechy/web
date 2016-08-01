/**
 * facebook
 * @link {https://developers.facebook.com/docs/reference/plugins/like/}
 */
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/**
 * twitter
 * @link {https://dev.twitter.com/docs/tweet-button}
 */
!function(d,s,id){
	var js,fjs=d.getElementsByTagName(s)[0];
	if(!d.getElementById(id)){
		js=d.createElement(s);
		js.id=id;
		js.src="//platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js,fjs);
	}
}(document,"script","twitter-wjs");

/**
 * google plus
 * @link {http://www.google.com/webmasters/+1/button/}
 */ 
(function() {
    var po = document.createElement('script'); 
    po.type = 'text/javascript'; 
    po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0]; 
	s.parentNode.insertBefore(po, s);
})();