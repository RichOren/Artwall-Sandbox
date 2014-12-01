/**
 * Created by awyss on 10/26/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('artBackground', [
        '$rootScope', 'selectService',
        function($rootScope, selectService) {

        return {
            restrict: 'E',
            scope: {
                plane: '=',
                item: '='
            },
            templateUrl: "andrea/directive/artBackgroundTemplate.html",
            link: link
        };

        function link($scope, $element, attrs, ctrl, transcludeFn) {
            $scope.px = $rootScope.px;
            $scope.isPlaneTooLarge = false;

            $element.addClass('absolute');

            $scope.$watch('item.art.url', function(url){
                if (url){
                    var img = new Image();
                    img.onload = function(){
                        console.log('artBackground size:', img.width + 'x' + img.height, img.naturalWidth + 'x' + img.naturalHeight);
                        $scope.item.art.naturalWidth = img.width;
                        $scope.item.art.naturalHeight = img.height;
                        $scope.item.art.formFactor = img.width / img.height;
                        $scope.$apply();
                    };
                    img.src = url;
                }
            });

            function getIsRepeat() {
                return $scope.item.art && $scope.item.art.repeat;
            }

            $scope.getBgPositionStyle = function() {
                return '0px 0%, 0px 0%';
                //return '50%, 50%';
            };

            $scope.getBgRepeatStyle = function() {
                return getIsRepeat() ? undefined : 'no-repeat';
            };

            $scope.getBgSizeStyle = function() {
//                var result = (getIsRepeat() && $scope.item.art && $scope.item.art.naturalWidth)
//                    ? ($scope.item.art.naturalWidth + 'px')
//                    : 'auto';

                //var result = getIsRepeat() ? 'auto' : ($scope.plane.width + 'px');

                //item size is the size of the plane
                $scope.item.width = $scope.plane.width;
                $scope.item.height = $scope.plane.height;
                $scope.isPlaneTooLarge = false;

                if( getIsRepeat() ) {
                    return 'auto';
                }

                var result = $scope.plane.width;

                //check art resolution
                var maxArtSizePx = $rootScope.maxArtSizePx($scope.item.art);
                if(maxArtSizePx) {
                    if( $scope.plane.width > maxArtSizePx.width || $scope.plane.height > maxArtSizePx.height){
                        $scope.isPlaneTooLarge = true;
                        result = maxArtSizePx.width;
                        $scope.item.width = maxArtSizePx.width;
                        $scope.item.height = maxArtSizePx.height;
                    }
                }
                if($scope.item.art && $scope.item.art.stretch) {
                    return $scope.item.width + 'px ' + $scope.item.height + 'px';
                }
                else {
                    return result + 'px';
                }
            };



//            $scope.getLeft = function() {
//                return $scope.item.left;
//            };
//
//            $scope.getTop = function() {
//                return $scope.item.top;
//            };
//
//            $scope.getWidth = function() {
//                return $scope.item.width;
//            };
//
//            $scope.getHeight = function() {
//                return $scope.item.height;
//            };

//            $scope.getImagePosition = function() {
//                var w = getCurrImageWidth();
//                var h = w / getArtFormFactor();
//
//                var clipX1 = $scope.item.art ? -$scope.item.art.clipX1 : 0;
//                var x = w * clipX1 / 100;
//
//                var clipY1 = $scope.item.art ? -$scope.item.art.clipY1 : 0;
//                var y = h * clipY1 / 100;
//
//                return x + 'px ' + y + 'px';
//            };
//
//            $scope.getImageSize = function() {
//                return getCurrImageWidth() + 'px';
//            };
//
//
//            function getArtFormFactor() {
//                var formFactor = $scope.item.art ? $scope.item.art.formFactor : 0;
//                if( !formFactor ) {
//                    console.log('!!! using default form factor');
//                    formFactor = 4/3;
//                }
//                return formFactor;
//            }
//
//            function getCurrImageWidth() {
//                return $scope.item.width * getArtZoomFactor();
//            }
//
//            function getArtZoomFactor() {
//                var result = 100;
//                var art = $scope.item.art;
//                if( art ) {
//                    var clipX1 = art.clipX1 ? art.clipX1 : 0;
//                    var clipX2 = art.clipX2 ? art.clipX2 : 100;
//                    var diff = clipX2 - clipX1;
//                    if( diff == 0 ) {
//                        diff = 0.01;
//                    }
//                    result = 100 / diff;
//                }
//                //TODO: optimize # calls
//                //console.log('getArtZoomFactor', result);
//                return result;
//            }




            $scope.select = function () {
                return selectService.select($scope.item);
            };

            $scope.getIsSelected = function () {
                return selectService.isItemSelected($scope.item);
            };

        }

    }]);

});
