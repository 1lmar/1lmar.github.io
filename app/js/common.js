$(function() {

	$(".owl-carousel").owlCarousel({
		items:1,
		autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true
	});

	var o, n;
  $(".title_block").on("click", function() {
    o = $(this).parents(".accordion_item"), n = o.find(".info"),
      o.hasClass("active_block") ? (o.removeClass("active_block"),
        n.slideUp()) : (o.addClass("active_block"), n.stop(!0, !0).slideDown(),
        o.siblings(".active_block").removeClass("active_block").children(
          ".info").stop(!0, !0).slideUp())
  });

});
