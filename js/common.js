$(function() {

    $("body").addClass("js");
  
    $(".left-link-mnu").click(
      function(){
        $("body").toggleClass("show-menu");
      }
    );
    $(".button").click(
      function(){
        $("body").toggleClass("show-menu");
      }
    );


});
