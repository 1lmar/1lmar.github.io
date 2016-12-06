$(function() {
		
	$(".info-list .info-header").click(function() {
		if($(this).next("div").is(":visible")){
			$(this).next("div").slideUp("slow");
		} else {
			$(".info-list .info-content").slideUp("slow");
			$(this).next("div").slideToggle("slow");
		}
	});

});