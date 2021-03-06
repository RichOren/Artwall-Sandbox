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
            categories: [],
            collections: []
        };
        init();

        return model;

        function init() {
            model.categories = [
                createCategory('cat-g', 'Generic'),
                createCategory('cat-1', 'Category 1'),
                createCategory('cat-2', 'Category 2')
            ];
            model.collections = [
                createCollection('green'),
                createCollection('red')
            ];
        }

        function createCategory(catId, name) {
            var category = {
                catId: catId,
                name: name
            };
            return category;
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
                    },
                    {
                        url: './images/ceiling/moroccan-tile-pattern_001.png',
                        repeat: true
                    }
                ],

                trimSets: [
                    {
                        border: {
                            url: './images/ceiling/6_inch_trim_' + collId + '.jpg'
                        },
                        borderCorner: {
                            url: './images/ceiling/6_inch_corner_' + collId + '.png'
                        },
                        borderCenter: {
                            url: './images/ceiling/6_inch_middle_' + collId + '.png'
                        },
                        borderMiddle: {
                            url: './images/ceiling/6_inch_middle_' + collId + '.png'
                        },

                        trimTop: {
                            url: './images/C1/T/6_inch_trim_' + collId + '.png'
                        },
                        trimTopCorner: {
                            url: './images/C1/TC/6_inch_corner_' + collId + '_b.png'
                        },
                        trimTopCornerShort: {
                            url: './images/C1/TC/6_inch_corner_' + collId + '_a.png'
                        },
                        trimBottom: {
                            url: './images/C1/T/6_inch_bottom_trim_' + collId + '.png'
                        }
                    },
                    {
                        border: {
                            url: './images/ceiling/12_inch_trim_' + collId + '.jpg'
                        },
                        borderCorner: {
                            url: './images/ceiling/12_inch_corner_' + collId + '.png'
                        },
                        borderCenter: {
                            url: './images/ceiling/12_inch_middle_' + collId + '.png'
                        },
                        borderMiddle: {
                            url: './images/ceiling/12_inch_middle_' + collId + '.png'
                        },

                        trimTop: {
                            url: './images/C1/T/12_inch_trim_' + collId + '.png'
                        },
                        trimTopCorner: {
                            url: './images/C1/TC/12_inch_corner_' + collId + '_b.png'
                        },
                        trimTopCornerShort: {
                            url: './images/C1/TC/12_inch_corner_' + collId + '_a.png'
                        }
                    }
                ],

                topTrims: [
                    {
                        url: './images/C1/T/6_inch_trim_' + collId + '.png'
                    },
                    {
                        url: './images/C1/T/12_inch_trim_' + collId + '.png'
                    }
                ],

                bottomTrims: [
                    {
                        url: './images/C1/T/6_inch_bottom_trim_' + collId + '.png'
                    },
                    {
                        url: './images/C1/T/12_inch_bottom_trim_' + collId + '.png'
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