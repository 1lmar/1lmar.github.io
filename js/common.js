$(function() {

	var $menu = $("#menu");
	$(window).scroll(function(){
			if ( $(this).scrollTop() > 100 && $menu.hasClass("default") ){
					$menu.removeClass("default").addClass("fixed");
			} else if($(this).scrollTop() <= 100 && $menu.hasClass("fixed")) {
					$menu.removeClass("fixed").addClass("default");
			}
	});

	$(".toggle").click(
			function(){
				$(this).toggleClass("on");
				$("body").toggleClass("show-menu");
			}
		);

	$(".slider-wrap").owlCarousel({
		loop:true,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
		responsive : {
			0 : {
				items:2,
			},
			480 : {
				items:4,
			},
			768 : {
				items:8,
			}
		}
	});
	$(".slots-slider").owlCarousel({
		items: 1,
		loop:true,
		autoplay:true,
		autoplayTimeout:4000,
		autoplayHoverPause:true,
	});

});
