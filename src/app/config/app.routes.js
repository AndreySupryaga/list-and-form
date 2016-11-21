(function () {
    'use strict';

    angular.module('app')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/users/table', {
                    templateUrl: '/app/components/user/grid/table/users.table.html',
                    controller: 'usersGridCtrl'
                })
                .when('/users/tile', {
                    templateUrl: '/app/components/user/grid/tile/users.tile.html',
                    controller: 'usersGridCtrl'
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