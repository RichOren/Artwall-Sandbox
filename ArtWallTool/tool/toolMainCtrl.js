/**
 * Created by awyss on 7/23/14.
 */
define([
    'angular',
    'app',
    'jquery'
],
function (angular, app, $) {
    'use strict';

    app.controller('toolMainCtrl', [
    '$scope', '$window', 'dataService', 'unit',
    function($scope, $window, dataService, unit) {

        $scope.win = {
            width: $window.innerWidth,
            height: $window.innerHeight
        };

        $scope.room = {
            widthFt: 14,
            width: 14 * unit.feet,
            heightFt: 8,
            height: 8 * unit.feet,
            depthFt: 12,
            depth: 12 * unit.feet,
            distanceFt: 22,
            distance: 22 * unit.feet
        };

        $scope.model = {
            projectName: "My Project",
            projectItems: [],

            artC: null,
            artW1: null,
            artW2: null,
            artW3: null,
            artSelected: null
        };

        $scope.canDrop = canDrop;
        $scope.onDrop = onDrop;

        var ctrl = {
            setWidth: setWidth,
            setHeight: setHeight,
            setDepth: setDepth,
            setDistance: setDistance,

            getProjectItemAtLocation: getProjectItemAtLocation,
            removeProjectItemAtLocation: removeProjectItemAtLocation,
            removeProjectItem: removeProjectItem,
            addProductAtLocation: addProductAtLocation,
            getImageFor: getImageFor,
            getCartItemAt: getCartItemAt,
            selectArt: selectArt,
            isArtSelected: isArtSelected
        };

        init();

        return ctrl;

        function init() {
            angular.element($window).on('resize', function() {
                $scope.win.width = window.innerWidth;
                $scope.win.height = window.innerHeight;
                $scope.$apply();
            });

//            $scope.$watch('model.projectItems', function(){
//                updateDisplayedArts();
//            });

            var projectId = 1;
            $scope.model.projectItems = dataService.getProjectItems(projectId);
            updateDisplayedArts();
        }

        function setWidth(val) {
            if (val) {
                $scope.room.width = val * unit.feet;
            }
        }
        function setHeight(val) {
            if (val) {
                $scope.room.height = val * unit.feet;
            }
        }
        function setDepth(val) {
            if (val) {
                $scope.room.depth = val * unit.feet;
            }
        }
        function setDistance(val) {
            if (val) {
                $scope.room.distance = val * unit.feet;
            }
        }


        function isProjectItem(obj) {
            return obj && obj.hasOwnProperty('projectItemId');
        }

        function isProduct(obj) {
            return obj && obj.hasOwnProperty('className') && obj.className == 'product';
        }

        function canDrop(data, targetUid) {
            var result = false;
            var productType;
            if (!targetUid && isProjectItem(data)) {
                result = true;
            }
            else if(data) {
                productType = targetUid.substr(0, 1);
                result = (productType == data.productType);
                if( result ) {
                    var item = ctrl.getProjectItemAtLocation(targetUid);
                    if( data === item ) {
                        console.log('target is source!');
                        result = false;
                    }
                }
            }
            console.log('canDrop', result, productType, data);
            return result;
        }

        function onDrop(data, targetUid) {
            console.log('onDrop |' + targetUid + "|", data);
            if (targetUid == '' && isProjectItem(data)) {
                ctrl.removeProjectItem(data);
                $scope.$apply();
            }
            else {
                if (isProjectItem(data)) {
                    console.log('projectItemId', data.productId);
                    var item = ctrl.getProjectItemAtLocation(targetUid);
                    if( item === data ) {
                        console.log('target is source!');
                        return;
                    }
                    if( item ) {
                        //swap location
                        item.previewLocation = data.previewLocation;
                    }
                    data.previewLocation = targetUid;
                    $scope.$apply();
                }
                else if( isProduct(data) ) {
                    ctrl.removeProjectItemAtLocation(targetUid);
                    ctrl.addProductAtLocation(data, targetUid);
                    $scope.$apply();
                }
            }
        }

        function updateDisplayedArts() {
            $scope.model.artC = null;
            $scope.model.artW1 = null;
            $scope.model.artW2 = null;
            $scope.model.artW3 = null;
            var foundSelected = false;
            var items = $scope.model.projectItems;
            for(var i=0; i<items.length; i++) {
                var item = items[i];
                switch(item.previewLocation) {
                    case 'C':
                        $scope.model.artC = item;
                        if( !foundSelected && $scope.model.artSelected === item ) {
                            foundSelected = true;
                        }
                    break;
                    case 'W1':
                        $scope.model.artW1 = item;
                        if( !foundSelected && $scope.model.artSelected === item ) {
                            foundSelected = true;
                        }
                    break;
                    case 'W2':
                        $scope.model.artW2 = item;
                        if( !foundSelected && $scope.model.artSelected === item ) {
                            foundSelected = true;
                        }
                    break;
                    case 'W3':
                        $scope.model.artW3 = item;
                        if( !foundSelected && $scope.model.artSelected === item ) {
                            foundSelected = true;
                        }
                    break;
                }
            }
            if( !foundSelected ) {
                $scope.model.artSelected = null;
            }
        }

        function selectArt(art) {
            if( $scope.model.artSelected === art) {
                $scope.model.artSelected = null;
            }
            else {
                $scope.model.artSelected = art;
            }
        }

        function isArtSelected(art) {
            return art && art === $scope.model.artSelected;
        }

        function getProjectItemAtLocation(previewLocation) {
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
        }

        function removeProjectItemAtLocation(previewLocation){
            console.log('removeCartItemAt', previewLocation);
            var result = null;
            var items = $scope.model.projectItems;
            for(var i=0; i<items.length; i++) {
                var item = items[i];
                if( item.previewLocation == previewLocation ) {
                    result = item;
                    $scope.model.projectItems.splice(i, 1);
                    updateDisplayedArts();
                    break;
                }
            }
            return result;
        }

        function removeProjectItem(itemToDelete){
            var result = null;
            var items = $scope.model.projectItems;
            for(var i=0; i<items.length; i++) {
                var item = items[i];
                if( item.projectItemId == itemToDelete.projectItemId ) {
                    result = item;
                    $scope.model.projectItems.splice(i, 1);
                    updateDisplayedArts();
                    break;
                }
            }
            return result;
        }

        function addProductAtLocation(product, previewLocation){
            var item = {
                projectItemId: -(new Date().getTime()),
                previewLocation: previewLocation,

                productId: product.productId,
                productType: product.productType,
                productImage: product.productImage,

                art: {
                    original: {
                        width: product.origInchWidth * unit.inch,
                        height: product.origInchHeight * unit.inch
                    },
                    position: {
                        left: 1*unit.feet,
                        top: 1*unit.feet
                    },
                    size: {
                        width: 8*unit.feet,
                        height: 4*unit.feet
                    },
                    clip: {
                        left: 0.2,
                        top: 0.2
                    },
                    zoom:0.8
                },



                color: 'tan',
                height: 4,
                width: 20,

                quantity: 1,
                unitPrice: product.productId * 100
            };
            $scope.model.projectItems.push(item);
            updateDisplayedArts();
        }

        function getImageFor(previewLocation){
            var result = "";
            var pi = ctrl.getProjectItemAtLocation(previewLocation);
            if( pi && pi.productImage) {
                result = "./images/" + pi.productImage + ".jpg";
            }
//            console.log("getImageFor", previewLocation, result);
            return result;
        };

        function getCartItemAt(previewLocation){
            return ctrl.getProjectItemAtLocation(previewLocation);
        }

    }]);

});