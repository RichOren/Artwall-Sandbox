/**
 * Created by awyss on 6/8/14.
 */
angular.module("artwalltool")
    .directive("dndSource", ['$rootScope', function($rootScope) {

        return {
            restrict: "A",
            scope: {
                getDragData: '&dndSource'
            },

            link: function($scope, $element, $attr, controller, $transclude) {
                $element.attr('draggable', true);

                $element.on('dragstart', function(e) {
                    var data = $scope.getDragData();
                    if( !data) {
                        e.preventDefault();
                        return;
                    }
                    $rootScope.dragData = data;
                    var jsonData = angular.toJson(data);
                    e.dataTransfer.setData('text', jsonData);
                    console.log('dragstart', data);
//                    $rootScope.$emit("LVL-DRAG-START");
                });

                $element.on('dragend', function(e) {
                    console.log("dragend");
                    $rootScope.dragData = null;
//                    $rootScope.draggedItem = null;

//                    $rootScope.$emit("LVL-DRAG-END");
                });
            }
        }


    }]);
