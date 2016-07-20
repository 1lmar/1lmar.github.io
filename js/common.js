$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};
	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$(".main-mnu").slideToggle();
	});
	var owl = $(".owl-carousel.clients");
	owl.owlCarousel({
		stagePadding: 0,
		margin: 0,
		loop: true,
		items: 6,
		dots: false,
		nav: false,

		responsive: {
			0: {
				items: 2
			},
			480: {
				items: 3
			},
			768: {
				items: 4
			},
			992: {
				items: 6
			}
		}
	});
	$(".next").click(function(){
		owl.trigger("next.owl.carousel");
	});

	$(".owl-carousel").owlCarousel({
		stagePadding: 80,
		loop: true,
		dots: true,

		responsive: {
			0: {
				items: 1,
				stagePadding: 0,
			},
			480: {
				items: 2,
				stagePadding: 0
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			}

		}
	});

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});
