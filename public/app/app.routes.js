var appRoutes = angular.module("appRoutes", ["ngRoute"]);

//configure module for routing system
appRoutes.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when("/", {

        templateUrl: "/app/views/pages/home.html",
        controller: "mainController"
    })
        .when("/login", {

            templateUrl: "/app/views/pages/login.html"
        })
        .when("/signup", {

            templateUrl: "/app/views/pages/signup.html"
        })
        .when("/allStories", {

            templateUrl: "/app/views/pages/allStories.html",
            controller: "AllStoriesCtrl",
            resolve: {
                stories: function (story) {
                    return Story.allStories();
                }
            }
        })
    .otherwise({ redirectTo: "/" });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

})