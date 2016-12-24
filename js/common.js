$(function() {

	$(".main-slide").owlCarousel({
		items: 1,
		loop: true,
		autoplay:true,
		autoplayTimeout:5000,
		autoplayHoverPause:true
	});

	$(".game-block").not(":first-child").hide();
	$(".top-mnu .tab").click(function() {
		$(".top-mnu .tab").removeClass("active").eq($(this).index()).addClass("active");
		$(".game-block").hide().eq($(this).index()).fadeIn().addClass("active")
	}).eq(0).addClass("active");

});
