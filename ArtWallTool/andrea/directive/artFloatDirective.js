/**
 * Created by awyss on 11/09/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('artFloat', [
        '$rootScope', 'selectService', 'mouseService',
        function($rootScope, selectService, mouseService) {

            return {
                restrict: 'E',
                scope: {
                    plane: '=',
                    item: '='
                },
                templateUrl: "andrea/directive/artFloatTemplate.html",
                link: link
            };

            function link($scope, $element, attrs, ctrl, transcludeFn) {
                var hitSize = 100;

                $element.addClass('absolute');

                $scope.$watch('item.art.url', function(url){
                    if (url){
                        var img = new Image();
                        img.onload = function(){
                            console.log('artMedallion size:', img.width + 'x' + img.height, img.naturalWidth + 'x' + img.naturalHeight);
                            $scope.item.art.naturalWidth = img.width;
                            $scope.item.art.naturalHeight = img.height;
//                        $scope.item.width = img.width;
//                        $scope.item.height = img.height;
                            $scope.item.art.formFactor = $scope.item.art.naturalWidth / $scope.item.art.naturalHeight;
                            $scope.$apply();
                        };
                        img.src = url;
                    }
                });

                function getArtFormFactor() {
                    var formFactor = $scope.item.art ? $scope.item.art.formFactor : 0;
                    if( !formFactor ) {
//                    console.log('!!! using default form factor');
                        formFactor = 4/3;
                    }
                    return formFactor;
                }

                //height is specified
                $scope.getHeight = function() {
                    return ($scope.item && $scope.item.height) ? $scope.item.height : 0;
                };
                $scope.getHitWidth = function() {
                    var result = $scope.getWidth();
                    return (result > hitSize) ? result : hitSize;
                };

                $scope.getWidth = function() {
                    var result = $scope.getHeight() * getArtFormFactor();
                    if($scope.item) $scope.item.width = result;
                    return result;
                };
                $scope.getHitHeight = function() {
                    var result = $scope.getHeight();
                    return (result > hitSize) ? result : hitSize;
                };

                $scope.getLeft = function() {
                    return $scope.item.left;
                };

                $scope.getTop = function() {
                    return $scope.item.top;
                };


                $scope.getImageSize = function() {
                    return $scope.getWidth() + 'px';
                };


                var downLeft = NaN;
                var downTop = NaN;

                $element.on('mousedown', function(event) {
                    if( event.button == 0 ) {
                        downLeft = $scope.item.left;
                        downTop = $scope.item.top;
                        mouseService.trackMove($element, event, onMoveCallBack);

                        $scope.select();
                        $scope.$apply();
                        bringToFront();
                    }
                });

                function onMoveCallBack(distance) {
                    if( distance ) {
                        var x = downLeft + distance.x / ($rootScope.scale/100);
                        var y = downTop + distance.y / ($rootScope.scale/100);
                        moveTo(x, y);
                        $scope.$apply();
                    }
                }

                function moveTo(x, y) {
                    var w = $scope.getWidth() ;
                    var planeW = $scope.plane.widthPx;
                    var h = $scope.getHeight();
                    var planeH = $scope.plane.heightPx ;

                    if((x + w) > planeW) {
                        x = planeW - w;
                    }
                    if((y + h) > planeH) {
                        y = planeH - h;
                    }
                    if(x < 0) x = 0;
                    if(y < 0) y = 0;

                    $scope.item.left = x;
                    $scope.item.top = y;
                }

                function bringToFront() {
                    var obj = $element[0];
                    var siblings = $element[0].parentElement.childNodes;
                    var max_index = 0;
                    var cur_index;

                    // Compute the maximal z-index of all siblings
                    for (var i=0; i < siblings.length; i++) {
                        var item = siblings[i];
                        if (item == obj || !item.style || item.style.zIndex == '')
                            continue;

                        cur_index = parseInt(item.style.zIndex);
                        if (max_index < cur_index) {
                            max_index = cur_index;
                        }
                    }

                    obj.style.zIndex = max_index + 1;
                }

                $scope.select = function () {
                    return selectService.select($scope.item);
                };

                $scope.getIsSelected = function () {
                    return selectService.isItemSelected($scope.item);
                };

            }

        }]);

});
