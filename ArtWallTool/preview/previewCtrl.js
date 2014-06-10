/**
 * Created by awyss on 6/8/14.
 */
angular.module("artwalltool")
    .controller("PreviewCtrl", ['$scope', 'dataService', function($scope, dataService) {


        $scope.getItem = function(previewLocation) {
            return $scope.getProjectItemAtLocation(previewLocation);
        };


    }]);
