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
                height: 43,
                url: './images/C1/B/C1-B1-B-01.png'
            };

            ctrl.borderCornerArt = {
                width: 90,
                height: 90,
                url: './images/C1/T/C1-T1-T-01.png'
            };

            ctrl.borderCenterArt = {
                width: 124,
                height: 68,
                url: ''//./images/C1/B/C1-B3-B-02.png
            };

            ctrl.borderMiddleArt = {
                width: 124,
                height: 68,
                url: ''
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