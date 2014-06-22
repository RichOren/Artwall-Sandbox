/**
 * Created by awyss on 6/7/14.
 */
angular.module("artwalltool", [])
    .controller("MainCtrl", ['$scope', '$window', 'dataService', function($scope, $window, dataService) {

        $scope.model = {};

        $scope.win = {
            width: $window.innerWidth,
            height: $window.innerHeight
        };

        angular.element($window).on('resize', function() {
            $scope.win.width = window.innerWidth;
            $scope.win.height = window.innerHeight;
            $scope.$apply();
        });


        $scope.model.projectName = "My Project";
        $scope.model.projectItems = [];

        function activate(){
            var projectId = 1;
            $scope.model.projectItems = dataService.getProjectItems(projectId);
        }
        activate();

        function isProjectItem(obj) {
            return obj.hasOwnProperty('projectItemId');
        }

        $scope.canDrop = function(data, targetUid) {
            var result = false;
            if (!targetUid && isProjectItem(data)) {
                result = true;
            }
            else {
                var productType = targetUid.substr(0, 1);
                result = (productType == data.productType);
                if( result ) {
                    var item = $scope.getProjectItemAtLocation(targetUid);
                    if( data === item ) {
                        console.log('target is source!');
                        result = false;
                    }
                }
            }
            console.log('canDrop', result, productType, data);
            return result;
        };

        $scope.onDrop = function(data, targetUid) {
            console.log('onDrop |' + targetUid + "|", data);
            if (targetUid == '' && isProjectItem(data)) {
                $scope.removeProjectItem(data);
            }
            else {
                if (isProjectItem(data)) {
                    console.log('projectItemId', data.productId);
                    var item = $scope.getProjectItemAtLocation(targetUid);
                    if( item === data ) {
                        console.log('target is source!');
                        return;
                    }
                    if( item ) {
                        //swap location
                        item.previewLocation = data.previewLocation;
                    }
                    data.previewLocation = targetUid;
                }
                else {
                    $scope.removeProjectItemAtLocation(targetUid);
                    $scope.addProductAtLocation(data, targetUid);
                }
            }
            $scope.$apply();
        };



        $scope.getProjectItemAtLocation = function(previewLocation){
            var result = null;
            var items = $scope.model.projectItems;
            for(var i=0; i<items.length; i++) {
                var item = items[i];
                if( item.previewLocation == previewLocation ) {
                    result = item;
                    break;
                }
            }
            return result;
        };

        $scope.removeProjectItemAtLocation = function(previewLocation){
            console.log('removeCartItemAt', previewLocation);
            var result = null;
            var items = $scope.model.projectItems;
            for(var i=0; i<items.length; i++) {
                var item = items[i];
                if( item.previewLocation == previewLocation ) {
                    result = item;
                    $scope.model.projectItems.splice(i, 1);
                    break;
                }
            }
            return result;
        };

        $scope.removeProjectItem = function(itemToDelete){
            var result = null;
            var items = $scope.model.projectItems;
            for(var i=0; i<items.length; i++) {
                var item = items[i];
                if( item.projectItemId == itemToDelete.projectItemId ) {
                    result = item;
                    $scope.model.projectItems.splice(i, 1);
                    break;
                }
            }
            return result;
        };

        $scope.addProductAtLocation = function(product, previewLocation){
            var item = {
                projectItemId: -(new Date().getTime()),
                previewLocation: previewLocation,

                productId: product.productId,
                productType: product.productType,
                productImage: product.productImage,

                color: 'tan',
                height: 4,
                width: 20,

                quantity: 1,
                unitPrice: product.productId * 100
            };
            $scope.model.projectItems.push(item);
        };

        $scope.getImageFor = function(previewLocation){
            var result = "";
            var pi = $scope.getProjectItemAtLocation(previewLocation);
            if( pi && pi.productImage) {
                result = "./images/" + pi.productImage + ".jpg";
            }
//            console.log("getImageFor", previewLocation, result);
            return result;
        };

        $scope.getCartItemAt = function(previewLocation){
            return $scope.getProjectItemAtLocation(previewLocation);
        };

    }]);
