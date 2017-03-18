var mainCtrl = angular.module("mainCtrl", ["authService"]);

//create a new controller and get "Auth" service
mainCtrl.controller("mainController", function ($scope, $rootScope, $location, Auth, $window) {

    $rootScope.$on("$routeChangeStart", function () {

        $scope.loggedIn = Auth.isLogged();

        Auth.getUser().then(function (data) {
            $scope.user = data.data;
        });
    });

    //for manage a login process
    $scope.doLogin = function () {
        $scope.processing = true;

        $scope.error = "";

        Auth.login($scope.loginData.username, $scope.loginData.password).then(function (data) {

            $scope.processing = false;

            Auth.getUser().then(function (data) {
                $scope.user = data.data;
            });

            if (data.data.success) {
                $window.location.href = "/";
            } else {
                $scope.error = data.data.message;
            }
        });
    };

    //for manage a logout process
    $scope.logout = function () {

        Auth.logout();
        $location.path("/logout");
    };
})