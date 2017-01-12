$(document.body).on('click', '.accordion-topic', function(event) {
	$(this).next('.accordion-result').slideToggle();
	$(this).toggleClass('accordion-open');
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
	$('body').append("<div class='image-zoom-overlay'><div class='image-zoom' style='background-image:url("+largeImg+");'></div><div class='image-zoom-controls'><a href='#' id='regress-image-zoom'><i class='oi' data-glyph='arrow-thick-left'></i></a><a href='#' id='image-zoom-size-toggle'></a><a href='#' id='close-image-zoom'><i class='oi' data-glyph='circle-x'></i></a><a href='#' id='advance-image-zoom'><i class='oi' data-glyph='arrow-thick-right'></i></a></div>");
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


$(document.body).on('click', '#image-zoom-size-toggle', function(event) {
	event.preventDefault();
	$('.image-zoom-overlay').toggleClass('contain');
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
	$(".addon-text table").each(function() {
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

// Call on page load and page resize
tableChecker();

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
	autogrid();
});



function autogrid() {
	$('[data-grid-min]').each(function(){
		var that = this;
		$(this).find('> div').css('width','');
		var fullWidth = parseInt($(that).width()),
			colWidth = parseInt($(that).find('> div').width()),
			minWidth = parseInt($(that).attr("data-grid-min")),
			newWidth = parseInt(100 / (Math.floor(fullWidth / minWidth)));

			if(fullWidth < minWidth){
				$(that).find('> div').css('width','100%');
			} else if (colWidth < minWidth){
				$(that).find('> div').css('width',newWidth+'%');
			}
	});
}

autogrid();
/* Function for determining if a link is external
=========================================

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
});*/

/* auto add icons (or classes) for external & document links*/
/* auto add arrows for dropdowns */
/* account for off-screen dropdowns*/