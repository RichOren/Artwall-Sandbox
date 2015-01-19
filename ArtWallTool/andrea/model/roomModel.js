define([
    'app'
],
function (app) {
    'use strict';

    app.service('roomModel', [
    function() {

        var model = {
            width: 0,
            height: 0,
            depth: 0,

            ceiling: null,
            walls: [],
            getWall: getWall,

            updateSize: updateSize
        };

        var iLeft = 0;
        var iFront = 1;
        var iRight = 2;
        var iBack = 3;

        init();
        return model;

        function init() {
            model.height = 2500/2;
            model.width = 6000/2;
//            model.width = 5000/2;
//            model.width = 3800/2;
            model.depth = 3500/2;
//            model.depth = 5000/2;

            model.ceiling = createCeiling();
            model.walls = [
                createWall(iLeft),
                createWall(iFront),
                createWall(iRight),
                createWall(iBack)
            ];
        }

        function updateSize(size) {
            model.width = size.width;
            model.height = size.height;
            model.depth = size.depth;

            model.ceiling.width = model.width;
            model.ceiling.height = model.depth;

            for (var iSide=0; iSide<4; iSide++) {
                var wall = model.walls[iSide];
                wall.width = (iSide == iFront || iSide == iBack) ? model.width : model.depth;
                wall.height = model.height;
            }
        }

        function getWall(sideName) {
            switch(sideName){
                case 'left': return model.walls[0];
                case 'front': return model.walls[1];
                case 'right': return model.walls[2];
                case 'back': return model.walls[3];
            }
            return null;
        }

        function getWallName(iSide) {
            var result = 'Wall';
            switch(iSide){
                case 0:
                    result = 'Left ' + result;
                    break;
                case 1:
                    result = 'Front ' + result;
                    break;
                case 2:
                    result = 'Right ' + result;
                    break;
                case 3:
                    result = 'Back ' + result;
                    break;
            }
            return result;
        }

        function createCeiling() {
            var ceiling = {
                width: model.width,
                height: model.depth,

                background: null,

                border: null,
                borderCorner: null,
                borderCenter: null,
                borderMiddle: null,

                medallion: null,

                floatItems: []
            };

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
                art: {
                    url: './images/ceiling/6_inch_corner_green.png'
                }
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
                    left: (ceiling.width - 1000/2),
                    top: 250/2,
                    height: 500/2,
                    art: {
                        url: './images/ceiling/moroccan-floating-art.png'
                    }
                }
            ];

            return ceiling;
        }

        function createWall(iSide) {
            var wall = {
                name: getWallName(iSide),
                width: ( (iSide == iFront || iSide == iBack) ? model.width : model.depth),
                height: model.height,

                background: null,

                trimTop: null,
                trimTopCorner: null,
                trimBottom: null,

                mainItem: null
            };

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
                art: null
            };

            wall.trimTopCorner = {
                type: 'tc',
                width: 0,
                height: 0,
                art: null
            };

            wall.trimBottom = {
                type: 'tb',
                height: 0,
                art: null
            };

            if( iSide != iBack) {
                wall.trimTop.art = {
                    url: './images/C1/T/6_inch_trim_green.png'
                };

                wall.trimTopCorner.art = {
                    url: './images/C1/TC/6_inch_corner_green_b.png'
                };

                wall.trimBottom.art = {
                    url: './images/C1/T/6_inch_bottom_trim_green.png'
                };
            }

            wall.mainItem = {
                type: 'a',
                fill:false,
                center: true,
                width: 0,
                height: 0,
                art: null
            };

            if( iSide == iFront) {
                wall.mainItem = {
                    type: 'a',
                    fill:false,
                    center: true,
//                left: 500,
//                top: 250,
                    width: 1200,
                    height: 700,
                    art:{
                        url: './images/A023-copy.jpg',
                        zoom: undefined,
                        clipX1: 7,
                        clipY1: 7,
                        clipX2: 93
                    }
                };
            }

            return wall;
        }



    }]);

});