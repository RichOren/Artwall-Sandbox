/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('artBorder', [
        '$rootScope', 'selectService',
        function($rootScope, selectService) {

        return {
            restrict: 'E',
            scope: {
                plane: '=',
                item: '='
            },
            templateUrl: "andrea/directive/artBorderTemplate.html",
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
                        console.log('artBorder size:', img.width + 'x' + img.height, img.naturalWidth + 'x' + img.naturalHeight);
                        $scope.item.art.naturalWidth = img.width;
                        $scope.item.art.naturalHeight = img.height;
                        $scope.item.height = img.height;
                        $scope.item.art.formFactor = $scope.item.art.naturalWidth / $scope.item.art.naturalHeight;
                        $scope.$apply();
                    };
                    img.src = url;
                }
            });

            function updateTotalWidth() {
                var result = 2*$scope.plane.width + 2*$scope.plane.height;
                result -= 4*$scope.plane.borderCorner.width;
                result -= 4*$scope.plane.borderCorner.height;
                result -= 2*$scope.plane.borderCenter.width;
                result -= 2*$scope.plane.borderMiddle.height;
                if( result < 0 ) result = 0;
                $scope.item.width = result;
            }

            $scope.getLeft = function() {
                return $scope.plane.borderCorner.width;
            };

            $scope.getWidth = function() {
                updateTotalWidth();
                var result = $scope.plane.width;
                result -= 2*$scope.plane.borderCorner.width;
                if( result < 0 ) result = 0;
                return result;
            };

            $scope.getTop = function() {
                return $scope.plane.borderCorner.height;
            };

            $scope.getHeight = function() {
                var result = $scope.plane.height;
                result -= 2*$scope.plane.borderCorner.height;
                if( result < 0 ) result = 0;
                return result;
            };

            $scope.getHitHeight = function() {
                return ($scope.item && $scope.item.height > hitSize) ? $scope.item.height : hitSize;
            };


            $scope.select = function () {
                return selectService.select($scope.item);
            };

            $scope.getIsSelected = function () {
                return selectService.isItemSelected($scope.item);
            };

        }

    }]);

});
