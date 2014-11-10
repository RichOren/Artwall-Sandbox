/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('art', [
        'selectService',
        function(selectService) {

        return {
            restrict: 'E',
            scope: {
                art: '=',
                width: '=',
                height: '='
            },
            templateUrl: "andrea/directive/artOLDTemplate.html",
            link: link
        };

        function link($scope, $element, attrs, ctrl, transcludeFn) {
            $element.addClass('absolute');

            $scope.getWidth = function (){
                return $scope.art
                    ? $scope.art.fill
                        ? $scope.width
                        : $scope.art.width
                    : 0;
            };

            $scope.getHeight = function (){
                return $scope.art
                    ? $scope.art.fill
                        ? $scope.height
                        : $scope.art.height
                    : 0;
            };

            $scope.getLeft = function (){
                if( !$scope.art || $scope.art.fill) return 0;
                if( $scope.art.center) {
                    return ($scope.width - $scope.art.width)/2;
                }
                return $scope.art.left;
            };

            $scope.getTop = function () {
                if( !$scope.art || $scope.art.fill) return 0;
                if( $scope.art.center) {
                    return ($scope.height - $scope.art.height)/2;
                }
                return $scope.art.top;
            };

            $scope.select = function () {
                return selectService.select($scope.art);
            };

            $scope.getIsSelected = function () {
                return selectService.isItemSelected($scope.art);
            };


        }

    }]);

});
