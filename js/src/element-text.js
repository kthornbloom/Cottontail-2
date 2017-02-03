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


