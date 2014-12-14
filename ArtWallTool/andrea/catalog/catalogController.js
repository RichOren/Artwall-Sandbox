/**
 * Created by awyss on 12/14/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.controller('catalogController', [
    'catalogModel',
    function(catalogModel) {

        var ctrl = {
            catalog: catalogModel,
            selectedCollection: null,
            onCollectionChange: onCollectionChange
        };

        init();

        return ctrl;

        function init() {
        }

        function onCollectionChange() {
            console.log(ctrl.selectedCollection);
        }

    }]);

});