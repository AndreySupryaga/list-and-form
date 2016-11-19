(function () {
    'use strict';

    angular.module('app')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/table', {
                    templateUrl: '/app/components/user/tile/users.table.html',
                    controller: 'usersTableCtrl'
                })
                .otherwise({
                    redirectTo: '/table'
                });
        });
})();