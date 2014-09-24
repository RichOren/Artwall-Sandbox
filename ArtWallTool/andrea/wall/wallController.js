/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.controller('wallController', [
    function() {
        var ctrl = {
            test: test,
            width: 0,
            height: 0,

            backgroundArt: null,

            topTrimArt: null,

            topTrimCornerArt: null,

            mainArtFrame: null,

            mainArt: null,

            bottomTrimArt: null
        };

        init();

        return ctrl;

        function init() {
            ctrl.width = 600;
            ctrl.height = 400;

            ctrl.backgroundArt = {
                fill: true,
                url: './images/wood.jpg'
            };

            ctrl.topTrimArt = {
                height: 43,
                url: './images/C1/T/C1-T2-T-01.png'
            };

            ctrl.topTrimCornerArt = {
                width: 50,
                height: 40,
                url: './images/C1/T/C1-T1-T.jpg'
            };

            ctrl.bottomTrimArt = {
                height: 40,
                url: './images/C1/B/C1-B1-B.jpg'
            };

            ctrl.mainArtFrame = {
//                fill:false,
//                center: true,
//                width: 160,
//                height: 100
            };

            ctrl.mainArt = {
                clipPosition: '0% 0%',
                zoomFactor: 1,
                url: './images/A023-copy.jpg'
            };


        }




        function test() {
            if( ctrl.mainArt.clipPosition === '0% 0%') {
                ctrl.mainArt.clipPosition = '50% 50%';
            }
            else {
                ctrl.mainArt.clipPosition = '0% 0%';
            }
//            if( ctrl.width === 300) {
//                ctrl.width = 600;
//                ctrl.height = 400;
//            }
//            else {
//                ctrl.width = 300;
//                ctrl.height = 200;
//            }
        }

    }]);

});