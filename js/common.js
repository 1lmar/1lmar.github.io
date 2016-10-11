$(function() {

	function heightDetect() {
		$(".main-head").css("height", $(window).height());
	};
	heightDetect();
	$(window).resize(function() {
		heightDetect();
	});


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

	//Skill
	$(".skill-bar").each(function() {
		$(this).appear(function() {
			$(this).find(".count-bar").animate({
				width:$(this).attr("data-percent")
			},3000);
			var percent = $(this).attr("data-percent");
			$(this).find(".count").html("<span>" + percent + "</span>");
		});
	});

	$(".portfolio-item").each(function(e){
		var th = $(this);

		th.attr("href", "#portfolio-img-" + e)
		.find(".portfolio-popup")
		.attr("id", "portfolio-img-" + e);
	});

	$(".portfolio-item").magnificPopup({
		type: 'inline',
		mainClass: 'my-mfp-zoom-in',
		removalDelay: 300,
	});

	$(".block-services").animated("fadeInDown", "fadeOutUp");
	$(".about-block").animated("fadeInRight", "fadeOutUp");
	$(".contacts").animated("fadeInLeft", "fadeOutUp");
	$(".s-left h2").animated("fadeInDown", "fadeOutUp");
	$(".s-left p").animated("fadeInUp", "fadeOutDown");

	//preload
	$(".loader").fadeOut();

	$(".head-text p").addClass("animated fadeInUp");
	$(".head-text li").addClass("animated flipInX");

	$(".head-text h1").animated("fadeInDown", "fadeInUp");

});