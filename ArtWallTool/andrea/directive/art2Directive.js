/**
 * Created by awyss on 10/19/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('art2', [
        '$rootScope', 'selectService',
        function($rootScope, selectService) {

        return {
            restrict: 'E',
            scope: {
                wall: '=',
                item: '='
            },
            templateUrl: "andrea/directive/art2Template.html",
            link: link
        };

        function link($scope, $element, attrs, ctrl, transcludeFn) {
            var hitSize = 100;
            $scope.px = $rootScope.px;

            $element.addClass('absolute');

            $scope.$watch('item.art.url', function(url){
                if (url){
                    var img = new Image();
                    img.onload = function(){
                        console.log('item size:', img.width + 'x' + img.height, img.naturalWidth + 'x' + img.naturalHeight);
                        $scope.item.art.naturalWidth = img.width;
                        $scope.item.art.naturalHeight = img.height;
                        $scope.item.art.formFactor = $scope.item.art.naturalWidth / $scope.item.art.naturalHeight;
                        $scope.$apply();
                    };
                    img.src = url;
                }
            });

            $scope.getLeft = function() {
                return $scope.item.left;
            };

            $scope.getTop = function() {
                return $scope.item.top;
            };

            $scope.getWidth = function() {
                return $scope.item.width;
            };

            $scope.getHeight = function() {
                return $scope.item.height;
            };

            $scope.getImagePosition = function() {
                var w = getCurrImageWidth();
                var h = w / getArtFormFactor();

                var clipX1 = $scope.item.art ? -$scope.item.art.clipX1 : 0;
                var x = w * clipX1 / 100;

                var clipY1 = $scope.item.art ? -$scope.item.art.clipY1 : 0;
                var y = h * clipY1 / 100;

                return x + 'px ' + y + 'px';
            };

            $scope.getImageSize = function() {
                return getCurrImageWidth() + 'px';
            };


            function getArtFormFactor() {
                var formFactor = $scope.item.art ? $scope.item.art.formFactor : 0;
                if( !formFactor ) {
                    console.log('!!! using default form factor');
                    formFactor = 4/3;
                }
                return formFactor;
            }

            function getCurrImageWidth() {
                return $scope.item.width * getArtZoomFactor();
            }

            function getArtZoomFactor() {
                var result = 100;
                var art = $scope.item.art;
                if( art ) {
                    var clipX1 = art.clipX1 ? art.clipX1 : 0;
                    var clipX2 = art.clipX2 ? art.clipX2 : 100;
                    var diff = clipX2 - clipX1;
                    if( diff == 0 ) {
                        diff = 0.01;
                    }
                    result = 100 / diff;
                }
                //TODO: optimize # calls
                //console.log('getArtZoomFactor', result);
                return result;
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
