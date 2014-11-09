/**
 * Created by awyss on 10/12/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.factory('ceilingModel', [
    function() {

        var ceiling = {
            widthPx: 0,
            heightPx: 0,

            backgroundArt: null,

            border: null,
            borderCorner: null,
            borderCenter: null,
            borderMiddle: null,

//            trimTopCorner: null,
//            trimBottom: null,
//
//            mainArtFrame: null,
//            mainArt: null
        };

        init();

        return ceiling;

        function init() {
            console.log('init ceilingModel');
//            ceiling.widthPx = 6000/2;
//            ceiling.heightPx = 2500/2;
            ceiling.widthPx = 3000/2;
            ceiling.heightPx = 1760/2;

            ceiling.background = {
//                color: '#aa0044',
                art: {
//                    repeat: true,
//                    url: './images/wood.jpg'
                    url: './images/C1/C/C2-C1-C.jpg'
                }
            };

            ceiling.border = {
                height: 0,
                art: {
                    url: './images/ceiling/6_inch_trim_green.jpg'
                }
            };

            ceiling.borderCorner = {
                width: 0,
                height: 0,
                art: {
                    url: './images/ceiling/6_inch_corner_green.png'
                }
            };

            ceiling.borderCenter = {
                height: 0,
                art: {
                    url: './images/ceiling/6_inch_middle_green.png'
                }
            };

            ceiling.borderMiddle = {
                height: 0,
                art: {
                    url: './images/ceiling/6_inch_middle_green.png'
                }
            };




//
//            ceiling.mainItem = {
//                fill:false,
//                center: true,
//                left: 500,
//                top: 250,
//                width: 1200,
//                height: 700,
//                art: {
//                    url: './images/A023-copy.jpg',
//                    zoom: undefined,
//                    clipX1: 7,
//                    clipY1: 7,
//                    clipX2: 93
//                }
//            };

        }

    }]);

});