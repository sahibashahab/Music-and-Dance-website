/**
 * http://kopatheme.com
 * Copyright (c) 2016 Kopatheme
 *
 * Licensed under the GPL license:
 *  http://www.gnu.org/licenses/gpl.html
 **/

/**
 *   1  - Menu
 *   2  - Owl Carousel
 *   3  - Sticky
 *   4  - Playlist
 *   5  - Count Down
 *   6  - Masonry
 *   7  - Back To Top
 *   8  - Match Height
 *   9  - Responsive Tabs
 *  10  - Collapse
 *  11  - Load More
 *  12  - Fit Video
 *  13  - Light Box
 *  14  - Google Map
 *-----------------------------------------------------------------
 **/

'use strict';

jQuery(document).ready(function($) {

    var linkGithub01 = 'https://gist.githubusercontent.com/hjepbo/89483df35eb4c3969516ce45474f432b/raw/4fec13c453b8ee663870250aface528173712db7/music__gallery';
    var linkGithub02 = 'https://gist.githubusercontent.com/hjepbo/4ea5db112ca3e084942ac8db21d005e6/raw/719bf970306020661d349b2e2634d515513f3af9/music__dance';
    var linkGithub03 = 'https://gist.githubusercontent.com/hjepbo/a3b1dff915b605b3ea955ceb02c058f7/raw/10e08f34031f88e3055f92d8680ac8194a91effe/music__event';
    var linkGithub04 = 'https://gist.githubusercontent.com/hjepbo/095efdd77b76f7ef9e0ed73e1ae0b19a/raw/fb9677929bd82e426992fb17f3c9c72ad445a880/music__shop';
    var linkGithub05 = 'https://gist.githubusercontent.com/hjepbo/aec23198837cedba4f7c0bcfea1ef5d2/raw/92348d7727103d71d43c8a5b6fbe279a15afc6a3/music__gallery__2';

    /* Other */
    if( jQuery('.kopa__recentBlog.style--01').length ) {
        calcPadding('.kopa__recentBlog.style--01 .widget-title');
    }

    if( jQuery('.kopa__contactForm.style--01').length ) {
        calcPaddingRight('.kopa__contactForm.style--01 .widget-content');
    }

    if( jQuery('.kopa__peopleSay.style--01').length ) {
        calcPaddingLeft('.kopa__peopleSay.style--01 .widget-title');
    }

    if( jQuery('.kopa__topPage.style--01').length ) {
        calcPaddingLeft('.kopa__topPage.style--01 .kopa__topPage--bottom__title');
    }

    if( jQuery('.kopa__aboutSection.style--01').length ) {
        calcPaddingRight('.kopa__aboutSection.style--01 .entry-content');
    }

    /* =========================================================
    1. Menu
    ============================================================ */
    /* Super fish */
    if( jQuery('.sf-menu').length ) {
        // Main menu
        jQuery('.sf-menu').superfish({
            delay: 300,
            speed: 'fast',
            cssArrows: true
        });

        // Mega menu
        if( jQuery('.sf-mega').length ) {
            jQuery('.sf-mega').parent('li').addClass('is-sf-mega');
        }

        // Keep submenu inside screen
        jQuery('.sf-menu').on('mouseenter', '.has-sub-menu', function() {
            var menu    = jQuery(this).children('.sub-menu'),
                menupos = jQuery(menu).offset();

            if( menupos.left + menu.width() > jQuery(window).width() ) {
                menu.addClass('pos-right');
            }
        });
    }

    /* Navgoco */
    if( jQuery('.kopa__mobileMenu').length ) {
        jQuery(".kopa__mobileMenu .nav").navgoco();

        jQuery(".kopa__mobileMenu").each(function(){
            jQuery(this).on('click', '.kopa__mobileMenu__iconBar',function() {
                jQuery(".kopa__mobileMenu .nav").toggleClass("active");
            });
        });
    }

    /* =========================================================
    2. Owl Carousel
    ============================================================ */
    if( jQuery('.owl-wrapper').length ) {
        jQuery('.owl-wrapper').each(function() {

            var option      = jQuery(this).find('.owl-carousel'),
                owl         = option,
                itemLg      = option.data('desk-top'),
                itemMd      = option.data('tablet'),
                itemSm      = option.data('small-tablet'),
                itemXs      = option.data('phone'),
                itemCenter  = option.data('center'),
                itemAuto    = option.data('auto-play'),
                itemAnimate = option.data('animate'),
                itemNav     = option.data('nav');

            owl.owlCarousel({
                margin: 30,
                nav: itemNav,
                responsiveClass:true,
                center: itemCenter,
                autoplay: itemAuto,
                autoplayTimeout: 6000,
                autoplayHoverPause: true,
                autoplaySpeed: 600,
                lazyLoad: true,
                animateOut: itemAnimate,
                mouseDrag: true,
                responsive:{
                    0: {
                        items: itemXs
                    },
                    640: {
                        items: itemSm
                    },
                    1024: {
                        items: itemMd
                    },
                    1260: {
                        items: itemLg
                    }
                },
                onInitialized: function() {
                    if( jQuery(".kopa__mainSlider__loading").length ) {
                        jQuery(".kopa__mainSlider__loading").hide();
                    }
                }
            });
        });
    }

    if( jQuery('.kopa__owlSync').length ) {
        jQuery('.kopa__owlSync').each(function() {
            var sync1    = jQuery(this).find('.sync1'),
                sync2    = jQuery(this).find('.sync2'),
                flag     = false,
                duration = 300,
                nav1     = sync1.data('nav'),
                nav2     = sync2.data('nav'),
                margin1  = sync1.data('margin'),
                margin2  = sync2.data('margin');

            sync1.owlCarousel({
                items: 1,
                mouseDrag: false,
                nav: nav1,
                margin: margin1,
            }).on('changed.owl.carousel', function (e) {
                if(!flag) {
                    flag = true;
                    sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
                    flag = false;

                    var currentItem = e.item.index;
                    sync2.find(".owl-item").removeClass("synced").eq(currentItem).addClass("synced");
                }
            });

            sync2.owlCarousel({
                items: 3,
                mouseDrag: false,
                nav: nav2,
                margin: margin2,
                onInitialized: function() {
                    sync2.find(".owl-item").eq(0).addClass("synced");
                }
            }).on('click', '.owl-item', function () {
                sync1.trigger('to.owl.carousel', [jQuery(this).index(), duration, true]);

            }).on('changed.owl.carousel', function (e) {
                if(!flag) {
                    flag = true;
                    sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
                    flag = false;
                }
            });
        });

        if( jQuery('.kopa__owlSync.style--01').length ) {
            calcPaddingSync('.kopa__owlSync.style--01 .entry-content');
        }

        if( jQuery('.kopa__owlSync.style--02').length && jQuery(window).width() > 1024 ) {
            var thisSync    = jQuery('.kopa__owlSync.style--02'),
                heightSync1 = thisSync.find('.sync1').children('.owl-stage-outer').height(),
                heightSync2 = thisSync.find('.sync2').height(),
                resultSync  = (heightSync1 - heightSync2) / 2,
                wws         = jQuery(window).width(),
                wcs         = thisSync.find('.owl-nav').width(),
                rw          = (wws - wcs) / 2;

            thisSync.find('.sync2').css('margin-top', resultSync + 'px');
            thisSync.find('.owl-nav').css('left', rw + 'px');

            jQuery(window).resize(function() {
                thisSync.find('.owl-nav').css('left', rw + 'px');
            });
        }
    }

    /* =========================================================
    3. Sticky
    ============================================================ */
    if( jQuery('.kopa__header.style--01').length ) {
        jQuery(".kopa__header.style--01").sticky({topSpacing:0});
    }

    /* =========================================================
    4. Playlist
    ============================================================ */
    if( jQuery('#kopa__player--top').length ) {
        new jPlayerPlaylist({
            jPlayer: "#kopa__player--top",
            cssSelectorAncestor: "#kopa__player--content"
        }, [
            {
                title:"Cro Magnon Man",
                artist:"Kopasoft",
                mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
                oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
            },
            {
                title:"Your Face",
                artist:"Kopasoft",
                mp3:"http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
                oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg"
            },
            {
                title:"Cyber Sonnet",
                artist:"Kopasoft",
                mp3:"http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
                oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg"
            },
            {
                title:"Tempered Song",
                artist:"Kopasoft",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg"
            },
            {
                title:"Hidden",
                artist:"Kopasoft",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
            },
            {
                title:"Lentement",
                artist:"Kopasoft",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-03-Lentement.ogg"
            },
            {
                title:"Lismore",
                artist:"Kopasoft",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-04-Lismore.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
            },
            {
                title:"The Separation",
                artist:"Kopasoft",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-05-The-separation.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-05-The-separation.ogg"
            },
            {
                title:"Beside Me",
                artist:"Kopasoft",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-06-Beside-me.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-06-Beside-me.ogg"
            },
            {
                title:"Bubble",
                artist:"Kopasoft",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-07-Bubble.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
            },
            {
                title:"Stirring of a Fool",
                artist:"Kopasoft",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-08-Stirring-of-a-fool.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-08-Stirring-of-a-fool.ogg"
            },
            {
                title:"Partir",
                artist:"Kopasoft",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-09-Partir.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-09-Partir.ogg"
            },
            {
                title:"Thin Ice",
                artist:"Kopasoft",
                mp3:"http://www.jplayer.org/audio/mp3/Miaow-10-Thin-ice.mp3",
                oga:"http://www.jplayer.org/audio/ogg/Miaow-10-Thin-ice.ogg"
            }
        ], {
            swfPath: "../../dist/jplayer",
            supplied: "oga, mp3",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true
        });
    }

    if( jQuery('.jp-volume-controls').length ) {
        jQuery('.jp-volume-controls').on('click', '.icon__vol', function() {
            if( jQuery('.jp-volume-bar').hasClass('active') ) {
                jQuery('.jp-volume-bar').removeClass('active');
            } else {
                jQuery('.jp-volume-bar').addClass('active');
            }
        })
    }

    if( jQuery('.kopa__player__btnSonglist').length ) {
        jQuery('.kopa__player').on('click', '.kopa__player__btnSonglist', function() {
            if( jQuery('.jp-playlist').hasClass('active') ) {
                jQuery('.jp-playlist').removeClass('active');
            } else {
                jQuery('.jp-playlist').addClass('active');
            }
        });
    }

    /* =========================================================
    5. Count Down
    ============================================================ */
    if( jQuery('.kopa__countDown__wrap').length ) {
        var $this        = jQuery('.kopa__countDown__wrap'),
            nextYear     = new Date(new Date().getFullYear() + 1, 0, 0, 0, 0, 0, 0),
            dataYear     = $this.data('year'),
            dataMonth    = $this.data('month'),
            dataDay      = $this.data('day'),
            dataTime     = $this.data('time'),
            dataDateTime = dataYear + '/' + dataMonth + '/' + dataDay + " " + dataTime;

        jQuery($this).countdown(dataDateTime, function(event) {
            var $this = jQuery(this).html(event.strftime(''
                +'<li><div><h3>%D</h3><span>days</span></div></li>'
                +'<li><div><h3>%H</h3><span>hours</span></div></li>'
                +'<li><div><h3>%M</h3><span>minutes</span></div></li>'
                +'<li><div><h3>%S</h3><span>Second</span></div></li>'));
        });
    }

    /* =========================================================
    6. Masonry
    ============================================================ */
    if( jQuery('.kopa__trainer.style--01').length ) {
        var _thisTrainer = jQuery('.kopa__trainer.style--01 .widget-content');

        jQuery('.kopa__trainer.style--01 .widget-content').imagesLoaded(function() {
            jQuery('.kopa__trainer.style--01 .widget-content').masonry({
                columnWidth: 1,
                itemSelector : '.col-xs-12'
            });
        }).done(function() {
            var heightSectionTrainer = jQuery('.kopa__area--06').innerHeight(),
                resultSectionTrainer = heightSectionTrainer - 100;

                jQuery('.kopa__area--06').css('height', resultSectionTrainer + 'px');
        });
    }

    if( jQuery('.kopa__gallery__content').length ) {
        var _thisGallery = jQuery('.kopa__gallery__content');

        jQuery('.kopa__gallery__content .row').imagesLoaded(function() {
            jQuery('.kopa__gallery__content .row').masonry({
                columnWidth: 1,
                itemSelector : '.col-xs-12'
            });

            jQuery('.kopa__gallery__content').on('click', '.btn', function(){
                jQuery.ajax({
                    url:linkGithub01,
                    success: function(data) {
                        var position_insert_data = jQuery('.btn').closest('.kopa__gallery__content').find('.row'),
                            items                = jQuery(data).find('.col-xs-12');
                        if( items.length ) {
                            jQuery.each(items, function(items, index){
                                jQuery(position_insert_data).append(jQuery(this)).masonry( 'appended', jQuery(this));
                            });
                            jQuery('.kopa__gallery__content .row').masonry('layout');
                        }
                    }
                });
            });
        });
    }

    if( jQuery('.kopa__danceForm.style--01').length ) {
        var _thisGallery = jQuery('.kopa__danceForm.style--01 .widget-content');

        if( jQuery(window).width() > 640 ) {
            _thisGallery.find('.col-xs-12').eq(0).css('margin-top', '140px');
            _thisGallery.find('.col-xs-12').eq(1).css('margin-top', '70px');
        }

        jQuery(_thisGallery).find('.row').imagesLoaded(function() {
            jQuery(_thisGallery).find('.row').masonry({
                columnWidth: 1,
                itemSelector : '.col-xs-12'
            });

            jQuery(_thisGallery).on('click', '.btn', function(){
                jQuery.ajax({
                    url:linkGithub02,
                    success: function(data) {
                        var position_insert_data = jQuery('.btn').closest(_thisGallery).find('.row'),
                            items                = jQuery(data).find('.col-xs-12');
                        if( items.length ) {
                            jQuery.each(items, function(items, index){
                                jQuery(position_insert_data).append(jQuery(this)).masonry( 'appended', jQuery(this));
                            });
                            jQuery(_thisGallery).find('.row').masonry('layout');
                        }
                    }
                });
            });
        });
    }

    if( jQuery('.kopa__gallery.style--03').length ) {
        var _gallery            = jQuery('.kopa__gallery.style--03'),
            masonryOptions      = {
                columnWidth: 1,
                itemSelector : '.col-xs-12'
            },
            topPage        = jQuery(".kopa__topPage--bottom"),
            hTopPage       = topPage.height() / 2,
            filterTopPage  = jQuery(".kopa__filterOptions"),
            hFilterTopPage = filterTopPage.height() / 2;

            if ( jQuery(window).width() >= 1024 ) {
                filterTopPage.css('bottom', (hTopPage - hFilterTopPage) + 'px');
            }

        _gallery.find('.kopa__filter__content').imagesLoaded(function(){
            var _galleryGrid       = _gallery.find('.kopa__filter__content').masonry(masonryOptions),
                _galleryFilter     = jQuery('.kopa__filterOptions');

            _gallery.find('.kopa__filter__content').masonry('layout');

            _galleryFilter.on('click', 'li', function(event){
                var _galleryFilterVal = jQuery(this).data('filter');

                event.preventDefault();
                _galleryFilter.removeClass('active');
                jQuery(this).addClass('active');

                _gallery.find('.kopa__filter__content').find('.col-xs-12').each(function(){
                    var _galleryFilterItem      = jQuery(this).data('filter').toString().split(','),
                        _galleryFilterItemIndex = _galleryFilterItem.indexOf(_galleryFilterVal.toString()) > -1;

                    if ( _galleryFilterVal == "*" ) {
                        jQuery(this).removeClass('hide');
                        jQuery(this).addClass('show');
                    } else {
                        if ( _galleryFilterItemIndex == true ) {
                            jQuery(this).removeClass('hide');
                            jQuery(this).addClass('show');
                        } else {
                            jQuery(this).removeClass('show');
                            jQuery(this).addClass('hide');
                        }
                    }
                });
                _gallery.find('.kopa__filter__content').masonry('layout');
            });

            jQuery('.kopa__gallery.style--03').on('click', '.btn', function(){
                jQuery.ajax({
                    url:linkGithub05,
                    success: function(data) {
                        var position_insert_data = jQuery('.btn').closest(_gallery).find('.kopa__filter__content'),
                            items                = jQuery(data).find('.kopa__filter__content .col-xs-12');
                        if( items.length ) {
                            jQuery.each(items, function(items, index){
                                jQuery(position_insert_data).append(jQuery(this)).masonry( 'appended', jQuery(this));
                            });
                            jQuery(_gallery).find('.kopa__filter__content').masonry('layout');
                        }
                    }
                });
            });
        });
    }

    /* =========================================================
    7. Back To Top
    ============================================================ */
    if( jQuery('.kopa__backToTop').length ) {
        backToTop('.kopa__backToTop');
    }

    /* =========================================================
    8. Match Height
    ============================================================ */
    if( jQuery('.kopa__owlSync__mh').length ) {
        jQuery('.kopa__owlSync__mh').matchHeight();
    }

    /* =========================================================
    9. Responsive Tabs
    ============================================================ */
    if (jQuery('.kopa__tab').length) {
        fakewaffle.responsiveTabs(['xs', 'sm']);
    }

    /* =========================================================
    10. Collapse
    ============================================================ */
    (function($) {
        $.fn.accordion = function(options) {
            var defaults = {
                open: false,
                toggle: false
            }
            var settings = jQuery.extend({}, defaults, options);

            return this.each(function() {
                var accTitle = jQuery(this).children('.acc__title');

                accTitle.each(reset);

                jQuery(this).children('.acc__title').each(function() {
                    if (jQuery(this).hasClass('active')) {
                        jQuery(this).next().show();
                    }
                });

                if(settings.toggle) {
                    accTitle.on('click',onClickTog);
                } else {
                    accTitle.on('click',onClickAcc);
                }
            });

            function onClickAcc() {
                jQuery(this).siblings('.acc__title').removeClass('active');
                jQuery(this).addClass('active');

                jQuery(this).siblings('.acc__title').each(hide);
                jQuery(this).next().slideDown(400);
                return false;
            }

            function onClickTog() {
                jQuery(this).toggleClass('active');

                if(jQuery(this).hasClass('active')) {
                    jQuery(this).next().slideDown(400);
                } else {
                    jQuery(this).next().slideUp(400);
                }
                return false;
            }

            function hide() {
                jQuery(this).next().slideUp(400);
            }

            function reset() {
                jQuery(this).next().hide();
            }
        }
    })(jQuery);

    jQuery('.kopa__accordion').each(function() {
        jQuery(this).accordion({
            toggle: false
        });
    });

    jQuery('.kopa__toggle').each(function() {
        jQuery(this).accordion({
            toggle: true
        });
    });

    /* =========================================================
    11. Load More
    ============================================================ */
    if( jQuery('.kopa__newsEvent.style--02').length ) {
        var _thisEvent = jQuery('.kopa__newsEvent.style--02 .widget-content');

        jQuery(_thisEvent).on('click', '.btn', function(){
            jQuery.ajax({
                url:linkGithub03,
                success: function(data) {
                    var position_insert_data = jQuery('.btn').closest(_thisEvent).find('.row'),
                        items                = jQuery(data).find('.col-xs-12');
                    if( items.length ) {
                        jQuery.each(items, function(items, index){
                            jQuery(position_insert_data).append(jQuery(this));
                        });
                    }
                }
            });
        });
    }

    if( jQuery('.kopa__shopListItem').length ) {
        var _thisShop = jQuery('.kopa__shopListItem');

        jQuery(_thisShop).on('click', '.btn', function(){
            jQuery.ajax({
                url:linkGithub04,
                success: function(data) {
                    var position_insert_data = jQuery('.btn').closest(_thisShop).find('.row'),
                        items                = jQuery(data).find('.col-xs-12');
                    if( items.length ) {
                        jQuery.each(items, function(items, index){
                            jQuery(position_insert_data).append(jQuery(this));
                        });
                    }
                }
            });
        });
    }

    /* =========================================================
    12. Fit Video
    ============================================================ */
    if( jQuery('.kopa__fitVid').length ) {
        jQuery('.kopa__fitVid').fitVids();
    }

    /* =========================================================
    13. Light Box
    ============================================================ */
    if( jQuery('.kopa__gallery.style--03, .kopa__gallery.style--01').length ) {
        jQuery('.kopa__popUp__picture').magnificPopup({
            type:'image'
        });

        jQuery('.kopa__popUp__vimeo, .kopa__popUp__youtube, .kopa__popUp__maps').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }

    /* =========================================================
    14. Google Map
    ============================================================ */
    var map;
    if (jQuery('.kopa__mapWrap').length) {
        jQuery('.kopa__map').each(function() {
            var $this = jQuery(this),
                id_map = $this.attr('id'),
                lat = parseFloat($this.data('latitude')),
                lng = parseFloat($this.data('longitude')),
                place = $this.data('place');

            if (typeof GMaps != "undefined") {
                map = new GMaps({
                    el: '#' + id_map,
                    lat: lat,
                    lng: lng,
                    zoomControl: true,
                    zoomControlOpt: {
                        style: 'SMALL',
                        position: 'TOP_LEFT'
                    },
                    panControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    overviewMapControl: false,
                    scrollwheel: false,
                    styles: [{
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#999999"
                        }, {
                            "lightness": 0
                        }]
                    }, {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#111111"
                        }, {
                            "lightness": 0
                        }]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "color": "#6f93b0"
                        }, {
                            "lightness": 17
                        }]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [{
                            "color": "#6f93b0"
                        }, {
                            "lightness": 29
                        }, {
                            "weight": 0.2
                        }]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#2e2e2e"
                        }, {
                            "lightness": 18
                        }]
                    }, {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#2e2e2e"
                        }, {
                            "lightness": 16
                        }]
                    }, {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#111111"
                        }, {
                            "lightness": 0
                        }]
                    }, {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#111111"
                        }, {
                            "lightness": 0
                        }]
                    }, {
                        "elementType": "labels.text.stroke",
                        "stylers": [{
                            "visibility": "on"
                        }, {
                            "color": "#010101"
                        }, {
                            "lightness": 16
                        }]
                    }, {
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "saturation": 36
                        }, {
                            "color": "#888888"
                        }, {
                            "lightness": 40
                        }]
                    }, {
                        "elementType": "labels.icon",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#f2f2f2"
                        }, {
                            "lightness": 19
                        }]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "color": "#fefefe"
                        }, {
                            "lightness": 20
                        }]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [{
                            "color": "#fefefe"
                        }, {
                            "lightness": 17
                        }, {
                            "weight": 1.2
                        }]
                    }]
                });
                map.addMarker({
                    lat: lat,
                    lng: lng,
                    title: place
                });
            }
        });
    }
});

jQuery(window).load(function() {
    if( jQuery('.mCustomScrollbar').length ) {
        jQuery('.mCustomScrollbar').mCustomScrollbar();
    }
});

jQuery(window).resize(function() {
    if( jQuery('.kopa__recentBlog.style--01').length ) {
        calcPadding('.kopa__recentBlog.style--01 .widget-title');
    }

    if( jQuery('.kopa__owlSync').length ) {
        calcPaddingSync('.kopa__owlSync.style--01 .entry-content');
    }

    if( jQuery('.kopa__contactForm.style--01').length ) {
        calcPaddingRight('.kopa__contactForm.style--01 .widget-content');
    }

    if( jQuery('.kopa__peopleSay.style--01').length ) {
        calcPaddingLeft('.kopa__peopleSay.style--01 .widget-title');
    }

    if( jQuery('.kopa__topPage.style--01').length ) {
        calcPaddingLeft('.kopa__topPage.style--01 .kopa__topPage--bottom__title');
    }

    if( jQuery('.kopa__aboutSection.style--01').length ) {
        calcPaddingRight('.kopa__aboutSection.style--01 .entry-content');
    }
});

function backToTop(classItem) {
    var offset              = 300,
        offset_opacity      = 1200,
        scroll_top_duration = 1200,
        $back_to_top        = jQuery(classItem);

    jQuery(window).scroll(function(event) {
        ( jQuery(this).scrollTop() > offset ) ? $back_to_top.addClass('kopa--visible') : $back_to_top.removeClass('kopa--visible kopa--fadeOut');
        if( jQuery(this).scrollTop() > offset_opacity ) {
            $back_to_top.addClass('kopa--fadeOut');
        }
    });

    $back_to_top.on('click', function(event){
        event.preventDefault();
        jQuery('body,html').animate({
            scrollTop: 0 ,
            }, scroll_top_duration
        );
    });
}

function calcPadding(classItem) {
    var widthWindow = jQuery(window).width(),
        resultPadding = (widthWindow - 1170) / 2;

    jQuery(classItem).css({
        'padding-left': resultPadding,
        'padding-right': resultPadding
    });;
}

function calcPaddingRight(classItem) {
    var widthWindow = jQuery(window).width(),
        resultPadding = (widthWindow - 1170) / 2;

    jQuery(classItem).css({
        'padding-right': resultPadding
    });;
}

function calcPaddingLeft(classItem) {
    var widthWindow = jQuery(window).width(),
        resultPadding = (widthWindow - 1170) / 2;

    jQuery(classItem).css({
        'padding-left': resultPadding
    });;
}

function calcPaddingSync(classItem) {
    var widthWindow = jQuery(window).width(),
        resultPadding = (widthWindow - 1170) / 2;

    jQuery(classItem).css({
        'padding-right': resultPadding
    });;
}