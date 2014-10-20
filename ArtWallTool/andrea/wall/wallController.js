/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.controller('wallController', [
    '$rootScope', '$scope', '$location', 'wallModel', 'selectService',
    function($rootScope, $scope, $location, wallModel, selectService) {

        $scope.root = $rootScope;
        $scope.wall = wallModel;

        var ctrl = {
            test: test,

            edit: edit,
            remove: remove
        };
        $scope.ctrl = ctrl;

//        return ctrl;


        function edit() {
            var item = selectService.getSelectedItem();
            if( item && item.art ) {
                $location.url("/editor");
            }
        }
        function remove() {
            var item = selectService.getSelectedItem();
            if( item && item.art ) {
                item.art.url = '';
                item.width = 0;
                item.height = 0;
            }
        }

        function test() {
            if( ctrl.mainArt.clipPosition === '0% 0%') {
                ctrl.mainArt.clipPosition = '50% 50%';
            }
            else {
                ctrl.mainArt.clipPosition = '0% 0%';
            }
//            if( ctrl.width === 300) {
//                ctrl.width = 600;
//                ctrl.height = 400;
//            }
//            else {
//                ctrl.width = 300;
//                ctrl.height = 200;
//            }
        }

    }]);

});