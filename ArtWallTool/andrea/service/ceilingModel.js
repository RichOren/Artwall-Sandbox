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
            ceiling.widthPx = 6000/2;
            ceiling.heightPx = 2500/2;

            ceiling.background = {
                fill: true,
                art: {
                    url: './images/A023-copy.jpg'
                }
            };

            ceiling.border = {
                height: 0,
                art: {
                    url: './images/C1/B/C1-B1-B-01.png'
                }
            };

            ceiling.borderCorner = {
                width: 0,
                height: 0,
                art: {
                    url: './images/C1/T/C1-T1-T-01.png'
                }
            };

            ceiling.borderCenter = {
                height: 0,
                art: {
                    url: './images/C1/B/C1-B3-B-02.png'
                }
            };

            ceiling.borderMiddle = {
                height: 0,
                art: {
                    url: './images/C1/B/C1-B3-B-02.png'
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