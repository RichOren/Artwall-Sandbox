
define([
    'app',               // Core application
    'appSettings'

], function (app, appSettings) {
    'use strict';

    app.service('unit', [
        '$rootScope',
        function($rootScope) {

//            console.log('build unit Service');
            var unit = {
                inch: 8,
                feet: 8 * 12
            };
            $rootScope.inch = unit.inch;
            $rootScope.feet = unit.feet;
            return unit;

        }
    ]);

});
