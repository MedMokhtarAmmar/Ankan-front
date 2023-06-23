$(document).ready(function() {

    var heightWindow = $( window ).height();
    var contentSideBar = $(".contentSidebar");
    contentSideBar.css("height", heightWindow-60);

    /* side bar toggle */
    $( ".menuMobile" ).click(function() {
        $( ".sidebar" ).toggle( "drop",500 );
      });

});



$( window ).resize(function() {
    var heightWindow = $( window ).height();
    var widthWindow = $( window ).width();
    var contentSideBar = $(".contentSidebar");
    contentSideBar.css("height", heightWindow-60);
    if (widthWindow >= 1024) {
        $(".sidebar").css("display", "block");
    }else{
        $(".sidebar").css("display", "none");
    }

});
