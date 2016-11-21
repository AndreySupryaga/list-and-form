(function () {
    'use strict';

    angular
        .module('app')
        .controller('userFormCtrl', MainController);

    function MainController($scope, $route, $window, $location, usersApi, toastr, confirmDialog) {

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
            if($route.current.params.id){
                $scope.userId = $route.current.params.id;
                $scope.formTitle = 'Edit user';
                getUsersData();
            }else{
                $scope.formTitle = 'Add user';
                $scope.loader = false;
            }
        }
        /**
         * Getting users data
         */
        function getUsersData() {
            return usersApi.get($scope.userId).then(function (response) {
                $scope.userModel = response;
                userModelCache = angular.copy($scope.userModel);
                $scope.loader = false;
            });
        }


        /**
         * Save select user in dialog window
         * @param {Object} user - User data
         */
        function userEdit(user) {
            usersApi.put(user).then(function (response) {
               $scope.userModel = response;
            });
        }
        
        /**
         * Save select user in dialog window
         * @param {Object} user - User data
         */
        function userAdd(user) {
            usersApi.post(user).then(function (response) {
                $location.path('/user/edit/' + response.id);
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
                    usersApi.del(user.id);
                    toastr.success('Deleted', 'Success');
                    $window.history.back();
                });
        }

        function resetChanges() {
            $scope.userModel = userModelCache;
        }

        function cancelForm() {
            $window.history.back();
        }

    }
})();
