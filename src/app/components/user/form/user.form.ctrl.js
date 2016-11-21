(function () {
    'use strict';

    angular
        .module('app')
        .controller('userFormCtrl', MainController);

    function MainController($scope, $route, $window, users, toastr, confirmDialog) {

        var userModelCashe = null;
        $scope.users = [];
        $scope.userModel = null;
        $scope.userEdit = userEdit;
        $scope.userDelete = userDelete;
        $scope.resetChanges = resetChanges;
        $scope.cancelForm = cancelForm;


        /**
         * Getting users data
         */
        users.get($route.current.params.id).then(function (response) {
            $scope.userModel = response;
            userModelCashe = angular.copy($scope.userModel);
            $scope.loader = false;
        });


        /**
         * Edit select user in dialog window
         * @param {Object} user - User data
         */
        function userEdit(user) {
            users.put(user).then(function (response) {
                $scope.userModel = response;
            });
        }
        
        /**
         * Delete select user in dialog window
         * @param {Object} user - User data
         */
        function userDelete(user) {
            var title = 'Delete user';
            var descr = 'You really want to delete ' + user.firstName + ' ' + user.lastName;
            confirmDialog(title, descr)
                .then(function () {
                    users.del(user.id);
                    toastr.success('Deleted', 'Success');
                    $window.history.back();
                });
        }

        function resetChanges() {
            $scope.userModel = userModelCashe;
        }

        function cancelForm() {
            $window.history.back();
        }

    }
})();
