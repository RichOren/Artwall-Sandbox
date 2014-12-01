/**
 * Created by awyss on 11/09/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('artMedallion', [
        'selectService',
        function(selectService) {

        return {
            restrict: 'E',
            scope: {
                plane: '=',
                item: '='
            },
            templateUrl: "andrea/directive/artMedallionTemplate.html",
            link: link
        };

        function link($scope, $element, attrs, ctrl, transcludeFn) {
            var hitSize = 100;

            $element.addClass('absolute');

            $scope.$watch('item.art.url', function(url){
                if (url){
                    var img = new Image();
                    img.onload = function(){
                        console.log('artMedallion size:', img.width + 'x' + img.height, img.naturalWidth + 'x' + img.naturalHeight);
                        $scope.item.art.naturalWidth = img.width;
                        $scope.item.art.naturalHeight = img.height;
//                        $scope.item.width = img.width;
//                        $scope.item.height = img.height;
                        $scope.item.art.formFactor = $scope.item.art.naturalWidth / $scope.item.art.naturalHeight;
                        $scope.$apply();
                    };
                    img.src = url;
                }
            });

            function getArtFormFactor() {
                var formFactor = $scope.item.art ? $scope.item.art.formFactor : 0;
                if( !formFactor ) {
//                    console.log('!!! using default form factor');
                    formFactor = 4/3;
                }
                return formFactor;
            }

            //height is specified
            $scope.getHeight = function() {
                return ($scope.item && $scope.item.height) ? $scope.item.height : 0;
            };
            $scope.getHitWidth = function() {
                var result = $scope.getWidth();
                return (result > hitSize) ? result : hitSize;
            };

            $scope.getWidth = function() {
                var result = $scope.getHeight() * getArtFormFactor();
                if($scope.item) $scope.item.width = result;
                return result;
            };
            $scope.getHitHeight = function() {
                var result = $scope.getHeight();
                return (result > hitSize) ? result : hitSize;
            };

            $scope.getLeft = function() {
                return ($scope.plane.width - $scope.getHitWidth())/2;
            };

            $scope.getTop = function() {
                return ($scope.plane.height - $scope.getHitHeight())/2;
            };


            $scope.getImageSize = function() {
                return $scope.getWidth() + 'px';
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
