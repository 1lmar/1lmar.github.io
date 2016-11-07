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
    $(".cab-top-mnu ul").owlCarousel({
      // center: true,
      items: 3,
      nav: true,
      navText : "",
      responsive : {
        0 : {
          items: 3,
        },
        480 : {
          items: 4,
        },
        768 : {
          items: 5,
        }
      }
    })
    $(".cab-top-submnu ul").owlCarousel({
      // center: true,
      items: 4,
      responsive : {
        0 : {
          items: 4,
        },
        480 : {
          items: 6,
        }
      }
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

    //cabinet-tabs
  $(".cab-item").not(":first-child").hide();
  $(".cab-top-mnu .owl-item").click(function() {
    $(".cab-top-mnu .owl-item").removeClass("cab-active").eq($(this).index()).addClass("cab-active");
    $(".cab-item").hide().eq($(this).index()).fadeIn()
  }).eq(0).addClass("cab-active");
    //bank-tabs
  $(".submnu-item").not(":first-child").hide();
  $(".cab-top-submnu .owl-item").click(function() {
    $(".cab-top-submnu .owl-item").removeClass("submnu-active").eq($(this).index()).addClass("submnu-active");
    $(".submnu-item").hide().eq($(this).index()).fadeIn()
  }).eq(0).addClass("submnu-active");

  $("#reg-tel-input").intlTelInput({
    defaultCountry: "ru",
    preferredCountries: [ "ru", "us" ],
    nationalMode: false,
  });
  $("#reg-tel-full").intlTelInput({
    defaultCountry: "ru",
    preferredCountries: [ "ru", "us" ],
    nationalMode: false,
  });

  $(".table").footable({
    calculateWidthOverride: function() {
      return {width: jQuery(window).width()};
    },
    breakpoints: {
        mobile: 0,
        tablet: 720,
        desktop: 1024
    }
  });

});
