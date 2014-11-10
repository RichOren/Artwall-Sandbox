/**
 * Created by awyss on 10/12/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.factory('wallModel', [
    function() {

        var wall = {
            widthPx: 0,
            heightPx: 0,

            background: null,

            trimTop: null,
            trimTopCorner: null,
            trimBottom: null,

            mainArtFrame: null,
            mainArt: null
        };

        init();

        return wall;

        function init() {
            console.log('init wallModel');
            wall.widthPx = 6000/2; //mm
            wall.heightPx = 2500/2; //mm

            wall.background = {
                type: 'bg',
                art: {
                    repeat: true,
                    url: './images/wood.jpg'
                }
            };

            wall.trimTop = {
                type: 'tt',
                height: 0,
                art: {
                    url: './images/C1/T/12_inch_trim.png'
                }
            };

            wall.trimTopCorner = {
                type: 'tc',
                width: 0,
                height: 0,
                art: {
                    url: './images/C1/TC/12_inch_corner_b.png'
                }
            };

            wall.trimBottom = {
                type: 'tb',
                height: 0,
                art: {
                    url: './images/C1/B/C1-B1-B.jpg'
                }
            };

            wall.mainItem = {
                fill:false,
                center: true,
                left: 500,
                top: 250,
                width: 1200,
                height: 700,
                art: {
                    url: './images/A023-copy.jpg',
                    zoom: undefined,
                    clipX1: 7,
                    clipY1: 7,
                    clipX2: 93
                }
            };

//            wall.mainArtFrame = {
//                fill:false,
//                center: true,
//                width: 2000,
//                height: 1500
//            };

//            wall.mainArt = {
//                url: './images/A023-copy.jpg',
////                naturalWidth: 400,
////                naturalHeight: 300,
////                formFactor: 4/3,
////                zoom: undefined,
////                clipX1: 7,
////                clipY1: 7,
////                clipX2: 93
//
////                clipPosition: '0% 0%',
////                zoomFactor: 1,
//            };

        }





    }]);

});