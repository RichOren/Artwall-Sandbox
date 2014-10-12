/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.controller('testController', [

    function() {

        var ctrl = {
            edit: edit,
            remove: remove
        };

//        init();

        return ctrl;

        function edit() {
            console.log('edit');
        }
        function remove() {
            console.log('remove');
        }

    }]);

});