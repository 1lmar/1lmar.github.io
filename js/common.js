$(function() {

	$(".main-head").css("height", $(window).height());

	var $menu = $("#menu");
	$(window).scroll(function(){
			if ( $(this).scrollTop() > 100 && $menu.hasClass("default") ){
					$menu.removeClass("default").addClass("fixed");
			} else if($(this).scrollTop() <= 100 && $menu.hasClass("fixed")) {
					$menu.removeClass("fixed").addClass("default");
			}
	});

	$(".toggle").click(
			function(){
				$(this).toggleClass("on");
				$("body").toggleClass("show-menu");
			}
		);

	$(".slider-wrap").owlCarousel({
		loop:true,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
		responsive : {
			0 : {
				items:2,
			},
			480 : {
				items:5,
			},
			768 : {
				items:5,
			}
		}
	});
	$(".slots-slider").owlCarousel({
		items: 1,
		loop:true,
		autoplay:true,
		autoplayTimeout:4000,
		autoplayHoverPause:true,
	});
	$("body").on("click", ".top", function(){
		$("html, body").animate({scrollTop: 0}, "slow");
	});
	$("body").append('<div class="top"><i class="fa fa-angle-up">');
	$(window).scroll(function(){
		if($(this).scrollTop() > $(this).height()){
			$(".top").addClass("active");
		} else {
			$(".top").removeClass("active");
		}
	});

	$(".com-link").magnificPopup({
		type:'inline',
		midClick: true,
		mainClass: 'my-mfp-zoom-in',
		removalDelay: 300,
	});

	$('.brands-gallery, .accordion').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-zoom-in',
		gallery: {
			enabled: true
		},
			removalDelay: 300,
			callbacks: {
				beforeChange: function() {
					this.items[0].src = this.items[0].src + '?=' + Math.random(); 
				},
				open: function() {
					$.magnificPopup.instance.next = function() {
						var self = this;
						self.wrap.removeClass('mfp-image-loaded');
						setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
					}
					$.magnificPopup.instance.prev = function() {
						var self = this;
						self.wrap.removeClass('mfp-image-loaded');
						setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
					}
				},
				imageLoadComplete: function() { 
					var self = this;
					setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
				}
			}
	});

	jQuery(".commission-block, .brands-gallery a").addClass("v-hidden").viewportChecker({
		classToAdd: 'visible animated zoomIn',
		offset: 100
	});
	jQuery(".left-animate").addClass("v-hidden").viewportChecker({
		classToAdd: 'visible animated slideInLeft',
		offset: 100
	});
	jQuery(".right-animate").addClass("v-hidden").viewportChecker({
		classToAdd: 'visible animated slideInRight',
		offset: 100
	});
	jQuery(".list-icon").addClass("v-hidden").viewportChecker({
		classToAdd: 'visible animated flipInY',
		offset: 100
	});

});
