$(function() {

	$(".toggle-mnu").click(function() {
	 $( ".menu-wrap" ).addClass( "active-menu" );
	});
	$(".close-button").click(function() {
	 $( ".menu-wrap" ).removeClass( "active-menu" );
	});

	$(".mouse-icon").click(function(){
		$("html, body").animate({
			scrollTop: $("section").offset().top
		}, 800);
	});
});