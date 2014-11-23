/**
 * Created by awyss on 10/12/14.
 */
define([
    'app'
],
function (app) {
    'use strict';

    app.service('mouseService', [
    function() {

        var svc = {
            trackMove: trackMove,
            trackLongPress: trackLongPress
        };

        var downElement = null;
        var moveCallback = null;
        var longPressCallback = null;

        var longPressId = 0;
        var longPressTime = 600;

        var downX = NaN;
        var downY = NaN;
        var threshold = 4;
        var isMoving = false;

        return svc;

        function stopTracking() {
            downElement = null;
            downX = NaN;
            downY = NaN;
            isMoving = false;
            clearMove();
            clearLongPress();
        }

        //callback returns move distance
        function trackMove(element, mouseDownEvent, callback) {
            onMouseDown(element, mouseDownEvent);
            moveCallback = callback;
        }
        //callback returns true when long press occurs
        function trackLongPress(element, mouseDownEvent, callback) {
            onMouseDown(element, mouseDownEvent);
            longPressCallback = callback;
        }

        function onMouseDown(element, event) {
            logMouseEvent(event);
            if( downElement != element ) {
                downElement = element;
                moveCallback = null;
                longPressCallback = null;

                isMoving = false;
                downX = event.clientX;
                downY = event.clientY;

                //capture
                document.addEventListener('mousemove', onDocMouseMove, true);
                document.addEventListener('mouseup', onDocMouseUp, true);
                clearLongPress();
                longPressId = window.setTimeout(onLongPress, longPressTime);
            }
        }

        function onLongPress() {
            if(longPressId) {
                longPressId = 0;
                if(longPressCallback) {
                    longPressCallback();
                    longPressCallback = null;
                }
            }
            stopTracking();
        }

        function clearLongPress() {
            if(longPressId) {
                window.clearTimeout(longPressId);
                longPressId = 0;
            }
            longPressCallback = null;
        }

        function clearMove() {
            if(moveCallback) {
                moveCallback();
                moveCallback = null;
            }
        }

        function onDocMouseMove(event) {
            logMouseEvent(event);
            if(!isMoving) {
                if (Math.abs(downX - event.clientX) > threshold || Math.abs(downX - event.clientX) > threshold) {
                    isMoving = true;
                    clearLongPress();
                }
            }
            if(isMoving) {
                event.stopImmediatePropagation();
                if( moveCallback) {
                    moveCallback({
                        x: (event.clientX - downX),
                        y: (event.clientY - downY)
                    });
                }
            }
        }

        function onDocMouseUp(event) {
            logMouseEvent(event);
            event.stopImmediatePropagation();
            //release
            document.removeEventListener('mousemove', onDocMouseMove, true);
            document.removeEventListener('mouseup', onDocMouseUp, true);
            stopTracking();
        }

        function logMouseEvent(event){
//            console.log('mouseService.' + event.type, event.clientX, event.clientY);
        }

    }]);

});