$(function() {

	$('.toggle-mnu').on('click', function(){

		if($(this).hasClass('on')){
			$('.main-head__menu').hide();
			$(this).removeClass('on');
		} else {
			$('.main-head__menu').slideDown();
			$(this).addClass('on');
		}

	});

});
