/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.controller('ceilingController', [
    '$rootScope', '$scope', '$location', 'roomModel', 'selectService',
    function($rootScope, $scope, $location, roomModel, selectService) {

        $scope.plane = roomModel.ceiling;

        $rootScope.selectedPlane = $scope.plane;
        selectService.select(null);

        $scope.addFloatItem = function(){
            var item = {
                type: 'f',
                left: 200/2,
                top: 200/2,
                height: 500/2,
                art: {
                    url: './images/ceiling/moroccan-floating-art.png'
                }
            };
            roomModel.ceiling.floatItems.push(item);
            selectService.select(item);
        };
    }]);

});