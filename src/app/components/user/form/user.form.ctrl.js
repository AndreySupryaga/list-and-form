(function () {
    'use strict';

    angular
        .module('app')
        .controller('userFormCtrl', MainController);

    function MainController($scope, $route, $window, $location, usersApi, confirmDialog) {

        var userModelCache = null;
        $scope.users = [];
        $scope.userModel = {};
        $scope.userAdd = userAdd;
        $scope.userEdit = userEdit;
        $scope.userDelete = userDelete;
        $scope.resetChanges = resetChanges;
        $scope.cancelForm = cancelForm;

        init();

        function init() {
            if ($route.current.params.id) {
                $scope.userId = $route.current.params.id;
                $scope.formTitle = 'Edit user';
                getUsersData();
            } else {
                $scope.formTitle = 'Add user';
                $scope.loader = false;
            }
        }

        /**
         * Getting users data by id
         */
        function getUsersData() {
            return usersApi.get($scope.userId).then(function (response) {
                $scope.userModel = response;
                userModelCache = angular.copy($scope.userModel);
                $scope.loader = false;
            });
        }


        /**
         * Save user
         * @param {Object} user - User data
         */
        function userEdit(user) {
            usersApi.put(user).then(function (response) {
                $scope.userModel = response;
                userModelCache = angular.copy($scope.userModel);
                $scope.userForm.$setPristine();
            });
        }

        /**
         * Add new user to users data
         * @param {Object} user - User data
         */
        function userAdd(user) {
            usersApi.post(user).then(function (response) {
                $location.path('/user/edit/' + response.id);
            });
        }

        /**
         * Delete select user with confirm dialog
         * @param {Object} user - User data
         */
        function userDelete(user) {
            var title = 'Delete user';
            var descr = 'You really want to delete ' + user.firstName + ' ' + user.lastName;
            confirmDialog(title, descr)
                .then(function () {
                    usersApi.del(user.id);
                    $window.history.back();
                });
        }

        /**
         * Reset changes
         */
        function resetChanges() {
            $scope.userModel = userModelCache;
        }

        /**
         * Exit from form
         */
        function cancelForm() {
            $window.history.back();
        }

    }
})();
