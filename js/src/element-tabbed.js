$('.element-tabbed').each(function(){
	$(this).find('.tabs a:first').addClass('current-tab');
	$(this).find('.tab-content:first').show();
})

$('.element-tabbed').on('click',' .tabs a', function(event){
	event.preventDefault();
	var a = $(this).index();
	$(this).parents('.element-tabbed').find('.current-tab').removeClass('current-tab');
	$(this).addClass('current-tab');
	$(this).parents('.element-tabbed').find('.tab-content').hide();
	$(this).parents('.element-tabbed').find('.tab-content:eq('+a+')').show();
})