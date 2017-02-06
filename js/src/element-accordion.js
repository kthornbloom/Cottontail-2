$(document.body).on('click', '.accordion-topic', function(event) {
	$(this).next('.accordion-result').slideToggle();
	$(this).toggleClass('accordion-open');
	event.preventDefault();
});