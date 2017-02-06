$('.carousel').each(function(){
	$(this).wrap('<div class="carousel-wrap"></div>');
	$(this).parent().append('<div class="carousel-buttons-wrap"><a href="#" class="carousel-previous"></a><a href="#" class="carousel-next"></a></div>');
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

$(document).on("click", ".carousel-previous", function (event) {

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