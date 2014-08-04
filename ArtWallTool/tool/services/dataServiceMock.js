/**
 * Created by awyss on 6/8/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.factory('dataService', [
    function() {

        var inch = 8;
        var feet = 8 * 12;

        var art = {
            original: {
                width: 14*feet,
                height: 8*feet
            },
            position: {
                left: 1*feet,
                top: 1*feet
            },
            size: {
                width: 8*feet,
                height: 4*feet
            },
            clip: {
                left: 0.2,
                top: 0.2
            },
            zoom:0.8
        };


        var myCollections = null;
        var productId = 0;

        var service = {
            getMyCollections: getMyCollections,
            //            getMyProjects: getMyProjects,
            getProjectItems: getProjectItems
        };
        return service;


        function getProjectItems(projectId) {
            var result = [];
            var coll = getMyCollections()[0];

            var projectItemId = projectId * 100;
            result.push(createMockProjectItem(++projectItemId, coll.ceilings[2], 'C'));

            result.push(createMockProjectItem(++projectItemId, coll.topTrims[2], 'T1'));
            result.push(createMockProjectItem(++projectItemId, coll.walls[1], 'W1'));
            result.push(createMockProjectItem(++projectItemId, coll.bottomTrims[1], 'B1'));

            result.push(createMockProjectItem(++projectItemId, coll.topTrims[2], 'T2'));
            result.push(createMockProjectItem(++projectItemId, coll.walls[1], 'W2'));
            result.push(createMockProjectItem(++projectItemId, coll.bottomTrims[0], 'B2'));

            result.push(createMockProjectItem(++projectItemId, coll.topTrims[2], 'T3'));
            result.push(createMockProjectItem(++projectItemId, coll.walls[1], 'W3'));
            result.push(createMockProjectItem(++projectItemId, coll.bottomTrims[0], 'B3'));

            return result;
        }

        function createMockProjectItem(projectItemId, product, previewLocation) {
            var result = {
                projectItemId: projectItemId,
                previewLocation: previewLocation,

                productId: product.productId,
                productType: product.productType,
                productImage: product.productImage,

                art: {
                    original: {
                        width: product.origInchWidth * inch,
                        height: product.origInchHeight * inch
                    },
                    position: {
                        left: 1*feet,
                        top: 1*feet
                    },
                    size: {
                        width: 8*feet,
                        height: 4*feet
                    },
                    clip: {
                        left: 0.2,
                        top: 0.2
                    },
                    zoom:0.8
                },


                quantity: 1,
                unitPrice: productId * 100
            };
            return result;
        }












        function getMyCollections() {
            if (myCollections) {
                return myCollections;
            }
            productId = 0;
            var result = [];
            for (var id = 1; id <= 1; id++) {
                var collCode = 'C' + id;
                result.push(createMockCollection(collCode));
            }
            myCollections = result;
            return result;
        }

        function createMockCollection(collCode) {
            var result = {
                collCode: collCode,
                name: ('Collection ' + collCode),
                ceilings: createMockProducts(collCode, 'C'),
                topTrims: createMockProducts(collCode, 'T'),
                walls: createMockProducts(collCode, 'W'),
                bottomTrims: createMockProducts(collCode, 'B')
            };
            return result;
        }

        function createMockProducts(collCode, productType) {
            var result = [];
            for (var id = 1; id <= 3; id++) {
                var productCode = productType + id;

                switch (productType) {
                    case 'C':
                        result.push(createCeilingProduct(collCode, productCode));
                        break;
                    case 'T':
                        result.push(createTopTrimProduct(collCode, productCode));
                        break;
                    case 'W':
                        result.push(createWallProduct(collCode, productCode));
                        break;
                    case 'B':
                        result.push(createBottomTrimProduct(collCode, productCode));
                        break;
                }
            }
            return result;
        }


        function generateSKU(collCode, productCode, productType) {
            return collCode + "-" + productCode + "-" + productType;
        }

        function createMockProduct(productType, productName, productSKU) {
            var result = {
                className: 'product',
                productType: productType,
                productName: productName,
                productSKU: productSKU,
                productId: ++productId
            };
            return result;
        }


        function createWallProduct(collCode, productCode) {
            var productType = 'W';
            var productName = 'Wall ' + productCode;
            var productSKU = generateSKU(collCode, productCode, productType);

            var result = createMockProduct(productType, productName, productSKU);

            result.origInchWidth = 14*12;
            result.origInchHeight = 8*12;
            result.productImage = collCode + '/' + productType + '/' + productSKU;

            return result;
        }


        function createCeilingProduct(collCode, productCode) {
            var productType = 'C';
            var productName = 'Ceiling ' + productCode;
            var productSKU = generateSKU(collCode, productCode, productType);

            var result = createMockProduct(productType, productName, productSKU);

            result.origInchWidth = 14*12;
            result.origInchHeight = 8*12;
            result.productImage = collCode + '/' + productType + '/' + productSKU;

            return result;
        }

        function createTopTrimProduct(collCode, productCode) {
            var productType = 'T';
            var productName = 'TopTrim ' + productCode;
            var productSKU = generateSKU(collCode, productCode, productType);

            var result = createMockProduct(productType, productName, productSKU);

            result.origInchWidth = 0;
            result.origInchHeight = 6;
            result.productImage = collCode + '/' + productType + '/' + productSKU;

            return result;
        }

        function createBottomTrimProduct(collCode, productCode) {
            var productType = 'B';
            var productName = 'BottomTrim ' + productCode;
            var productSKU = generateSKU(collCode, productCode, productType);

            var result = createMockProduct(productType, productName, productSKU);

            result.origInchWidth = 0;
            result.origInchHeight = 8;
            result.productImage = collCode + '/' + productType + '/' + productSKU;

            return result;
        }


    }]);

});