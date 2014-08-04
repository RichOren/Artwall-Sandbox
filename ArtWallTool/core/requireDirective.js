/*
 Usage: <div ds:require='dep1 dep2 dep3' ds-base-url='myscripts/folder'>...</div>
 */

define([

    // AMD Modules
    'require',

    // Custom Modules
    'app'           // Core application

], function (require, app) {
    'use strict';

    // Directive is registered without AMD because it is required to be registered before bootstrap.
    app.directive('dsRequire', [

        // Angular services
        '$compile',

        // Factory
        function ($compile) {

            return {
                restrict: 'A',
                priority: 10000,
                scope: true,
                replace: false,
                terminal: true,
                compile: compile
            };

            function compile() {
                return {
                    pre: function ($scope, $element, attrs) {
                        if (typeof attrs.dsBaseUrl !== 'undefined') {
                            if (attrs.dsBaseUrl.length && attrs.dsBaseUrl.charAt(attrs.dsBaseUrl.length - 1) != '/') {
                                // Add / to the end
                                attrs.dsBaseUrl += '/';
                            }
                            $scope.requireBaseUrl = attrs.dsBaseUrl;
                        }
                        var deps = attrs.dsRequire
                            .split(' ')
                            // Reduce to non-empty strings, append baseUrl
                            .reduce(function (pv, cv, i, a) {
                                var item = cv.trim();
                                if (item) {
                                    var path;
                                    if (item.charAt(0) == '.') {
                                        // Apply relative pathing
                                        while (item.indexOf('./') == 0) {
                                            // Remove leading ./
                                            item = item.substr(2);
                                        }
                                        path = ($scope.requireBaseUrl || '') + item;
                                    } else {
                                        path = item;
                                    }
                                    pv.push(path);
                                }
                                return pv;
                            }, []);
                        // Load dependencies
                        require(deps, function () {
                            // Expose dependencies to scope:
                            if (attrs.dsAs) {
                                var as = attrs.dsAs
                                        .split('\n').join(' ')
                                        .split('\r').join(' ')
                                        .split('\t').join(' ')
                                        .trim()
                                    ;
                                while (as.indexOf('  ') > -1) {
                                    as = as.split('  ').join(' ');
                                }
                                var names = as.split(' ');
                                for (var i = 0; i < names.length; i++) {
                                    $scope.$parent[names[i]] = arguments[i];
                                }
                            }

                            // Compile transclude
                            $scope.$apply(function () {
                                $element
                                    .attr('ds-x-require', attrs.dsRequire)
                                    .removeAttr('ds:require')
                                    .removeAttr('ds-require')
                                    .removeAttr('data-ds-require')
                                ;
                                $compile($element)($scope.$parent);
                            });
                        });
                    } // pre
                }; //return
            } // compile

        } // function
    ]);

});
