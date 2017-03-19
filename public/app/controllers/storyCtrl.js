var storyCtrl = angular.module("storyCtrl", ["storyService"]);

storyCtrl.controller("StoryController", function ($scope, Story, socketio) {

    Story.allStory().then(function(data)    {
    
        $scope.stories = data;
    });


    $scope.createStory = function() {
    
        $scope.message = "";

        Story.createStory($scope.storyData).then(function (data) {

            $scope.storyData = "";

            $scope.message = data.message;

            $scope.stories.push(data);

        });

    };

    socketio.on("story", function(data)    {
        $scope.stories.push(data);
})
});