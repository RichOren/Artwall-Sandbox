/**
 * Created by awyss on 8/28/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('plane', [
        function() {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '='
            },
            template: '<div class="plane"></div>',
            link: link
        };

        function link($scope, $element, $attrs) {
            $scope.$watch(function(){
                update($scope.model, $element);
            });
            update($scope.model, $element);
            
        }
        function update(plane, $element) {
//          console.log('updateImage', pi);
            if( plane ) {
                $element.css({
                    width: plane.width + 'px',
                    height: plane.height + 'px'
                });
            }
        }


    }]);

});
