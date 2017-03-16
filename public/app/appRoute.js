var myApp = angular.module("myApp", ["ngRoute"]);

//module initial configuration for the route system
myApp.config(function ($routeProvider) {

    $routeProvider.when("/", {

        templateUrl: "/app/views/pages/home.html"
    })

    //on other cases, redirect to "/"
    .otherwise({ redirectTo: "/" });
})
