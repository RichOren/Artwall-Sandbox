/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('cropper', [
    '$window', 'debounce',
    function($window, debounce) {

        return {
            restrict: 'E',
            scope: {
                frame: '=',
                art: '='
            },
            templateUrl: "andrea/editor/cropperTemplate.html",
            link: link
        };

        function link($scope, $element, attrs, ctrls, transcludeFn) {
            createController($scope, $element);
        }

        function createController($scope, $element) {

            var ctrl = {
                margin: 40,
                width: 0,
                height: 0,
                dottedWidth: 100,
                naturalWidth: 400,
                naturalHeight: 250,
                getImagePosition: getImagePosition,
                getImageSize: getImageSize,
                onMouseDown: onMouseDown,
                onMouseMove: onMouseMove,
                onMouseUp: stopTracking,
                onMouseLeave: stopTracking
            };
            $scope.ctrl = ctrl;

            var downX = NaN;
            var downY = NaN;
            var adjZoom = false;

            init();

            return ctrl;

            function init() {
                var trackElementSize = true;
                $scope.$on("$destroy", function () {
                    trackElementSize = false;
                });

                function onResize() {
                    if(trackElementSize) {
                        debounce(afterResize, 50);
                    }
                }
                function afterResize() {
                    if(trackElementSize) {
                        ctrl.width = $element.width();
                        ctrl.dottedWidth = ctrl.width - 2*ctrl.margin;
                        ctrl.dottedHeight = ctrl.dottedWidth / getFrameAspectRatio();
                        ctrl.height = ctrl.dottedHeight + 2*ctrl.margin;
                        $scope.$apply();
                    }
                }
                angular.element($window).on('resize', onResize);
                onResize();

                $scope.$watch('art.url', function(url){
                    if(url){
                        var img = new Image();
                        img.onload = function(){
                            console.log('img.naturalSize:', img.width + 'x' + img.height, img.naturalWidth + 'x' + img.naturalHeight);
                            $scope.art.naturalWidth = img.width ? img.width : 400;
                            $scope.art.naturalHeight = img.height ? img.height : 300;
                            $scope.art.formFactor = $scope.art.naturalWidth / $scope.art.naturalHeight;
                            calcMaxZoomFactor();
                            calcAndUpdateZoom();
                            $scope.$apply();
                        };
                        img.src = url;
                    }
                });

                $scope.$watch('art.zoom', function(zoom){
                    if(zoom){
                        zoomImageTo(zoom);
                    }
                });

            }

            function getArtFormFactor() {
                var formFactor = $scope.art ? $scope.art.formFactor : 0;
                if( !formFactor ) {
                    console.log('!!! using default form factor');
                    formFactor = 4/3;
                }
                return formFactor;
            }

            function getArtZoomFactor() {
                if( $scope.art ) {
                    var art = $scope.art;
                    var clipX1 = art.clipX1 ? art.clipX1 : 0;
                    var clipX2 = art.clipX2 ? art.clipX2 : 100;
                    var diff = clipX2 - clipX1;
                    if( diff == 0 ) {
                        diff = 0.01;
                    }
                    return 100 / diff;
                }
                return 100;
            }

            function calcMaxZoomFactor() {
                var minPrintDPI = 100; //min print DPI needed
                var sampleToHighRes = 50; //linear factor from working samples to high res images
                var highResArtWidth = $scope.art.naturalWidth * sampleToHighRes;
                var highResArtHeight = $scope.art.naturalHeight * sampleToHighRes;

                var frameWidthMM = $scope.frame.width;
                var frameHeightMM = $scope.frame.height;

                var minPrintPixelsWidth = frameWidthMM / 25.4 * minPrintDPI;
                var minPrintPixelsHeight = frameHeightMM / 25.4 * minPrintDPI;

                var maxFactorWidth = highResArtWidth / minPrintPixelsWidth;
                var maxFactorHeight = highResArtHeight / minPrintPixelsHeight;

                var maxFactor = Math.min(maxFactorWidth, maxFactorHeight);
                console.log('MaxZoomFactor', maxFactor);
                if( maxFactor < 1) {
                    console.log('Surface is too large');
                }
                $scope.frame.maxZoom = maxFactor * 100;
            }


            function calcAndUpdateZoom() {
                var result = getArtZoomFactor() * 100;
                if( $scope.art) {
                    //console.log('calcAndUpdateZoom', result);
                    $scope.art.zoom = result;
                }
                return result;
            }

            function getFrameAspectRatio() {
                var w = $scope.frame ? $scope.frame.width : 0;
                var h = $scope.frame ? $scope.frame.height : 0;
                if( !w ) w = 100;
                if( !h ) h = 100;
                return w/h;
            }

            function getImageSize() {
                return getCurrImageWidth() + 'px';
            }

            function getCurrImageWidth() {
                return ctrl.dottedWidth * getArtZoomFactor();
            }

            function getImagePosition(){
                var w = getCurrImageWidth();
                var h = w / getArtFormFactor();

                var clipX1 = $scope.art ? -$scope.art.clipX1 : 0;
                var x = w * clipX1 / 100;

                var clipY1 = $scope.art ? -$scope.art.clipY1 : 0;
                var y = h * clipY1 / 100;

                x += ctrl.margin;
                y += ctrl.margin;
                return x + 'px ' + y + 'px';
            }


            function moveImage(deltaX, deltaY){
                var w = getCurrImageWidth();
                var deltaP = deltaX * 100 / w;

                var clipX1 = $scope.art.clipX1 - deltaP;
                if( clipX1 < 0) {
                    deltaP = $scope.art.clipX1;
                }
                var clipX2 = $scope.art.clipX2 - deltaP;
                if( clipX2 > 100) {
                    deltaP = $scope.art.clipX2 - 100;
                }
                $scope.art.clipX1 -= deltaP;
                $scope.art.clipX2 -= deltaP;

                w = getCurrImageWidth();
                var h = w / getArtFormFactor();
                var deltaP = deltaY * 100 / h;

                var clipY1 = $scope.art.clipY1 - deltaP;
                if( clipY1 < 0) {
                    clipY1 = 0;
                }
                var maxClipY1 = (h - ctrl.dottedHeight) * 100 / h;
                if( clipY1 > maxClipY1) {
                    clipY1 = maxClipY1;
                }
                $scope.art.clipY1 = clipY1;
            }

            //TODO: refactor when implementing pinching
            function zoomImage(deltaX) {
                //console.log('zoomImage', deltaX);
                deltaX = deltaX / 2;
                var w = getCurrImageWidth();
                var deltaP = deltaX * 100 / w;

                var clipX1 = $scope.art.clipX1 + deltaP;
                if( clipX1 < 0) {
                    clipX1 = 0;
                }
                var clipX2 = $scope.art.clipX2 - deltaP;
                if( clipX2 > 100) {
                    clipX2 = 100;
                }

                var factor = 100 / (clipX2 - clipX1);
                //console.log('factor', factor);
                if( factor > 2) {
                    return;
                }

                $scope.art.clipX1 = clipX1;
                $scope.art.clipX2 = clipX2;

                w = getCurrImageWidth();
                var h = w / getArtFormFactor();

                var clipY1 = $scope.art.clipY1 + deltaP;
                if( clipY1 < 0) {
                    clipY1 = 0;
                }
                var maxClipY1 = (h - ctrl.dottedHeight) * 100 / h;
                if( clipY1 > maxClipY1) {
                    clipY1 = maxClipY1;
                }
                $scope.art.clipY1 = clipY1;

                calcAndUpdateZoom();
            }

            function zoomImageTo(zoom) {
                var currZoom = calcAndUpdateZoom();
                zoom = Math.min(zoom, $scope.frame.maxZoom);

                var deltaZ = zoom - currZoom;
                if( deltaZ == 0 ) {
                    return;
                }
                var currClip = $scope.art.clipX2 - $scope.art.clipX1;
                var newClip = 10000 / zoom;
                var deltaClip = currClip - newClip;
                //console.log('zoomImageTo', zoom, currZoom, deltaZ, deltaClip);

                var deltaClip2 = deltaClip/2;
                var clipX1 = $scope.art.clipX1 + deltaClip2;
                var clipX2 = $scope.art.clipX2 - deltaClip2;
                if( clipX2 > 100) {
                    clipX2 = 100;
                    clipX1 += (100 - ($scope.art.clipX2 - deltaClip2));
                }
                if( clipX1 < 0) {
                    clipX1 = 0;
                }

                $scope.art.clipX1 = clipX1;
                $scope.art.clipX2 = clipX2;

                var w = getCurrImageWidth();
                var h = w / getArtFormFactor();

                var clipY1 = $scope.art.clipY1 + deltaClip2;
                if( clipY1 < 0) {
                    clipY1 = 0;
                }
                var maxClipY1 = (h - ctrl.dottedHeight) * 100 / h;
                if( clipY1 > maxClipY1) {
                    clipY1 = maxClipY1;
                }
                $scope.art.clipY1 = clipY1;

                calcAndUpdateZoom();
            }

            function trackMouse(event) {
                downX = event.clientX;
                downY = event.clientY;
            }
            function stopTracking() {
                downX = NaN;
                downY = NaN;
            }

            function onMouseDown(event){
                var point = getCrossBrowserElementCoords(event);
                trackMouse(event);
                adjZoom = (point.y > (ctrl.height - ctrl.margin));
            }
            function onMouseMove(event){
                if( !isNaN(downX)) {
                    var deltaX = event.clientX - downX;
                    var deltaY = event.clientY - downY;
                    trackMouse(event);
                    if( adjZoom) {
                        zoomImage(deltaX);
                    }
                    else {
                        moveImage(deltaX, deltaY);
                    }
                }
            }


            // Accepts a MouseEvent as input and returns the x and y
            // coordinates relative to the target element.
            function getCrossBrowserElementCoords(mouseEvent)
            {
                var result = {
                    x: 0,
                    y: 0
                };

                if (!mouseEvent) {
                    mouseEvent = window.event;
                }

                if (mouseEvent.pageX || mouseEvent.pageY) {
                    result.x = mouseEvent.pageX;
                    result.y = mouseEvent.pageY;
                }
                else if (mouseEvent.clientX || mouseEvent.clientY) {
                    result.x = mouseEvent.clientX + document.body.scrollLeft +
                        document.documentElement.scrollLeft;
                    result.y = mouseEvent.clientY + document.body.scrollTop +
                        document.documentElement.scrollTop;
                }

                if (mouseEvent.target) {
                    var offEl = mouseEvent.target;
                    var offX = 0;
                    var offY = 0;

                    if (typeof(offEl.offsetParent) != "undefined") {
                        while (offEl) {
                            offX += offEl.offsetLeft;
                            offY += offEl.offsetTop;

                            offEl = offEl.offsetParent;
                        }
                    }
                    else {
                        offX = offEl.x;
                        offY = offEl.y;
                    }
                    result.x -= offX;
                    result.y -= offY;
                }
                return result;
            }


        }

    }]);
});