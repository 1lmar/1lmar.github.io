$(function() {

	var $menu = $("#menu");
	$(window).scroll(function(){
			if ( $(this).scrollTop() > 100 && $menu.hasClass("default") ){
					$menu.removeClass("default").addClass("fixed");
			} else if($(this).scrollTop() <= 100 && $menu.hasClass("fixed")) {
					$menu.removeClass("fixed").addClass("default");
			}
	});

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

	$('#accordion > li').hover(
		function () {
			var $this = $(this);
			$this.stop().animate({'width':'480px'},500);
			$('.heading',$this).stop(true,true).fadeOut();
			$('.bgDescription',$this).stop(true,true).slideDown(500);
			$('.description',$this).stop(true,true).fadeIn();
		},
		function () {
			var $this = $(this);
			$this.stop().animate({'width':'115px'},1000);
			$('.heading',$this).stop(true,true).fadeIn();
			$('.description',$this).stop(true,true).fadeOut(500);
			$('.bgDescription',$this).stop(true,true).slideUp(700);
		}
		);

});
