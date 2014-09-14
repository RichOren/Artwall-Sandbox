/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('artFrame', [
        function() {

        return {
            restrict: 'E',
            scope: {
                art: '=',
                frame: '=',

                left: '=',
                right: '=',
                top: '=',
                bottom: '=',

                width: '=', //hostWidth
                height: '=' //hostHeight
            },
            templateUrl: "andrea/directive/artFrameTemplate.html",
            link: link
        };

        function link($scope, $element, attrs, ctrl, transcludeFn) {
            $element.addClass('absolute');

            $scope.getMaxWidth = function () {
                return $scope.width - (+$scope.left) - (+$scope.right);
            };

            $scope.getMaxHeight = function () {
                return $scope.height - (+$scope.top) - (+$scope.bottom);
            };

            $scope.getWidth = function () {
                var maxWidth =  $scope.getMaxWidth();
                if($scope.frame && !$scope.frame.fill && $scope.frame.width ) {
                    return Math.min(maxWidth, $scope.frame.width)
                }
                return maxWidth;
            };

            $scope.getHeight = function (){
                var maxHeight =  $scope.getMaxHeight();
                if($scope.frame && !$scope.frame.fill && $scope.frame.height ) {
                    return Math.min(maxHeight, $scope.frame.height)
                }
                return maxHeight;
            };

            $scope.getLeft = function() {
                var minLeft = +$scope.left;
                if( !$scope.frame || $scope.frame.fill) return minLeft;
                if( $scope.frame.center) {
                    return ($scope.width - $scope.getWidth())/2;
                }
                if($scope.frame.top ) {
                    return Math.min(minLeft, $scope.frame.left)
                }
                return minLeft;
            };

            $scope.getTop = function () {
                var minTop = +$scope.top;
                if( !$scope.frame || $scope.frame.fill) return minTop;
                if( $scope.frame.center) {
                    return ($scope.height - $scope.getHeight())/2;
                }
                if($scope.frame.top ) {
                    return Math.min(minTop, $scope.frame.top)
                }
                return minTop;
            };

        }

    }]);

});
