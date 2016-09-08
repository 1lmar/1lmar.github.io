$(function() {

	$(".owl-carousel").owlCarousel({
		stagePadding: 10,
		loop: true,
		margin: 10,
		responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
     }
	});
	$("body").on('click', '[href*="#"]', function(e){
		var fixed_offset = 0;
		$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
		e.preventDefault();
	});
	
	// toggle-mnu
	$(".toggle-mnu").click(function() {
	  $(this).toggleClass("on");
	  $(".top-mnu").slideToggle();
	  return false;
	});

});
