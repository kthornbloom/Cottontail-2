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