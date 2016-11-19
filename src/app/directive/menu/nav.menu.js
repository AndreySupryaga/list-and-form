(function () {
    'use strict';

    angular
        .module('app')
        .directive('navMenu', function () {
            return {
                controller: function ($scope, $location /*, config*/) {
                    $scope.isNavCollapsed = true;
                    $scope.isCollapsed = false;
                    $scope.isCollapsedHorizontal = false;
                   // $scope.menuItems = config.navigation.main;
                    $scope.currentPath = $location.path();
                    $scope.selectSection = function (path) {
                        $scope.currentPath = path;
                    };
                    $scope.action = function (item) {
                        $location.url(item.href);
                    };
                },
                restrict: 'AE',
                templateUrl: 'app/directive/menu/nav.menu.html'
            };
        });
})();