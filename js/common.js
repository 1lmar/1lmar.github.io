$(function() {

		$("body").addClass("mobile-mnu");

		$(".slider-wrap").owlCarousel({
			loop: true,
			items: 1,
			dots: true,
			autoplay:true,
			autoplayTimeout:3500,
			autoplayHoverPause:true
		})
		
		//show left menu
		$(".left-link-mnu").click(
			function(){
				$("body").toggleClass("show-menu");
			}
		);
		$(".close-mnu").click(
			function(){
				$("body").toggleClass("show-menu");
			}
		);

		//show right menu
		$(".right-link-mnu").click(
			function(){
				$("body").toggleClass("show-right-menu");
			}
		);
		$(".right-close-mnu").click(
			function(){
				$("body").toggleClass("show-right-menu");
			}
		);


});
