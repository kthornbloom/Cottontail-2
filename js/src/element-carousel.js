$('.carousel').each(function(){
	$(this).wrap('<div class="carousel-wrap"></div>');
	$(this).parent().append('<div class="carousel-buttons-wrap"><a href="#" class="carousel-previous"></a><a href="#" class="carousel-next"></a></div>');
});