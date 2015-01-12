/**
 * Created by awyss on 1/11/15
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('catalogBrowser', [
    function() {

        return {
            restrict: 'E',
            templateUrl: "andrea/catalog/catalogBrowserTemplate.html"
        };
    }]);

});
