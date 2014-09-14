/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.service('model', [

    function() {
        var model = {

            ceiling: {
                backgroundArt: null,

                borderArt: null,
                borderCornerArt: null,
                borderCenterArt: null,
                borderMiddleArt: null,

                mainArt: null, //medalion

                floatingArts: []
            },

            wall: {
                backgroundArt: null,

                trimTopArt: null,
                topCornerArt: null,

                mainArt: null,

                trimBottomArt: null,
            }

        };

        init();

        return model;

        function init() {

        }

    }]);

});