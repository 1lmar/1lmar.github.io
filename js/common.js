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

	 var recaptcha1;
      var recaptcha2;
      var myCallBack = function() {
        //Render the recaptcha1 on the element with ID "recaptcha1"
        recaptcha1 = grecaptcha.render('recaptcha1', {
          'sitekey' : '6Lc6OAsUAAAAAL_4A6q0bBMry1cHoDK80nFFxSQ7', //Replace this with your Site key
          'theme' : 'light'
        });
        
        //Render the recaptcha2 on the element with ID "recaptcha2"
        recaptcha2 = grecaptcha.render('recaptcha2', {
          'sitekey' : '6Lc6OAsUAAAAAL_4A6q0bBMry1cHoDK80nFFxSQ7', //Replace this with your Site key
          'theme' : 'dark'
        });
      };


});
