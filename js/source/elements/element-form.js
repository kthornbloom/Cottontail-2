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