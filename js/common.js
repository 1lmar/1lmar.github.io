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

	var ptro_rw = document.getElementById('recaptcha_widget'); 
								var padre = ptro_rw.parentNode; 
								var div_recaptcha = padre.firstChild; 
								var id_nuevo_div = 'recaptcha_'+ formActual; 
								var nuevo_div = document.getElementById(id_nuevo_div); 
								nuevo_div.appendChild(div_recaptcha); 
								Recaptcha.reload(); 


});
