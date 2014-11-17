/**
 * Forces input value to be an Int
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('typeInt', [
        function() {

        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };

        function link($scope, $element, $attrs, ngModelCtrl) {

            function inputInt(typed) {
                if (typed) {
                    var text = '' + typed;
                    var digits = text.replace(/[^0-9]/g, '');

                    if (digits !== text) {
                        ngModelCtrl.$setViewValue(text);
                        ngModelCtrl.$render();
                    }
                    return parseInt(text, 10);
                }
                return undefined;
            }

            ngModelCtrl.$parsers.push(inputInt);
        }

    }]);

});
