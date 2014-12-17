/**
 * Created by awyss on 12/07/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.service('catalogModel', [

    function() {
        var model = {
            collections: []
        };
        init();

        return model;

        function init() {
            model.collections = [
                createCollection('green'),
                createCollection('red')
            ];
        }


        function createCollection(collId) {
            var collection = {
                name: 'Collection ' + collId,

                backgrounds: [
                    {
                        url: './images/ceiling/moroccan-tile-pattern_001.png',
                        repeat: true
                    },
                    {
                        url: './images/wood.jpg',
                        repeat: true
                    }
                ],

                trimSets: [
                    {
                        border: {
                            url: './images/ceiling/6_inch_trim_' + collId + '.jpg'
                        },
                        corner: {
                            url: './images/ceiling/6_inch_corner_' + collId + '.jpg'
                        },
                        center: {
                            url: './images/ceiling/6_inch_middle_' + collId + '.jpg'
                        },
                        middle: {
                            url: './images/ceiling/6_inch_middle_' + collId + '.jpg'
                        },
                        topTrim: {
                            url: './images/C1/T/6_inch_trim_' + collId + '.png'
                        },
                        wallCorner: {
                            url: './images/C1/TC/6_inch_corner_' + collId + '_b.png'
                        },
                        wallCornerShort: {
                            url: './images/C1/TC/6_inch_corner_' + collId + '_a.png'
                        },
                        bottomTrim: {
                            url: './images/C1/T/6_inch_bottom_trim_' + collId + '.png'
                        }
                    },
                    {
                        border: {
                            url: './images/ceiling/12_inch_trim_' + collId + '.jpg'
                        },
                        corner: {
                            url: './images/ceiling/12_inch_corner_' + collId + '.jpg'
                        },
                        center: {
                            url: './images/ceiling/12_inch_middle_' + collId + '.jpg'
                        },
                        middle: {
                            url: './images/ceiling/12_inch_middle_' + collId + '.jpg'
                        },
                        topTrim: {
                            url: './images/C1/T/12_inch_trim_' + collId + '.png'
                        },
                        wallCorner: {
                            url: './images/C1/TC/12_inch_corner_' + collId + '_b.png'
                        },
                        wallCornerShort: {
                            url: './images/C1/TC/12_inch_corner_' + collId + '_a.png'
                        }
                    }
                ],

                topTrims: [
                    {
                        url: './images/C1/T/6_inch_trim_' + collId + '.png'
                    }
                ],

                bottomTrims: [
                    {
                        url: './images/C1/T/6_inch_bottom_trim_' + collId + '.png'
                    }
                ],

                medallions: [
                        {
                            url: './images/ceiling/moroccan-madallion_001.png'
                        },
                        {
                            url: './images/ceiling/moroccan-floating-art.png'
                        }
                ],

                floats: [
                    {
                        url: './images/ceiling/moroccan-floating-art.png'
                    }
                ],

                arts: [
                    {
                        url: './images/A023-copy.jpg'
                    }
                ]

            };

            return collection;
        }

    }]);

});