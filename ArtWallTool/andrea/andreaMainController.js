/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.controller('andreaMainController', [
    '$rootScope', '$scope', '$location', 'selectService',
    function($rootScope, $scope, $location, selectService) {

        $rootScope.format = createFormat();

//        $rootScope.scale = 50;
        $rootScope.scale = 24;

        $rootScope.minPrintDPI = 72;

        $rootScope.px = function(mm) {
            return mm / 2;
        };

        $rootScope.mm = function(px) {
            return px * 2;
        };

        $rootScope.maxLenghtMM = function(lowResArtNaturalLength){
            return lowResArtNaturalLength * 10 / $rootScope.minPrintDPI * 25.4;
        };

        $rootScope.maxArtSizePx = function(art){
            var result;
            if( art && art.naturalWidth) {
                result = {
                    width: $rootScope.px($rootScope.maxLenghtMM(art.naturalWidth)),
                    height: $rootScope.px($rootScope.maxLenghtMM(art.naturalHeight))
                }
            }
            console.log('maxArtSizePx', result);
            return result;
        };



        var mainCtrl = {
            showSpec: showSpec,
            edit: edit,
            remove: remove,

            item: null //for spec dialog
        };
        return mainCtrl;

        function showSpec() {
            mainCtrl.item = selectService.getSelectedItem();
            console.log('showSpec', mainCtrl.item);
            if( mainCtrl.item) {
                $scope.specModal.open();
            }
        }

        function edit() {
            var item = selectService.getSelectedItem();
            if( item && item.art ) {
                $location.url("/editor");
            }
        }

        function remove() {
            var item = selectService.getSelectedItem();
            if( item && item.art ) {
                item.art.url = '';
                item.width = 0;
                item.height = 0;
            }
        }

    }]);


    function createFormat() {

        var format = {
            useMetric: true,
            size: size
        };
        return format;

        function size(mmValue) {
            if( format.useMetric ) {
                var cm = Math.round(mmValue / 10);
                return cm + 'cm';
            }
            else {
                var inches = mmValue / 25.4;
                //round to 1/4 of inch
                inches = Math.round(inches * 4);
                var quarters = inches % 4;
                inches = Math.floor(inches / 4);

                var feet = Math.floor(inches / 12);
                inches = inches % 12;

                var result = feet ? (feet+ "' ") : '';
                result += (inches ? inches : '');
                if( inches && quarters) {
                    result += ' ';
                }
                result += formatQuarter(quarters);
                if(inches || quarters) {
                    result += '"';
                }
                return result;
            }
        }

        function formatQuarter(quarters) {
            if( quarters == 2 ) return "1/2";
            return (quarters ? (quarters + '/4') : '');
        }


    }

});