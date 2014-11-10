/**
 * Created by awyss on 10/12/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.service('selectService', [
    '$rootScope',
    function($rootScope) {

        var svc = {
            select: select,
            isItemSelected: isItemSelected,
            getSelectedItem: getSelectedItem
        };

        var selectedItem = null;

        return svc;

        function select(item) {
            selectedItem = item;
            $rootScope.selectedItem = item;
        }

        function isItemSelected(item) {
            return (selectedItem && selectedItem === item);
        }

        function getSelectedItem() {
            return selectedItem;
        }

    }]);

});