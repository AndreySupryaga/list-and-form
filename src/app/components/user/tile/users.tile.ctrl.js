(function () {
    'use strict';

    angular
        .module('app')
        .controller('usersTileCtrl', MainController);

    function MainController($scope, toastr, $filter, users, confirmDialog, userEditDialog) {

        $scope.limit = '10';
        $scope.currentPage = '1';
        $scope.ageRange = 'all';
        $scope.userModel = [];
        $scope.userEdit = userEdit;
        $scope.userDelete = userDelete;

        /**
         * Getting users data
         */
        users.getAll().then(function (response) {
            $scope.userModel = response;
            filterUserList();
            $scope.loader = false;
        });
        /**
         * Watch for filter data
         */
        $scope.$watch('[currentPage, limit, sortReverse, searchTerm, ageRange]', function () {
            filterUserList();
        }, true);

        /**
         * Edit select user in dialog window
         * @param {Object} user - User data
         */
        function userEdit(user) {
            userEditDialog(user).then(function (changedModel) {
                if (changedModel) {
                    angular.extend(user, changedModel);
                    toastr.success('Edited', 'Success');
                }
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
                    users.del(user.id).then(function (response) {
                        $scope.userModel = response;
                        filterUserList();
                        toastr.success('Deleted', 'Success');
                    });
                });
        }


        /**
         * Filter for users
         * @returns {Array} {*} - Array with filtered user
         */
        function filterUserList() {
            var filteredData;
            if ($scope.ageRange) {
                var rangeArr = $scope.ageRange.split('-');
                rangeArr = rangeArr[1] ? rangeArr : $scope.ageRange.split('+');
                filteredData = $filter('rangeFilter')($scope.userModel, rangeArr[0], rangeArr[1]);
            }
            filteredData = $filter('filter')(filteredData, $scope.searchTerm);
            filteredData = $filter('orderBy')(filteredData, $scope.sortType, $scope.sortReverse);
            $scope.pagesLength = filteredData.length;
            filteredData = $filter('limitTo')(filteredData, $scope.limit, $scope.currentPage === 1 ? 0 : ($scope.currentPage - 1) * $scope.limit);
            $scope.userList = filteredData;
            return $scope.userList;
        }

    }
})();
