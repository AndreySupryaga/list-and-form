(function () {
    'use strict';

    angular.module('app')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/users/table', {
                    templateUrl: '/app/components/user/table/users.table.html',
                    controller: 'usersTableCtrl'
                })
                .when('/users/tile', {
                    templateUrl: '/app/components/user/tile/users.tile.html',
                    controller: 'usersTileCtrl'
                })
                .when('/user/edit/:id', {
                    templateUrl: '/app/components/user/form/user.form.html',
                    controller: 'userFormCtrl'
                })
                .when('/user/add', {
                    templateUrl: '/app/components/user/form/user.form.html',
                    controller: 'userFormCtrl'
                })
                .otherwise({
                    redirectTo: '/users/table'
                });
        });
})();