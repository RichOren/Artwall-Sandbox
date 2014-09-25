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
            width: 0,
            height: 0,
            aspectRatio: 16/9,
            art: null
        };

        init();

        return ctrl;

        function init() {

            ctrl.art = {
                url: './images/A023-copy.jpg'
            }
        }

    }]);

});