/**
 * Created by awyss on 10/19/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('artTrimTopCorner', [
        '$rootScope', 'selectService',
        function($rootScope, selectService) {

        return {
            restrict: 'E',
            scope: {
                plane: '=',
                item: '='
            },
            templateUrl: "andrea/directive/artTrimTopCornerTemplate.html",
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
                        console.log('artTrimTopCorner size:', img.width + 'x' + img.height, img.naturalWidth + 'x' + img.naturalHeight);
                        $scope.item.art.naturalWidth = img.width;
                        $scope.item.art.naturalHeight = img.height;
                        $scope.item.width = img.width;
                        $scope.item.height = img.height;
                        $scope.item.art.formFactor = $scope.item.art.naturalWidth / $scope.item.art.naturalHeight;
                        $scope.$apply();
                    };
                    img.src = url;
                }
            });

            $scope.getHitWidth = function() {
                return ($scope.item.width < hitSize) ? hitSize : $scope.item.width;
            };

            $scope.getHitHeight = function() {
                return ($scope.item.height < hitSize) ? hitSize : $scope.item.height;
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
