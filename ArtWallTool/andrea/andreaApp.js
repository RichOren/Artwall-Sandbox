
define([
    'app'
], function (app) {
    'use strict';

    app.route
        .baseUrl('andrea')

        .when('/wall', { templateUrl: 'wall/wallTemplate.html' })
        .when('/ceiling', { templateUrl: 'ceiling/ceilingTemplate.html' })
        .when('/editor', { templateUrl: 'editor/editorTemplate.html' })
        .otherwise({ redirectTo: '/ceiling' })
        .finalize()
    ;

});
