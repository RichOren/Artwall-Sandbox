/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('artTrim', [
        function() {

        return {
            restrict: 'E',
            scope: {
                art: '=',
                isBottom: '=',
                width: '=',
                height: '='
            },
            templateUrl: "andrea/directive/artTrimTemplate.html",
            link: link
        };

        function link($scope, $element, attrs, ctrl, transcludeFn) {
            $element.addClass('absolute');
        }

    }]);

});
