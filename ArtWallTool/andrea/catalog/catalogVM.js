/**
 * Created by awyss on 1/11/15.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.service('catalogVM', [
    '$rootScope', 'catalogModel',
    function($rootScope, catalogModel) {

        var vm = {
            catalog: catalogModel,

            isCatalogVisible: false,
            toggleCatalog: toggleCatalog,

            selectedCategory: null,
            onCategoryChange: onCategoryChange,

            selectedCollection: null,
            onCollectionChange: onCollectionChange,

            selectedProductType: null,
            selectType: selectType,

            selectedProduct: null,
            isProductSelected: isProductSelected,
            selectProduct: selectProduct,

            plane: null
        };
        init();

        $rootScope.catalogVM = vm;
        return vm;

        function init(){
            var plane = {
                width: 300,
                height: 200,

                background: null,

                border: null,
                borderCorner: null,
                borderCenter: null,
                borderMiddle: null,
            };


        }


        function toggleCatalog() {
            vm.isCatalogVisible = !vm.isCatalogVisible;
        }

        function onCategoryChange() {
            console.log(vm.selectedCategory);
        }

        function onCollectionChange() {
            console.log(vm.selectedCollection);
        }

        function selectType(type) {
            vm.selectedProductType = type;
            vm.selectedProduct = null;
        }

        function selectProduct(product) {
            if (isProductSelected(product)){
                vm.selectedProduct = null;
            }
            else {
                vm.selectedProduct = product;
            }
        }

        function isProductSelected(product) {
            return (product === vm.selectedProduct);
        }


    }]);
});