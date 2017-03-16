var myApp = angular.module("mainModule", ["Auth"]);

myApp.controller("mainCtrl", function ($scope, $location, Auth) {

    //for control if the current user is already connected
    $scope.isLoggedId = Auth.isLogged();


    $scope.$on("$routeChangeStart", function () {

        $scope.loggedIn = Auth.isLogged();

        Auth.getUser().then(function (data) {
            $scope.user = data.data;
        });
    });

    $scope.doLogin = function () {

        $scope.processing = true;

        Auth.login($scope.loginData.username, $scope.loginData.password).success(function (user) {

            Auth.getUser().then(function (data) {

                $scope.user = user.data;
            });

            if (user.success) {
                $location.path("/");
            } else {
                $scope.error = user.message;
            };

            $scope.logout = function () {

                Auth.logout();
                $location.path("/logout");
            }
        })
    }
})