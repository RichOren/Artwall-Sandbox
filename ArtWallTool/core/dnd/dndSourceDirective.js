/**
 * Created by awyss on 6/8/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('dndSource', [
    '$rootScope',
    function($rootScope) {

        return {
            restrict: 'A',
            scope: false,

            link: function($scope, $element, $attr, controller, $transclude) {
                $element.attr('draggable', true);

                $element.on('dragstart', function(e) {
                    var dndSourceAttr = $attr.dndSource;
                    var data = $scope.$eval(dndSourceAttr);

                    if( !data) {
                        console.log('No data to Drag');
                        e.preventDefault();
                        return;
                    }

                    $rootScope.dragData = data;
                    var jsonData = angular.toJson(data);
                    e.originalEvent.dataTransfer.setData('text', jsonData);
                    console.log('dragstart', data);
//                    $rootScope.$emit("LVL-DRAG-START");
                });

                $element.on('dragend', function(e) {
//                    console.log("dragend");
                    $rootScope.dragData = null;
//                    $rootScope.draggedItem = null;

//                    $rootScope.$emit("LVL-DRAG-END");
                });
            }
        }

    }]);

});
