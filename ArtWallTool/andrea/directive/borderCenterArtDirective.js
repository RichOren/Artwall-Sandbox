/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('borderCenterArt', [
        function() {

        return {
            restrict: 'E',
            scope: {
                art: '=',
                width: '=',
                height: '='
            },
            templateUrl: "andrea/directive/borderCenterArtTemplate.html",
            link: link
        };

        function link($scope, $element, attrs, ctrl, transcludeFn) {
            $element.addClass('absolute');
        }

    }]);

});
