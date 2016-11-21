(function () {
    'use strict';

    angular
        .module('app')
        .directive('navMenu', function () {
            return {
                controller: function ($scope, $location , navMenuStructure) {
                    $scope.currentPath = $location.path();
                    $scope.selectSection = function (path) {
                        $scope.currentPath = path;
                    };
                    $scope.currentPath = '/#' + $location.path();
                    $scope.links = navMenuStructure;
                },
                restrict: 'AE',
                templateUrl: 'app/directive/menu/nav.menu.html'
            };
        });
})();