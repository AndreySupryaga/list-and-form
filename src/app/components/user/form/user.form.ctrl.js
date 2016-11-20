(function () {
    'use strict';

    angular
        .module('app')
        .controller('userFormCtrl', MainController);

    function MainController($scope, $http, $route, toastr, confirmDialog) {

        $scope.userModel = [];
        $scope.userEdit = userEdit;
        $scope.userDelete = userDelete;

        /**
         * Getting users data
         */

        $http.get('app/userList.json').then(function (response) {
            $scope.userModel = getUser(response.data, $route.current.params.id);
            $scope.loader = false;
        });

        function getUser(data, id){
            for(var i = 0; i < data.length; i++){
                if(data[i].id == id) return data[i];
            }
        }

        /**
         * Edit select user in dialog window
         * @param {Object} user - User data
         */
        function userEdit(user) {
           console.log('userEdit ', user);
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
                    modelDeleteItem(user);
                    filterUserList();
                    toastr.success('Deleted', 'Success');
                });
        }

        function modelDeleteItem(item) {
            $scope.userModel.splice($scope.userModel.indexOf(item), 1);

        }

    }
})();
