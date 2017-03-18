var myApp = angular.module("myApp", ["appRoutes", "mainCtrl", "userCtrl", "userService", "authService"]);


//insert in this module the custom interceptor
myApp.config(function ($httpProvider) {

    $httpProvider.interceptors.push("AuthInterceptor");
})