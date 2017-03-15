var authService = angular.module("authService", ["$http"]);

authService.factory("Auth", function ($http, $q, AuthToken) {

    var authFactory = {};

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

    authFactory.logout = function () {

        AuthToken.setToken();
    };

    authFactory.isLogged = function () {

        if (AuthToken.getToken()) {

            return true;
        } else {
            return false;
        }
    };

    authFactory.getUser = function () {

        if (AuthToken.getToken()) {
            return $http.get("/api/me");
        } else {
            $q.reject({ message: "User has no token!!" });
        }

    }

    return authFactory;

})