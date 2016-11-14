$(function() {

    var containerId = '#tabs-container';
var tabsId = '#tabs';

    // Preload tab on page load
    if($(tabsId + ' LI.current A').length > 0){
        loadTab($(tabsId + ' LI.current A'));
    }
    
    $(tabsId + ' A').click(function(){
        if($(this).parent().hasClass('current')){ return false; }
        
        $(tabsId + ' LI.current').removeClass('current');
        $(this).parent().addClass('current');
        
        loadTab($(this));        
        return false;
    });

function loadTab(tabObj){
    if(!tabObj || !tabObj.length){ return; }
    $(containerId).addClass('loading');
    $(containerId).fadeOut('fast');
    
    $(containerId).load(tabObj.attr('href'), function(){
        $(containerId).removeClass('loading');
        $(containerId).fadeIn('fast');
    });
}

    $("body").addClass("mobile-mnu");

    // $(".tabs-nav .owl-item").click(function(e) {
    //   var a = $(this),
    //       parent = a.parents('.tabs'),
    //       nav = parent.children('.tabs-nav').children('.owl-item'),
    //       box = parent.children('.tabs-box').children('div');
     
    //   if (!a.hasClass('active')) {
    //     a.addClass('active')
    //       .siblings().removeClass('active');
     
    //     box.eq(a.index()).addClass('active')
    //       .siblings().removeClass('active');
    //   }
     
    //   e.preventDefault();
    // });

    $(".log-item, .game, .timezone-link, .lang-modal").magnificPopup({
      type:'inline',
      midClick: true,
      mainClass: 'my-mfp-zoom-in',
      removalDelay: 300,
    });

    $(".slider-wrap").owlCarousel({
      loop: true,
      items: 1,
      dots: true,
      autoplay:true,
      autoplayTimeout:3500,
      autoplayHoverPause:true
    });
    $(".slots-slider-wrap").owlCarousel({
      loop: true,
      items: 1,
      dots: true,
      autoplay:true,
      autoplayTimeout:3500,
      autoplayHoverPause:true
    });
    $(".slots-top-mnu ul").owlCarousel({
      nav: true,
      navText : "",
      margin: 10,
      responsive : {
        0 : {
          items: 5,
        },
        480 : {
          items: 7,
        },
        768 : {
          items: 8,
        }
      }
    });
     $(".cap-top-right-mnu ul").owlCarousel({
      rtl:true,
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
    });
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
    });
    $(".cab-top-submnu ul").owlCarousel({
      nav: true,
      navText: "",
      items: 4,
      responsive : {
        0 : {
          items: 4,
        },
        480 : {
          items: 6,
        }
      }
    });
    $(".cab-fill-submnu ul").owlCarousel({
      nav: true,
      navText: "",
      responsive : {
        0 : {
          items: 4,
        },
        480 : {
          items: 6,
        }
      }
    });
    $(".balance-list .balance-slider").owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      navText: "",
      responsive : {
        0 : {
          items: 1,
        },
        768 : {
          items: 2,
        }
      }
    });
    
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
  $('.table-filtr li').click(function(){
     $('.table-filtr li').removeClass('table-active');
     $(this).addClass('table-active');
  });
    //withdraw-tabs
  $(".submnu-item").not(":first-child").hide();
  $(".cab-top-submnu .owl-item").click(function() {
    $(".cab-top-submnu .owl-item").removeClass("submnu-active").eq($(this).index()).addClass("submnu-active");
    $(".submnu-item").hide().eq($(this).index()).fadeIn()
  }).eq(0).addClass("submnu-active");
    //fill-tabs
  $(".fill-item").not(":first-child").hide();
  $(".cab-fill-submnu .owl-item").click(function() {
    $(".cab-fill-submnu .owl-item").removeClass("fill-active").eq($(this).index()).addClass("fill-active");
    $(".fill-item").hide().eq($(this).index()).fadeIn()
  }).eq(0).addClass("fill-active");
    //slots-tabs
  $(".slot-item").not(":first-child").hide();
  $(".slots-nav-row .owl-item").click(function() {
    $(".slots-nav-row .owl-item").removeClass("slot-active").eq($(this).index()).addClass("slot-active");
    $(".slot-item").hide().eq($(this).index()).fadeIn().addClass("slot-active")
  }).eq(0).addClass("slot-active");

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
