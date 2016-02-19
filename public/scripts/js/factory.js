(function (window , document , jQuery , undefined) {
    'use strict';

    var Projects = {
        Factory : {
            W            : jQuery(window),
            D            : jQuery(document),
            HB           : jQuery('html , body'),
            H            : jQuery('html'),
            B            : jQuery('body'),
            Device       : /Android|webOS|iPad|BlackBerry/i,
            OS           : null,
            DocumentOff  : 'click touchstart',
            Animationend : null,
            Dynamic      : null,
            UserAgent    : null,
            Href         : window.location.href,
            GetUserAgent : function() {
                var $this = this;

                if ( $this.W.width() < 768 ) {
                    $this.UserAgent = 'Mobile';
                } else {
                    if ( $this.Device.test(navigator.userAgent) ) {
                        $this.UserAgent = 'Tablet';
                    } else {
                        $this.UserAgent = 'PC';
                    }
                }

                $this.OS = $this.UserAgent !== 'PC' ? ( /iPad|iPhone|iPod/i.test(navigator.userAgent) ? 'IOS' : 'Android' ) : null;
                $this.Dynamic = $this.Device.test(navigator.userAgent) ? 'webkitAnimationEnd webkitTransitionEnd' : 'animationend transitionend';
            },
            Nav : {
                GetActive : function() {
                    for ( var i = 0 , $elem = jQuery('.jQ-nav').find(' > ul > li') ; i < $elem.length ; i ++ ) {

                        if ( $elem.eq(i).hasClass( jQuery('.jQ-nav').data('active') ) ) {
                            jQuery('.jQ-nav-bar').css({
                                'left'  : ($elem.eq(i).offset().left - jQuery('.jQ-nav').offset().left),
                                'width' : $elem.eq(i).find('> a').outerWidth()
                            });

                            if ( ! jQuery('.jQ-nav').hasClass( jQuery('.jQ-nav').data('load') ) ) {
                                jQuery('.jQ-nav').addClass( jQuery('.jQ-nav').data('load') );
                            }
                        }
                    };
                },
                OnClickCtrl : function() {
                    jQuery('.jQ-nav').toggleClass(jQuery('.jQ-nav').data('open'));
                },
                OnClick : function(Element) {
                    jQuery('.jQ-nav-bar').one(Projects.Factory.Dynamic , function(){
                        if ( jQuery(Element).attr('href') !== '#' && jQuery(Element).attr('href') !== 'javascript:;' ) {
                            window.location = jQuery(Element).attr('href');
                        }
                    });
                },
                OnMouseOver : function(Element) {
                    jQuery('.jQ-nav-bar').css({
                        'left'  : (jQuery(Element).parent().offset().left - jQuery('.jQ-nav').offset().left),
                        'width' : jQuery(Element).outerWidth()
                    });
                },
                OnMouseOut : function() {
                    var $this = this;
                    var $timer = jQuery.noop();

                    window.clearTimeout($timer);

                        $this.GetActive();
                    $timer = setTimeout(function(){
                    } , 150);
                }
            },
            MCustomScrollbar : {
                Init : function(Element , CallBack) {
                    if ( Projects.Factory.UserAgent === 'PC' ) {
                        jQuery(Element).mCustomScrollbar({
                            scrollInertia : 1200,
                            mouseWheel    : {
                                scrollAmount : 600
                            }, 
                            callbacks : {
                                whileScrolling : function() {
                                    for ( var i = 0 , $elem = jQuery('.jQ-translate') ; i < $elem.length ; i ++ ) {
                                        $elem.eq(i).css('transform' , 'translate(0px , '+ ( ( ( this.mcs.draggerTop + ( i * $elem.outerHeight() * ( 0.975 / $elem.length ) * (-1) ) ) ) ) +'px)'); 
                                    };

                                    if ( CallBack ) {
                                        eval( CallBack( ( this.mcs.top * (-1) ) ) );
                                    }
                                }
                            }
                        });
                    }
                }
            },
            SliceBox : {
                SliceBox : null,
                Video    : null,
                Times    : 5000,
                SetTimer : null,
                Init : function(Element) {
                    var $this = this;

                    $this.SliceBox = jQuery(Element).slicebox({
                        orientation   : 'h',
                        cuboidsCount  : 1,
                        onReady       : function() {
                            $this.IsVideo(Element , 0);
                        },
                        onBeforeChange : function() {
                        },
                        onAfterChange : function(Index) {
                            $this.IsVideo(Element , Index);
                        }
                    });
                },
                IsVideo : function(Element , Index) {
                    var $this = this;

                    if ( Projects.Factory.UserAgent === 'PC' ) {
                        window.clearTimeout($this.SetTimer);

                        if ( jQuery(Element).find('.m-slider-item').eq(Index).find('.m-slider-media').find('> *:first')[0].nodeName === 'VIDEO' ) {
                            $this.Video = jQuery(Element).find('.m-slider-item').eq(Index).find('.m-slider-media').find('> *:first')[0];
                            $this.Play();
                            $this.Ended();
                        } else {
                            if ( $this.Video !== null ) {
                                $this.Pause();
                            }

                            $this.SetTimer = setTimeout(function(){
                                $this.Next();
                            } , $this.Times);
                        }    
                    }
                },
                Play : function() {
                    var $this = this;

                    $this.Video.play();
                },
                Pause : function() {
                    var $this = this;

                    $this.Video.pause();
                    $this.Video.currentTime = '0';
                },
                Ended : function() {
                    var $this = this;

                    $this.Video.addEventListener('ended' , function(){
                        $this.Next();
                    } , false);
                },
                Prev : function(Element) {
                    var $this = this;

                    $this.SliceBox.previous();
                    return false;
                },
                Next : function(Element) {
                    var $this = this;

                    $this.SliceBox.next();
                    return false;
                }
            },
            OwlCarousel : {
                Init : function(Element) {
                    var $this = this;

                    if ( jQuery(Element).length !== 0 ) {
                        $this.Setting(jQuery(Element));
                    }
                },
                Setting : function(Element) {
                    

                    for ( var i = 0 ; i < Element.length ; i ++ ) {
                        Element.eq(i).owlCarousel({
                            mouseDrag  : Projects.Factory.UserAgent !== 'PC' ? ( ( Element.eq(i).data('mouse-drag') !== false ) ? true : false ) : false,
                            touchDrag  : ( Element.eq(i).data('touch-drag') !== false ) ? true : false,
                            pullDrag   : ( Element.eq(i).data('pull-drag') !== false ) ? true : false,
                            center     : ( Element.eq(i).data('center') !== true ) ? false : true,
                            responsive : {
                                0 : {
                                    items   : ( Element.eq(i).data('item-xs') && parseInt( Element.eq(i).data('item-xs') , 10 ) > 0 ) ? parseInt( Element.eq(i).data('item-xs') , 10 ) : 1,
                                    slideBy : ( Element.eq(i).data('item-xs') && parseInt( Element.eq(i).data('item-xs') , 10 ) > 0 ) ? parseInt( Element.eq(i).data('item-xs') , 10 ) : 1,
                                    nav     : Element.eq(i).data('item-xs') ? ( Element.eq(i).find('> *').length > parseInt( Element.eq(i).data('item-xs') , 10 ) ) ? ( ( Element.eq(i).data('nav-xs') !== true ) ? false : true ) : false : ( Element.eq(i).find('> *').length > 1 ) ? ( ( Element.eq(i).data('nav-xs') !== true ) ? false : true ) : false,
                                    dots    : Element.eq(i).data('item-xs') ? ( Element.eq(i).find('> *').length > parseInt( Element.eq(i).data('item-xs') , 10 ) ) ? ( ( Element.eq(i).data('dots') !== true ) ? false : true ) : false : ( Element.eq(i).find('> *').length > 1 ) ? ( ( Element.eq(i).data('dots') !== true ) ? false : true ) : false,
                                    loop    : Element.eq(i).data('item-xs') ? ( Element.eq(i).find('> *').length > parseInt( Element.eq(i).data('item-xs') , 10 ) ) ? ( ( Element.eq(i).data('loop') !== true ) ? false : true ) : false : ( Element.eq(i).find('> *').length > 1 ) ? ( ( Element.eq(i).data('loop') !== true ) ? false : true ) : false
                                },
                                740 : {
                                    items   : ( Element.eq(i).data('item-sm') && parseInt( Element.eq(i).data('item-sm') , 10 ) > 0 ) ? parseInt( Element.eq(i).data('item-sm') , 10 ) : 1,
                                    slideBy : ( Element.eq(i).data('item-sm') && parseInt( Element.eq(i).data('item-sm') , 10 ) > 0 ) ? parseInt( Element.eq(i).data('item-sm') , 10 ) : 1,
                                    nav     : Element.eq(i).data('item-sm') ? ( Element.eq(i).find('> *').length > parseInt( Element.eq(i).data('item-sm') , 10 ) ) ? ( ( Element.eq(i).data('nav-sm') !== true ) ? false : true ) : false : ( Element.eq(i).find('> *').length > 1 ) ? ( ( Element.eq(i).data('nav-sm') !== true ) ? false : true ) : false,
                                    dots    : Element.eq(i).data('item-sm') ? ( Element.eq(i).find('> *').length > parseInt( Element.eq(i).data('item-sm') , 10 ) ) ? ( ( Element.eq(i).data('dots') !== true ) ? false : true ) : false : ( Element.eq(i).find('> *').length > 1 ) ? ( ( Element.eq(i).data('dots') !== true ) ? false : true ) : false,
                                    loop    : Element.eq(i).data('item-sm') ? ( Element.eq(i).find('> *').length > parseInt( Element.eq(i).data('item-sm') , 10 ) ) ? ( ( Element.eq(i).data('loop') !== true ) ? false : true ) : false : ( Element.eq(i).find('> *').length > 1 ) ? ( ( Element.eq(i).data('loop') !== true ) ? false : true ) : false
                                },
                                960 : {
                                    items   : ( Element.eq(i).data('item-md') && parseInt( Element.eq(i).data('item-md') , 10 ) > 0 ) ? parseInt( Element.eq(i).data('item-md') , 10 ) : 1,
                                    slideBy : ( Element.eq(i).data('item-md') && parseInt( Element.eq(i).data('item-md') , 10 ) > 0 ) ? parseInt( Element.eq(i).data('item-md') , 10 ) : 1,
                                    nav     : Element.eq(i).data('item-md') ? ( Element.eq(i).find('> *').length > parseInt( Element.eq(i).data('item-md') , 10 ) ) ? ( ( Element.eq(i).data('nav-md') !== true ) ? false : true ) : false : ( Element.eq(i).find('> *').length > 1 ) ? ( ( Element.eq(i).data('nav-md') !== true ) ? false : true ) : false,
                                    dots    : Element.eq(i).data('item-md') ? ( Element.eq(i).find('> *').length > parseInt( Element.eq(i).data('item-md') , 10 ) ) ? ( ( Element.eq(i).data('dots') !== true ) ? false : true ) : false : ( Element.eq(i).find('> *').length > 1 ) ? ( ( Element.eq(i).data('dots') !== true ) ? false : true ) : false,
                                    loop    : Element.eq(i).data('item-md') ? ( Element.eq(i).find('> *').length > parseInt( Element.eq(i).data('item-md') , 10 ) ) ? ( ( Element.eq(i).data('loop') !== true ) ? false : true ) : false : ( Element.eq(i).find('> *').length > 1 ) ? ( ( Element.eq(i).data('loop') !== true ) ? false : true ) : false
                                }
                            },
                            lazyLoad          : ( Element.eq(i).data('img-load') !== true ) ? false : true,
                            autoplay          : ( Element.eq(i).data('autoplay') !== true ) ? false : true,
                            autoplayTimeout   : Element.eq(i).data('timeout') ? Element.eq(i).data('timeout') : 5000,
                            navContainerClass : Element.eq(i).data('nav-class') ? Element.eq(i).data('nav-class') + '-ctrl' : 'm-slider-ctrl',
                            navClass          : [' ' + ( Element.eq(i).data('nav-class') ? Element.eq(i).data('nav-class') + '-arrow' : 'm-slider-arrow') + ' ' + ( Element.eq(i).data('nav-class') ? Element.eq(i).data('nav-class') + '-prev' : 'is-prev') + ' m-icon m-icon-angle-left', ' ' + (Element.eq(i).data('nav-class') ? Element.eq(i).data('nav-class') + '-arrow' : 'm-slider-arrow') + ' ' + ( Element.eq(i).data('nav-class' ) ? Element.eq(i).data('nav-class') + '-next' : 'is-next') + ' m-icon m-icon-angle-right'],
                            navText           : ['' , ''],
                            controlsClass     : 'm-slider-controls',
                            dotsClass         : Element.eq(i).data('nav-class') ? Element.eq(i).data('nav-class') + '-dots' : 'm-slider-dots ' + ( Element.eq(i).data('dots-position') !== 'relative' ? 'is-absolute' : 'is-relative') + '',
                            dotClass          : Element.eq(i).data('nav-class') ? Element.eq(i).data('nav-class') + '-dot' : 'm-slider-dot',
                            centerClass       : Element.eq(i).data('nav-class') ? Element.eq(i).data('nav-class') + '-center' : 'is-center',
                            activeClass       : Element.eq(i).data('active-class') ? Element.eq(i).data('active-class') + '-active' : 'is-active',
                            startPosition     : ( parseInt( Element.eq(i).data('start-position'), 10 ) > 0 ) ? parseInt( Element.eq(i).data('start-position'), 10 ) : 0
                        });
                    };
                },
                Events : function(Element , EventsName , Functions) {
                    jQuery(Element).on(EventsName , function(e){
                        Functions(e);
                    });
                }
            },
            FullImg : {
                EWidth  : null,
                EHeight : null,
                Element : jQuery('.jQ-full'),
                Init    : function(Browser) {
                    var $this    = this;
                    var $BWidth  = jQuery(Browser).outerWidth(),
                        $BHeight = jQuery(Browser).outerHeight();

                    for ( var i = 0 ; i < $this.Element.length ; i ++ ) {
                        $this.Element.eq(i).removeAttr('style');

                        $this.EWidth  = $this.Element.eq(i).width();
                        $this.EHeight = $this.Element.eq(i).height();

                        if ( ( $BHeight / $BWidth ) > ( $this.EHeight / $this.EWidth ) ) {
                            $this.Element.eq(i).css({
                                'margin-left' : ( parseInt( ( ( $BHeight / $this.EHeight ) * $this.EWidth ) , 10 ) - $BWidth ) / 2 * (-1) + 'px',
                                'width'       : parseInt( ( ( $BHeight / $this.EHeight ) * $this.EWidth ) , 10 )  + 'px',
                                'height'      : $BHeight + 'px'
                            });

                        } else {
                            $this.Element.eq(i).css({
                                'margin-top' : ( parseInt( ( ( $BWidth / $this.EWidth ) * $this.EHeight ) , 10 ) - $BHeight ) / 2 * (-1) + 'px',
                                'width'      : $BWidth + 'px',
                                'height'     : parseInt( ( ( $BWidth / $this.EWidth ) * $this.EHeight ) , 10 ) + 'px'
                            });
                        }
                    }
                }
            },
            Clipboard : {
                Element  : null,
                SetTimer : null,
                Timer    : 800,
                Init : function() {
                    var $this = this;

                    $this.Element = new Clipboard('.jQ-copy');

                    $this.OnSuccess();
                    $this.OnError();
                    
                },
                OnSuccess : function() {
                    var $this = this;

                    $this.Element.on('success', function(e) {
                        jQuery(e.trigger).addClass(jQuery(e.trigger).data('class'));

                        window.clearTimeout($this.SetTimer);

                        $this.SetTimer = setTimeout(function(){
                            jQuery(e.trigger).removeClass(jQuery(e.trigger).data('class'));
                        } , $this.Timer);
                    });
                },
                OnError : function() {
                    var $this = this;

                    $this.Element.on('error', function(e) {});
                }
            },
            ValiDate : {
                Element : jQuery('#form'),
                ErrorClass : 'is-error',
                // ValidClass : 'is-success',
                AddMethod : function() {
                    /*  number checked */
                    jQuery.validator.addMethod('NumberMethod' , function (value, elem, params) {
                        var Numbers = /^[0-9]+$/;
                        return this.optional(elem) || ( Numbers.test(value) );
                    });

                    jQuery.validator.unobtrusive.adapters.add('Number' , function (options) {
                        options.rules['NumberMethod']    = true;
                        options.messages['NumberMethod'] = options.message;
                    });
                },
                Init : function() {
                    var $this = this;

                    $this.AddMethod();

                    

                    if ( $this.Element.validate !== undefined ) {
                        // if ( typeof( agElem('.ng-controller').scope().validate ) !== 'undefined' && agElem('.ng-controller').scope().validate.isaddMethod !== undefined ) {
                        //     agElem('.ng-controller').scope().validate.isaddMethod();
                        // }

                        // $this.Element.data('validator').settings.errorClass = $this.ErrorClass;
                        // $this.Element.data('validator').settings.validClass = $this.ValidClass;
                        // $this.Element.data('validator').settings.focusCleanup = true;
                        $this.Element.data('validator').settings.submitHandler = function (form) {
                            // alert(0);
                        //     if ( ! jQuery(this.submitButton).hasClass('is-disable') ) {
                        //         jQuery('.ng-controller').scope().validate.isubmit(form , this.submitButton);
                                return false;
                        //     }
                        //     // if ( typeof( agElem('.ng-controller').scope().validate ) !== 'undefined' && agElem('.ng-controller').scope().validate.isubmit !== undefined ) {
                                
                        //     // }
                        };


                        $this.Element.data('validator').settings.errorPlacement = function(error , element) {
                            if ( element[0].nodeName === 'SELECT' ) {
                                jQuery(element).parent().addClass($this.ErrorClass);
                            }
                        };

                        // $this.Element.data('validator').settings.onfocusin = function(element) {
                        //     console.log(element);
                        // }

                        // $this.Element.data('validator').settings.invalidHandler = function(error , element) {
                        //     console.log(error);
                        //     console.log(element);
                        // }
                    }

                    // console.log($this.Element.data('validator').settings);

                    $this.Unobtrusive();
                },
                Unobtrusive : function() {
                    var $this = this;

                    $this.Element.removeData('validator');
                    jQuery.validator.unobtrusive.parse($this.Element);
                }
            }
        }
    }

    if ( ! window.Projects ) {
        window.Projects = Projects;
    } else {
        window.Projects = $.extend({} , window.Projects , Projects);
    }
}(window, document, jQuery));