(function () {
    'use strict';

    angular.module('app')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/table', {
                    templateUrl: '/app/components/user/table/users.table.html',
                    controller: 'usersTableCtrl'
                })
                .when('/tile', {
                    templateUrl: '/app/components/user/tile/users.tile.html',
                    controller: 'usersTileCtrl'
                })
                .otherwise({
                    redirectTo: '/table'
                });
        });
})();