/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.controller('ceilingController', [
    '$rootScope', '$scope', '$location', 'ceilingModel', 'selectService',
    function($rootScope, $scope, $location, ceilingModel, selectService) {

        $scope.root = $rootScope;
        $scope.plane = ceilingModel;

        var ctrl = {
            mainArt: null, //medalion

            floatingArts: []

        };
        $scope.ctrl = ctrl;

        init();

        //return ctrl;

        function init() {

            ctrl.mainArt = {
                center: true,
                width: 60,
                height: 60,
                url: ''
            };

            ctrl.floatingArts = [
                {
                    width: 20,
                    height: 50,
                    url: '',
                    left: 70,
                    top: 50
                },
                {
                    width: 20,
                    height: 50,
                    url: '',
                    left: 230,
                    top: 90
                }
            ];

        }


    }]);

});