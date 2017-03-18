var appRoutes = angular.module("appRoutes", ["ngRoute"]);

//configure module for routing system
appRoutes.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when("/", {

        templateUrl: "/app/views/pages/home.html"
    })
        .when("/login", {

            templateUrl: "/app/views/pages/login.html"
        })
        .when("/signup", {

            templateUrl: "/app/views/pages/signup.html"
        })

    .otherwise({ redirectTo: "/" });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

})