/**
 * Created by awyss on 6/8/14.
 */
angular.module("artwalltool")
    .directive("toolbox", [function() {

        return {
            restrict: "E",
            replace: true,
            templateUrl: "toolbox/toolbox.html"
        }


    }]);
