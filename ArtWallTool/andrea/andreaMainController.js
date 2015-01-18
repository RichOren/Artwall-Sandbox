/**
 * Created by awyss on 7/23/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.controller('andreaMainController', [
    '$rootScope', '$scope', '$location', 'selectService', 'roomModel', 'catalogVM',
    function($rootScope, $scope, $location, selectService, roomModel, catalogVM) {

        $scope.root = $rootScope;

        $rootScope.lowResReductionPercent = 8.3333333;
        $rootScope.minPrintDPI = 72;
        $rootScope.scale = 24;

        $rootScope.format = createFormat();


        $rootScope.px = function(mm) {
            return mm / 2;
        };

        $rootScope.mm = function(px) {
            return px * 2;
        };

        $rootScope.maxLenghtMM = function(lowResArtNaturalLength){
            return lowResArtNaturalLength / $rootScope.lowResReductionPercent * 100 / $rootScope.minPrintDPI * 25.4;
        };

        $rootScope.maxArtSizePx = function(art){
            var result;
            if( art && art.naturalWidth) {
                result = {
                    width: $rootScope.px($rootScope.maxLenghtMM(art.naturalWidth)),
                    height: $rootScope.px($rootScope.maxLenghtMM(art.naturalHeight))
                }
            }
            //todo: gets called a lot
            //console.log('maxArtSizePx', result);
            return result;
        };

        var mainCtrl = {
            selectedView: null,
            onViewChange: onViewChange,
            isWallView: false,
            isCeilingView: false,

            toggleCatalog: toggleCatalog,

            cropItem: null, //for crop panel
            closeCropPanel: closeCropPanel,

            showSpec: showSpec,
            resizeArt: resizeArt,
            cropAndZoom: cropAndZoom,
            duplicate: duplicate,
            remove: remove,

            item: null, //for spec dialog
            formatType: formatType,
            isHeightAdjustable: isHeightAdjustable,
            isItemResizable: isItemResizable,
            getSelectedItemMaxHeightPx: getSelectedItemMaxHeightPx,
            getSelectedItemMaxWidthPx: getSelectedItemMaxWidthPx,
            closeSizePanel: closeSizePanel,

            applyProduct: applyProduct
        };
        var VIEW_3D = '3d';
        var VIEW_CEILING = 'ceiling';
        var VIEW_WALL = 'wall';

        init();

        return mainCtrl;


        function init() {
            $scope.$on("$routeChangeSuccess", function () {
                updateViewSelected();
            });
            updateViewSelected();
        }

        function updateViewSelected() {
            var path = $location.path();
            var search = $location.search();
            mainCtrl.isCeilingView = false;
            mainCtrl.isWallView = false;
            switch(path) {
                case '/3d':
                    mainCtrl.selectedView = '3d';
                    break;
                case '/ceiling':
                    mainCtrl.isCeilingView = true;
                    mainCtrl.selectedView = 'ceiling';
                    break;
                case '/wall':
                    mainCtrl.isWallView = true;
                    mainCtrl.selectedView = search.side;
                    break;
            }
            console.log('updateViewSelected', path, search);
        }

        function onViewChange() {
            console.log('onViewChange', mainCtrl.selectedView);
            if( mainCtrl.selectedView == VIEW_3D) {
                $location.path('/3d').search('side', null);
            }
            else if( mainCtrl.selectedView == VIEW_CEILING) {
                $location.path('/ceiling').search('side', null);
            }
            else {
                $location.path('/wall').search('side', mainCtrl.selectedView);
            }
        }

        function toggleCatalog() {
            catalogVM.toggleCatalog();
        }


        function showSpec() {
            mainCtrl.item = selectService.getSelectedItem();
            if( mainCtrl.item) {
                $scope.specModal.open();
            }
        }

        function resizeArt() {
            var item = selectService.getSelectedItem();
            if( item && item.art ) {
            }
        }

        function cropAndZoom() {
            var item = selectService.getSelectedItem();
            if( item && item.art ) {
                var art = item.art;
                if( art.clipX1 === undefined) art.clipX1 = 0;
                if( art.clipY1 === undefined) art.clipY1 = 0;
                if( art.clipX2 === undefined) art.clipX2 = 100;
                mainCtrl.cropItem = item;
            }
        }

        function closeCropPanel() {
            mainCtrl.cropItem = null;
        }

        function duplicate() {
            var item = selectService.getSelectedItem();
            if( item && item.art && item.type == 'f' ) {
                var clone = angular.copy(item);
                clone.top += clone.height;
                roomModel.ceiling.floatItems.push(clone);
                selectService.select(clone);
            }
        }

        function remove() {
            var item = selectService.getSelectedItem();
            removeItem(item);
        }

        function removeItem(item) {
            if( item ){
                if( item.type == 'f') {
                    var floatItems = $rootScope.selectedPlane.floatItems;
                    var index = floatItems.indexOf(item);
                    floatItems.splice(index, 1);
                    selectService.select(null);
                }
                else if( item.art ) {
                    item.art.url = '';
                    delete item.art.naturalWidth;
                    delete item.art.naturalHeight;
                    item.width = 0;
                    item.height = 0;
                }
            }
        }

        function applyProduct(product) {
            var isSingle = !!(product.url);
            if (isSingle) {
                if (mainCtrl.isWallView) {
                    applyProductToSelectedWall(product);
                }
                if (mainCtrl.isCeilingView) {
                    applyProductToCeiling(product);
                }
            }
            else {
                //Trim Set
                applyTrimSetToCeiling(product);
                applyTrimSetToWalls(product);
            }
            catalogVM.selectProduct(null);
        }

        function applyProductToSelectedWall(product) {
            if( mainCtrl.isWallView) {
                var plane = roomModel.getWall(mainCtrl.selectedView);
                applyProductToWall(product, plane);
            }
        }

        function applyProductToWall(product, plane) {
            var art = angular.copy(product);
            switch (catalogVM.selectedProductType) {
                case 'bg':
                    plane.background.art = art;
                    break;
                case 'tt':
                    plane.trimTop.art = art;
                    break;
                case 'tb':
                    plane.trimBottom.art = art;
                    break;
                case 'a':
                    plane.mainItem.width = plane.width;
                    plane.mainItem.height = plane.height;
                    plane.mainItem.art = art;
                    break;
            }
        }

        function applyProductToCeiling(product) {
            var plane = roomModel.ceiling;
            var art = angular.copy(product);

            switch (catalogVM.selectedProductType) {
                case 'bg':
                    removeItem(plane.background);
                    plane.background.art = art;
                    break;

                case 'm':
                    plane.medallion.art = art;
                    break;

                case 'f':
                    plane.floatItems.push({
                        type: 'f',
                        left: 250/2,
                        top: 250/2,
                        height: 500/2,
                        art: art
                    });
                    break;
            }
        }

        function applyTrimSetToCeiling(trimSet){
            var ceiling = roomModel.ceiling;
            for ( var productType in trimSet) {
                if (trimSet.hasOwnProperty(productType)) {
                    if( productType[0] != '$' && ceiling.hasOwnProperty(productType) ) {
                        ceiling[productType].art = angular.copy(trimSet[productType]);
                    }
                }
            }
        }

        function applyTrimSetToWalls(trimSet){
            if (trimSet.trimTop) {
                angular.forEach(roomModel.walls, function(wall) {
                    wall.trimTop.art = angular.copy(trimSet.trimTop);
                });
            }
            if (trimSet.trimTopCornerShort && trimSet.trimTopCorner) {
                roomModel.walls[0].trimTopCorner.art = angular.copy(trimSet.trimTopCornerShort);
                roomModel.walls[2].trimTopCorner.art = angular.copy(trimSet.trimTopCornerShort);
                roomModel.walls[1].trimTopCorner.art = angular.copy(trimSet.trimTopCorner);
                roomModel.walls[3].trimTopCorner.art = angular.copy(trimSet.trimTopCorner);
            }
            else if (trimSet.trimTopCorner) {
                angular.forEach(roomModel.walls, function(wall) {
                    wall.trimTopCorner.art = angular.copy(trimSet.trimTopCorner);
                });
            }
            if (trimSet.trimBottom) {
                angular.forEach(roomModel.walls, function(wall) {
                    wall.trimBottom.art = angular.copy(trimSet.trimBottom);
                });
            }
        }

        function formatType() {
            var item = selectService.getSelectedItem();
            if( item && item.type ) {
                switch (item.type) {
                    case 'bg': return 'Background';
                    case 'b': return 'Border';
                    case 'bc': return 'Border Corner';
                    case 'br': return 'Border Center';
                    case 'bm': return 'Border Middle';
                    case 'm': return 'Medallion';
                    case 'f': return 'Float Art';

                    case 'tt': return 'Top Trim';
                    case 'tc': return 'Corner Trim';
                    case 'tb': return 'Bottom Trim';
                    case 'a': return 'Main Art';
                }
            }
            return 'Unknown';
        }

        function isHeightAdjustable() {
            var item = selectService.getSelectedItem();
            if( item && item.type ) {
                switch (item.type) {
                    case 'm':
                    case 'f':
                        return true;
                }
            }
            return false;
        }

        function isItemResizable() {
            var item = selectService.getSelectedItem();
            if( item && item.type ) {
                switch (item.type) {
                    case 'a':
                        return true;
                }
            }
            return false;
        }

        function getSelectedItemMaxHeightPx() {
            var result = $rootScope.selectedPlane
                ? $rootScope.selectedPlane.height
                : 100;
            var item = selectService.getSelectedItem();
            if( item ) {
                var maxArtSizePx = $rootScope.maxArtSizePx(item.art);
                if(maxArtSizePx) {
                    result = Math.min(result, maxArtSizePx.height);
                }
            }
            return result;
        }

        function getSelectedItemMaxWidthPx() {
            var result = $rootScope.selectedPlane
                ? $rootScope.selectedPlane.width
                : 100;
            var item = selectService.getSelectedItem();
            if( item ) {
                var maxArtSizePx = $rootScope.maxArtSizePx(item.art);
                if(maxArtSizePx) {
                    result = Math.min(result, maxArtSizePx.width);
                }
            }
            return result;
        }

        function closeSizePanel(){
            selectService.select(null);
        }

    }]);


    function createFormat() {

        var format = {
            useMetric: true,
            size: size
        };
        return format;

        function size(mmValue) {
            if( format.useMetric ) {
                var cm = Math.round(mmValue / 10);
                return cm + 'cm';
            }
            else {
                var inches = mmValue / 25.4;
                //round to 1/4 of inch
                inches = Math.round(inches * 4);
                var quarters = inches % 4;
                inches = Math.floor(inches / 4);

                var feet = Math.floor(inches / 12);
                inches = inches % 12;

                var result = feet ? (feet+ "' ") : '';
                result += (inches ? inches : '');
                if( inches && quarters) {
                    result += ' ';
                }
                result += formatQuarter(quarters);
                if(inches || quarters) {
                    result += '"';
                }
                return result;
            }
        }

        function formatQuarter(quarters) {
            if( quarters == 2 ) return "1/2";
            return (quarters ? (quarters + '/4') : '');
        }


    }

});