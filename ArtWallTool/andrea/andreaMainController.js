/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.controller('andreaMainController', [
    '$rootScope',
    function($rootScope) {

        $rootScope.format = createFormat();

//        $rootScope.scale = 50;
        $rootScope.scale = 24;

        $rootScope.px = function(mm) {
            //console.log(mm, $rootScope.scale);
            return mm / 2;
        };

        var mainCtrl = {

        };
        return mainCtrl;


    }]);


    function createFormat() {

        var format = {
            useMetric: false,
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