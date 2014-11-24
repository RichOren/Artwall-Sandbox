/**
 * Created by awyss on 11/23/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.service('roomModel', [

    function() {
        var model = {
            ceiling: null,

            wallLeft: null,
            wallFront: null,
            wallRight: null,
            wallBack: null
        };

        init();

        return model;

        function init() {
            ceiling: createCeiling();

            wallLeft: createWall();
            wallFront: createWall();
            wallRight: createWall();
            wallBack: createWall();
        }

        function createCeiling() {
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
            ceiling.widthPx = 5000/2;
            ceiling.heightPx = 3500/2;

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

            return ceiling;
        }

        function createWall() {
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
                type: 'a',
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

            return wall;
        }



    }]);

});