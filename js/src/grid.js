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

// Call on Load
autogrid();
// Also runs within window-resize-functions.js