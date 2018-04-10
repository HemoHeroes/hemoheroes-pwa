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
    
  }); // end of document ready
  
  function init() {
    var router = new Router([
      new Route('home', 'home.html', true),            
      new Route('about', 'about.html')
    ]);
  }

  init()
  
})(jQuery); // end of jQuery name space