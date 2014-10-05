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
                width: 9004, //mm
                height: 3375, //mm
                maxZoom: 150
            };

            ctrl.art = {
                url: './images/A023-copy.jpg',
                naturalWidth: 400,
                naturalHeight: 300,
                formFactor: 4/3,
                zoom: undefined,
                clipX1: 7,
                clipY1: 7,
                clipX2: 93
            };
        }

    }]);

});