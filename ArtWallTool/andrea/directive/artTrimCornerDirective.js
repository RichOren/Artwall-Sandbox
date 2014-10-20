/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('artTrimCorner', [
        'selectService',
        function(selectService) {

        return {
            restrict: 'E',
            scope: {
                art: '=',
                width: '='
            },
            templateUrl: "andrea/directive/artTrimCornerTemplate.html",
            link: link
        };

        function link($scope, $element, attrs, ctrl, transcludeFn) {
            $element.addClass('absolute');

            $scope.$watch('art.url', function(url){
                if(url){
                    var img = new Image();
                    img.onload = function(){
                        console.log('artTrimCorner naturalSize:', img.width + 'x' + img.height, img.naturalWidth + 'x' + img.naturalHeight);
                        $scope.art.naturalWidth = img.width;
                        $scope.art.naturalHeight = img.height;
                        $scope.art.formFactor = $scope.art.naturalWidth / $scope.art.naturalHeight;
                        $scope.$apply();
                    };
                    img.src = url;
                }
            });


            $scope.select = function () {
                return selectService.select($scope.art);
            };

            $scope.getIsSelected = function () {
                return selectService.isItemSelected($scope.art);
            };
        }

    }]);

});
