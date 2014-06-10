/**
 * Created by awyss on 6/8/14.
 */
angular.module("artwalltool")
    .directive("dndTarget", ['$rootScope', function($rootScope) {

        return {
            restrict: "A",

//            scope: {
//                canDrop: '&'
//            },

            link: function($scope, $element, $attr, controller, $transclude) {
                var targetUid = $attr.dndTarget;
                var canDrop = false;
                var canDropUpdated = false;

                $element.on("dragenter", function(e) {
//                    console.log('dragenter', e.dataTransfer.getData("text"), $rootScope.dragData);
//                    $element.addClass('over');
                    canDropUpdated = false;
                });

                $element.on("dragover", function(e) {
                    if(!canDropUpdated) {
                        canDropUpdated = true;
                        if($scope.canDrop) {
                            canDrop = $scope.canDrop($rootScope.dragData, targetUid);
                        }
                        else {
                            canDrop = true;
                        }
                        console.log('dragover', targetUid, canDrop);
                    }
                    if(canDrop) {
                        e.dataTransfer.dropEffect = 'copy';
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    else {
                        e.dataTransfer.dropEffect = 'none';
                    }
                    //return false;
                });

                $element.on("dragleave", function(e) {
//                    console.log('dragleave', $rootScope.dragData);
                    canDropUpdated = false;
//                    $element.removeClass('over');
                });

                $element.on("drop", function(e) {
                    canDropUpdated = false;
                    e.preventDefault();
                    e.stopPropagation();
//                    var jsonData = e.dataTransfer.getData("text");
//                    var data = angular.fromJson(jsonData);
                    $scope.onDrop($rootScope.dragData, targetUid);
                });

//                $rootScope.$on("LVL-DRAG-START", function() {
//                    var el = document.getElementById(id);
//                    angular.element(el).addClass("lvl-target");
//                });
//
//                $rootScope.$on("LVL-DRAG-END", function() {
//                    var el = document.getElementById(id);
//                    angular.element(el).removeClass("lvl-target");
//                    angular.element(el).removeClass("lvl-over");
//                });
            }


        }


    }]);
