$(function() {

    $("body").addClass("js");
  
    $(".link-mnu").click(
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
