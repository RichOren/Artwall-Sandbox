/**
 * Created by awyss on 6/8/14.
 */
angular.module("artwalltool")
    .controller("ToolboxCtrl", ['$scope', 'dataService', function($scope, dataService) {

        $scope.myColls = [];
        $scope.typeSelected = 'C';
        $scope.collSelected = {
            ceelings: [],
            topTrims: [],
            walls: [],
            bottomTrims: []
        };

        $scope.selectType = function(type){
            if( $scope.typeSelected != type) {
                $scope.typeSelected = type;
            }
        };

        function activate(){
            $scope.myColls = dataService.getMyCollections();
            $scope.collSelected = $scope.myColls[0];
        }
        activate();

        $scope.getImageUrl = function(productImage){
            return "./images/" + productImage + ".jpg";
        }

    }]);
