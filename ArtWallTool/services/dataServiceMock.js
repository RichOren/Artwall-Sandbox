/**
 * Created by awyss on 6/8/14.
 */
/**
 * Created by awyss on 6/8/14.
 */
angular.module("artwalltool")
    .factory("dataService", [function() {

        var myCollections = null;
        var productId = 0;

        var service = {
            getMyCollections: getMyCollections,
//            getMyProjects: getMyProjects,
            getProjectItems: getProjectItems
        };
        return service;


        function getProjectItems(projectId){
            var result = [];
            var coll = getMyCollections()[1];

            var projectItemId = projectId * 100;
            result.push(createMockProjectItem(++projectItemId, coll.ceelings[3], 'C'));

            result.push(createMockProjectItem(++projectItemId, coll.topTrims[2], 'T1'));
            result.push(createMockProjectItem(++projectItemId, coll.walls[5], 'W1'));
            result.push(createMockProjectItem(++projectItemId, coll.bottomTrims[6], 'B1'));

            result.push(createMockProjectItem(++projectItemId, coll.topTrims[2], 'T2'));
            result.push(createMockProjectItem(++projectItemId, coll.walls[4], 'W2'));
            result.push(createMockProjectItem(++projectItemId, coll.bottomTrims[6], 'B2'));

            result.push(createMockProjectItem(++projectItemId, coll.topTrims[2], ''));
            result.push(createMockProjectItem(++projectItemId, coll.bottomTrims[6], ''));

            return result;
        }

        function createMockProjectItem(projectItemId, product, previewLocation) {
            var result = {
                projectItemId: projectItemId,
                previewLocation: previewLocation,

                productId: product.productId,
                productType: product.productType,

                color: 'tan',
                height: 4,
                width: 20,

                quantity: 1,
                unitPrice: productId * 100
            };
            return result;
        }


        function getMyCollections() {
            if( myCollections) {
                return myCollections;
            }
            productId = 0;
            var result = [];
            for( var id=1; id<=3; id++) {
                result.push( createMockCollection(id));
            }
            myCollections = result;
            return result;
        }

        function createMockCollection(id) {
            var result = {
                collectionId: id,
                name: 'Collection ' + id,
                ceelings: createMockProducts('C', id),
                topTrims: createMockProducts('T', id),
                walls: createMockProducts('W', id),
                bottomTrims: createMockProducts('B', id)
            };
            return result;
        }

        function createMockProducts(productType, collectionId) {
            var result = [];
            for (var id = 1; id <= 10; id++) {
                productId++
                var productCode = collectionId + "-" + productId + "-" + productType;
                var productName = 'Product ' + productId + productType;
                result.push(createMockProduct(productId, productCode, productName, productType));
            }
            return result;
        }

        function createMockProduct(productId, productCode, productName, productType) {
            var result = {
                productId: productId,
                code: productCode,
                name: productName,
                productType: productType
            };
            return result;
        }

    }]);
