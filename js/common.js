$(function() {

	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");

		$(".menu li a").click(function(){
			$(".menu").fadeOut(600);
			$(".toggle-mnu").removeClass("on")
		});

		if($(".menu").is(":visible")){
			$(".menu").fadeOut(600);
			$(".menu li a").removeClass("fadeInUp animated");
		}else{
			$(".menu").fadeIn(600);
			$(".menu li a").addClass("fadeInUp animated");
		}
		return false;
	});

	$(".menu ul a").mPageScroll2id();


	$(".mouse-icon").click(function(){
		$("html, body").animate({
			scrollTop: $("section").offset().top
		}, 800);
	});

	$(".portfolio-wrap").mixItUp();

});