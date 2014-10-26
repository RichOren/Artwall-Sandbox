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
                wall: '=',
                trim: '=',
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

            $scope.$watch('trim.art.url', function(url){
                if (url){
                    var img = new Image();
                    img.onload = function(){
                        if ($scope.isBottom) {
                            console.log('trim Bottom size:', img.width + 'x' + img.height, img.naturalWidth + 'x' + img.naturalHeight);
                        }
                        else {
                            console.log('trim Top size:', img.width + 'x' + img.height, img.naturalWidth + 'x' + img.naturalHeight);
                        }
                        $scope.trim.art.naturalWidth = img.width;
                        $scope.trim.art.naturalHeight = img.height;
                        $scope.trim.height = img.height;
                        $scope.trim.art.formFactor = $scope.trim.art.naturalWidth / $scope.trim.art.naturalHeight;
                        $scope.$apply();
                    };
                    img.src = url;
                }
            });

            $scope.getLeft = function() {
                return $scope.isBottom ? 0 : $scope.wall.trimTopCorner.width;
            };

            $scope.getWidth = function() {
                var result = $rootScope.px($scope.wall.width);
                if (!$scope.isBottom) {
                    result -= 2*$scope.wall.trimTopCorner.width;
                    if( result < 0 ) result = 0;
                }
                $scope.trim.width = result;
                return result;
            };

            $scope.getHitHeight = function() {
                return ($scope.trim.height < hitSize) ? hitSize : $scope.trim.height;
            };

            $scope.getBgPosition = function() {
                var y = 0;
                if ($scope.isBottom) {
                    y = $scope.getHitHeight() - $scope.trim.height;
                }
                return '0px ' + y + 'px';
            };

            $scope.select = function () {
                return selectService.select($scope.trim);
            };

            $scope.getIsSelected = function () {
                return selectService.isItemSelected($scope.trim);
            };

        }

    }]);

});
