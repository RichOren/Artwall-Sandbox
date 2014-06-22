/**
 * Created by awyss on 6/8/14.
 */
angular.module("artwalltool")
    .directive("room", [function() {

        return {
            restrict: "E",
            replace: true,
            templateUrl: "room/room.html"
        }


    }]);
