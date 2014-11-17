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

        $rootScope.selectedPlane = $scope.plane;

        $scope.addFloatItem = function(){
//            console.log('addFloatItem');
            var item = {
                type: 'f',
                left: 200/2,
                top: 200/2,
                height: 500/2,
                art: {
                    url: './images/ceiling/6_inch_middle_green.png'
                }
            };

            ceilingModel.floatItems.push(item);

            selectService.select(item);
        };

//        init();

        //return ctrl;

//        function init() {
//
//
//            ctrl.floatingArts = [
//                {
//                    width: 20,
//                    height: 50,
//                    url: '',
//                    left: 70,
//                    top: 50
//                },
//                {
//                    width: 20,
//                    height: 50,
//                    url: '',
//                    left: 230,
//                    top: 90
//                }
//            ];
//
//        }


    }]);

});