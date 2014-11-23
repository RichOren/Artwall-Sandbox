/**
 * Created by awyss on 10/5/14.
 */
define([
    'app'

], function (app) {
    'use strict';

    app.factory('popupMenuService', [
        '$rootScope', '$document',
        function($rootScope, $document) {

            var svc = {
                open: open
            };

            var doc = $document[0].documentElement;
            var menuElement;
            var menuRect = {
                left:0,
                top:0,
                width:0,
                height:0
            };

            return svc;

            function close(doApply) {
                if(menuElement) {
                    menuElement.removeClass('open');
                    menuElement = null;
                    capture(false);
                }
                if(doApply){
                    $rootScope.$apply();
                }
            }

            function open(event, menuElementParam) {
                close(false);
                menuElement = menuElementParam;
                menuElement.addClass('open');

                //var doc = $document[0].documentElement;
                var docLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
                    docTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
                    elementWidth = menuElement[0].scrollWidth,
                    elementHeight = menuElement[0].scrollHeight;

                var docWidth = doc.clientWidth + docLeft,
                    docHeight = doc.clientHeight + docTop,
                    totalWidth = elementWidth + event.pageX,
                    totalHeight = elementHeight + event.pageY,
                    left = Math.max(event.pageX - docLeft, 0),
                    top = Math.max(event.pageY - docTop, 0);

                if (totalWidth > docWidth) {
                    left = left - (totalWidth - docWidth);
                }
                if (totalHeight > docHeight) {
                    top = top - (totalHeight - docHeight);
                }

                menuElement.css('top', top + 'px');
                menuElement.css('left', left + 'px');

                menuRect.left = left + docLeft;
                menuRect.top = top + docTop;
                menuRect.width = elementWidth;
                menuRect.height = elementHeight;

                $rootScope.$apply();

                capture(true);
                cancelNextDocClick();
            }

            function capture(isCapture){
                if( isCapture) {
                    doc.addEventListener('keydown', onDocBeforeKeyDown, true);
                    doc.addEventListener('mousedown', onDocBeforeMouseDown, true);
                }
                else {
                    doc.removeEventListener('keydown', onDocBeforeKeyDown, true);
                    doc.removeEventListener('mousedown', onDocBeforeMouseDown, true);
                }
            }

            function isPointerOnMenu(event) {
                var hit = (
                    event.pageX > menuRect.left &&
                    event.pageX <= (menuRect.left + menuRect.width) &&
                    event.pageY > menuRect.top &&
                    event.pageY <= (menuRect.top + menuRect.height)
                );
//                console.log('isPointerOnMenu', hit, menuRect, event.pageX, event.pageY);
                return hit;
            }

            function onDocBeforeKeyDown(event) {
                if (!menuElement) return;
                if (event.keyCode === 27) {
                    event.preventDefault();
                    event.stopPropagation();
                    close(true);
                }
            }
            function onDocBeforeMouseDown(event) {
                if (!menuElement) return;
//                console.log('onDocBeforeMouseDown');
                if (isPointerOnMenu(event)) {
                    //close menu after item is clicked
                    doc.addEventListener('click', onDocClick);
                }
                else{
                    //down outside menu
                    event.preventDefault();
                    event.stopPropagation();
                    doc.addEventListener('mouseup', onDocBeforeMouseUp, true);
                    cancelNextDocClick();
                    close(true);
                }
            }

            function onDocClick(event) {
                doc.removeEventListener('click', onDocClick);
                if (isPointerOnMenu(event)) {
                    close(true);
                }
            }

            function onDocBeforeMouseUp(event) {
                doc.removeEventListener('mouseup', onDocBeforeMouseUp, true);
                event.preventDefault();
                event.stopPropagation();
            }


            function cancelNextDocClick(){
                doc.addEventListener('click', onDocBeforeClick, true);
            }
            function onDocBeforeClick(event) {
                doc.removeEventListener('click', onDocBeforeClick, true);
//                console.log('cancellingDocClick');
                event.preventDefault();
                event.stopPropagation();
            }

        }
    ]);

    app.directive('popupMenu', [
        'popupMenuService', 'mouseService',
        function(popupMenuService, mouseService) {

            return {
                restrict: 'A',
                link: link
            };

            function link($scope, $element, $attrs, ctrl, transcludeFn) {

                var downEvent = null;

                $element.on('mousedown', function(event) {
                    if( event.button == 0 ) {
                        downEvent = event;
                        mouseService.trackLongPress($element, event, onLongPressCallback);
                    }
                });

                function onLongPressCallback() {
                    var menuElement = angular.element(document.getElementById($attrs.popupMenu));
                    popupMenuService.open(downEvent, menuElement);
                }

            }

        }]);

});
