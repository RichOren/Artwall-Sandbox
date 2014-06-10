/**
 * Created by awyss on 6/8/14.
 */
angular.module("artwalltool")
    .directive("preview", [function() {

        return {
            restrict: "E",
            replace: true,
            templateUrl: "preview/preview.html"
        }


    }]);
