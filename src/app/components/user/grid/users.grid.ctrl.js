(function () {
    'use strict';

    angular
        .module('app')
        .controller('usersGridCtrl', MainController);

    function MainController($scope, $filter, usersApi, confirmDialog) {

        $scope.limit = '10';
        $scope.currentPage = '1';
        $scope.ageRange = 'all';
        $scope.userModel = [];
        $scope.userDelete = userDelete;

        /**
         * Getting users data
         */


        usersApi.getAll().then(function (response) {
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
         * Delete select user in dialog window
         * @param {Object} user - User data
         */
        function userDelete(user) {
            var title = 'Delete user';
            var descr = 'You really want to delete ' + user.firstName + ' ' + user.lastName;
            confirmDialog(title, descr)
                .then(function () {
                    usersApi.del(user.id).then(function (response) {
                        $scope.userModel = response;
                        filterUserList();
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
