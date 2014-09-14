/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('borderCornerArt', [
        function() {

        return {
            restrict: 'E',
            scope: {
                art: '=',
                width: '=',
                height: '='
            },
            templateUrl: "andrea/directive/borderCornerArtTemplate.html",
            link: link
        };

        function link($scope, $element, attrs, ctrl, transcludeFn) {
            $element.addClass('absolute');
            $scope.click = click;
        }

        function click() {
            console.log('corner Click');
        }

    }]);

});
