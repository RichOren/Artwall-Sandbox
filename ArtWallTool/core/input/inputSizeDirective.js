/**
 * Created by awyss on 6/8/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.directive('inputSize', [
        function() {

        return {
            restrict: 'E',
            require: 'ngModel',
            replace: true,
            scope: {
                ngModel: '=',
                noInch: '='
            },
            link: link,
            template:
                '<div>' +
                '<input type="number" class="input-ft" style="width:45px; text-align: right" ng-blur="onFeetBlur()" min="0"/>' +
                'ft ' +
                '<span ng-hide="noInch">' +
                '<input type="number" class="input-in" style="width:35px; text-align: right" ng-blur="onInchBlur()" min="-1" max="12"/>' +
                '<select>' +
                '<option value="0"></option>' +
                '<option value="1">1&#47;8</option>' +
                '<option value="2">1&#47;4</option>' +
                '<option value="3">3&#47;8</option>' +
                '<option value="4">1&#47;2</option>' +
                '<option value="5">5&#47;8</option>' +
                '<option value="6">3&#47;4</option>' +
                '<option value="7">7&#47;8</option>' +
                '</select>' +
                'in' +
                '</span>' +
                '</div>'
        };

        function link($scope, $element, $attrs, ngModelController) {
            init();

            function init() {
                getFeetInput().on('change', onFeetChange);
                getInchInput().on('change', onInchChange);
                getEightsInput().on('change', onEightsChange);
            }

            ngModelController.$render = function() {
                console.log('ngModelController.$render');
                var val = ngModelController.$modelValue;
                var eights = val % 8;
                val = Math.floor(val / 8);
                var inch = val % 12;
                var feet = Math.floor(val / 12);
                getFeetInput().val(feet);
                getInchInput().val(inch);
                getEightsInput().val(eights);
                // update the validation status
                checkValidity();
            };

            // when model change, cast to integer
            ngModelController.$formatters.push(function(value) {
                console.log('ModelChange::::' + parseInt(value, 10));
                return parseInt(value, 10);
            });

            // when view change, cast to integer
            ngModelController.$parsers.push(function(value) {
                console.log('ViewChange::::' + parseInt(value, 10));
                return parseInt(value, 10);
            });

            function checkValidity() {
//                // check if min/max defined to check validity
//                var valid = !($scope.isOverMin(true) || $scope.isOverMax(true));
//                // set our model validity
//                // the outOfBounds is an arbitrary key for the error.
//                // will be used to generate the CSS class names for the errors
//                ngModelController.$setValidity('outOfBounds', valid);
            }

//            function updateModel(offset) {
//                // update the model, call $parsers pipeline...
//                ngModelController.$setViewValue(ngModelController.$viewValue + offset);
//                // update the local view
//                ngModelController.$render();
//            }

            function onFeetChange() {
                console.log('onFeetChange');
                updateModel(true);

            }
            function onInchChange() {
                console.log('onInchChange');
                updateModel(true);
            }
            function onEightsChange() {
                console.log('onEightsChange');
                updateModel(true);
            }

            $scope.onFeetBlur = function() {
                console.log('onFeetBlur');
                updateModel();
            };
            $scope.onInchBlur = function() {
                console.log('onFeetBlur');
                updateModel();
            };

//            $scope.onBlurFunc = function(isInch) {
//                console.log('onBlurFunc', isInch);
//                var newVal = parseInt($element.find('input').val(), 10);
//                // update the model, call $parsers pipeline...
//                ngModelController.$setViewValue(newVal);
//                // update the local view
//                ngModelController.$render();
//            };

            function updateModel(doApply) {
                var newFeet = parseInt(getFeetInput().val(), 10);
                var newInch = parseInt(getInchInput().val(), 10);
                var newEights = parseInt(getEightsInput().val(), 10);
                if( isNaN(newFeet) ) {
                    newFeet = 0;
                }
                if( isNaN(newInch) ) {
                    newInch = 0;
                }
                if( isNaN(newEights) ) {
                    newEights = 0;
                }
                var newVal = (newFeet * 12 + newInch) * 8 + newEights;
                // update the model, call $parsers pipeline...
                ngModelController.$setViewValue(newVal);
                // update the local view
                ngModelController.$render();
                if(doApply) {
                    $scope.$apply();
                }
            }

            function getFeetInput(){
                return $element.find('input.input-ft');
            }
            function getInchInput(){
                return $element.find('input.input-in');
            }
            function getEightsInput(){
                return $element.find('select');
            }


            // check validity on start, in case we're directly out of bounds
            checkValidity();

//            // watch out min/max and recheck validity when they change
//            $scope.$watch('min+max', function() {
//                checkValidity();
//            });


        }

    }]);

});
