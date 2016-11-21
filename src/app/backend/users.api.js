(function () {
    'use strict';

    angular
        .module('app')
        .service('usersApi', function ($http, $q, toastr) {
            return {

                /**
                 * Getting all users data
                 * @returns {Promise}
                 */
                getAll: function () {
                    if (getUsers()) {
                        return $q(function (resolve) {
                            resolve(getUsers());
                        })
                    } else {
                        return $http.get('app/backend/userList.json').then(function (response) {
                            putUsers(response.data);
                            return response.data;
                        });
                    }
                },

                /**
                 * Getting user by id
                 * @returns {Promise}
                 */
                get: function (id) {
                    var that = this;
                    return $q(function (resolve) {
                        if (getUsers()) {
                            resolve(getUserById(id));
                        } else {
                            return that.getAll().then(function () {
                                resolve(getUserById(id));
                            });
                        }
                    })
                },

                /**
                 * Creating new user
                 * @returns {Promise}
                 */
                post: function (user) {
                    var users = getUsers();
                    user.id = getMaxId(users) + 1;
                    users.push(user);
                    putUsers(users);
                    return $q(function (resolve) {
                        toastr.success('Created new user', 'Success');
                        resolve(user);
                    })
                },

                /**
                 * Changing user
                 * @returns {Promise}
                 */
                put: function (user) {
                    var users = getUsers();
                    users[getIndexItem(user.id)] = user;
                    putUsers(users);
                    return $q(function (resolve) {
                        toastr.success('Updated', 'Success');
                        resolve(user);
                    })
                },

                /**
                 * Deleting user
                 * @returns {Promise}
                 */
                del: function (id) {
                    getIndexItem(id);
                    var users = getUsers();
                    users.splice(getIndexItem(id), 1);
                    putUsers(users);
                    return $q(function (resolve) {
                        toastr.success('Deleted', 'Success');
                        resolve(users);
                    })
                }
                
            };

            function getUsers() {
                return JSON.parse(localStorage.getItem('usersModel'));
            }

            function putUsers(data) {
                localStorage.setItem('usersModel', JSON.stringify(data));
                return getUsers();
            }

            function getUserById(id) {
                var users = getUsers();
                return users[getIndexItem(id)];
            }

            function getIndexItem(id) {
                var users = getUsers();
                for (var i = 0; i < users.length; i++) {
                    if (users[i].id == id) {
                       return i;
                    }
                }
            }

            function getMaxId(data) {
                var maxId = 0;
                for(var i = 0; i < data.length; i++){
                    if(maxId < data[i].id){
                        maxId = data[i].id
                    }
                }
                return maxId;
            }
        });

})();
