/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('cropper', [
        '$window', 'debounce',
        function($window, debounce) {

        return {
            restrict: 'E',
            scope: {
                art: '='
            },
            templateUrl: "andrea/editor/cropperTemplate.html",
            link: link
        };

        function link($scope, $element, attrs, ctrl, transcludeFn) {

            $scope.width = 0;
            $scope.height = 0;
            $scope.margin = 40;
            $scope.naturalWidth = 400;
            $scope.naturalHeight = 250;

            init($scope, $element);


            $scope.getImagePosition = function(){
                return '40px 10px';
            };

            $scope.getImageSize = function(){
                var width = $scope.width - 2*$scope.margin;
                width = Math.max(0, width);
                return width + 'px';
            };


//            $element.addClass('absolute');
//            var style = $element[0].style;
//            style.display = width = '100%';
//            style.width = '100%';
//            style.height = '100px';
//            style.backgroundColor = 'red';
        }

        function init($scope, $element) {
            var trackElementSize = true;
            $scope.$on("$destroy", function () {
                trackElementSize = false;
            });

            function onResize() {
                if(trackElementSize) {
                    debounce(afterResize, 50);
                }
            }
            function afterResize() {
                if(trackElementSize) {
                    $scope.width = $element.width();
                    $scope.height = $scope.width / getAspectRatio();
                    $scope.$apply();
                }
            }
            angular.element($window).on('resize', onResize);
            onResize();

            $scope.$watch('art.url', function(url){
                if(url){
                    var img = new Image();
                    img.onload = function(){
                        console.log(img.width + 'x' + img.height);
                        $scope.naturalWidth = img.width ? img.width : 400;
                        $scope.naturalHeight = img.height ? img.height : 250;
                        $scope.$apply();
                    };
                    img.src = url;
                }
            });
        }

        function getAspectRatio() {
            return 16/9;
        }

    }]);

});
