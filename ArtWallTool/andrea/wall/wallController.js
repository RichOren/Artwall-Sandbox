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
        $scope.plane = wallModel;

        var ctrl = {

        };
        $scope.ctrl = ctrl;

//        return ctrl;



    }]);

});