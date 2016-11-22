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
	$("body").on("click", ".top", function(){
		$("html, body").animate({scrollTop: 0}, "slow");
	});
	$("body").append('<div class="top"><i class="fa fa-angle-up">');
	$(window).scroll(function(){
		if($(this).scrollTop() > $(this).height()){
			$(".top").addClass("active");
		} else {
			$(".top").removeClass("active");
		}
	});

	$(".com-link").magnificPopup({
		type:'inline',
		midClick: true,
		mainClass: 'my-mfp-zoom-in',
		removalDelay: 300,
	});

});
