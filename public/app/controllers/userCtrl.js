var userCtrl = angular.module("userCtrl", ["userService"]);

userCtrl.controller("UserController", function ($scope, User) {

    User.all().then(function (data) {

        $scope.users = data;

    });
});

userCtrl.controller("UserCreateController", function ($scope, $location, $window, User) {

    $scope.signupUser = function () {

        User.create($scope.userData).then(function (response) {

            $scope.userData = {};
            $scope.message = response.data.message;

            $window.localStorage.setItem("token", response.data.token);
            $location.path("/");
        });

    }

})