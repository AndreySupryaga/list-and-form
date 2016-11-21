(function () {
    'use strict';

    angular
        .module('app')
        .directive('navMenu', function () {
            return {
                controller: function ($scope, $location , navMenuStructure) {
                    $scope.currentPath = '/#' + $location.path();
                    $scope.links = navMenuStructure;
                    $scope.selectSection = function (path) {
                        $scope.currentPath = path;
                    };
                },
                restrict: 'AE',
                templateUrl: 'app/directive/menu/nav.menu.html'
            };
        });
})();