/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('artTrimCorner', [
        function() {

        return {
            restrict: 'E',
            scope: {
                art: '=',
                isBottom: '=',
                width: '=',
                height: '='
            },
            templateUrl: "andrea/directive/artTrimCornerTemplate.html",
            link: link
        };

        function link($scope, $element, attrs, ctrl, transcludeFn) {
            $element.addClass('absolute');
        }

    }]);

});
