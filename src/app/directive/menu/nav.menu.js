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
                    $scope.currentPath = $location.path();
                    $scope.selectSection = function (path) {
                        $scope.currentPath = path;
                    };
                    $scope.currentPath = '/#' + $location.path();
                    
                    $scope.links = [
                        {
                            title: 'Item table view',
                            href: '/#/users/table'
                        },
                        {
                            title: 'Item tile view',
                            href: '/#/users/tile'
                        },
                        {
                            title: 'Add user',
                            href: '/#/user/add'
                        }
                    ];
                },
                restrict: 'AE',
                templateUrl: 'app/directive/menu/nav.menu.html'
            };
        });
})();