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
            switch(path) {
                case '/wall':
                    mainCtrl.selectedView = search.side;
                    break;
                case '/ceiling':
                    mainCtrl.selectedView = 'ceiling';
                    break;
            }
            console.log('updateViewSelected', path, search);
        }

        function onViewChange() {
            console.log('onViewChange', mainCtrl.selectedView);
            if( mainCtrl.selectedView == 'ceiling') {
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
            var plane = roomModel.getWall(mainCtrl.selectedView);
            if (plane) {
                switch (catalogVM.selectedProductType) {
                    case 'bg':
                        delete plane.background.art.naturalWidth;
                        delete plane.background.art.naturalHeight;
                        plane.background.art.url = product.url;
                        break;
                    case 'tt':
                        delete plane.trimTop.art.naturalWidth;
                        delete plane.trimTop.art.naturalHeight;
                        plane.trimTop.art.url = product.url;
                        break;
                    case 'tb':
                        delete plane.trimBottom.art.naturalWidth;
                        delete plane.trimBottom.art.naturalHeight;
                        plane.trimBottom.art.url = product.url;
                        break;
                    case 'a':
                        delete plane.mainItem.art.naturalWidth;
                        delete plane.mainItem.art.naturalHeight;
                        plane.mainItem.art = {
                            url: product.url,
                            zoom: undefined,
                            clipX1: 0,
                            clipY1: 0,
                            clipX2: 100
                        };
                        break;
                }
            }
            else if(mainCtrl.selectedView === 'ceiling') {
                plane = roomModel.ceiling;
                switch (catalogVM.selectedProductType) {
                    case 'bg':
                        removeItem(plane.background);
                        plane.background.art.url = product.url;
                        break;

                    case 'm':
                        delete plane.medallion.art.naturalWidth;
                        delete plane.medallion.art.naturalHeight;
                        plane.medallion.art.url = product.url;
                        break;

                    case 'f':
                        plane.floatItems.push({
                            type: 'f',
                            left: 250/2,
                            top: 250/2,
                            height: 500/2,
                            art: {
                                url: product.url
                            }
                        });
                        break;
                }
            }
            catalogVM.selectProduct(null);
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