var authService = angular.module("authService", []);

//a service that contain all call to server for login, logout and for get information of current user logged
authService.factory("Auth", function ($http, $q, AuthToken) {

    var authFactory = {};

    authFactory.login = function (username, password) {

       return $http({
            method: 'POST',
            url: '/api/login',
            data: {
                username: username,
                password: password
            }
        }).then(function (user) {
            AuthToken.setToken(user.data.token);
            return user;
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
        if (AuthToken.getToken) {
            return $http.get("/api/me");
        } else {
            return $q.reject({ message: "User has no token!!" });
        }
    };

    return authFactory;
});


//a service for manage a token ( get or set new token )
authService.factory("AuthToken", function ($window) {

    var authFactory = {};

    authFactory.getToken = function () {
        return $window.localStorage.getItem("token");
    };

    authFactory.setToken = function (token) {

        if (token) {
            $window.localStorage.setItem("token", token);
        } else {
            $window.localStorage.removeItem("token");
        }
    };

    return authFactory;
});


authService.factory("AuthInterceptor", function ($q, $location, AuthToken) {

    var interceptorFactory = {};

    interceptorFactory.request = function (config) {
        var token = AuthToken.getToken();

        if (token) {
            config.headers["z-access-token"] = token;
        }
        return config;
    };

    interceptorFactory.responseErro = function (response) {

        if (response.status == 401) {

            $location.path("/login");
        }

        return $q.reject(response);
    }

    return interceptorFactory;
})