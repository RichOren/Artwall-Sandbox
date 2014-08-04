/**
 * Created by awyss on 6/8/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.controller('toolboxCtrl', [
    '$scope', 'dataService',
    function($scope, dataService) {

        var ctrl = {
            myColls: [],
            typeSelected: 'W',
            collSelected: {
                ceilings: [],
                topTrims: [],
                walls: [],
                bottomTrims: []
            },
            selectType: selectType,
            getImageUrl: getImageUrl,

            onCollChange: onCollChange
        };

        init();

        return ctrl;

        function init() {
            ctrl.myColls = dataService.getMyCollections();
            ctrl.collSelected = ctrl.myColls[0];
        }

        function selectType(type){
            if( ctrl.typeSelected != type) {
                ctrl.typeSelected = type;
            }
        }

        function getImageUrl(productImage){
            return "./images/" + productImage + ".jpg";
        }

        function onCollChange(coll){
            console.log('onCollChange', coll);
        }

    }]);

});
