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
            width: 0,
            height: 0,

            backgroundArt: null,

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
            wall.width = 6000; //mm
            wall.height = 2500; //mm

            wall.backgroundArt = {
                fill: true,
                url: './images/wood.jpg'
            };

            wall.trimTop = {
                height: 0,
                art: {
                    url: './images/C1/T/C1-T2-T-01.png'
                }
            };

            wall.trimTopCorner = {
                width: 0,
                height: 0,
                art: {
                    url: './images/C1/T/C1-T1-T.jpg'
                }
            };

            wall.trimBottom = {
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