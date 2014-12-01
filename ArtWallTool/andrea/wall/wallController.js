/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.controller('wallController', [
    '$rootScope', '$scope', '$location', 'roomModel', 'selectService',
    function($rootScope, $scope, $location, roomModel, selectService) {
        $scope.plane = roomModel.getWall($location.search().side);

        $rootScope.selectedPlane = $scope.plane;
        selectService.select(null);
    }]);

});