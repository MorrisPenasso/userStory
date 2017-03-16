var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(function ($routeProvider) {

    $routeProvider.when("/", {

        templateUrl: "/app/views/pages/home.html"
    })

    .otherwise({ redirectTo: "/" });
})
