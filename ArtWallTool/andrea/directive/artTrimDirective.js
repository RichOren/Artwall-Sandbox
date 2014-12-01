/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('artTrim', [
        '$rootScope', 'selectService',
        function($rootScope, selectService) {

        return {
            restrict: 'E',
            scope: {
                plane: '=',
                item: '=',
                isBottom: '='
            },
            templateUrl: "andrea/directive/artTrimTemplate.html",
            link: link
        };

        function link($scope, $element, attrs, ctrl, transcludeFn) {
            var hitSize = 100;
            $scope.px = $rootScope.px;

            $element.addClass('absolute');
            if ($scope.isBottom) {
                $element[0].style.bottom = '0px';
            }

            $scope.$watch('item.art.url', function(url){
                if (url){
                    var img = new Image();
                    img.onload = function(){
                        if ($scope.isBottom) {
                            console.log('trim Bottom size:', img.width + 'x' + img.height, img.naturalWidth + 'x' + img.naturalHeight);
                        }
                        else {
                            console.log('trim Top size:', img.width + 'x' + img.height, img.naturalWidth + 'x' + img.naturalHeight);
                        }
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
                return $scope.isBottom ? 0 : $scope.plane.trimTopCorner.width;
            };

            $scope.getWidth = function() {
                var result = $scope.plane.width;
                if (!$scope.isBottom) {
                    result -= 2*$scope.plane.trimTopCorner.width;
                    if( result < 0 ) result = 0;
                }
                $scope.item.width = result;
                return result;
            };

            $scope.getHitHeight = function() {
                return ($scope.item.height < hitSize) ? hitSize : $scope.item.height;
            };

            $scope.getBgPosition = function() {
                var y = 0;
                if ($scope.isBottom) {
                    y = $scope.getHitHeight() - $scope.item.height;
                }
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
