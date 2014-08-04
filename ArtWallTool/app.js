/**
 * Created by awyss on 7/23/14.
 */
define([

    // AMD Modules
    'angular',          // Angular
    'angularAMD',       // Angular AMD

    // Custom Modules

    // Angular Modules
    'angular-route',    // Angular routing
    'ui.bootstrap'      // Bootstrap UI
//    'bootstrap.select'   // Bootstrap Select

], function (angular, amd) {
    'use strict';

    // AMD Support for routing
    var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);
    app.config([
        '$routeProvider',
        function ($routeProvider) {
            app.$routeProvider = $routeProvider;
        }
    ]);


    // Async route provider
    /*
     usage:
     app.route
     .baseUrl('/app/test')
     .when('home', { templateUrl: 'home/homeTemplate.html' })
     .finalize()

     baseUrl     - Temporarily sets a base URL to be prepended to templateUrls.
     when        - Maps a #/path to a template.
     otherwise   - Provides a default template.
     finalize    - Applies new routes, and reloads the route if necessary.
     */
    app.run([
        '$route',
        '$location',
        function ($route, $location) {
            app.route = {
                baseUrl: baseUrl,
                when: when,
                otherwise: otherwise,
                finalize: finalize
            };

            var sBaseUrl = null;

            function baseUrl(path) {
                if (typeof path !== 'undefined' && path != null) {
                    if (path.length && path.charAt(path.length - 1) != '/') {
                        // Add / to the end
                        path += '/';
                    }
                    sBaseUrl = path;
                }
                return app.route;
            };
            function when(path, config) {
                app.$routeProvider.when(path, fixConfig(config));
                return app.route;
            };
            function otherwise(config) {
                app.$routeProvider.otherwise(fixConfig(config));
                return app.route;
            };
            function fixConfig(config) {
                // Prepend baseUrl if necessary.
                if (sBaseUrl && config.templateUrl && config.templateUrl.charAt(0) != '/') {
                    config.templateUrl = sBaseUrl + config.templateUrl;
                }
                return config;
            }
            function finalize() {
                sBaseUrl = null;
                $route.reload();
                return app.route;
            }
        }
    ]);

    return app;

});
