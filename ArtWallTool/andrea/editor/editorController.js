/**
 * Created by awyss on 9/14/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.controller('editorController', [
    function() {
        var ctrl = {
            frame: null,
            art: null
        };

        init();

        return ctrl;

        function init() {

            ctrl.frame = {
                width: 6000, //mm
                height: 3375 //mm
            };

            ctrl.art = {
                url: './images/A023-copy.jpg',
                clipX1: 7,
                clipY1: 7,
                //zoom: 100,
                clipX2: 93,
                clipY2: 93,
                origWidth: 60000 //150ppi = 6ppmm
            };
        }

    }]);

});