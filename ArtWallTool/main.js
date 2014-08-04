/**
 * Created by awyss on 7/23/14.
 */
(function () {
    'use strict';

    require.config(deepExtend(
        // RequireJS
        {
            baseUrl: '', // Apps begin in feature subdirectory
            paths: {
                'text': '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text'
            }
        },

        // Angular
        {
            paths: {
                'angularAMD': './core/angularAMD', //'//raw.githubusercontent.com/marcoslin/angularAMD/master/src/angularAMD',
                'angular': '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.16/angular',
                'angular-route': '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.16/angular-route'
            },
            shim: {
                'angularAMD': { deps: ['angular'], exports: 'angular', urlArgs: '' },
                'angular': { deps: ['jquery'], exports: 'angular' },
                'angular-route': { deps: ['angular'] }
            }
        },

        // Bootstrap
        {
            paths: {
                'bootstrap': '//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min',
                'ui.bootstrap': '//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.10.0/ui-bootstrap-tpls'
//                'bootstrap.select': './scripts/bootstrap-select.min'
            },
            shim: {
                'bootstrap': { deps: ['jquery'] },
                'ui.bootstrap': { deps: ['bootstrap', 'angular'] }
//                'bootstrap.select': { deps: ['bootstrap'] }
            }
        },

        // Bootbox
        {
            paths: {
                'bootbox': '//cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.2.0/bootbox.min'
            },
            shim: {
                'bootbox': 'bootbox'
            }
        },

        // Codemirror
        {
            paths: {
                'codemirror': '//cdnjs.cloudflare.com/ajax/libs/codemirror/4.2.0',
                'codemirror/lib/codemirror': '//cdnjs.cloudflare.com/ajax/libs/codemirror/4.2.0/codemirror'
            }
        },

        // Prettify
        {
            paths:{
                'prettify': '//cdnjs.cloudflare.com/ajax/libs/prettify/r298',
                'prettyPrint': '//cdnjs.cloudflare.com/ajax/libs/prettify/r298/prettify'
            },
            shims: {
                'prettyPrint': 'prettyPrintOne'
            }

        },

        // Google Analytics:
        {
            paths: {
                'ga': '//www.google-analytics.com/analytics'
            },
            shim: {
                'ga': { exports: 'ga' }
            }
        },

        // Jasmine
        {
            paths: {
                'jasmine': '//cdnjs.cloudflare.com/ajax/libs/jasmine/2.0.0/jasmine',
                'jasmine-html': '//cdnjs.cloudflare.com/ajax/libs/jasmine/2.0.0/jasmine-html'
            },
            shim: {
                'jasmine': { exports: 'jasmineRequire' },
                'jasmine-html': { deps: ['jasmine'], exports: 'jasmineRequire' }
            }
        },

        // jQuery
        {
            paths: {
                'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min',
                'jquery-easing': '//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min'
            },
            shim: {
                'jquery-easing': { deps: ['jquery'] }
            }
        },

        // nanoScroller
        {
            paths: {
                'nanoScroller': '/Assets/Jquery/Plugins/NanoScroller/nanoscroller',
            },
            shim: {
                'nanoScroller': { deps: ["jquery"] }
            }
        },

        // moment
        {
            paths: {
                'moment': '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.7.0/moment.min',
            }
        },

        // Polyfill
        {
            deps: ['core/polyfill']
        },
        {

        }
    ));

    // App Settings
    define('appSettings', ['text!appSettings.json'], function (json) {
        // RegExp to remove JavaScript comments
        // http://stackoverflow.com/questions/24518020/comprehensive-regexp-to-remove-javascript-comments
        json = json.replace(/((["'])(?:\\[\s\S]|.)*?\2|\/(?![*\/])(?:\\.|\[(?:\\.|.)\]|.)*?\/)|\/\/.*?$|\/\*[\s\S]*?\*\//gm, '$1');
        return JSON.parse(json);
    });

    require([

        // AMD Modules
        'angularAMD', // Angular AMD

        // Custom Modules
        'app', // Base application

        // Custom Angular Modules
        'core/requireDirective'
    ], function (amd, app) {

        amd.bootstrap(app);

    });


    function deepExtend(a) {
        var o, i, e;
        for (i = 1; o = arguments[i++];) {
            for (var p in o) {
                e = o[p];
                if (typeof e == typeof {}) a[p] = deepExtend(a[p] || e.constructor(), e);
                else a[p] = e;
            }
        }
        return a;
    }

//    function cacheBustKey() {
//        return cacheBustKey.key || (cacheBustKey.key = (document.lastModified || new Date().toString()).split('').reduce(function (hash, cv, i) { return ((hash << 5) - hash) + cv.charCodeAt(0); }, 0));
//    }
//    // Defined here because it is needed for require.config
//    define('cacheBustKey', ['require'], cacheBustKey);

})();