/* Function for determining if a link is external
=========================================*/

var isExternalRegexClosure = (function(){
	var domainRe = /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i;

	return function(url) {
		function domain(url) {
		  return domainRe.exec(url)[1];  
		}

		return domain(location.href) !== domain(url);
	}
})();

$('nav a').each(function(){
	var href = $(this).attr(href);
});

/* auto add icons (or classes) for external & document links*/
/* auto add arrows for dropdowns */
/* account for off-screen dropdowns*/