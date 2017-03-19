var storyService = angular.module("storyService", []);


storyService.factory("Story", function ($http) {

    var storyFactory = {};


    storyFactory.createStory = function (storyData) {

        return $http.post("/api", storyData)
    };

    storyFactory.allStory = function () {

        return $http.get("/api");
    }

    return storyFactory;
})