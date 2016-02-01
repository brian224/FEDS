(function (window , document , jQuery , undefined) {
    'use strict';

    Projects.Factory.GetUserAgent();

    if ( Projects.Factory.UserAgent === 'PC' ) {
        jQuery('.jQ-nav-item').hover(function(){
            Projects.Factory.Nav.OnMouseOver(this);
        } , function(){
            Projects.Factory.Nav.OnMouseOut();
        });
    } else if ( Projects.Factory.UserAgent === 'Tablet' ) {
        jQuery('.jQ-nav-item').on('click' , function(e){
            e.preventDefault();
            Projects.Factory.Nav.OnMouseOver(this);
            Projects.Factory.Nav.OnClick(this);
        });
    }

    jQuery(document).ready(function(){
        
    });

    jQuery(window).load(function(){
        Projects.Factory.Nav.GetActive();
    }).resize(function(){
        Projects.Factory.GetUserAgent();
    });

}(window, document, jQuery));