(function($){
  "use strict";
  $(function(){
    
    $('.sidenav').sidenav();
    $('.parallax').parallax();
    
    $(".dropdown-button").dropdown(
      {
        hover: true,
        belowOrigin: true,
        gutter: 1,
        constrainWidth: false
      }
    );
    
    $('select').formSelect();
    
    
  }); // end of document ready
})(jQuery); // end of jQuery name space