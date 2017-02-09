/* EXTERNAL LINK WARNING
  (Uncomment only if needed)
=========================================*
	$('nav a').on('click', function(e){
		e.preventDefault();
		var url = $(this).attr('href'),
			host = location.host;
		if (url.indexOf(host) > -1 || url.indexOf('http','https') == -1){
			window.location.href = url;
		} else {
			var warn = confirm('By accessing this link you will be leaving our website.  Although we have approved this as a reliable business partner we are not responsible for the product, service, website links or overall website content available at the website you are preparing to visit.  \n\n Click \'OK\' to continue, \'Cancel\' to go back.');
			if(warn == true) {
				window.location.href = url,'_blank';
			} else {
				e.preventDefault;
			}
		}
	});
*/

/* ADD CLASS TO NAV ITEMS WITH DROPDOWNS
=========================================*/
$('#main-nav li:has(ul)').addClass('nav-parent');

/* ENSURE MAIN NAV DOES NOT GO OFF SCREEN
=========================================*/
$(document.body).on('mouseover', 'nav li', function(event) {
	if($('>ul', this).length) {
		var windowWidth = $(window).width(),
			menuWidth = $('>ul', this).outerWidth(),
			parentWidth = $('>ul', this).parent().outerWidth(),
			parentOffset = $('>ul', this).parent().offset();

		if((menuWidth + parentOffset.left + parentWidth) > windowWidth) {
			$('>ul', this).addClass('menu-reposition');
		} else {
			$('>ul', this).removeClass('menu-reposition');
		}
	}
});


/* MEASURE NAV WIDTH & SEE IF MOBILE NAV SHOULD BE USED
=========================================*/
function mobilenavToggle(){

	// Reset things that shouldn't be present in desktop view
	$('.mobile-dropdown-back, .mobile-close, .parent-link').remove();
	$('#hamburger').hide();
	$('#main-nav').removeClass('nav-mobile').addClass('nav-desktop');

	// Measure
	var a = $('#main-nav').width(),
		b = $('#main-nav ul').width();

	// Toggle nav style
	if (b>a){
		$('#main-nav').removeClass('nav-desktop').addClass('nav-mobile');
		$('#hamburger').show().css('display','block');
	}

}
// RUN ON LOAD
mobilenavToggle();
// Also runs within window-resize-functions.js

/* OPEN MOBILE NAV
=========================================*/
$(document.body).on('click', '#hamburger', function(event) {
	event.preventDefault();
	$('.nav-mobile').css('left','0');
	// Add close button
	$('.nav-mobile').prepend('<a href="#" class="mobile-close">CLOSE</a>');
});

/* CLOSE MOBILE NAV
=========================================*/
$(document.body).on('click', '.mobile-close', function(event) {
	event.preventDefault();
	$('.mobile-dropdown-back, .mobile-close').remove();
	$('.nav-mobile').css('left','');
});

/* MOBILE NAV OPEN DROPDOWN
=========================================*/
$(document.body).on('click', '.nav-mobile .nav-parent > a', function(event) {

	event.preventDefault();

	var title = $(this).text(),
		href = $(this).attr('href');

	if(!$(this).hasClass('nav-only-page')){
		console.log('blam');
		// Add parent link to sub-menu
		$(this).parent().find('>ul').prepend('<li class="parent-link"><a href="'+href+'">'+title+'</a></li>');
	}

	// Add back button
	$(this).parent().find('>ul').prepend('<a href="#" class="mobile-dropdown-back">BACK</a>');
	// Add title & animate
	$(this).parent().find('>ul').prepend('<div class="mobile-dropdown-title">'+title+'</div>').css('left','0');

});

/* MOBILE NAV CLOSE DROPDOWN
=========================================*/
$(document.body).on('click', '.mobile-dropdown-back', function(event) {
	$(this).parent().css('left','');
	var passThis = this
	setTimeout(function(){
		$(passThis).parent().find('.mobile-dropdown-title, .parent-link').remove();
		$(passThis).remove();
	}, 500);	
	event.preventDefault();
});