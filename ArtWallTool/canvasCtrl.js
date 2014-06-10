/**
 * Created by awyss on 6/7/14.
 */
angular.module("artwalltool")
    .controller("CanvasCtrl", ['$scope', '$window', function($scope, $window) {

        var stage;
        var circle;

        function init() {
            stage = new createjs.Stage("canvas");
            update();
        }

        function update() {
            if(circle) {
                stage.removeChild(circle);
            }
            circle = new createjs.Shape();
            circle.graphics.beginFill("green").drawCircle(0, 0, 50);
            circle.x = 50;
            circle.y = 50;
            stage.addChild(circle);
            refresh();
        }

        function refresh() {
            stage.update();
        }
        init();

        function onResize() {
/*
            // browser viewport size
            var w = window.innerWidth - 20;
            var h = window.innerHeight - 20;

            // stage dimensions
            var ow = 640; // your stage width
            var oh = 480; // your stage height

            var keepAspectRatio = false;

            if (keepAspectRatio)
            {
                // keep aspect ratio
                var scale = Math.min(w / ow, h / oh);
                stage.scaleX = scale;
                stage.scaleY = scale;

                // adjust canvas size
                stage.canvas.width = ow * scale;
                stage.canvas.height = oh * scale;
            }
            else
            {
                // scale to exact fit
                stage.scaleX = w / ow;
                stage.scaleY = h / oh;

                // adjust canvas size
                stage.canvas.width = ow * stage.scaleX;
                stage.canvas.height = oh * stage.scaleY;
            }
*/

            // update the stage
            update();
        }
        //onResize();

        angular.element($window).on('resize', function() {
            onResize();
        });



    }]);

