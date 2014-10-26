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
            showSpec: showSpec,
            edit: edit,
            remove: remove,

            item: null //for spec dialog
        };
        $scope.ctrl = ctrl;

//        return ctrl;


        function showSpec() {
            ctrl.item = selectService.getSelectedItem();
            if( ctrl.item) {
                $scope.specModal.open();
            }
        }

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

    }]);

});