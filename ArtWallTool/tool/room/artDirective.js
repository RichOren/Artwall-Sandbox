/**
 * Created by awyss on 6/8/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('art', [
        function() {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                pi: '='
            },
            templateUrl: "tool/room/artDirectiveTemplate.html",
            link: link
        };

        function link($scope, $element, $attrs) {
//            console.log('pi', $scope.pi);

//            $scope.$watch('pi', function( newItem ){
//                updateImage(newItem, $element);
//            });
            $scope.$watch(function(){
                updateImage($scope.pi, $element);
            });
            updateImage($scope.pi, $element);
        }

        function updateImage(pi, $element) {
//            console.log('updateImage', pi);
            var art = pi ? pi.art : null;
            if (art) {
                var clipLeft = art.original.width * art.clip.left;
                var clipTop = art.original.height * art.clip.top;

                var imageWidth = art.original.width * art.zoom;

                $element.css({
                    'background-color': 'grey',
                    left: art.position.left + 'px',
                    top: art.position.top + 'px',
                    right: undefined,
                    bottom: undefined,
                    width: art.size.width + 'px',
                    height: art.size.height + 'px',
                    'background-image': "url('" + getImageUrl(pi.productImage) + "')",
                    'background-position': '-' + clipLeft + 'px -' + clipTop + 'px',
                    'background-size': imageWidth + 'px'

                });
            }
            else {
                $element.css({
                    'background-color': 'grey',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: undefined,
                    height: undefined,
                    'background-image': "url('')",
                    'background-position': '0px 0px',
                    'background-size': undefined
                });
            }

        }


        function getImageUrl(productImage) {
            var result = '';
            if( productImage) {
                result = './images/' + productImage + '.jpg';
            }
//            console.log('getImageUrl', result);
            return result;
        }

    }]);

});
