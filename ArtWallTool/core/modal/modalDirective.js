define([
    'angular',
    'app',
    'ui.bootstrap'
],
    function (angular, app) {

    app.directive('dsModal', [
        "$parse", "$compile", "$timeout", "$modal", "$q",
        function($parse, $compile, $timeout, $modal, $q) {

            return {
                restrict: 'E',
                scope: true,
                transclude: true,
                templateUrl: './core/modal/modalTemplate.html',
                link: link
            };

            function link($scope, $element, $attr, controller, $transclude) {
                var $modalElement = $element.find(".modal").first();
                if (!$attr.name) throw Error("<ds:modal> directive requires name");
                $scope.modalName = $attr.name;
                $scope.$parent[$attr.name] = $scope;
                if ($attr.class) {
                    $modalElement.addClass($attr.class);
                }
                $scope.open = function () {
                    $modalElement.modal('show');
                };
                $scope.bare = $attr.hasOwnProperty("bare");
                $scope.escape = $attr.hasOwnProperty("escape");
                $scope.visible = false;
                $scope.hiding = false;
                $scope.options = {
                    size: $attr.size || "lg",
                    show: false
                };

                if (!$scope.escape) {
                    $scope.options.keyboard = false;
                    $scope.options.backdrop = 'static';
                }

                $timeout(function () {
                    //Forms
                    var form = $modalElement.find('.modal-dialog > .modal-content > .modal-body > form');
                    if (form.length) {
                        form.children().appendTo(form.parent());
                        var dlg = $modalElement.find('.modal-dialog');
                        dlg.parent().append(form);
                        form.append(dlg);
                    }

                    // Overridables
                    var overridables = [
                        ['.modal-dialog > .modal-content', '.modal-dialog > .modal-content > .modal-body > .modal-content'],
                        ['.modal-dialog > .modal-content > .modal-header', '.modal-dialog > .modal-content > .modal-body > .modal-header'],
                        ['.modal-dialog > .modal-content > .modal-footer', '.modal-dialog > .modal-content > .modal-body > .modal-footer'],
                        ['.modal-dialog > .modal-content > .modal-body', '.modal-dialog > .modal-content > .modal-body > .modal-body']
                    ];
                    overridables.forEach(function (c) {
                        var replacement = $modalElement.find(c[1]).first();
                        if (replacement.length) {
                            $modalElement.find(c[0]).replaceWith(replacement);
                        }
                    });
                });


                $scope.instance = $modalElement.modal($scope.options);
                $modalElement.on('show.bs.modal', function () {
                    $modalElement.addClass('modal-open');
                    $scope.visible = true;
                });
                $modalElement.on('hide.bs.modal', function () {
                    $modalElement.removeClass('modal-open');
                    $scope.visible = false;
                    $scope.hiding = true;
                });
                $modalElement.on('hidden.bs.modal', function () {
                    $scope.hiding = false;
                    if ($attr.hidden) {
                        $scope.$parent.$eval($attr.hidden);
                    }
                });


                $scope.title = $attr.title;
                $scope.ending = false;
                function commonClose(event, cmd, arg) {
                    var closeDeferred = $q.defer();
                    if (!$scope.visible) {
                        closeDeferred.resolve();
                    }
                    else {
                        $scope.ending = true;
                        closeDeferred.promise.then(function() {
                            $modalElement.modal('hide');
                        }).finally(function() {
                            $scope.ending = false;
                        });

                        var eventRet;
                        var transcludeScope = $modalElement.find("[ng-transclude]").first().scope();
                        if ($attr[event] && (eventRet = transcludeScope.$eval($attr[event])) && eventRet.then) {
                            // event returned a promise.
                            // Chain promise
                            eventRet.then(function(a) {
                                closeDeferred.resolve(a);
                            }, function(a) {
                                closeDeferred.reject(a);
                            });
                        } else {
                            //console.log('Promise Resolving');
                            closeDeferred.resolve(arg);
                        }

                    }
                    return closeDeferred.promise;
                }

                $scope.close = function (result) {
                    return commonClose("okay", "close", result);
                };

                $scope.dismiss = function(reason) {
                    return commonClose("cancel", "dismiss", reason);
                };

                $element.appendTo("body");

                $scope.$on("$destroy", function () {
                    //console.log("$destroy %o", $attr.name);

                    var fnFinally = function() {
                        $element.remove();
                    };
                    if ($scope.visible || $scope.hiding) {
                        //console.log("$destroy visible %o", $attr.name);
                        $modalElement.on('hidden.bs.modal', function () {
                            fnFinally();
                        });
                        if (!$scope.hiding) commonClose("destroy", "dismiss", "$scope $destroyed");
                    } else {
                        //console.log("$destroy not visible %o", $attr.name);
                        fnFinally();
                    }
                    delete $scope.$parent[$attr.name];
                });
            }
        }
    ]);
});