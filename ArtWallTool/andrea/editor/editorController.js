/**
 * Created by awyss on 9/14/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.controller('editorController', [
    'selectService',
    function(selectService) {
        var ctrl = {
            item: null
        };

        init();

        return ctrl;

        function init() {
            var item = selectService.getSelectedItem();
            if( item && item.art ) {
                var art = item.art;
                if( art.clipX1 === undefined) art.clipX1 = 0;
                if( art.clipY1 === undefined) art.clipY1 = 0;
                if( art.clipX2 === undefined) art.clipX2 = 100;
            }
            ctrl.item = item;

//            //test data
//            ctrl.item = {
//                width: 9004, //mm
//                height: 3375, //mm
//                maxZoom: 150,
//                art: {
//                    url: './images/A023-copy.jpg',
//    //                naturalWidth: 400,
//    //                naturalHeight: 300,
//    //                formFactor: 4/3,
//    //                zoom: undefined,
//                    clipX1: 7,
//                    clipY1: 7,
//                    clipX2: 93
//                }
//            };


//            var art = selectService.getSelectedItem();
//            if( art ) {
//                if( art.clipX1 === undefined) art.clipX1 = 0;
//                if( art.clipY1 === undefined) art.clipY1 = 0;
//                if( art.clipX2 === undefined) art.clipX2 = 100;
//            }
//            ctrl.art = art;

            //test data
//            ctrl.art = {
//                url: './images/A023-copy.jpg',
////                naturalWidth: 400,
////                naturalHeight: 300,
////                formFactor: 4/3,
////                zoom: undefined,
//                clipX1: 7,
//                clipY1: 7,
//                clipX2: 93
//            };
        }

    }]);

});