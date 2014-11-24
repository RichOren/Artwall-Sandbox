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
                    url: './images/ceiling/moroccan-floating-art.png'
                }
            };
            ceilingModel.floatItems.push(item);

            selectService.select(item);
        };

    }]);

});