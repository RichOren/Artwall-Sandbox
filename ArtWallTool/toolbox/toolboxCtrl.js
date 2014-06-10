/**
 * Created by awyss on 6/8/14.
 */
angular.module("artwalltool")
    .controller("ToolboxCtrl", ['$scope', 'dataService', function($scope, dataService) {

        $scope.myColls = [];
        $scope.typeSelected = 'W';
        $scope.collSelected = {
            ceelings: [],
            topTrims: [],
            walls: [],
            bottomTrims: []
        };

        $scope.selectType = function(type){
            $scope.typeSelected = ($scope.typeSelected == type)
                ? null
                : $scope.typeSelected = type;
        };

        function activate(){
            $scope.myColls = dataService.getMyCollections();
            $scope.collSelected = $scope.myColls[0];
        }
        activate();

    }]);
