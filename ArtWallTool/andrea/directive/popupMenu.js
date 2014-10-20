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

            var menuElement;
            var menuRect = {
                left:0,
                top:0,
                width:0,
                height:0
            };
            var cancelUp;
            var cancelClick;

            init();
            return svc;

            function init(){
                var doc = $document[0].documentElement;
                doc.addEventListener('keydown', onBeforeKeyDown, true);
                doc.addEventListener('mousedown', onBeforeMouseDown, true);
                doc.addEventListener('mouseup', onBeforeMouseUp, true);
                doc.addEventListener('click', onBeforeClick, true);
                doc.addEventListener('click', onClick);
            }

            function open(event, menuElementParam) {
                close();
                menuElement = menuElementParam;
                menuElement.addClass('open');

                var doc = $document[0].documentElement;
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
            }

            function close() {
                if(menuElement) {
                    menuElement.removeClass('open');
                    menuElement = null;
                }
            }

            function isPointerOnMenu(event) {
                var hit = (
                    event.pageX > menuRect.left &&
                    event.pageX <= (menuRect.left + menuRect.width) &&
                    event.pageY > menuRect.top &&
                    event.pageY <= (menuRect.top + menuRect.height)
                );
                console.log('isPointerOnMenu', hit, menuRect, event.pageX, event.pageY);
                return hit;
            }

            function onBeforeKeyDown(event) {
                if (menuElement && event.keyCode === 27) {
                    event.preventDefault();
                    event.stopPropagation();
                    close();
                    $rootScope.$apply();
                }
            }
            function onBeforeMouseDown(event) {
                if (menuElement && !isPointerOnMenu(event)) {
                    console.log('onBeforeMouseDown');
                    event.preventDefault();
                    event.stopPropagation();
                    cancelUp = true;
                    cancelClick = true;
                    close();
                    $rootScope.$apply();
                }
            }
            function onBeforeMouseUp(event) {
                if (cancelUp) {
                    console.log('onBeforeMouseUp');
                    cancelUp = false;
                    event.preventDefault();
                    event.stopPropagation();
                }

            }
            function onBeforeClick(event) {
                if (cancelClick) {
                    cancelClick = false;
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
            function onClick(event) {
                if (menuElement && isPointerOnMenu(event)) {
                    event.preventDefault();
                    event.stopPropagation();
                    close();
                    $rootScope.$apply();
                }
            }

        }
    ]);

    app.directive('popupMenu', [
        '$document', 'popupMenuService',
        function($document, popupMenuService) {

            return {
                restrict: 'A',
                link: link
            };

            function link($scope, $element, $attrs, ctrl, transcludeFn) {

                var downId = 0;
                var downEvent = null;

                function openMenu(event) {
                    var menuElement = angular.element(document.getElementById($attrs.popupMenu));
                    //var element = event.target;
                    popupMenuService.open(event, menuElement);
                }

                function clearDownId() {
                    if(downId) {
                        window.clearTimeout(downId);
                        downId = 0;
                    }
                }

//                $element.on('contextmenu', function(event) {
//                    event.preventDefault();
//                    event.stopPropagation();
//                    clearDownId();
//                    openMenu(event);
//                });
                $element.on('contextmenu', function(event) {
                    clearDownId();
                });

                $element.on('mousedown', function(event) {
                    console.log('mousedown');
                    clearDownId();
                    downId = window.setTimeout(onHoldDown, 500);
                    downEvent = event;
                });

                function onHoldDown(event) {
                    if(downId) {
                        downId = 0;
                        openMenu(downEvent);
                    }
                    downEvent = null;
                }

                $element.on('mouseleave', function(event) {
                    clearDownId();
                });

                $element.on('mouseup', function(event) {
                    clearDownId();
                });

                $element.on('mousemove', function(event) {
                    if(downId) {
                        var offset = 10;
                        if( Math.abs(downEvent.pageX - event.pageX) > offset ||
                            Math.abs(downEvent.pageY - event.pageY) > offset ) {
                            clearDownId();
                        }
                    }
                });

            }

        }]);

});
