(function () {
    'use strict';

    angular
        .module('app')
        .service('users', function ($http, $q) {
            return {

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
                put: function (user) {
                    var users = getUsers();
                    users[getIndexItem(user.id)] = user;
                    putUsers(users);
                    return $q(function (resolve) {
                        resolve(user);
                    })
                },
                del: function (id) {
                    getIndexItem(id);
                    var users = getUsers();
                    users.splice(getIndexItem(id), 1);
                    putUsers(users);
                    return $q(function (resolve) {
                        resolve(users);
                    })
                }

            };


            function getUsers() {
                return JSON.parse(localStorage.getItem('usersModel'));
            }

            function putUsers(data) {
                localStorage.setItem('usersModel', JSON.stringify(data));
                return JSON.parse(localStorage.getItem('usersModel'));
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
        });

})();
