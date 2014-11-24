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

            background: null,

            border: null,
            borderCorner: null,
            borderCenter: null,
            borderMiddle: null,

            medallion: null,

            floatItems: []
        };

        init();

        return ceiling;

        function init() {
            console.log('init ceilingModel');
            ceiling.widthPx = 5000/2;
            ceiling.heightPx = 3500/2;

//            ceiling.widthPx = 3800/2;
//            ceiling.heightPx = 1760/2;

//            ceiling.widthPx = 5000/2;
//            ceiling.heightPx = 5000/2;

            ceiling.background = {
                type: 'bg',
                color: '#aa0044',
                art: {
                    repeat: true,
                    url: './images/ceiling/moroccan-tile-pattern_001.png'
//                    stretch: true,
//                    url: './images/C1/C/C2-C1-C.jpg'
                }
            };

            ceiling.border = {
                type: 'b',
                height: 0,
                art: {
                    url: './images/ceiling/6_inch_trim_green.jpg'
                }
            };

            ceiling.borderCorner = {
                type: 'bc',
                width: 0,
                height: 0,
//                art: {
//                    url: './images/ceiling/6_inch_corner_green.png'
//                }
            };

            ceiling.borderCenter = {
                type: 'br',
                height: 0,
                art: {
                    url: './images/ceiling/6_inch_middle_green.png'
                }
            };

            ceiling.borderMiddle = {
                type: 'bm',
                height: 0,
                art: {
                    url: './images/ceiling/6_inch_middle_green.png'
                }
            };

            ceiling.medallion = {
                type: 'm',
                height: 500/2,
                art: {
                    url: './images/ceiling/moroccan-madallion_001.png'
                }
            };

            ceiling.floatItems = [
                {
                    type: 'f',
                    left: 250/2,
                    top: 250/2,
                    height: 500/2,
                    art: {
                        url: './images/ceiling/moroccan-floating-art.png'
                    }
                },
                {
                    type: 'f',
                    left: (ceiling.widthPx - 1000/2),
                    top: 250/2,
                    height: 500/2,
                    art: {
                        url: './images/ceiling/moroccan-floating-art.png'
                    }
                }
            ];


        }

    }]);

});