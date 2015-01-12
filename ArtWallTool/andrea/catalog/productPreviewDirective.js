/**
 * Created by awyss on 1/11/15
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('productPreview', [
    function() {

        return {
            restrict: 'E',
            templateUrl: "andrea/catalog/productPreviewTemplate.html"
        };

    }]);

});
