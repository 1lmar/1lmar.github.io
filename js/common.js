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

		//sign up
	$(".tab-item").not(":first-child").hide();
	$(".reg-container .tab").click(function() {
		$(".reg-container .tab").removeClass("reg-active").eq($(this).index()).addClass("reg-active");
		$(".tab-item").hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass("reg-active");

	$("#reg-tel-input").intlTelInput({
		defaultCountry: "ru",
		preferredCountries: [ "ru", "us" ],
		nationalMode: false,
	});

});
