/**
 * Created by awyss on 6/8/14.
 */
angular.module("artwalltool")
    .directive("projectHeader", [function() {

        return {
            restrict: "E",
            replace: true,
            templateUrl: "project/project-header.html"
        }


    }]);
