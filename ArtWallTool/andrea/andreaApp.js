
define([
    'app'
], function (app) {
    'use strict';

    app.route
        .baseUrl('andrea')

        .when('/3d', { templateUrl: '3d/3dTemplate.html' })
        .when('/ceiling', { templateUrl: 'ceiling/ceilingTemplate.html' })
        .when('/wall', { templateUrl: 'wall/wallTemplate.html' })
        .when('/test', { templateUrl: 'test/testTemplate.html' })
        .otherwise({ redirectTo: '/ceiling' })
        .finalize()
    ;

});
