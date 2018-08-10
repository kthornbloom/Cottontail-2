/** Update icon code **/
$('.ico').each(function(){
	var lastClass = $(this).attr('class').split(' ').pop(),
		thisId = $(this).attr('id');
	$(this).replaceWith('<svg class="icon" id="'+thisId+'"><use xlink:href="images/sprite.svg#'+lastClass+'"></use></svg>')
});

/** SVG 4 Everybody Below (polyfills crap browsers) **/
!function(root, factory) {
	"function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
	define([], function() {
		return root.svg4everybody = factory();
	}) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
	// only CommonJS-like environments that support module.exports,
	// like Node.
	module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
	/*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
	function embed(parent, svg, target) {
		// if the target exists
		if (target) {
			// create a document fragment to hold the contents of the target
			var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
			// conditionally set the viewBox on the svg
			viewBox && svg.setAttribute("viewBox", viewBox);
			// copy the contents of the clone into the fragment
			for (// clone the target
			var clone = target.cloneNode(!0); clone.childNodes.length; ) {
				fragment.appendChild(clone.firstChild);
			}
			// append the fragment into the svg
			parent.appendChild(fragment);
		}
	}
	function loadreadystatechange(xhr) {
		// listen to changes in the request
		xhr.onreadystatechange = function() {
			// if the request is ready
			if (4 === xhr.readyState) {
				// get the cached html document
				var cachedDocument = xhr._cachedDocument;
				// ensure the cached html document based on the xhr response
				cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
				cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
				xhr._embeds.splice(0).map(function(item) {
					// get the cached target
					var target = xhr._cachedTarget[item.id];
					// ensure the cached target
					target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
					// embed the target into the svg
					embed(item.parent, item.svg, target);
				});
			}
		}, // test the ready state change immediately
		xhr.onreadystatechange();
	}
	function svg4everybody(rawopts) {
		function oninterval() {
			// while the index exists in the live <use> collection
			for (// get the cached <use> index
			var index = 0; index < uses.length; ) {
				// get the current <use>
				var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
				if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), 
				svg && src) {
					if (polyfill) {
						if (!opts.validate || opts.validate(src, svg, use)) {
							// remove the <use> element
							parent.removeChild(use);
							// parse the src and get the url and id
							var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
							// if the link is external
							if (url.length) {
								// get the cached xhr request
								var xhr = requests[url];
								// ensure the xhr request exists
								xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
								xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
								xhr._embeds.push({
									parent: parent,
									svg: svg,
									id: id
								}), // prepare the xhr ready state change event
								loadreadystatechange(xhr);
							} else {
								// embed the local id into the svg
								embed(parent, svg, document.getElementById(id));
							}
						} else {
							// increase the index when the previous value was not "valid"
							++index, ++numberOfSvgUseElementsToBypass;
						}
					}
				} else {
					// increase the index when the previous value was not "valid"
					++index;
				}
			}
			// continue the interval
			(!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
		}
		var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
		polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
		// create xhr requests object
		var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
		// conditionally start the interval if the polyfill is active
		polyfill && oninterval();
	}
	function getSVGAncestor(node) {
		for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
		return svg;
	}
	return svg4everybody;
});
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
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
	$('#home-header').removeClass('home-header-mobile');
	$('.nav-mobile ul').css('transition','');
	$('#main-nav').removeClass('nav-mobile').addClass('nav-desktop').css('transition','');

	// Measure
	var a = Math.ceil($('#main-nav').width()),
		b = Math.ceil($('#main-nav ul').width());
 console.log(a+' '+b);
	// Toggle nav style
	if (b>a){
		$('#main-nav').removeClass('nav-desktop').addClass('nav-mobile');
		$('#hamburger').show().css('display','inline-block');
		$('#home-header').addClass('home-header-mobile');
		setTimeout(function(){
			$('.nav-mobile ul').css('transition','.4s');
		}, 100);
	}

}
// RUN ON LOAD
setTimeout(function(){
	mobilenavToggle();
}, 500);
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
(function($, sr) {
	var debounce = function(func, threshold, execAsap) {
			var timeout;

			return function debounced() {
				var obj = this,
					args = arguments;

				function delayed() {
					if (!execAsap)
						func.apply(obj, args);
					timeout = null;
				};

				if (timeout)
					clearTimeout(timeout);
				else if (execAsap)
					func.apply(obj, args);

				timeout = setTimeout(delayed, threshold || 100);
			};
		}
		// smartresize
	jQuery.fn[sr] = function(fn) {
		return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
	};

})(jQuery, 'smartresize');


// On resize (with delay)
$(window).smartresize(function() {
	$('.mobile-table').removeClass('mobile-table');
	tableChecker();
	mobilenavToggle();
});
$(document.body).on('click', '.accordion-topic', function(event) {
	$(this).next('.accordion-result').slideToggle();
	$(this).toggleClass('accordion-open');
	event.preventDefault();
});
$('.carousel').each(function(){
	$(this).wrap('<div class="carousel-wrap"></div>');
	$(this).parent().append('<div class="carousel-buttons-wrap"><a href="#" class="carousel-prev"></a><a href="#" class="carousel-next"></a></div>');
});

$(document).on("click", ".carousel-next", function (event) {

	event.preventDefault();

	var liHeight = $(this).parents('.carousel-wrap').find('.carousel li:last').height();

	$(this).parents('.carousel-wrap').find('.carousel li:last').css({
		'width':'0',
		'height': liHeight+'px'
	}).prependTo($(this).parents('.carousel-wrap').find('.carousel'));

	$(this).parents('.carousel-wrap').find('.carousel li:first').offset();
	$(this).parents('.carousel-wrap').find('.carousel li:first').css('width','');
	var that = this;
	setTimeout(function(){
		$(that).parents('.carousel-wrap').find('.carousel li:first').css('height','');
	}, 250);
	
});

$(document).on("click", ".carousel-prev", function (event) {

	event.preventDefault();

	var liHeight = $(this).parents('.carousel-wrap').find('.carousel li:first').height();

	$(this).parents('.carousel-wrap').find('.carousel li:first').offset();
	$(this).parents('.carousel-wrap').find('.carousel li:first').css({
		'width':'0',
		'height': liHeight+'px'
	});
	var that = this;
	setTimeout(function(){
		$(that).parents('.carousel-wrap').find('.carousel li:first').appendTo($(that).parents('.carousel-wrap').find('.carousel'));
		$(that).parents('.carousel-wrap').find('.carousel li').css({
			'width':'',
			'height':''
		});
	}, 250);
	
});
$('.document-list-search').on('input', function() {
	var searchParam = $(this).val();
	$(this).parents('.element-document-list').find('.document-list a').each(function(){
		if ($(this).text().search(new RegExp(searchParam, "i")) < 0) {
			$(this).css('display','none');
		} else {
			$(this).css('display','block');
		}
	});
});
$('.rating-widget').on('click','.star',function(event){
	var i = $(this).index(),
  		i = i+1;
  $(this).parent().find('input').attr('value',i);
  $(this).parent().find('.star').html('<svg class="icon"><use xlink:href="images/sprite.svg#icon-star-empty"></use></svg>');
  $(this).parent().find('.star:lt('+i+')').html('<svg class="icon"><use xlink:href="images/sprite.svg#icon-star-full"></use></svg>');
  event.preventDefault();
});

$(document).on('mouseover','.star',function(){
	var i = $(this).index(),
  		i = i+1;
  $(this).parent().find('.hovered').removeClass('hovered');
  $(this).parent().find('.star:lt('+i+')').addClass('hovered');
});

$(document).on('mouseout','.rating-widget',function(){
	$('.hovered',this).removeClass('hovered');
});
/* CLICK LINK WITH DATA-IMAGE-ZOOM
=========================================*/
$('a[data-image-zoom]').click(function(event) {
	event.preventDefault();

	/* GET PROPERTIES
	=========================================*/
	var largeImg = $(this).attr('href'),
		groupName = $(this).data('image-zoom');

	/* SET ID ON CLICKED LINK
	=========================================*/
	$(this).attr('id', 'image-zoom-active');

	/* ADD MODAL
	=========================================*/
	$('body').append("<div class='image-zoom-overlay'><div class='image-zoom' style='background-image:url("+largeImg+");'></div><div class='image-zoom-controls'><a href='#' id='regress-image-zoom'><svg class='icon'><use xlink:href='images/sprite.svg#icon-chevron-left' /></svg></a><a href='#' id='close-image-zoom'><svg class='icon'><use xlink:href='images/sprite.svg#icon-times' /></svg></a><a href='#' id='advance-image-zoom'><svg class='icon'><use xlink:href='images/sprite.svg#icon-chevron-right' /></svg></a></div>");
	$('.image-zoom-overlay').offset();
	$('.image-zoom-overlay').addClass('image-zoom-visible');

	/* DETERMINE IF PART OF A GROUP
	=========================================*/
	var groupTotal = $('a[data-image-zoom=' + groupName + ']').length;
	if (groupTotal > 1){
		$(".image-zoom").draggable();
	} else {
		$('#regress-image-zoom, #advance-image-zoom').remove();
	}
});


/* FN REMOVING OVERLAY
=========================================*/
function destroyImageZoom(){
	$('.image-zoom-overlay').removeClass('image-zoom-visible');
	setTimeout(function(){
		$('.image-zoom-overlay').remove();
	},250);
	$('#image-zoom-active').attr('id','');
}

$(document.body).on('click', '#close-image-zoom', function(event) {
	event.preventDefault();
	destroyImageZoom();
});

/* NEXT IMAGE
=========================================*/
function advanceImageZoom(){
	var groupName = $('#image-zoom-active').data('image-zoom'),
		groupTotal = $('a[data-image-zoom=' + groupName + ']').length,
		currentIndex = $('#image-zoom-active').index("[data-image-zoom=" + groupName + "]"),
		nextIndex = currentIndex + 1;
	/* At End */
	if (nextIndex >= groupTotal) {
		$('.image-zoom').animate({
			left: '-10%'
		}, 150, function(){
			$('.image-zoom').animate({
				left: '0%'
			}, 150);
		});
	} else {
		$('#image-zoom-active').attr('id','');
		$('.image-zoom').css('opacity','0');
		setTimeout(function(){
			$('.image-zoom').remove();
			$("[data-image-zoom=" + groupName + "]:eq(" + nextIndex + ")").attr('id', 'image-zoom-active');
			var nextImg = $("#image-zoom-active").attr('href');
			$('.image-zoom-overlay').prepend("<div class='image-zoom' style='background-image:url("+nextImg+");left:100%;'></div>");
			$('.image-zoom').animate({
				left: 0
			}, 150);
			$(".image-zoom").draggable();
		}, 250);
	}
}

$(document.body).on('click', '#advance-image-zoom', function(event) {
	event.preventDefault();
	advanceImageZoom();
});


/* PREV IMAGE
=========================================*/
function regressImageZoom(){
	var groupName = $('#image-zoom-active').data('image-zoom'),
		groupTotal = $('a[data-image-zoom=' + groupName + ']').length,
		currentIndex = $('#image-zoom-active').index("[data-image-zoom=" + groupName + "]"),
		nextIndex = currentIndex - 1;
	/* At End */
	if (nextIndex <= -1) {
		$('.image-zoom').animate({
			left: '10%'
		}, 150, function(){
			$('.image-zoom').animate({
				left: '0%'
			}, 150);
		});
	} else {
		$('#image-zoom-active').attr('id','');
		$('.image-zoom').css('opacity','0');
		setTimeout(function(){
			$('.image-zoom').remove();
			$("[data-image-zoom=" + groupName + "]:eq(" + nextIndex + ")").attr('id', 'image-zoom-active');
			var nextImg = $("#image-zoom-active").attr('href');
			$('.image-zoom-overlay').prepend("<div class='image-zoom' style='background-image:url("+nextImg+");left:-100%;'></div>");
			$('.image-zoom').animate({
				left: 0
			}, 150);
			$(".image-zoom").draggable();
		}, 250);
	}
}

$(document.body).on('click', '#regress-image-zoom', function(event) {
	event.preventDefault();
	regressImageZoom();
});

/* DRAG FUNCTION
=========================================*/
$.fn.draggable = function() {
  var offset = null;
  var start = function(e) {
    var orig = e.originalEvent;
    var pos = $(this).position();
    offset = {
      x: orig.changedTouches[0].pageX - pos.left,
      y: orig.changedTouches[0].pageY - pos.top
    };
  };
  var moveItem = function(e) {
    e.preventDefault();
    var orig = e.originalEvent;
    $(this).css({
      left: orig.changedTouches[0].pageX - offset.x
    });
  };
  var releaseItem = function(e){
	e.preventDefault();
	var currentLeft = parseInt($(this).css('left'), 10),
	  	windowWidth = $(window).width(),
		percentMoved = (currentLeft / windowWidth) * 100;
	if (percentMoved < -30) {
		advanceImageZoom();
	} else if (percentMoved > 30) {
		regressImageZoom();
	} else {
		$(this).animate({
			left: '0'
		}, 100);
	}
  };
  this.bind("touchstart", start);
  this.bind("touchmove", moveItem);
  this.bind("touchend", releaseItem);
};

$('.element-tabbed-content').each(function(){
	$(this).find('.tabs a:first').addClass('current-tab');
	$(this).find('.tab-page:first').show();
})

$('.element-tabbed-content').on('click',' .tabs a', function(event){
	event.preventDefault();
	var a = $(this).index();
	$(this).parents('.tabbed-wrapper').find('.current-tab').removeClass('current-tab');
	$(this).addClass('current-tab');
	$(this).parents('.tabbed-wrapper').find('.tab-page').hide();
	$(this).parents('.tabbed-wrapper').find('.tab-page:eq('+a+')').show();
})
/* Responsive Tables
========================================= */
// Add wrapper to tables, this helps us know if they're getting too big
$('.addon-text table').wrap('<div class="rt-wrap"></div>');

// Does the table have a heading?
$('.addon-text table').each(function() {
	if ($('thead', this).length) {
		// If so, create data-attributes for each cell based on the heading
		$('thead tr:first th', this).each(function() {
			saveTitle = $(this).text(),
			whichPosition = $(this).index()+1;
			$(this).parents('table').find('tr td:nth-child('+whichPosition+')').attr('data-title', saveTitle);
		});
	}
});

// Check if table is too big for viewport.
function tableChecker() {
	$(".element-text table").each(function() {
		// wrapper width (page width)
		var wrapWidth1 = parseInt($(this).parent().width(), 10),
			// table width
			tableWidth = parseInt($(this).outerWidth(), 10);


		if (wrapWidth1 < tableWidth) {
			// Table is too big!
			$(this).addClass('mobile-table');
		}
	});
}

// Call on page load
tableChecker();
// Also runs within window-resize-functions.js

/*
Monthly 2.2.0 by Kevin Thornbloom is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
*/

(function ($) {
	"use strict";
	$.fn.extend({
		monthly: function(customOptions) {

			// These are overridden by options declared in footer
			var defaults = {
				dataType: "xml",
				disablePast: false,
				eventList: true,
				events: "",
				jsonUrl: "",
				linkCalendarToEventUrl: false,
				maxWidth: false,
				mode: "event",
				setWidth: false,
				showTrigger: "",
				startHidden: false,
				stylePast: false,
				target: "",
				useIsoDateFormat: false,
				weekStart: 0,	// Sunday
				xmlUrl: ""
			};

			var	options = $.extend(defaults, customOptions),
				uniqueId = $(this).attr("id"),
				parent = "#" + uniqueId,
				currentDate = new Date(),
				currentMonth = currentDate.getMonth() + 1,
				currentYear = currentDate.getFullYear(),
				currentDay = currentDate.getDate(),
				locale = (options.locale || defaultLocale()).toLowerCase(),
				monthNameFormat = options.monthNameFormat || "short",
				weekdayNameFormat = options.weekdayNameFormat || "short",
				monthNames = options.monthNames || defaultMonthNames(),
				dayNames = options.dayNames || defaultDayNames(),
				markupBlankDay = '<div class="m-d monthly-day-blank"><div class="monthly-day-number"></div></div>',
				weekStartsOnMonday = options.weekStart === "Mon" || options.weekStart === 1 || options.weekStart === "1",
				primaryLanguageCode = locale.substring(0, 2).toLowerCase();

		if (options.maxWidth !== false) {
			$(parent).css("maxWidth", options.maxWidth);
		}
		if (options.setWidth !== false) {
			$(parent).css("width", options.setWidth);
		}

		if (options.startHidden) {
			$(parent).addClass("monthly-pop").css({
				display: "none",
				position: "absolute"
			});
			$(document).on("focus", String(options.showTrigger), function (event) {
				$(parent).show();
				event.preventDefault();
			});
			$(document).on("click", String(options.showTrigger) + ", .monthly-pop", function (event) {
				event.stopPropagation();
				event.preventDefault();
			});
			$(document).on("click", function () {
				$(parent).hide();
			});
		}

		// Add Day Of Week Titles
		_appendDayNames(weekStartsOnMonday);

		// Add CSS classes for the primary language and the locale. This allows for CSS-driven
		// overrides of the language-specific header buttons. Lowercased because locale codes
		// are case-insensitive but CSS is not.
		$(parent).addClass("monthly-locale-" + primaryLanguageCode + " monthly-locale-" + locale);

		// Add Header & event list markup
		$(parent).prepend('<div class="monthly-header"><div class="monthly-header-title"><a href="#" class="monthly-header-title-date" onclick="return false"></a></div><a href="#" class="monthly-prev"></a><a href="#" class="monthly-next"></a></div>').append('<div class="monthly-event-list"></div>');

		// Set the calendar the first time
		setMonthly(currentMonth, currentYear);

		// How many days are in this month?
		function daysInMonth(month, year) {
			return month === 2 ? (year & 3) || (!(year % 25) && year & 15) ? 28 : 29 : 30 + (month + (month >> 3) & 1);
		}

		// Build the month
		function setMonthly(month, year) {
			$(parent).data("setMonth", month).data("setYear", year);

			// Get number of days
			var index = 0,
				dayQty = daysInMonth(month, year),
				// Get day of the week the first day is
				mZeroed = month - 1,
				firstDay = new Date(year, mZeroed, 1, 0, 0, 0, 0).getDay(),
				settingCurrentMonth = month === currentMonth && year === currentYear;

			// Remove old days
			$(parent + " .monthly-day, " + parent + " .monthly-day-blank").remove();
			$(parent + " .monthly-event-list, " + parent + " .monthly-day-wrap").empty();
			// Print out the days
			for(var dayNumber = 1; dayNumber <= dayQty; dayNumber++) {
				// Check if it's a day in the past
				var isInPast = options.stylePast && (
					year < currentYear
					|| (year === currentYear && (
						month < currentMonth
						|| (month === currentMonth && dayNumber < currentDay)
					))),
					innerMarkup = '<div class="monthly-day-number">' + dayNumber + '</div><div class="monthly-indicator-wrap"></div>';
				if(options.mode === "event") {
					var dayOfWeek = new Date(year, mZeroed, dayNumber, 0, 0, 0, 0).getDay();
					$(parent + " .monthly-day-wrap").append("<div"
						+ attr("class", "m-d monthly-day monthly-day-event" + (isInPast ? " monthly-past-day" : ""))
						+ attr("data-number", dayNumber)
						+ ">" + innerMarkup + "</div>");
					$(parent + " .monthly-event-list").append("<div"
						+ attr("class", "monthly-list-item")
						+ attr("id", uniqueId + "day" + dayNumber)
						+ attr("data-number", dayNumber)
						+ '><div class="monthly-event-list-date">' + dayNames[dayOfWeek] + "<br>" + dayNumber + "</div></div>");
				} else {
					$(parent + " .monthly-day-wrap").append("<a"
						+ attr("href", "#")
						+ attr("class", "m-d monthly-day monthly-day-pick" + (isInPast ? " monthly-past-day" : ""))
						+ attr("data-number", dayNumber)
						+ ">" + innerMarkup + "</a>");
				}
			}

			if (settingCurrentMonth) {
				$(parent + ' *[data-number="' + currentDay + '"]').addClass("monthly-today");
			}

			// Reset button
			$(parent + " .monthly-header-title").html(
				'<a href="#" class="monthly-header-title-date" onclick="return false">' + monthNames[month - 1] + " " + year + "</a>"
				+ (settingCurrentMonth ? "" : '<a href="#" class="monthly-reset"></a>'));

			// Account for empty days at start
			if(weekStartsOnMonday) {
				if (firstDay === 0) {
					_prependBlankDays(6);
				} else if (firstDay !== 1) {
					_prependBlankDays(firstDay - 1);
				}
			} else if(firstDay !== 7) {
				_prependBlankDays(firstDay);
			}

			// Account for empty days at end
			var numdays = $(parent + " .monthly-day").length,
				numempty = $(parent + " .monthly-day-blank").length,
				totaldays = numdays + numempty,
				roundup = Math.ceil(totaldays / 7) * 7,
				daysdiff = roundup - totaldays;
			if(totaldays % 7 !== 0) {
				for(index = 0; index < daysdiff; index++) {
					$(parent + " .monthly-day-wrap").append(markupBlankDay);
				}
			}

			// Events
			if (options.mode === "event") {
				addEvents(month, year);
			}
			var divs = $(parent + " .m-d");
			for(index = 0; index < divs.length; index += 7) {
				divs.slice(index, index + 7).wrapAll('<div class="monthly-week"></div>');
			}
		}

		function addEvent(event, setMonth, setYear) {
			// Year [0]   Month [1]   Day [2]
			var fullStartDate = _getEventDetail(event, "startdate"),
				fullEndDate = _getEventDetail(event, "enddate"),
				startArr = fullStartDate.split("-"),
				startYear = parseInt(startArr[0], 10),
				startMonth = parseInt(startArr[1], 10),
				startDay = parseInt(startArr[2], 10),
				startDayNumber = startDay,
				endDayNumber = startDay,
				showEventTitleOnDay = startDay,
				startsThisMonth = startMonth === setMonth && startYear === setYear,
				happensThisMonth = startsThisMonth;

			if(fullEndDate) {
				// If event has an end date, determine if the range overlaps this month
				var	endArr = fullEndDate.split("-"),
					endYear = parseInt(endArr[0], 10),
					endMonth = parseInt(endArr[1], 10),
					endDay = parseInt(endArr[2], 10),
					startsInPastMonth = startYear < setYear || (startMonth < setMonth && startYear === setYear),
					endsThisMonth = endMonth === setMonth && endYear === setYear,
					endsInFutureMonth = endYear > setYear || (endMonth > setMonth && endYear === setYear);
				if(startsThisMonth || endsThisMonth || (startsInPastMonth && endsInFutureMonth)) {
					happensThisMonth = true;
					startDayNumber = startsThisMonth ? startDay : 1;
					endDayNumber = endsThisMonth ? endDay : daysInMonth(setMonth, setYear);
					showEventTitleOnDay = startsThisMonth ? startDayNumber : 1;
				}
			}
			if(!happensThisMonth) {
				return;
			}

			var startTime = _getEventDetail(event, "starttime"),
				timeHtml = "",
				eventURL = _getEventDetail(event, "url"),
				eventTitle = _getEventDetail(event, "name"),
				eventClass = _getEventDetail(event, "class"),
				eventColor = _getEventDetail(event, "color"),
				eventId = _getEventDetail(event, "id"),
				customClass = eventClass ? " " + eventClass : "",
				dayStartTag = "<div",
				dayEndTags = "</span></div>";

			if(startTime) {
				var endTime = _getEventDetail(event, "endtime");
				timeHtml = '<div><div class="monthly-list-time-start">' + formatTime(startTime) + "</div>"
					+ (endTime ? '<div class="monthly-list-time-end">' + formatTime(endTime) + "</div>" : "")
					+ "</div>";
			}

			if(options.linkCalendarToEventUrl && eventURL) {
				dayStartTag = "<a" + attr("href", eventURL);
				dayEndTags = "</span></a>";
			}

			var	markupDayStart = dayStartTag
					+ attr("data-eventid", eventId)
					+ attr("title", eventTitle)
					// BG and FG colors must match for left box shadow to create seamless link between dates
					+ (eventColor ? attr("style", "background:" + eventColor + ";color:" + eventColor) : ""),
				markupListEvent = "<a"
					+ attr("href", eventURL)
					+ attr("class", "listed-event" + customClass)
					+ attr("data-eventid", eventId)
					+ (eventColor ? attr("style", "background:" + eventColor) : "")
					+ attr("title", eventTitle)
					+ ">" + eventTitle + " " + timeHtml + "</a>";
			for(var index = startDayNumber; index <= endDayNumber; index++) {
				var doShowTitle = index === showEventTitleOnDay;
				// Add to calendar view
				$(parent + ' *[data-number="' + index + '"] .monthly-indicator-wrap').append(
						markupDayStart
						+ attr("class", "monthly-event-indicator" + customClass
							// Include a class marking if this event continues from the previous day
							+ (doShowTitle ? "" : " monthly-event-continued")
							)
						+ "><span>" + (doShowTitle ? eventTitle : "") + dayEndTags);
				// Add to event list
				$(parent + ' .monthly-list-item[data-number="' + index + '"]')
					.addClass("item-has-event")
					.append(markupListEvent);
			}
		}

		function addEvents(month, year) {
			if(options.events) {
				// Prefer local events if provided
				addEventsFromString(options.events, month, year);
			} else {
				var remoteUrl = options.dataType === "xml" ? options.xmlUrl : options.jsonUrl;
				if(remoteUrl) {
					// Replace variables for month and year to load from dynamic sources
					var url = String(remoteUrl).replace("{month}", month).replace("{year}", year);
					$.get(url, {now: $.now()}, function(data) {
						addEventsFromString(data, month, year);
					}, options.dataType).fail(function() {
						console.error("Monthly.js failed to import " + remoteUrl + ". Please check for the correct path and " + options.dataType + " syntax.");
					});
				}
			}
		}

		function addEventsFromString(events, setMonth, setYear) {
			if (options.dataType === "xml") {
				$(events).find("event").each(function(index, event) {
					addEvent(event, setMonth, setYear);
				});
			} else if (options.dataType === "json") {
				$.each(events.monthly, function(index, event) {
					addEvent(event, setMonth, setYear);
				});
			}
		}

		function attr(name, value) {
			var parseValue = String(value);
			var newValue = "";
			for(var index = 0; index < parseValue.length; index++) {
				switch(parseValue[index]) {
					case "'": newValue += "&#39;"; break;
					case "\"": newValue += "&quot;"; break;
					case "<": newValue += "&lt;"; break;
					case ">": newValue += "&gt;"; break;
					default: newValue += parseValue[index];
				}
			}
			return " " + name + "=\"" + newValue + "\"";
		}

		function _appendDayNames(startOnMonday) {
			var offset = startOnMonday ? 1 : 0,
				dayName = "",
				dayIndex = 0;
			for(dayIndex = 0; dayIndex < 6; dayIndex++) {
				dayName += "<div>" + dayNames[dayIndex + offset] + "</div>";
			}
			dayName += "<div>" + dayNames[startOnMonday ? 0 : 6] + "</div>";
			$(parent).append('<div class="monthly-day-title-wrap">' + dayName + '</div><div class="monthly-day-wrap"></div>');
		}

		// Detect the user's preferred language
		function defaultLocale() {
			return navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
		}

		// Use the user's locale if possible to obtain a list of short month names, falling back on English
		function defaultMonthNames() {
			if(typeof Intl === "undefined") {
				return ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			}
			var formatter = new Intl.DateTimeFormat(locale, {month: monthNameFormat});
			var names = [];
			for(var monthIndex = 0; monthIndex < 12; monthIndex++) {
				var sampleDate = new Date(2017, monthIndex, 1, 0, 0, 0);
				names[monthIndex] = formatter.format(sampleDate);
			}
			return names;
		}

		function formatDate(year, month, day) {
			if(options.useIsoDateFormat) {
				return new Date(year, month - 1, day, 0, 0, 0).toISOString().substring(0, 10);
			}
			if(typeof Intl === "undefined") {
				return month + "/" + day + "/" + year;
			}
			return new Intl.DateTimeFormat(locale).format(new Date(year, month - 1, day, 0, 0, 0));
		}

		// Use the user's locale if possible to obtain a list of short weekday names, falling back on English
		function defaultDayNames() {
			if(typeof Intl === "undefined") {
				return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			}
			var formatter = new Intl.DateTimeFormat(locale, {weekday: weekdayNameFormat}),
				names = [],
				dayIndex = 0,
				sampleDate = null;
			for(dayIndex = 0; dayIndex < 7; dayIndex++) {
				// 2017 starts on a Sunday, so use it to capture the locale's weekday names
				sampleDate = new Date(2017, 0, dayIndex + 1, 0, 0, 0);
				names[dayIndex] = formatter.format(sampleDate);
			}
			return names;
		}

		function _prependBlankDays(count) {
			var wrapperEl = $(parent + " .monthly-day-wrap"),
				index = 0;
			for(index = 0; index < count; index++) {
				wrapperEl.prepend(markupBlankDay);
			}
		}

		function _getEventDetail(event, nodeName) {
			return options.dataType === "xml" ? $(event).find(nodeName).text() : event[nodeName];
		}

		// Returns a 12-hour format hour/minute with period. Opportunity for future localization.
		function formatTime(value) {
			var timeSplit = value.split(":");
			var hour = parseInt(timeSplit[0], 10);
			var period = "AM";
			if(hour > 12) {
				hour -= 12;
				period = "PM";
			} else if(hour === 0) {
				hour = 12;
			}
			return hour + ":" + String(timeSplit[1]) + " " + period;
		}

		function setNextMonth() {
			var	setMonth = $(parent).data("setMonth"),
				setYear = $(parent).data("setYear"),
				newMonth = setMonth === 12 ? 1 : setMonth + 1,
				newYear = setMonth === 12 ? setYear + 1 : setYear;
			setMonthly(newMonth, newYear);
			viewToggleButton();
		}

		function setPreviousMonth() {
			var setMonth = $(parent).data("setMonth"),
				setYear = $(parent).data("setYear"),
				newMonth = setMonth === 1 ? 12 : setMonth - 1,
				newYear = setMonth === 1 ? setYear - 1 : setYear;
			setMonthly(newMonth, newYear);
			viewToggleButton();
		}

		// Function to go back to the month view
		function viewToggleButton() {
			if($(parent + " .monthly-event-list").is(":visible")) {
				$(parent + " .monthly-cal").remove();
				$(parent + " .monthly-header-title").prepend('<a href="#" class="monthly-cal"></a>');
			}
		}

		// Advance months
		$(document.body).on("click", parent + " .monthly-next", function (event) {
			setNextMonth();
			event.preventDefault();
		});

		// Go back in months
		$(document.body).on("click", parent + " .monthly-prev", function (event) {
			setPreviousMonth();
			event.preventDefault();
		});

		// Reset Month
		$(document.body).on("click", parent + " .monthly-reset", function (event) {
			$(this).remove();
			setMonthly(currentMonth, currentYear);
			viewToggleButton();
			event.preventDefault();
			event.stopPropagation();
		});

		// Back to month view
		$(document.body).on("click", parent + " .monthly-cal", function (event) {
			$(this).remove();
			$(parent + " .monthly-event-list").css("transform", "scale(0)");
			setTimeout(function() {
				$(parent + " .monthly-event-list").hide();
			}, 250);
			event.preventDefault();
		});

		// Click A Day
		$(document.body).on("click touchstart", parent + " .monthly-day", function (event) {
			// If events, show events list
			var whichDay = $(this).data("number");
			if(options.mode === "event" && options.eventList) {
				var	theList = $(parent + " .monthly-event-list"),
					myElement = document.getElementById(uniqueId + "day" + whichDay),
					topPos = myElement.offsetTop;
				theList.show();
				theList.css("transform");
				theList.css("transform", "scale(1)");
				$(parent + ' .monthly-list-item[data-number="' + whichDay + '"]').show();
				theList.scrollTop(topPos);
				viewToggleButton();
				if(!options.linkCalendarToEventUrl) {
					event.preventDefault();
				}
			// If picker, pick date
			} else if (options.mode === "picker") {
				var	setMonth = $(parent).data("setMonth"),
					setYear = $(parent).data("setYear");
				// Should days in the past be disabled?
				if($(this).hasClass("monthly-past-day") && options.disablePast) {
					// If so, don't do anything.
					event.preventDefault();
				} else {
					// Otherwise, select the date ...
					$(String(options.target)).val(formatDate(setYear, setMonth, whichDay));
					// ... and then hide the calendar if it started that way
					if(options.startHidden) {
						$(parent).hide();
					}
				}
				event.preventDefault();
			}
		});

		// Clicking an event within the list
		$(document.body).on("click", parent + " .listed-event", function (event) {
			var href = $(this).attr("href");
			// If there isn't a link, don't go anywhere
			if(!href) {
				event.preventDefault();
			}
		});

	}
	});
}(jQuery));

/*
Smoothslides 2.2.0 by Kevin Thornbloom is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
*/

(function($) {
	$.fn.extend({
		smoothSlides: function(options) {
			// These are overridden by options declared in footer
			var defaults = {
				effectDuration: 5000,
				transitionDuration: 500,
				effectModifier: 1.3,
				order: 'normal',
				autoPlay: 'true',
				effect: 'zoomOut,zoomIn,panUp,panDown,panLeft,panRight,diagTopLeftToBottomRight,diagTopRightToBottomLeft,diagBottomRightToTopLeft,diagBottomLeftToTopRight',
				effectEasing: 'ease-in-out',
				nextText: ' ►',
				prevText: '◄ ',
				captions: 'true',
				navigation: 'true',
				pagination: 'true',
				matchImageSize: 'true'
			}

			var options = $.extend(defaults, options),
				that = this,
				uniqueId = $(this).attr('id'),
				fullTime= options.effectDuration + options.transitionDuration,
				maxWidth = $(this).find('img').width(),
				effectModPercent = ((options.effectModifier * 100)-100)*.25;

			if (options.transitionDuration >= options.effectDuration) {
				console.log("Make sure effectDuration is greater than transitionDuration");
			}

			// Change wrapper class to remove loading spinner
			$('#'+uniqueId).removeClass('smoothslides').addClass('smoothslides-on');

			function fadeOutLast() {
				// Crapbag (<=IE9) detector
				if (document.all && !window.atob){
					// Crapbag detected! Use jQuery to fade
					$('#'+uniqueId).find('.ss-slide:last').animate({
						'opacity':'0'
					})
				} else {
					// Fade out last with CSS
					$('#'+uniqueId).find('.ss-slide:last').css({
						'transition':'all '+options.transitionDuration+'ms',
						'opacity':'0'
					});
				}
			}
			// FX
			that.crossFade = function() {
				fadeOutLast();
				setTimeout(function(){
					// Wait for fade, then sort & animate next
					$(that).find('.ss-slide:last').prependTo($(".ss-slide-stage", that)).css({
						'opacity':'1',
						'transform':'none'
					});
					$(that).find('.ss-slide:last').css({
						'transition': 'all ' + options.effectDuration + 'ms ' + options.effectEasing +'',
						'transform':'scale(1)  rotate(0deg)'
					});
				}, options.transitionDuration);
			}

			that.zoomOut = function() {
				fadeOutLast();
				// Set up next
				$(this).find('.ss-slide:eq(-2)').css({
					'transition':'none',
					'transform':'scale('+options.effectModifier+') rotate(1.5deg)'
				});
				setTimeout(function(){
					// Wait for fade, then sort & animate next
					$(that).find('.ss-slide:last').prependTo($(".ss-slide-stage", that)).css({
						'opacity':'1',
						'transform':'none'
					});
					$(that).find('.ss-slide:last').css({
						'transition': 'all ' + options.effectDuration + 'ms ' + options.effectEasing +'',
						'transform':'scale(1)  rotate(0deg)'
					});
				}, options.transitionDuration);
			}

			that.zoomIn = function() {
				fadeOutLast();
				// Set up next
				$(this).find('.ss-slide:eq(-2)').css({
					'transition':'none',
					'transform':'scale(1.1) rotate(-1.5deg)'
				});
				setTimeout(function(){
					// Wait for fade, then sort & animate next
					$(that).find('.ss-slide:last').prependTo($(".ss-slide-stage", that)).css({
						'opacity':'1',
						'transform':'none'
					});
					$(that).find('.ss-slide:last').css({
						'transition': 'all ' + options.effectDuration + 'ms ' + options.effectEasing +'',
						'transform':'scale('+options.effectModifier+') rotate(0deg)'
					});
				}, options.transitionDuration);
			}

			that.panLeft = function() {
				// Set up next
				$(this).find('.ss-slide:eq(-2)').css({
					'transition':'none',
					'transform':'scale('+options.effectModifier+') translateX('+effectModPercent+'%)'
				});
				fadeOutLast();
				
				setTimeout(function(){
					// Wait for fade, then sort & animate next
					$(that).find('.ss-slide:last').prependTo($(".ss-slide-stage", that)).css({
						'opacity':'1',
						'transform':'none'
					});
					$(that).find('.ss-slide:last').css({
						'transition': 'all ' + options.effectDuration + 'ms ' + options.effectEasing +'',
						'transform':'scale('+options.effectModifier+') translateX(0%)'
					});
				}, options.transitionDuration);
			}

			that.panRight = function() {
				fadeOutLast();
				// Set up next
				$(this).find('.ss-slide:eq(-2)').css({
					'transition':'none',
					'transform':'scale('+options.effectModifier+') translateX(-'+effectModPercent+'%)'
				});
				setTimeout(function(){
					// Wait for fade, then sort & animate next
					$(that).find('.ss-slide:last').prependTo($(".ss-slide-stage", that)).css({
						'opacity':'1',
						'transform':'none'
					});
					$(that).find('.ss-slide:last').css({
						'transition': 'all ' + options.effectDuration + 'ms ' + options.effectEasing +'',
						'transform':'scale('+options.effectModifier+') translateX(0%)'
					});
				}, options.transitionDuration);
			}

			that.panUp = function() {
				fadeOutLast();
				// Set up next
				$(this).find('.ss-slide:eq(-2)').css({
					'transition':'none',
					'transform':'scale('+options.effectModifier+') translateY('+effectModPercent+'%)'
				});
				setTimeout(function(){
					// Wait for fade, then sort & animate next
					$(that).find('.ss-slide:last').prependTo($(".ss-slide-stage", that)).css({
						'opacity':'1',
						'transform':'none'
					});
					$(that).find('.ss-slide:last').css({
						'transition': 'all ' + options.effectDuration + 'ms ' + options.effectEasing +'',
						'transform':'scale('+options.effectModifier+') translateY(0%)'
					});
				}, options.transitionDuration);
			}

			that.panDown = function() {
				fadeOutLast();
				// Set up next
				$(this).find('.ss-slide:eq(-2)').css({
					'transition':'none',
					'transform':'scale('+options.effectModifier+') translateY(-'+effectModPercent+'%)'
				});
				setTimeout(function(){
					// Wait for fade, then sort & animate next
					$(that).find('.ss-slide:last').prependTo($(".ss-slide-stage", that)).css({
						'opacity':'1',
						'transform':'none'
					});
					$(that).find('.ss-slide:last').css({
						'transition': 'all ' + options.effectDuration + 'ms ' + options.effectEasing +'',
						'transform':'scale('+options.effectModifier+') translateY(0%)'
					});
				}, options.transitionDuration);
			}

			that.diagTopLeftToBottomRight = function() {
				fadeOutLast();
				// Set up next
				$(this).find('.ss-slide:eq(-2)').css({
					'transition':'none',
					'transform':'scale('+options.effectModifier+') translateY(-'+effectModPercent+'%) translateX(-'+effectModPercent+'%)'
				});
				setTimeout(function(){
					// Wait for fade, then sort & animate next
					$(that).find('.ss-slide:last').prependTo($(".ss-slide-stage", that)).css({
						'opacity':'1',
						'transform':'none'
					});
					$(that).find('.ss-slide:last').css({
						'transition': 'all ' + options.effectDuration + 'ms ' + options.effectEasing +'',
						'transform':'scale('+options.effectModifier+') translateY(0%) translateX(0%)'
					});
				}, options.transitionDuration);
			}

			that.diagBottomRightToTopLeft= function() {
				fadeOutLast();
				// Set up next
				$(this).find('.ss-slide:eq(-2)').css({
					'transition':'none',
					'transform':'scale('+options.effectModifier+') translateY('+effectModPercent+'%) translateX('+effectModPercent+'%)'
				});
				setTimeout(function(){
					// Wait for fade, then sort & animate next
					$(that).find('.ss-slide:last').prependTo($(".ss-slide-stage", that)).css({
						'opacity':'1',
						'transform':'none'
					});
					$(that).find('.ss-slide:last').css({
						'transition': 'all ' + options.effectDuration + 'ms ' + options.effectEasing +'',
						'transform':'scale('+options.effectModifier+') translateY(0%) translateX(0%)'
					});
				}, options.transitionDuration);
			}

			that.diagTopRightToBottomLeft = function() {
				fadeOutLast();
				// Set up next
				$(this).find('.ss-slide:eq(-2)').css({
					'transition':'none',
					'transform':'scale('+options.effectModifier+') translateY(-'+effectModPercent+'%) translateX('+effectModPercent+'%)'
				});
				setTimeout(function(){
					// Wait for fade, then sort & animate next
					$(that).find('.ss-slide:last').prependTo($(".ss-slide-stage", that)).css({
						'opacity':'1',
						'transform':'none'
					});
					$(that).find('.ss-slide:last').css({
						'transition': 'all ' + options.effectDuration + 'ms ' + options.effectEasing +'',
						'transform':'scale('+options.effectModifier+') translateY(0%) translateX(0%)'
					});
				}, options.transitionDuration);
			}

			that.diagBottomLeftToTopRight = function() {
				fadeOutLast();
				// Set up next
				$(this).find('.ss-slide:eq(-2)').css({
					'transition':'none',
					'transform':'scale('+options.effectModifier+') translateY('+effectModPercent+'%) translateX(-'+effectModPercent+'%)'
				});
				setTimeout(function(){
					// Wait for fade, then sort & animate next
					$(that).find('.ss-slide:last').prependTo($(".ss-slide-stage", that)).css({
						'opacity':'1',
						'transform':'none'
					});
					$(that).find('.ss-slide:last').css({
						'transition': 'all ' + options.effectDuration + 'ms ' + options.effectEasing +'',
						'transform':'scale('+options.effectModifier+') translateY(0%) translateX(0%)'
					});
				}, options.transitionDuration);
			}

			// Set max-width based on img size
			if(options.matchImageSize == 'true') {
				$('#'+uniqueId).css('maxWidth',maxWidth);
				$('#'+uniqueId+' img').css('maxWidth','100%');
			} else {
				$('#'+uniqueId+' img').css('width','100%');
			}

			// Wrap each in a div
			$(this).children().each(function(){
				$(this).wrap('<div class="ss-slide"></div>');
			});
			
			// Function to randomize things. (used below)
			$.fn.smoothslidesRandomize=function(a){(a?this.find(a):this).parent().each(function(){$(this).children(a).sort(function(){return Math.random()-0.5}).detach().appendTo(this)});return this};

			// Set slide order
			if (options.order == "random") {
				$('#'+ uniqueId +'').smoothslidesRandomize('.ss-slide');
			} else {
				$('#'+ uniqueId +' .ss-slide').each(function() {
					$(this).prependTo('#'+uniqueId);
				});
			}

			// Set one as relative for height
			$('#'+uniqueId+' .ss-slide:first').css('position','relative');


			if(options.autoPlay == 'true') {
				$(".ss-slide:first", this).appendTo(this)
			}

			// Add CSS easing & duration. Add wrapper div around each image
			$(this).wrapInner("<div class='ss-slide-stage'></div>")
			$(".ss-slide",this).each(function(){
				$(this).css({
					transition: 'all ' + options.effectDuration + 'ms ' + options.effectEasing +''
				});
			});

			// Captions, Yo
			function captionUpdate() {
				var nextCaption = $('#'+uniqueId).find('.ss-slide:eq(-2) img').prop('alt');
				if (!nextCaption) {
					$('#'+uniqueId).find(".ss-caption").css('opacity','0');
				} else {
					$('#'+uniqueId).find(".ss-caption").css('opacity','1').html(nextCaption);
				}
			}
			// Captions backward
			function captionUpdateBack() {
				var nextCaption = $('#'+uniqueId).find('.ss-slide:eq(-1) img').prop('alt');
				if (!nextCaption) {
					$('#'+uniqueId).find(".ss-caption").css('opacity','0');
				} else {
					$('#'+uniqueId).find(".ss-caption").css('opacity','1').html(nextCaption);
				}
			}
			// Add Caption Markup
			if (options.captions == 'true') {
				$(that).append("<div class='ss-caption-wrap'><div class='ss-caption'></div></div>");
				if (options.autoPlay == 'true') {
					captionUpdate();
				} else {
					var nextCaption = $('#'+uniqueId).find('.ss-slide:last img').prop('alt');
					if (!nextCaption) {
						$('#'+uniqueId).find(".ss-caption").css('opacity','0');
					} else {
						$('#'+uniqueId).find(".ss-caption").css('opacity','1').html(nextCaption);
					}
				}
			}

			// You want some Nav arrows? You got 'em
			if (options.navigation == 'true') {
				$(that).append('<a href="#" class="ss-prev ss-prev-on">' + options.prevText + '</a><a href="#" class="ss-next ss-next-on">' + options.nextText + '</a>');
			}

			// How 'bout some dots? We got dots.
			if (options.pagination == 'true') {
				$(that).append('<div class="ss-paginate-wrap"><div class="ss-paginate"></div></div>');
				$(".ss-slide",that).each(function() {
					$('.ss-paginate', that).append('<a href="#"></a>');
				});
				if (options.autoPlay == "true") {
					$('.ss-paginate a:last', that).addClass("ss-paginate-current");
				} else {
					$('.ss-paginate a:first', that).addClass("ss-paginate-current");
				}
			}

			// Update pagination forward
			function paginationUpdate() {
				var total = $(that).find('.ss-paginate a').length;
				var	current = $(that).find('a.ss-paginate-current').index();
				var next = current + 1;				
				if (next >= total) {
					$(that).find('a.ss-paginate-current').removeClass();
					$(that).find('.ss-paginate a:eq(0)').addClass('ss-paginate-current');
				} else {
					$(that).find('a.ss-paginate-current').removeClass();
					$(that).find('.ss-paginate a:eq('+ next +')').addClass('ss-paginate-current');
				}
			}

			// Update pagination backward
			function paginationUpdateBack() {
				var total = $(that).find('.ss-paginate a').length;
				var	current = $(that).find('a.ss-paginate-current').index();
				var next = current - 1;				
				if (next <= -2) {
					$(that).find('a.ss-paginate-current').removeClass();
					$(that).find('.ss-paginate a:eq('+total+')').addClass('ss-paginate-current');
				} else {
					$(that).find('a.ss-paginate-current').removeClass();
					$(that).find('.ss-paginate a:eq('+ next +')').addClass('ss-paginate-current');
				}
			}

			// Autoplay Function
			var autoPlay = function () {
				// Crapbag (<=IE9) detector
				if (document.all && !window.atob){
					that.crossFade();
				} else if ($('#' + uniqueId).find('.ss-slide:eq(-2) img').attr('data-effect')){
					var selectedEffect = $('#' + uniqueId).find('.ss-slide:eq(-2) img').attr('data-effect');
					that[selectedEffect]();
				} else {
					effectArray = options.effect.split(',');
					var effect = effectArray[Math.floor(Math.random() * effectArray.length)];
					that[effect]();
				}
				captionUpdate();
				paginationUpdate();
			}

			// Autoplay Interval
			if (options.autoPlay == 'true') {
				autoPlay();
				var playInterval = setInterval(autoPlay, fullTime);
			}

			// Pause on Nav hover
			$('.ss-prev, .ss-next, .ss-paginate', that).mouseover(function() {
				clearInterval(playInterval);
			}).mouseout(function() {
				playInterval = setInterval(autoPlay, fullTime);
			});

			// Navigation Forward
			$('#'+uniqueId).on('click', '.ss-next-on', function(event) {
				$('.ss-next-on', that).removeClass('ss-next-on');
				// Fade out last
				$(that).find('.ss-slide:last').css({
					'transition':'all '+options.transitionDuration+'ms',
					'opacity':'0'
				});			
				captionUpdate();
				paginationUpdate();
				setTimeout(function(){
					// Wait for fade, then sort & animate next
					$(that).find('.ss-slide:last').prependTo($(".ss-slide-stage", that)).css({
						'opacity':'1',
						'transform':'none'
					});
					$(that).find('.ss-slide:last').css({
						'transition': 'all ' + options.effectDuration + 'ms ' + options.effectEasing +'',
						'transform':'scale(1)  rotate(0deg)'
					});
					$('.ss-next', that).addClass('ss-next-on');
				}, options.transitionDuration);
				event.preventDefault();
			});

			// Navigation Backward
			$('#'+uniqueId).on('click', '.ss-prev-on', function(event) {
				$('.ss-prev-on', that).removeClass('ss-prev-on');
				// Fade out last
				$('#'+uniqueId).find(".ss-slide:first").css({
					'transition':'none',
					'opacity':'0'
				}).appendTo('#'+uniqueId+' .ss-slide-stage');
				$('#'+uniqueId).find('.ss-slide:last').css('opacity');
				$('#'+uniqueId).find('.ss-slide:last').css({
					'transition':'all '+options.transitionDuration+'ms',
					'opacity':'1'
				});
				captionUpdateBack();
				paginationUpdateBack();
				setTimeout(function(){
					$('.ss-prev').addClass('ss-prev-on');
					
				}, options.transitionDuration);
				event.preventDefault();
			});

			// Disabled nav 
			$('#'+uniqueId).on('click', '.ss-prev, .ss-next', function(event) {
				event.preventDefault();
			});

			// Pagination Clicking
			$('#'+uniqueId).on('click', '.ss-paginate a', function(event) {
				var dotClicked = $(this).index(); // 0 indexed
				var currentDot = $('#'+uniqueId+' .ss-paginate-current').index(); // 0 indexed

				if (dotClicked < currentDot) {
					var iterate = (currentDot - dotClicked);
					for (var i = 0; i < iterate; i++) {
						$('#'+uniqueId).find('.ss-slide:first').appendTo('#'+uniqueId+' .ss-slide-stage');
					}
				} else if (dotClicked > currentDot) {
					var iterate = (dotClicked - currentDot);
					for (var i = 0; i < iterate; i++) {
						$('#'+uniqueId).find('.ss-slide:last').prependTo('#'+uniqueId+' .ss-slide-stage');
					}
				}
				$('#'+uniqueId).find('.ss-paginate-current').removeClass();
				$('#'+uniqueId).find('.ss-paginate a:eq('+dotClicked+')').addClass('ss-paginate-current');
				var nextCaption = $('#'+uniqueId).find('.ss-slide:eq(-1) img').prop('alt');
				if (!nextCaption) {
					$('#'+uniqueId).find(".ss-caption").css('opacity','0');
				} else {
					$('#'+uniqueId).find(".ss-caption").css('opacity','1').html(nextCaption);
				}
				event.preventDefault();
			});
			
		}
	});
})(jQuery);