$(function() {

	var $menu = $("#menu");
	$(window).scroll(function(){
			if ( $(this).scrollTop() > 100 && $menu.hasClass("default") ){
					$menu.removeClass("default").addClass("fixed");
			} else if($(this).scrollTop() <= 100 && $menu.hasClass("fixed")) {
					$menu.removeClass("fixed").addClass("default");
			}
	});

});
