var authService = angular.module("authService", ["$http"]);

//factory for manage authentication process
authService.factory("Auth", function ($http, $q, AuthToken) {

    var authFactory = {};

    //manage a login request
    authFactory.login = function (username, password) {

        return $http.post("/api/login", {

            username: username,
            password: password
        }).success(function (data) {
            if (data.success == true) {
                AuthToken.setToken(data.token);
                return data;
            }
        })
    };

    //manage a logout request
    authFactory.logout = function () {

        AuthToken.setToken();
    };

    //if current user is logged
    authFactory.isLogged = function () {

        if (AuthToken.getToken()) {

            return true;
        } else {
            return false;
        }
    };

    //for get a informations of the current user
    authFactory.getUser = function () {

        if (AuthToken.getToken()) {
            return $http.get("/api/me");
        } else {
            $q.reject({ message: "User has no token!!" });
        }

    }

    return authFactory;

});

//factory that manage token
authService.factory("AuthToken", function ($window) {

    var authFactory = {};

    //for store token of the user that is logged
    authFactory.setToken = function (token) {

        if (token) {
            $window.localStorage.setitem("token", token);
        } else {
            $window.localStorage.removeItem("token");
        }
    };

    //for get user's token
    authFactory.getToken = function () {

        return $window.localStorage.getItem("token");
    };

    return authFactory;

})