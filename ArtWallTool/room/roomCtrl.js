/**
 * Created by awyss on 6/8/14.
 */
angular.module("artwalltool")
    .controller("RoomCtrl", ['$scope', function($scope) {

        var ctrl = this;

        var roomHeight = 120;
        var roomWidth = 300;
        var roomDepth = 200;

        ctrl.frontWall = {
            w: roomWidth,
            h: roomHeight
        };
        ctrl.leftWall = {
            w: roomDepth,
            h: roomHeight
        };
        ctrl.rightWall = {
            w: roomDepth,
            h: roomHeight
        };
        ctrl.ceeling = {
            w: roomWidth,
            h: roomDepth
        };
        ctrl.floor = {
            w: roomWidth,
            h: roomDepth
        };



    }]);
