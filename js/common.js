$(function() {

    $("body").addClass("mobile-mnu");
  	
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


});
