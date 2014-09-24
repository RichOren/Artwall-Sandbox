/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.controller('ceilingController', [
    function() {
        var ctrl = {
            test: test,
            width: 0,
            height: 0,

            backgroundArt: null,

            borderArt: null,
            borderCornerArt: null,
            borderCenterArt: null,
            borderMiddleArt: null,

            mainArt: null, //medalion

            floatingArts: []

        };

        init();

        return ctrl;

        function init() {
            ctrl.width = 300;
            ctrl.height = 200;

            ctrl.backgroundArt = {
                fill: true,
                url: './images/A023-copy.jpg'
            };

            ctrl.borderArt = {
                height: 86,
                url: './images/C1/B/C1-B1-B-01.jpg'
            };

            ctrl.borderCornerArt = {
                width: 179,
                height: 179,
                url: './images/C1/T/C1-T1-T-01.jpg'
            };

            ctrl.borderCenterArt = {
                width: 100,
                height: 40,
                url: '' //./images/C1/T/C1-T1-T.jpg
            };

            ctrl.borderMiddleArt = {
                width: 80,
                height: 40,
                url: ''//./images/C1/T/C1-T1-T.jpg
            };

            ctrl.mainArt = {
                center: true,
                width: 60,
                height: 60,
                url: ''
            };

            ctrl.floatingArts = [
                {
                    width: 20,
                    height: 50,
                    url: '',
                    left: 70,
                    top: 50
                },
                {
                    width: 20,
                    height: 50,
                    url: '',
                    left: 230,
                    top: 90
                }
            ];

        }

        function test() {
            //ctrl.floatingArts[0].left += 10;
            if( ctrl.width === 300) {
                ctrl.width = 600;
                ctrl.height = 400;
            }
            else {
                ctrl.width = 800;
                ctrl.height = 500;
            }
        }

    }]);

});