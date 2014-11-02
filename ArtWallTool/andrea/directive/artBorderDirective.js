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

            $scope.getLeft = function() {
                return 0;
//                return $scope.wall.trimTopCorner.width;
            };

//            $scope.getWidth = function() {
//                var result = $rootScope.px($scope.plane.width);
//                if (!$scope.isBottom) {
//                    result -= 2*$scope.wall.trimTopCorner.width;
//                    if( result < 0 ) result = 0;
//                }
//                $scope.item.width = result;
//                return result;
//            };

//            $scope.getHeight = function() {
//                var result = $rootScope.px($scope.plane.height);
//                if (!$scope.isBottom) {
//                    result -= 2*$scope.wall.trimTopCorner.width;
//                    if( result < 0 ) result = 0;
//                }
//                $scope.item.height = result;
//                return result;
//            };

            $scope.getHitHeight = function() {
                return ($scope.item && $scope.item.height > hitSize) ? $scope.item.height : hitSize;
            };

            $scope.getBgPosition = function() {
                var y = 0;
//                if ($scope.isBottom) {
//                    y = $scope.getHitHeight() - $scope.item.height;
//                }
                return '0px ' + y + 'px';
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
