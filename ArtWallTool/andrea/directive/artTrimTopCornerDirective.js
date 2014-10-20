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
                wall: '=',
                trim: '='
            },
            templateUrl: "andrea/directive/artTrimTopCornerTemplate.html",
            link: link
        };

        function link($scope, $element, attrs, ctrl, transcludeFn) {
            var hitSize = 100;
            $scope.px = $rootScope.px;

            $element.addClass('absolute');

            $scope.$watch('trim.art.url', function(url){
                if (url){
                    var img = new Image();
                    img.onload = function(){
                        console.log('artTrimTopCorner size:', img.width + 'x' + img.height, img.naturalWidth + 'x' + img.naturalHeight);
                        $scope.trim.art.naturalWidth = img.width;
                        $scope.trim.art.naturalHeight = img.height;
                        $scope.trim.width = img.width;
                        $scope.trim.height = img.height;
                        $scope.trim.art.formFactor = $scope.trim.art.naturalWidth / $scope.trim.art.naturalHeight;
                        $scope.$apply();
                    };
                    img.src = url;
                }
            });

            $scope.getHitWidth = function() {
                return ($scope.trim.width < hitSize) ? hitSize : $scope.trim.width;
            };

            $scope.getHitHeight = function() {
                return ($scope.trim.height < hitSize) ? hitSize : $scope.trim.height;
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
