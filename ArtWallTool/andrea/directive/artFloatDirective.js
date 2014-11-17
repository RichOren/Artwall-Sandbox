/**
 * Created by awyss on 11/09/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('artFloat', [
        'selectService','$rootScope',
        function(selectService, $rootScope) {

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


                function logMouseEvent(event){
                    console.log(event.type, event.clientX, event.clientY);
                }

                var threshold = 4;
                var downX = NaN;
                var downY = NaN;
                var downLeft = NaN;
                var downTop = NaN;
                var isMoving = false;

                function stopTracking() {
                    downX = NaN;
                    downY = NaN;
                    isMoving = false;
                }

                $element.on('mousedown', function(event) {
//                    logMouseEvent(event);
                    isMoving = false;
                    downX = event.clientX;
                    downY = event.clientY;
                    downLeft = $scope.item.left;
                    downTop = $scope.item.top;
                    //wait for threshold mouse to initiate element move

                    mouseCapture();

                    $scope.select();
                    $scope.$apply();
                    bringToFront();
                });

                function onDocMouseMove(event) {
//                    logMouseEvent(event);
                    if(!isMoving) {
                        if (Math.abs(downX - event.clientX) > threshold || Math.abs(downX - event.clientX) > threshold) {
                            isMoving = true;
                        }
                    }
                    if(isMoving) {
                        event.stopImmediatePropagation();
                        var x = downLeft + (event.clientX - downX) / ($rootScope.scale/100);
                        var y = downTop + (event.clientY - downY) / ($rootScope.scale/100);
                        moveTo(x, y);
                        $scope.$apply();
                    }
                }

                function onDocMouseUp(event) {
//                    logMouseEvent(event);
                    event.stopImmediatePropagation();
                    mouseRelease();
                    stopTracking();
                }


                function mouseCapture() {
                    document.addEventListener('mousemove', onDocMouseMove, true);
                    document.addEventListener('mouseup', onDocMouseUp, true);
                }

                function mouseRelease() {
                    document.removeEventListener('mousemove', onDocMouseMove, true);
                    document.removeEventListener('mouseup', onDocMouseUp, true);
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
